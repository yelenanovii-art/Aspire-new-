import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowRight } from './Icons'
import { ESTATE_PROMO as P } from '../data/estatePromo'
import { dismissedRecently, recordDismissal } from '../lib/promoDismiss'

// The property pop-up on the content creation page.
//
// It shares the frame and the keyboard behaviour of the other two, and differs
// in what opens it: the other pop-ups run on a timer, and this one waits for a
// place on the page. It renders a marker directly under the film grid and
// opens once that marker has been scrolled past, so the interruption lands
// after the two property films rather than before anybody has seen them.
//
// The component sits just below the film section, so its marker falls after
// that section's bottom padding and the last film is genuinely behind the
// reader before anything opens. The dialog goes to the body through a portal
// rather than rendering in place, which also keeps it clear of any section
// whose colour rules would reach into it.
const DISMISS_KEY = 'aspire.estatePromo.dismissedUntil'

export default function EstatePromo() {
  const [open, setOpen] = useState(false)
  const mark = useRef(null)
  const dialog = useRef(null)
  const lastFocused = useRef(null)
  // Once it has fired, scrolling back up and down again should not reopen it.
  const fired = useRef(false)

  useEffect(() => {
    const el = mark.current
    if (!P.enabled || !el || dismissedRecently(DISMISS_KEY)) return undefined
    if (typeof IntersectionObserver === 'undefined') return undefined

    const io = new IntersectionObserver(
      ([e]) => {
        // boundingClientRect.top < 0 means the marker is above the viewport,
        // so the films are behind them. Without it this also fires on the way
        // down the page from a deep link landing below. The extra 120px is so
        // the last film is clearly gone rather than just level with the top
        // edge, which is where it was interrupting people mid-watch.
        if (fired.current || e.isIntersecting || e.boundingClientRect.top > -120) return
        fired.current = true
        lastFocused.current = document.activeElement
        setOpen(true)
        io.disconnect()
      },
      { threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const close = () => {
    setOpen(false)
    recordDismissal(DISMISS_KEY, P.dismissDays)
    if (lastFocused.current && lastFocused.current.focus) lastFocused.current.focus()
  }

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close() }
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

  return (
    <>
      <span ref={mark} aria-hidden="true" className="promo__mark" />
      {open && createPortal(
        <div className="promo" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}>
          <div
            className="promo__box"
            role="dialog"
            aria-modal="true"
            aria-labelledby="estate-promo-title"
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
              <h2 className="promo__title" id="estate-promo-title">{P.headline}</h2>
              <p className="promo__lead">{P.body}</p>
              <p className="promo__stat">
                <span className="promo__stat-v">{P.statValue}</span>
                <span className="promo__stat-k">{P.statLabel}</span>
              </p>
              <a className="btn btn-accent btn-lg promo__cta" href={P.cta.to} onClick={close}>
                {P.cta.label} <ArrowRight />
              </a>
              {P.note && <p className="promo__note">{P.note}</p>}
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  )
}
