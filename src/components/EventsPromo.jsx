import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from './Icons'
import { contactHrefFor } from '../config'
import { EVENTS_PROMO as P } from '../data/eventsPromo'
import { dismissedRecently, recordDismissal } from '../lib/promoDismiss'

// Closing it is an answer, and it is remembered for P.dismissDays. The old
// session key is cleared on sight so nobody carries a stale one around.
const DISMISS_KEY = 'aspire.eventsPromo.dismissedUntil'
const LEGACY_SESSION_KEY = 'aspire.eventsPromo.seen'

const safeRemove = (store, k) => {
  try { window[store].removeItem(k) } catch { /* nothing to do */ }
}

export default function EventsPromo() {
  const [open, setOpen] = useState(false)
  const dialog = useRef(null)
  const lastFocused = useRef(null)

  useEffect(() => {
    if (!P.enabled) return undefined
    safeRemove('sessionStorage', LEGACY_SESSION_KEY)
    if (dismissedRecently(DISMISS_KEY)) return undefined

    // Whichever fires first, and nothing fires on a clock unless delayMs is
    // set: a pop-up on a timer interrupts somebody who is reading.
    let armed = false
    const show = () => {
      if (armed) return
      armed = true
      lastFocused.current = document.activeElement
      setOpen(true)
    }

    const t = P.delayMs > 0 ? window.setTimeout(show, P.delayMs) : null

    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      if (max > 0 && h.scrollTop / max >= (P.scrollPct ?? 0.5)) show()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    let onLeave
    const fine = window.matchMedia('(pointer: fine)').matches
    if (P.exitIntent && fine) {
      onLeave = (e) => { if (e.clientY <= 0) show() }
      document.addEventListener('mouseout', onLeave)
    }

    return () => {
      if (t) window.clearTimeout(t)
      window.removeEventListener('scroll', onScroll)
      if (onLeave) document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  const close = () => {
    setOpen(false)
    recordDismissal(DISMISS_KEY, P.dismissDays)
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
          <a className="btn btn-accent btn-lg promo__cta" href={contactHrefFor('events', 'events-popup')} onClick={close}>
            {P.ctaLabel} <ArrowRight />
          </a>
          {P.secondary && (
            <a className="link-arrow promo__second" href={P.secondary.to} onClick={close}>
              {P.secondary.label} <ArrowRight size={15} />
            </a>
          )}
          {P.ctaNote && <p className="promo__note">{P.ctaNote}</p>}
        </div>
      </div>
    </div>
  )
}
