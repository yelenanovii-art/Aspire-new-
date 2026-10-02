import { useEffect, useRef, useState } from 'react'
import { ONSITE } from '../data/site'

// Continuous photo marquee, built the same way as the client logo strip.
//
// This replaced a scroll-snap container that stepped one card every few
// seconds on a timer. That version kept stopping for reasons nobody could see:
// an IntersectionObserver that had to fire first, a wheel handler that treated
// scrolling past as interaction, a hover pause that froze it exactly while
// someone looked at it, and a reduced-motion guard that disabled it outright.
// Three rounds of fixes and it still read as static, because even working it
// sat still for most of every interval.
//
// A CSS animation on a duplicated track has none of those failure modes. There
// is no JavaScript to not run, no observer to miss, and nothing to pause it by
// accident. It is also what the logos above already do, which is what makes the
// two strips feel like one page.
// The strip sits over 7000px below the fold on a phone, yet Chrome fetched all
// fifteen photographs during the initial load anyway — loading="lazy" is a
// hint, and something about a max-content track under an infinite animation
// stops it applying. That was 484KB of decoration, about 63% of the page,
// competing with everything above it.
//
// So the src is withheld until the strip is actually near. The CSS animation
// is untouched: this gates bytes, not motion. A failsafe arms it regardless
// after a few seconds, because an empty strip is far worse than a slow one,
// and no observer means arm immediately rather than never.
export default function Carousel() {
  const host = useRef(null)
  const [armed, setArmed] = useState(false)

  useEffect(() => {
    if (armed) return undefined
    const el = host.current
    if (!el || !('IntersectionObserver' in window)) {
      setArmed(true)
      return undefined
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setArmed(true)
          io.disconnect()
        }
      },
      // Start fetching a screen early so the photographs are there by the
      // time the strip is, rather than popping in under the reader.
      { rootMargin: '700px 0px' }
    )
    io.observe(el)
    const failsafe = window.setTimeout(() => setArmed(true), 6000)
    return () => {
      io.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [armed])

  return (
    <div className="onsite" ref={host}>
      <div className="onsite__track">
        {[0, 1].map((dup) => (
          <ul
            className="onsite__group"
            key={dup}
            // The second copy exists only so the loop has somewhere to go.
            aria-hidden={dup === 1}
            aria-label={dup === 0 ? 'Photographs of the team working onsite' : undefined}
          >
            {ONSITE.map((p) => (
              <li className="onsite__item" key={`${dup}-${p.src}`}>
                <img
                  src={armed ? p.src : undefined}
                  // Each item is 210px wide on a phone and 280px on a desktop,
                  // so a 600px file is two to three times the pixels a common
                  // 2x phone can show. The pair lets the browser do that sum
                  // itself: 2x mobile and 1x desktop take the 420, 3x mobile
                  // and 2x desktop take the 600. Fifteen photographs, so it is
                  // the heaviest block on the page by a wide margin.
                  srcSet={
                    armed ? `${p.src.replace('.webp', '-420.webp')} 420w, ${p.src} 600w` : undefined
                  }
                  sizes="(max-width: 860px) 210px, 280px"
                  alt={dup === 0 ? p.alt : ''}
                  // No loading="lazy" here. The arming above already does the
                  // deferring, and lazy on top of it kept the photographs that
                  // are off to the side of the strip unloaded — they would
                  // then travel into view blank as the marquee came round.
                  // Once the strip is near, all of them are wanted.
                  width="600"
                  height="800"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
