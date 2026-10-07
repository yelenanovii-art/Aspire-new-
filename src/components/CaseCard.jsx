import { ArrowRight } from './Icons'
import { logoWidth } from '../lib/logoSize'
import { serviceBySlug, logoFor } from '../data/site'
import { caseDetailFor } from '../data/caseDetail'

// A client case, used on the home page, /work and the service pages.
//
// `compact` drops the body copy (for three-up rows alongside other content);
// `showServices` adds the "which services did this" links. The service links
// live inside the card rather than beside it so every card in a row ends at the
// same height — outside, a card whose tags wrapped to three lines pulled its
// own body shorter than its neighbours'.
export default function CaseCard({ c, i = 0, compact = false, showServices = false }) {
  // The card used to end in "Start yours", pointing at /contact. On a page
  // that already carries its own call to action that was a second, weaker one
  // competing with it — and it threw away the more useful click, which is the
  // reader wanting to know what actually happened. Where the engagement has a
  // page, the card leads there instead.
  const hasPage = Boolean(caseDetailFor(c.slug))
  return (
    <article
      className={`case-card ${compact ? 'case-card--compact' : ''} reveal`}
      data-spot
      style={{ '--delay': `${i * 70}ms` }}
      id={compact ? undefined : c.slug}
    >
      <div className="case-card__top">
        {logoFor(c.client) ? (
          // The mark identifies the client faster than the name does; the name
          // stays as the accessible label rather than being dropped.
          <img className="case-card__logo" width={logoWidth(c.client, 22)} src={logoFor(c.client)} alt={c.client}
               height="22" loading="lazy" decoding="async" />
        ) : (
          <span className="case-card__client">{c.client}</span>
        )}
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
        <a
          className="link-arrow case-card__cta"
          href={hasPage ? `/work/${c.slug}` : '/contact'}
        >
          {/* Eight "Read the case" links on /work are eight identical links in
              a screen reader's list. The visible label stays short; the
              accessible one names the client. */}
          <span aria-hidden="true">{hasPage ? 'Read the case' : 'Start yours'}</span>
          <span className="sr-only">{hasPage ? `Read the ${c.client} case` : `Start yours, like ${c.client}`}</span>
          <ArrowRight size={15} />
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
