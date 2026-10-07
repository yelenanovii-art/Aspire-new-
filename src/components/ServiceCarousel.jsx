import { useCallback, useEffect, useRef, useState } from 'react'
import { ArrowRight } from './Icons'
import { SERVICES } from '../data/site'

const INTERVAL = 4500

// The six services as a stack of cards, one in focus and the rest peeking
// behind it.
//
// The stack is the point: a list says "here are five things", a stack says
// "there is more behind this one", which is what makes someone wait for the
// next card instead of scrolling past. Only the three nearest are rendered as
// visible layers — beyond that they are behind each other and cost paint for
// nothing.
//
// Auto-advance stops on hover, on touch, on focus inside, and whenever the tab
// is hidden. Under reduced motion it never starts: the controls are the only
// way through, which is the honest reading of the setting.
export default function ServiceCarousel() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = SERVICES.length
  const host = useRef(null)
  const touch = useRef(null)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduce(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const go = useCallback((d) => setI((v) => (v + d + n) % n), [n])

  useEffect(() => {
    if (paused || reduce) return undefined
    const t = window.setInterval(() => setI((v) => (v + 1) % n), INTERVAL)
    return () => window.clearInterval(t)
  }, [paused, reduce, n])

  // A timer running against a tab nobody is looking at just burns battery and
  // means the card has silently moved on when they come back.
  useEffect(() => {
    const onVis = () => setPaused(document.hidden)
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  const onTouchStart = (e) => { touch.current = e.touches[0].clientX; setPaused(true) }
  const onTouchEnd = (e) => {
    if (touch.current == null) return
    const dx = e.changedTouches[0].clientX - touch.current
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
    touch.current = null
  }

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
  }

  return (
    <div
      className="svcx"
      ref={host}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onKeyDown={onKeyDown}
    >
      <div className="svcx__stage" role="group" aria-roledescription="carousel" aria-label="Our services">
        {SERVICES.map((s, idx) => {
          // Distance forward from the focused card, wrapped, so the stack
          // keeps its shape as the index loops.
          const d = (idx - i + n) % n
          const visible = d <= 2
          return (
            <article
              className={`svcx__card ${d === 0 ? 'is-front' : ''}`}
              key={s.slug}
              data-depth={d}
              aria-hidden={d !== 0}
              hidden={!visible}
              style={{ '--d': d }}
            >
              <div className="svcx__text">
                <p className="svcx__n">{s.n}</p>
                <h3 className="svcx__title">{s.title}</h3>
                <p className="svcx__benefit">{s.blurb}</p>
                <ul className="svcx__points">
                  {s.includes.slice(0, 3).map((inc) => <li key={inc.h}>{inc.h}</li>)}
                </ul>
                <a className="svcx__more" href={`/services/${s.slug}`} tabIndex={d === 0 ? 0 : -1}>
                  <span aria-hidden="true">Learn more</span>
                  <span className="sr-only">Learn more about {s.title}</span>
                  <ArrowRight size={15} />
                </a>
              </div>

              {/* The right half used to be white space. It now carries the
                  service's own photograph, which is also what makes one card
                  distinguishable from the next at a glance — five near
                  identical text panels was the thing that read as cheap. */}
              {s.photo && (
                <div className="svcx__media" aria-hidden="true">
                  <img
                    src={s.photo.src}
                    srcSet={`${s.photo.src.replace(/\.webp$/, '-480.webp')} 480w, ${s.photo.src.replace(/\.webp$/, '-760.webp')} 760w, ${s.photo.src} ${s.photo.w || 1920}w`}
                    sizes="(max-width: 860px) 92vw, 46vw"
                    alt=""
                    loading={d === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                  <span className="svcx__ghost">{s.n}</span>
                </div>
              )}
            </article>
          )
        })}
      </div>

      <div className="svcx__controls">
        <button type="button" className="svcx__arrow" onClick={() => go(-1)} aria-label="Previous service">
          <ArrowRight size={17} />
        </button>
        <ul className="svcx__dots">
          {SERVICES.map((s, idx) => (
            <li key={s.slug}>
              <button
                type="button"
                className={idx === i ? 'is-on' : ''}
                aria-label={s.title}
                aria-current={idx === i}
                onClick={() => setI(idx)}
              />
            </li>
          ))}
        </ul>
        <button type="button" className="svcx__arrow" onClick={() => go(1)} aria-label="Next service">
          <ArrowRight size={17} />
        </button>
      </div>

      {/* The card changes without the page moving, so a screen reader needs
          telling. Polite: it should not interrupt. */}
      <p className="sr-only" aria-live="polite">
        {SERVICES[i].title}, {i + 1} of {n}
      </p>
    </div>
  )
}
