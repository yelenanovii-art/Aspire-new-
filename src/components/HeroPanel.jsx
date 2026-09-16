import Sparkline from './Sparkline'
import { PERFORMANCE } from '../data/site'

// The artifact in the hero. A marketing site for tech companies has to look
// like it was built by people who can build things, so the hero carries a real
// readout rather than a stock photo.
export default function HeroPanel() {
  const { leads, engagement, conversion, curve } = PERFORMANCE
  return (
    <figure className="panel reveal" style={{ '--delay': '260ms' }}>
      <figcaption className="panel__head">
        <span className="panel__label">Client performance</span>
        <span className="panel__live">
          <span className="panel__dot" aria-hidden="true" />
          Rolling 30 days
        </span>
      </figcaption>

      <div className="panel__hero-metric">
        <span className="panel__big">{leads.value}</span>
        <span className="panel__big-label">
          {leads.label}
          <em>{leads.note}</em>
        </span>
      </div>

      <div className="panel__chart">
        <Sparkline points={curve} id="hero-spark" />
        <div className="panel__axis" aria-hidden="true">
          <span>Week 1</span>
          <span>Now</span>
        </div>
      </div>

      <dl className="panel__grid">
        {[engagement, conversion].map((m) => (
          <div key={m.label}>
            <dt>{m.label}</dt>
            <dd>{m.value}</dd>
            <span>{m.note}</span>
          </div>
        ))}
      </dl>
    </figure>
  )
}
