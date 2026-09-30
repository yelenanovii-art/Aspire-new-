import { ArrowRight } from './Icons'
import { ESTATE, AI } from '../data/verticals'

// The two specialist practices, promoted on the home page.
//
// These sit apart from SERVICES on purpose: the four disciplines are what any
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
    <div className="spec-grid">
      <a className="spec spec--estate reveal" href={`/${ESTATE.slug}`} data-spot>
        <span className="spec__media" aria-hidden="true">
          <img
            src="/media/estate/villa-pool.webp"
            alt=""
            width="800"
            height="600"
            decoding="async"
          />
        </span>
        <span className="spec__body">
          <span className="spec__label">Specialism</span>
          <span className="spec__title">{ESTATE.nav}</span>
          <span className="spec__blurb">
            Listing photography, cinematic walkthroughs and drone work for property,
            plus on-water filming for charter and brokerage. Shot, cut and posted.
          </span>
          <span className="spec__go">
            See the work <ArrowRight size={16} />
          </span>
        </span>
      </a>

      <a className="spec spec--ai reveal" href={`/${AI.slug}`} style={{ '--delay': '80ms' }} data-spot>
        <span className="spec__media spec__media--panel" aria-hidden="true">
          <span className="spec__panel">
            <span className="spec__panel-head">
              <span className="spec__panel-title">{AI.demo.title}</span>
              <span className="spec__panel-sync">{AI.demo.updated}</span>
            </span>
            <svg className="spec__spark" viewBox="0 0 100 34" preserveAspectRatio="none">
              <polyline points={pts} fill="none" stroke="currentColor" strokeWidth="1.6"
                strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="spec__panel-metrics">
              {AI.demo.metrics.slice(0, 2).map((m) => (
                <span className="spec__metric" key={m.k}>
                  <span className="spec__metric-v">{m.v}</span>
                  <span className="spec__metric-k">{m.k}</span>
                </span>
              ))}
            </span>
          </span>
        </span>
        <span className="spec__body">
          <span className="spec__label">Specialism</span>
          <span className="spec__title">{AI.nav}</span>
          <span className="spec__blurb">
            Custom dashboards, internal tools and integrations built on the data you
            already have, sitting across your CRM, inbox and ad accounts.
          </span>
          <span className="spec__go">
            See what we build <ArrowRight size={16} />
          </span>
        </span>
      </a>
    </div>
  )
}
