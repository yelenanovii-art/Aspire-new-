import { useEffect, useState } from 'react'
import { TESTIMONIALS } from '../data/site'

// A client quote set at display size in the wordmark's Didone.
//
// This is the one place the brand serif returns at scale, and it deliberately
// has no card around it: after four sections of bordered boxes, a full bleed
// editorial quote resets the page's rhythm. The mark is a real glyph rather
// than a background image so it inherits the face and stays crisp.
export default function PullQuote() {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 8000)
    return () => clearInterval(id)
  }, [])

  const t = TESTIMONIALS[i]

  return (
    <figure className="pull">
      <blockquote key={i} className="pull__text">{t.short || t.quote}</blockquote>
      <figcaption className="pull__by">
        <span className="pull__rule" aria-hidden="true" />
        <span className="pull__name">{t.name}</span>
        <span className="pull__role">{t.role}</span>
      </figcaption>
      <div className="pull__dots" role="tablist" aria-label="Client testimonials">
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
