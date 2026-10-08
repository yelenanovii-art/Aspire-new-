import { useEffect, useState } from 'react'
import { TESTIMONIALS, logoFor } from '../data/site'
import { useSwipe } from '../hooks/useSwipe'
import { logoWidth } from '../lib/logoSize'

// Rotating client quotes. Auto-advance is suppressed under reduced motion,
// and pauses while the reader is hovering or has focus inside the panel.
export default function Testimonials({ light = false }) {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 6000)
    return () => clearInterval(id)
  }, [paused])

  const n = TESTIMONIALS.length
  // The dots were the only way to move this, which on a phone is a 10px
  // target. They stay as the position indicator; the swipe is the control.
  const swipe = useSwipe(
    () => setI((v) => (v + 1) % n),
    () => setI((v) => (v - 1 + n) % n)
  )

  const t = TESTIMONIALS[i]

  return (
    <figure
      className={`quote ${light ? 'quote--light' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      {...swipe}
    >
      {/* All three are rendered, stacked in one grid cell, with the inactive
          ones faded out. Trimming them to a similar length gets the line
          counts close, but only reserving the tallest guarantees the panel
          never resizes mid-rotation — at any width, on any wrap. */}
      <div className="quote__stage">
        {TESTIMONIALS.map((item, idx) => (
          <blockquote
            key={item.name}
            className={`quote__text ${idx === i ? 'is-on' : ''}`}
            aria-hidden={idx !== i}
          >
            {item.quote}
          </blockquote>
        ))}
      </div>
      <figcaption className="quote__by">
        {logoFor(t.company) ? (
          <img className="quote__logo" width={logoWidth(t.company, 24)} src={logoFor(t.company)} alt={t.company}
               height="24" loading="lazy" decoding="async" />
        ) : (
          <span className="quote__avatar" aria-hidden="true">{t.initials}</span>
        )}
        <span className="quote__meta">
          {/* "Client of Aspire" under every quote said nothing a reader did not
              already know. A role and a company is what turns a quote into
              evidence rather than decoration. */}
          <strong>{t.name}</strong>
          <span>
            {t.role}
            {t.company && t.company !== t.name && !t.role.includes(t.company)
              ? ', ' + t.company
              : ''}
          </span>
        </span>
      </figcaption>
      <div className="quote__dots" role="tablist" aria-label="Client testimonials">
        {TESTIMONIALS.map((item, idx) => (
          <button
            key={item.name}
            type="button"
            role="tab"
            className={idx === i ? 'is-active' : ''}
            aria-label={`Show testimonial from ${item.name}`}
            aria-selected={idx === i}
            onClick={() => setI(idx)}
          />
        ))}
      </div>
    </figure>
  )
}
