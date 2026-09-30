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

  // ── Auto-advance ──────────────────────────────────────────────────────────
  // Steps one card at a time rather than scrolling continuously, so it always
  // rests on a snap point and never leaves a photo half cut off. It stops for
  // anything that reads as intent — hover, focus, touch, a manual scroll — and
  // never starts at all under reduced motion.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Reduce Motion used to stop this dead. That reads the preference too
    // literally: it asks for less ANIMATION, and a strip of photographs that
    // never changes is not what someone wants either. So it still advances,
    // but cuts between frames instead of sliding, and waits longer between
    // them. Hover, focus and the arrows still pause and drive it, which is the
    // control WCAG asks for on anything that moves by itself.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let timer = null
    let paused = false
    // Starts true, not false. Gating the start on the observer firing means a
    // missed or unsupported callback leaves the strip permanently still; this
    // way the observer can only ever pause it.
    let onScreen = true

    const step = () => {
      if (paused || !onScreen || document.hidden) return
      const card = el.querySelector('.onsite__item')
      const dx = card ? card.getBoundingClientRect().width + 16 : el.clientWidth * 0.8
      const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8
      // Loop back rather than stopping dead at the last frame.
      el.scrollTo({
        left: end ? 0 : el.scrollLeft + dx,
        behavior: reduceMotion ? 'auto' : 'smooth',
      })
    }

    const start = () => {
      if (timer) return
      timer = window.setInterval(step, reduceMotion ? 6000 : 3800)
    }
    const stop = () => {
      window.clearInterval(timer)
      timer = null
    }

    const pause = () => {
      paused = true
      stop()
    }
    const resume = () => {
      paused = false
      if (onScreen) start()
    }

    // Off-screen it should not run at all: a timer scrolling something nobody
    // can see is wasted work and fights the reader when they arrive.
    const io = new IntersectionObserver(
      ([e]) => {
        onScreen = e.isIntersecting
        if (onScreen && !paused) start()
        else stop()
      },
      { threshold: 0.25 }
    )
    io.observe(el)
    start()

    // A manual scroll means the reader is driving. Hand it back and wait.
    let idle
    const onManual = () => {
      pause()
      window.clearTimeout(idle)
      idle = window.setTimeout(resume, 6000)
    }

    el.addEventListener('pointerenter', pause)
    el.addEventListener('pointerleave', resume)
    el.addEventListener('focusin', pause)
    el.addEventListener('focusout', resume)
    el.addEventListener('touchstart', onManual, { passive: true })
    el.addEventListener('wheel', onManual, { passive: true })
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : resume()))

    return () => {
      stop()
      io.disconnect()
      window.clearTimeout(idle)
      el.removeEventListener('pointerenter', pause)
      el.removeEventListener('pointerleave', resume)
      el.removeEventListener('focusin', pause)
      el.removeEventListener('focusout', resume)
      el.removeEventListener('touchstart', onManual)
      el.removeEventListener('wheel', onManual)
    }
  }, [])

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
            {/* No visible caption: the alt text still describes each frame for
                screen readers and search, but the strip reads as photography
                rather than a labelled contact sheet. */}
            <img src={p.src} alt={p.alt} loading="lazy" width="1000" height="1333" />
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
