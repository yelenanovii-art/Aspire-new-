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
export default function Carousel() {
  return (
    <div className="onsite">
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
                  src={p.src}
                  alt={dup === 0 ? p.alt : ''}
                  loading="lazy"
                  width="1000"
                  height="1333"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}
