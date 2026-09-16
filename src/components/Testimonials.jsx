import { useEffect, useState } from 'react'
import { TESTIMONIALS } from '../data/site'

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

  const t = TESTIMONIALS[i]

  return (
    <figure
      className={`quote ${light ? 'quote--light' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <blockquote key={i} className="quote__text">{t.quote}</blockquote>
      <figcaption className="quote__by">
        <span className="quote__avatar" aria-hidden="true">{t.initials}</span>
        <span className="quote__meta">
          <strong>{t.name}</strong>
          <span>Client of Aspire</span>
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
