import { ArrowRight } from './Icons'
import { ESTATE, AI, TECH } from '../data/verticals'

// The two specialist practices, promoted on the home page.
//
// These sit apart from SERVICES on purpose: the five services are what any
// client buys, whereas these are whole verticals with their own buyers. They
// were previously reachable only from the nav, which buried them.
//
// Each card carries the visual its own page leads with — a photograph for
// property and yachting, the live dashboard shape for AI — rather than two
// identical cards with an icon swapped, so the difference in the work shows
// before the copy is read.
export default function Specialisms() {
  const peak = Math.max(...AI.demo.series)
  const pts = AI.demo.series
    .map((v, i) => {
      const x = (i / (AI.demo.series.length - 1)) * 100
      const y = 32 - (v / peak) * 28
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')

  return (
    <div className="practice-grid practice-grid--three">
      <a className="practice practice--tech reveal" href={`/${TECH.slug}`} data-spot>
        <span className="practice__media practice__media--mark" aria-hidden="true">
          {/* No photograph for this one yet, so a drawn mark rather than
              borrowing a frame that belongs to another page. */}
          <svg viewBox="0 0 64 44" className="practice__chip" role="presentation">
            <rect x="12" y="8" width="40" height="28" rx="4" stroke="currentColor" strokeWidth="2" fill="none" />
            <rect x="22" y="18" width="20" height="8" rx="1.5" stroke="currentColor" strokeWidth="2" fill="none" />
            {[18, 26, 34, 42].map((x) => (
              <g key={x}>
                <path d={`M${x} 8V2`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <path d={`M${x} 36v6`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </g>
            ))}
          </svg>
        </span>
        <span className="practice__body">
          <span className="practice__label">Specialism</span>
          <span className="practice__title">{TECH.cardTitle}</span>
          <span className="practice__blurb">{TECH.cardResult} Most of our client list already sells here.</span>
          <span className="practice__go">
            See how it works <ArrowRight size={16} />
          </span>
        </span>
      </a>

      <a className="practice practice--estate reveal" href={`/${ESTATE.slug}`} data-spot>
        <span className="practice__media" aria-hidden="true">
          {/* Below 860px .practice__media is display:none, and a lazy image that
              can never intersect the viewport is one Chrome gives up on and
              fetches straight away — so the phone was paying 211KB for a
              photograph it never showed, the heaviest asset on the page. A
              media-gated <picture> candidate costs mobile 70 bytes instead.
              Keep the breakpoint in step with the rule that hides the box. */}
          <picture>
            <source
              media="(max-width: 860px)"
              srcSet="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            />
            <img
              src="/media/estate/villa-pool.webp"
              alt=""
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
            />
          </picture>
        </span>
        <span className="practice__body">
          <span className="practice__label">Specialism</span>
          <span className="practice__title">Make a property sell before anyone visits</span>
          <span className="practice__blurb">
            Buyers decide from the listing. Cinematic walkthroughs, drone and on-water
            filming that get the viewing booked.
          </span>
          <span className="practice__go">
            See how it works <ArrowRight size={16} />
          </span>
        </span>
      </a>

      <a className="practice practice--ai reveal" href={`/${AI.slug}`} style={{ '--delay': '80ms' }} data-spot>
        <span className="practice__media practice__media--panel" aria-hidden="true">
          <span className="practice__panel">
            <span className="practice__panel-head">
              <span className="practice__panel-title">{AI.demo.title}</span>
              <span className="practice__panel-sync">{AI.demo.updated}</span>
            </span>
            <svg className="practice__spark" viewBox="0 0 100 34" preserveAspectRatio="none">
              <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="practice__panel-metrics">
              {AI.demo.metrics.slice(0, 2).map((m) => (
                <span className="practice__metric" key={m.k}>
                  <span className="practice__metric-v">{m.v}</span>
                  <span className="practice__metric-k">{m.k}</span>
                </span>
              ))}
            </span>
          </span>
        </span>
        <span className="practice__body">
          <span className="practice__label">Specialism</span>
          <span className="practice__title">Stop rebuilding the same report every month</span>
          <span className="practice__blurb">
            One dashboard across your CRM, inbox and ad accounts, so the numbers are
            there when you need them instead of a day's work away.
          </span>
          <span className="practice__go">
            See how it works <ArrowRight size={16} />
          </span>
        </span>
      </a>
    </div>
  )
}
