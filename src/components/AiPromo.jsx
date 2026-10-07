import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from './Icons'
import { bookHrefFrom, bookAttrs } from '../config'
import { AI_PROMO as P } from '../data/aiPromo'
import { AI } from '../data/verticals'

// The AI systems pop-up, on the tech-leaning pages listed in its data file.
//
// It shares the events pop-up's frame and behaviour, and differs in one way
// that matters: there is no photograph of a dashboard worth showing, so the
// media half draws the readout the /ai-systems page leads with. The figures
// are that page's own illustrative set rather than a second invented one.
export default function AiPromo({ path }) {
  const [open, setOpen] = useState(false)
  const dialog = useRef(null)
  const lastFocused = useRef(null)
  const onThisPage = P.enabled && P.pages.includes(path)

  useEffect(() => {
    if (!onThisPage) return undefined
    const t = window.setTimeout(() => {
      lastFocused.current = document.activeElement
      setOpen(true)
    }, P.delayMs)
    return () => window.clearTimeout(t)
    // Keyed on the path so navigating between two listed pages re-arms it
    // rather than firing once per session and never again.
  }, [onThisPage, path])

  // A route change while it is open should close it, not leave it floating
  // over a page it was not written for.
  useEffect(() => { setOpen(false) }, [path])

  const close = () => {
    setOpen(false)
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

  if (!open) return null

  const peak = Math.max(...AI.demo.series)
  const pts = AI.demo.series
    .map((v, i) => {
      const x = (i / (AI.demo.series.length - 1)) * 100
      const y = 34 - (v / peak) * 29
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <div className="promo" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}>
      <div className="promo__box" role="dialog" aria-modal="true" aria-labelledby="aipromo-title" ref={dialog}>
        <button type="button" className="promo__close" onClick={close} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <figure className="promo__media promo__media--panel" aria-hidden="true">
          <span className="promo__panel">
            <span className="promo__panel-head">
              <span className="promo__panel-title">{AI.demo.title}</span>
              <span className="promo__panel-sync">{AI.demo.updated}</span>
            </span>
            <svg className="promo__spark" viewBox="0 0 100 36" preserveAspectRatio="none">
              <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="promo__panel-metrics">
              {AI.demo.metrics.map((m) => (
                <span className="promo__metric" key={m.k}>
                  <span className="promo__metric-v">{m.v}</span>
                  <span className="promo__metric-k">{m.k}</span>
                </span>
              ))}
            </span>
          </span>
        </figure>

        <div className="promo__body">
          <p className="promo__eyebrow">{P.eyebrow}</p>
          <h2 className="promo__title" id="aipromo-title">{P.headline}</h2>
          <p className="promo__lead">{P.body}</p>
          <p className="promo__stat">
            <span className="promo__stat-v">{P.statValue}</span>
            <span className="promo__stat-k">{P.statLabel}</span>
          </p>
          <a
            className="btn btn-accent btn-lg promo__cta"
            href={bookHrefFrom('ai-systems')}
            {...bookAttrs}
            onClick={close}
          >
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
