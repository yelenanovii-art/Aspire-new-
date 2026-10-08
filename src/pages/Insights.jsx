import SectionHead from '../components/SectionHead'
import CTABand from '../components/CTABand'
import { ArrowRight } from '../components/Icons'
import { useJsonLd } from '../hooks/useJsonLd'
import { SITE_URL } from '../config'
import { INSIGHTS_BY_DATE } from '../data/insights'

const fmt = (iso) =>
  new Date(iso + 'T00:00:00Z').toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC',
  })

// The index. Deliberately a short list rather than a paginated feed: six
// pieces that each answer a question a prospect has actually asked beats a
// stream nobody finishes, and it is the honest shape for a four person team
// that writes when it has something to say.
export default function Insights() {
  const [lead, ...rest] = INSIGHTS_BY_DATE

  useJsonLd('aspire-insights-list', {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Insights',
    url: `${SITE_URL}/insights/`,
    description:
      'Written pieces on B2B sales, social for technical audiences, trade shows, CRM and market entry, from the engagements we run.',
    publisher: { '@id': `${SITE_URL}/#organization` },
    hasPart: INSIGHTS_BY_DATE.map((a) => ({
      '@type': 'Article',
      headline: a.title,
      url: `${SITE_URL}/insights/${a.slug}/`,
      datePublished: a.date,
      description: a.dek,
    })),
  })

  return (
    <>
      <section className="page-hero page-hero--insights">
        <div className="container page-hero__inner">
          <p className="eyebrow">Insights</p>
          <h1 className="page-hero__title">What we have learned doing the work.</h1>
          <p className="page-hero__lead">
            Six pieces, each answering a question a client actually asked us. Every number
            quoted is from one of our own engagements. We would rather write six things worth
            reading than twenty that rank.
          </p>
        </div>
      </section>

      {/* The newest piece leads, and the rest sit in a grid under it.
          A single column of six identical entries said nothing about which
          one to read and left the right half of the page empty. */}
      <section className="section section--flush-top">
        <div className="container">
          <article className="postlead reveal">
            <a className="postlead__link" href={`/insights/${lead.slug}/`}>
              <span className="sr-only">Read {lead.title}</span>
            </a>
            <p className="postlead__kicker">Latest</p>
            <div className="posts__meta">
              <time dateTime={lead.date}>{fmt(lead.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{lead.minutes} min read</span>
            </div>
            <h2 className="postlead__title">{lead.title}</h2>
            <p className="postlead__dek">{lead.dek}</p>
            <ul className="posts__tags posts__tags--dark">
              {lead.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
            <span className="postlead__go" aria-hidden="true">
              Read it <ArrowRight size={16} />
            </span>
          </article>

          <ul className="postgrid">
            {rest.map((a, i) => (
              <li className="postcard reveal" key={a.slug} style={{ '--delay': `${i * 60}ms` }}>
                <a className="postcard__link" href={`/insights/${a.slug}/`}>
                  <span className="sr-only">Read {a.title}</span>
                </a>
                <div className="posts__meta">
                  <time dateTime={a.date}>{fmt(a.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{a.minutes} min read</span>
                </div>
                <h3 className="postcard__title">{a.title}</h3>
                <p className="postcard__dek">{a.dek}</p>
                <ul className="posts__tags">
                  {a.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <span className="postcard__go" aria-hidden="true"><ArrowRight size={15} /></span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <SectionHead
            eyebrow="Rather skip the reading"
            title="Six questions, and we will tell you where to start."
            lede="If you would rather not work out which of these applies to you, the fit check does it in two minutes and shows you a ninety day plan on the spot."
            center
          />
          <p className="fit__foot">
            <a className="link-arrow" href="/fit/">Find your match <ArrowRight /></a>
          </p>
        </div>
      </section>

      <CTABand
        title="Something here sound familiar?"
        body="Tell us where growth is stuck and we will come back with a plan, whether or not you run it with us. Fifteen minutes, free."
        secondary={{ to: '/work/', label: 'See the client cases' }}
        from="insights"
      />
    </>
  )
}
