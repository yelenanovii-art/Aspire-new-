import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from './Icons'
import { bookHref, bookAttrs } from '../config'
import { EVENTS_PROMO as P } from '../data/eventsPromo'

// Nothing is remembered any more: the pop-up shows on every load of the home
// page. These two keys are the old once-per-session and seven-day rules, kept
// only so anyone who already has them stored gets them cleared rather than
// being silently excluded forever.
const LEGACY_SESSION_KEY = 'aspire.eventsPromo.seen'
const LEGACY_DISMISS_KEY = 'aspire.eventsPromo.dismissedUntil'

// Every storage read here is wrapped: a private window, cleared site data or a
// browser set to block storage all throw on access, and a pop-up that cannot
// remember being dismissed is worse than one that never shows.
const safeRemove = (store, k) => {
  try { window[store].removeItem(k) } catch { /* nothing to do */ }
}

export default function EventsPromo() {
  const [open, setOpen] = useState(false)
  const dialog = useRef(null)
  const lastFocused = useRef(null)

  useEffect(() => {
    if (!P.enabled) return undefined
    // Clear the old gating so a visitor who dismissed it under the previous
    // rules is not locked out for a week.
    safeRemove('sessionStorage', LEGACY_SESSION_KEY)
    safeRemove('localStorage', LEGACY_DISMISS_KEY)

    const t = window.setTimeout(() => {
      lastFocused.current = document.activeElement
      setOpen(true)
    }, P.delayMs)
    return () => window.clearTimeout(t)
  }, [])

  const close = () => {
    setOpen(false)
    // Put the keyboard back where it was rather than at the top of the page.
    if (lastFocused.current && lastFocused.current.focus) lastFocused.current.focus()
  }

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close() }
      // A modal that lets focus wander behind it is a modal in name only.
      if (e.key === 'Tab' && dialog.current) {
        const f = dialog.current.querySelectorAll('a[href], button:not([disabled])')
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const id = window.setTimeout(() => dialog.current?.querySelector('.promo__close')?.focus(), 60)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      window.clearTimeout(id)
    }
  }, [open])

  if (!open) return null

  return (
    <div className="promo" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}>
      <div
        className="promo__box"
        role="dialog"
        aria-modal="true"
        aria-labelledby="promo-title"
        ref={dialog}
      >
        <button type="button" className="promo__close" onClick={close} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <figure className="promo__media" aria-hidden="true">
          <img
            src={P.photo.src}
            srcSet={`${P.photo.src.replace(/\.webp$/, '-760.webp')} 760w, ${P.photo.src} ${P.photo.w}w`}
            sizes="(max-width: 760px) 92vw, 46vw"
            alt=""
            width={P.photo.w}
            height={P.photo.h}
            decoding="async"
          />
        </figure>

        <div className="promo__body">
          <p className="promo__eyebrow">{P.eyebrow}</p>
          <h2 className="promo__title" id="promo-title">{P.headline}</h2>
          <p className="promo__lead">{P.body}</p>
          <p className="promo__stat">
            <span className="promo__stat-v">{P.statValue}</span>
            <span className="promo__stat-k">{P.statLabel}</span>
          </p>
          <a className="btn btn-accent btn-lg promo__cta" href={bookHref} {...bookAttrs} onClick={close}>
            {P.ctaLabel} <ArrowRight />
          </a>
          {P.ctaNote && <p className="promo__note">{P.ctaNote}</p>}
        </div>
      </div>
    </div>
  )
}
