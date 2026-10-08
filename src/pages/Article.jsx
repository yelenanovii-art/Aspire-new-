import CTABand from '../components/CTABand'
import { ArrowRight } from '../components/Icons'
import { useJsonLd } from '../hooks/useJsonLd'
import { SITE_URL, COMPANY } from '../config'
import { serviceBySlug, caseBySlug } from '../data/site'
import Share from '../components/Share'
import { AUTHOR } from '../data/insights'
import { INSIGHTS_BY_DATE } from '../data/insights'

const fmt = (iso) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })

// One piece. Narrow measure, no sidebar, nothing between the reader and the
// text — these are long enough that anything in the margin is a reason to
// stop. The related links sit at the end, where someone who finished is the
// one most worth sending somewhere.
export default function Article({ slug }) {
  const a = INSIGHTS_BY_DATE.find((x) => x.slug === slug)
  if (!a) return null

  const url = `${SITE_URL}/insights/${a.slug}/`
  const services = (a.related?.services || []).map(serviceBySlug).filter(Boolean)
  const cases = (a.related?.cases || []).map(caseBySlug).filter(Boolean)
  const more = INSIGHTS_BY_DATE.filter((o) => o.slug !== a.slug).slice(0, 2)

  useJsonLd(`aspire-article-${a.slug}`, {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: a.title,
    description: a.dek,
    url,
    mainEntityOfPage: url,
    datePublished: a.date,
    dateModified: a.date,
    wordCount: [a.intro, ...a.sections.flatMap((s) => s.p)].join(' ').split(/\s+/).length,
    keywords: a.tags.join(', '),
    // A Person, not the organisation. An article with no human author is the
    // signature of content nobody stands behind.
    author: {
      '@type': 'Person',
      name: AUTHOR.name,
      jobTitle: AUTHOR.role,
      url: SITE_URL + AUTHOR.url,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
  })

  return (
    <>
      <section className="page-hero page-hero--article">
        <div className="container container--narrow">
          <nav className="crumbs reveal" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <a href="/insights/">Insights</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{a.title}</span>
          </nav>

          <div className="posts__meta reveal">
            <time dateTime={a.date}>{fmt(a.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{a.minutes} min read</span>
            <span aria-hidden="true">·</span>
            <span>By {AUTHOR.name}</span>
            <span aria-hidden="true">·</span>
            <span>{COMPANY.name}</span>
          </div>

          <h1 className="article__title reveal" style={{ '--delay': '60ms' }}>{a.title}</h1>
          <p className="article__dek reveal" style={{ '--delay': '120ms' }}>{a.dek}</p>
        </div>
      </section>

      <article className="section section--flush-top">
        <div className="container container--narrow">
          <p className="article__intro reveal">{a.intro}</p>

          {a.sections.map((s, i) => (
            <section className="article__sec reveal" key={s.h} style={{ '--delay': `${i * 40}ms` }}>
              <h2>{s.h}</h2>
              {s.p.map((para) => <p key={para.slice(0, 40)}>{para}</p>)}
            </section>
          ))}

          {a.takeaway && (
            <aside className="article__takeaway reveal">
              <span className="article__takeaway-k">In short</span>
              <p>{a.takeaway}</p>
            </aside>
          )}

          {(services.length > 0 || cases.length > 0) && (
            <div className="article__related reveal">
              {services.length > 0 && (
                <div>
                  <h3>What this is part of</h3>
                  <ul>
                    {services.map((s) => (
                      <li key={s.slug}>
                        <a href={`/services/${s.slug}/`}>{s.nav} <ArrowRight size={14} /></a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {cases.length > 0 && (
                <div>
                  <h3>Where we did it</h3>
                  <ul>
                    {cases.map((c) => (
                      <li key={c.slug}>
                        <a href={`/work/${c.slug}/`}>{c.client} <ArrowRight size={14} /></a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          <nav className="article__more reveal" aria-label="More insights">
            <h3>Read next</h3>
            <ul>
              {more.map((o) => (
                <li key={o.slug}>
                  <a href={`/insights/${o.slug}/`}>
                    <span>{o.title}</span>
                    <ArrowRight size={15} />
                  </a>
                </li>
              ))}
            </ul>
            <p><a className="link-arrow" href="/insights/">All insights <ArrowRight size={15} /></a></p>
          </nav>
        </div>
      </article>

      {/* Three ways to pass it on, which is how a B2B piece actually travels:
          LinkedIn for the public share, WhatsApp for the one that gets sent to
          a colleague, and a copied link for everything else. No third party
          share widget, so nothing is loaded and nobody is tracked. */}
      <section className="section section--tight section--flush-top">
        <div className="container container--narrow">
          <Share url={url} title={a.title} />
        </div>
      </section>

      {/* Who wrote it, at the end, where somebody who read it will want to
          know. */}
      <section className="section section--tight">
        <div className="container container--narrow">
          <aside className="byline reveal">
            <img className="byline__photo" src={AUTHOR.photo} alt="" width="72" height="90" loading="lazy" decoding="async" />
            <div>
              <p className="byline__name">{AUTHOR.name}</p>
              <p className="byline__role">{AUTHOR.role}</p>
              <p className="byline__bio">{AUTHOR.bio}</p>
              <a className="link-arrow" href={AUTHOR.url}>More about the team <ArrowRight size={15} /></a>
            </div>
          </aside>
        </div>
      </section>

      <CTABand
        title="Want this applied to your company?"
        body="Fifteen minutes, free. Tell us where growth is stuck and we will come back with a plan, whether or not you run it with us."
        secondary={
          (a.related?.services || []).includes('events')
            ? { to: '/services/events/', label: 'See the events service' }
            : { to: '/fit/', label: 'Or answer six questions' }
        }
        from={`insight-${a.slug}`}
      />
    </>
  )
}
