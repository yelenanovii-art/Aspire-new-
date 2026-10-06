import SectionHead from '../components/SectionHead'
import CTABand from '../components/CTABand'
import { ArrowRight } from '../components/Icons'
import { useJsonLd } from '../hooks/useJsonLd'
import Todo from '../components/Todo'
import MediaSlot from '../components/MediaSlot'
import { SITE_URL } from '../config'
import { serviceBySlug, logoFor, TESTIMONIALS } from '../data/site'
import { caseDetailFor } from '../data/caseDetail'

// One client engagement, at length.
//
// These existed only as cards on /work, which made them proof but never
// destinations: nothing to rank, nothing to link to, nothing to send a
// prospect who asked "have you done this before in my sector". A card cannot
// carry the part that persuades, which is the problem rather than the result.
//
// Structure is deliberately the same on every one — problem, sequence,
// outcome — so they can be compared rather than admired.
export default function CaseStudy({ c }) {
  const d = caseDetailFor(c.slug) || {}
  const quote = d.quoteName && TESTIMONIALS.find((t) => t.name === d.quoteName)
  const services = c.services.map(serviceBySlug).filter(Boolean)
  const url = `${SITE_URL}/work/${c.slug}`

  // Article rather than a case-study type, which schema.org does not have.
  // `about` names the client as the subject so the page is attached to that
  // organisation as an entity, which is what an assistant needs to answer
  // "who has worked with this company".
  useJsonLd(`aspire-case-${c.slug}`, {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.title,
    description: d.metaDesc || c.body,
    url,
    mainEntityOfPage: url,
    about: { '@type': 'Organization', name: c.client },
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    articleSection: c.sector,
  })

  return (
    <>
      <section className="page-hero page-hero--service">
        <div className="container">
          <nav className="crumbs reveal" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <a href="/work">Work</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{c.client}</span>
          </nav>

          <p className="eyebrow reveal">{c.sector}</p>
          <h1 className="page-hero__title reveal" style={{ '--delay': '60ms' }}>{c.title}</h1>
          {d.summary && (
            <p className="lead reveal" style={{ '--delay': '120ms' }}>{d.summary}</p>
          )}

          <div className="casepage__facts reveal" style={{ '--delay': '180ms' }}>
            <div className="casepage__fact">
              <span className="casepage__fact-v">{c.metric}{c.metricSuffix}</span>
              <span className="casepage__fact-k">{c.metricLabel}</span>
            </div>
            <div className="casepage__fact">
              <span className="casepage__fact-v casepage__fact-v--sm">{c.client}</span>
              <span className="casepage__fact-k">{c.sector}</span>
            </div>
          </div>

          {logoFor(c.client) && (
            <img className="casepage__logo reveal" src={logoFor(c.client)} alt={c.client}
                 height="38" style={{ '--delay': '220ms' }} />
          )}
        </div>
      </section>

      {d.photoTodo && (
        <section className="section section--flush-top section--tight">
          <div className="container">
            <MediaSlot ratio="16 / 9" label={d.photoTodo.label} hint={d.photoTodo.hint} />
          </div>
        </section>
      )}

      {d.challenge && (
        <section className="section section--ruled">
          <div className="container container--narrow">
            <SectionHead eyebrow="The problem" title="What they were up against." />
            <p className="casepage__prose reveal">{d.challenge}</p>
          </div>
        </section>
      )}

      {d.approach?.length > 0 && (
        <section className="section section--alt">
          <div className="container container--narrow">
            <SectionHead eyebrow="What we did" title="The sequence." />
            <ol className="casepage__steps">
              {d.approach.map((a, i) => (
                <li className="casepage__step reveal" key={a.h} style={{ '--delay': `${i * 70}ms` }}>
                  <span className="casepage__step-n">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{a.h}</h3>
                    <p>{a.p}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {d.outcome?.length > 0 && (
        <section className="section section--ruled">
          <div className="container container--narrow">
            <SectionHead eyebrow="What it produced" title="The result." />
            <ul className="casepage__outcome">
              {d.outcome.map((o, i) => (
                <li className="reveal" key={o} style={{ '--delay': `${i * 60}ms` }}>
                  <Todo text={o} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {quote && (
        <section className="section section--alt">
          <div className="container container--narrow">
            <figure className="casepage__quote reveal">
              <blockquote>{quote.quote}</blockquote>
              <figcaption>
                <strong>{quote.name}</strong>
                {quote.role && <span>{quote.role}</span>}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      <section className="section section--ruled">
        <div className="container container--narrow">
          <SectionHead eyebrow="Services used" title="What this was built from." />
          <ul className="casepage__svcs">
            {services.map((s) => (
              <li className="reveal" key={s.slug}>
                <a href={`/services/${s.slug}`}>
                  <span>{s.nav}</span>
                  <ArrowRight size={15} />
                </a>
              </li>
            ))}
          </ul>
          <p className="casepage__back reveal">
            <a className="link-arrow" href="/work">All client cases <ArrowRight size={15} /></a>
          </p>
        </div>
      </section>

      <CTABand
        title={`Have a problem like ${c.client}'s?`}
        body="Tell us where growth is stuck and we will come back with a plan, whether or not you run it with us. Fifteen minutes, free."
        // A conference engagement should offer the practice that ran it; the
        // quiz is the right fallback only when nothing more specific fits.
        secondary={
          c.services.includes('events')
            ? { to: '/services/events', label: 'See the events service' }
            : { to: '/fit', label: 'Not sure? Find your match' }
        }
        from={`case-${c.slug}`}
      />
    </>
  )
}
