import { ArrowRight } from './Icons'
import { serviceBySlug } from '../data/site'

// A client case, used on the home page, /work and the service pages.
//
// `compact` drops the body copy (for three-up rows alongside other content);
// `showServices` adds the "which services did this" links. The service links
// live inside the card rather than beside it so every card in a row ends at the
// same height — outside, a card whose tags wrapped to three lines pulled its
// own body shorter than its neighbours'.
export default function CaseCard({ c, i = 0, compact = false, showServices = false }) {
  return (
    <article
      className={`case-card ${compact ? 'case-card--compact' : ''} reveal`}
      data-spot
      style={{ '--delay': `${i * 70}ms` }}
      id={compact ? undefined : c.slug}
    >
      <div className="case-card__top">
        <span className="case-card__client">{c.client}</span>
        <span className="case-card__sector">{c.sector}</span>
      </div>

      <h3 className="case-card__title">{c.title}</h3>
      {!compact && <p className="case-card__body">{c.body}</p>}

      <div className="case-card__metric">
        <span className="case-card__metric-value">{c.metric}{c.metricSuffix}</span>
        <span className="case-card__metric-label">{c.metricLabel}</span>
      </div>

      <div className="case-card__foot">
        {/* The one-line result only earns its place on compact cards, where the
            body copy is hidden. On the full card it restates the body and the
            metric directly above it. */}
        {compact && <span className="case-card__result">{c.result}</span>}
        <a className="link-arrow case-card__cta" href="/contact">
          Start yours <ArrowRight size={15} />
        </a>
      </div>

      {showServices && (
        <ul className="case-card__svcs">
          {c.services.map((slug) => {
            const svc = serviceBySlug(slug)
            return svc ? (
              <li key={slug}>
                <a href={`/services/${svc.slug}`}>{svc.nav}</a>
              </li>
            ) : null
          })}
        </ul>
      )}
    </article>
  )
}
