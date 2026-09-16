import { ArrowRight } from '../components/Icons'
import SectionHead from '../components/SectionHead'
import Stat from '../components/Stat'
import Team from '../components/Team'
import Testimonials from '../components/Testimonials'
import CTABand from '../components/CTABand'
import { bookHref, bookAttrs, COMPANY, SITE_URL } from '../config'
import { VALUES, STATS, TEAM } from '../data/site'
import { useJsonLd } from '../hooks/useJsonLd'

export default function About() {
  useJsonLd('aspire-team', {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.name,
    url: SITE_URL + '/',
    foundingDate: '2022',
    founder: { '@type': 'Person', name: COMPANY.founder },
    employee: TEAM.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role })),
    address: {
      '@type': 'PostalAddress',
      streetAddress: COMPANY.street,
      postalCode: COMPANY.postalCode,
      addressLocality: COMPANY.city,
      addressCountry: COMPANY.countryCode,
    },
  })

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow reveal">About</p>
          <h1 className="page-hero__title reveal" style={{ '--delay': '60ms' }}>
            Four specialists. <em>One plan.</em>
          </h1>
          <p className="lead reveal" style={{ '--delay': '120ms' }}>
            Aspire is a sales and marketing team for B2B tech companies, built in Barcelona
            in 2022. Small enough that you know everyone working on your account, specialised
            enough that nobody is learning on it.
          </p>
        </div>
      </section>

      <section className="section section--ruled">
        <div className="container about-page">
          <div className="about-page__main">
            <h2 className="about-page__h">Why we exist</h2>
            <p>
              Most tech companies reach the same wall. The product works, the founder has
              been carrying sales in the gaps between shipping, and growth needs somebody
              senior owning it full time. Hiring that person takes a quarter. A retainer
              agency puts a junior team behind an account manager.
            </p>
            <p>
              Aspire was founded to be the third option. A small group of specialists who
              take on the whole growth function, sales and marketing together, and start in
              weeks rather than months.
            </p>

            <h2 className="about-page__h">How we work</h2>
            <p>
              We are deliberately a team rather than a single consultant, because the four
              things that drive growth are genuinely different jobs. The person filming your
              content is not the person building your pipeline, and neither of them is the
              one building your dashboard. We work across Europe, which matters more than it
              sounds when the buyer is in Munich and the conference is in Amsterdam.
            </p>
            <p>
              We take on a limited number of clients at a time. If we are not the right fit,
              we say so on the first call rather than sell you a retainer.
            </p>

            <h2 className="about-page__h">What you can expect</h2>
            <ul className="values values--stacked">
              {VALUES.map((v, i) => (
                <li className="reveal" style={{ '--delay': `${i * 60}ms` }} key={v.title}>
                  <h3>{v.title}</h3>
                  <p>{v.body}</p>
                </li>
              ))}
            </ul>
          </div>

          <aside className="about-page__side">
            <div className="side-card reveal">
              <h3>Aspire at a glance</h3>
              <dl className="side-card__dl">
                <div><dt>Founded</dt><dd>2022, Barcelona</dd></div>
                <div><dt>Team</dt><dd>Four specialists</dd></div>
                <div><dt>Coverage</dt><dd>Europe wide</dd></div>
                <div><dt>Focus</dt><dd>B2B tech</dd></div>
                <div><dt>First call</dt><dd>Free, 15 minutes</dd></div>
              </dl>
              <a className="btn btn-accent btn-sm side-card__cta" href={bookHref} {...bookAttrs}>
                Book the call <ArrowRight size={15} />
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionHead
            eyebrow="The team"
            title="The people who will actually do the work."
            lede="You will meet all four. There is no account manager between you and the person running your account."
          />
          <Team />
        </div>
      </section>

      <section className="section section--dark">
        <div className="container">
          <SectionHead eyebrow="Track record" title="Where the numbers stand today." light />
          <div className="stat-grid">
            {STATS.map((s) => (
              <Stat
                key={s.label}
                value={s.value}
                plain={s.plain}
                suffix={s.suffix}
                label={s.label}
                dark
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionHead eyebrow="In their words" title="What clients say afterwards." center />
          <Testimonials />
        </div>
      </section>

      <CTABand
        title="Want to know if we are a fit?"
        body="Fifteen minutes on a call will tell you. No deck, no pitch, no obligation."
        secondary={{ to: '/work', label: 'See the client cases' }}
      />
    </>
  )
}
