import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight } from './Icons'
import { ONSITE } from '../data/site'

// Horizontal photo carousel.
//
// The track is a real scroll container with scroll-snap, so touch and trackpad
// swiping is the browser's own: no drag maths, no passive-listener fights, and
// it keeps working if the JavaScript never runs. The buttons scroll it
// programmatically for mouse and keyboard users, and are hidden from assistive
// tech because the list is already reachable by scrolling and tabbing.
export default function Carousel() {
  const ref = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    update()
    el.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [update])

  const nudge = (dir) => {
    const el = ref.current
    if (!el) return
    // Move by one card plus its gap, so a press always lands on a snap point.
    const card = el.querySelector('.onsite__item')
    const step = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' })
  }

  return (
    <div className="onsite">
      <ul className="onsite__track" ref={ref} tabIndex={0} aria-label="Photographs of the team working onsite">
        {ONSITE.map((p) => (
          <li className="onsite__item" key={p.src}>
            <figure>
              <img src={p.src} alt={p.alt} loading="lazy" width="1000" height="1333" />
              <figcaption>{p.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="onsite__nav">
        <button type="button" className="onsite__btn" onClick={() => nudge(-1)} disabled={atStart} aria-label="Previous photographs">
          <span className="onsite__arrow onsite__arrow--back"><ArrowRight size={18} /></span>
        </button>
        <button type="button" className="onsite__btn" onClick={() => nudge(1)} disabled={atEnd} aria-label="More photographs">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
