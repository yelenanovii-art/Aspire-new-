import { ArrowRight, Check } from '../components/Icons'
import SectionHead from '../components/SectionHead'
import CTABand from '../components/CTABand'
import Faq from '../components/Faq'
import { SERVICES, STEPS } from '../data/site'

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow reveal">Services</p>
          <h1 className="page-hero__title reveal" style={{ '--delay': '60ms' }}>
            A full sales and marketing team. <em>Without hiring one.</em>
          </h1>
          <p className="lead reveal" style={{ '--delay': '120ms' }}>
            Four services, run together or on their own. Most clients start with one and
            expand once it is producing. RCK Consulting started with a website and now runs
            four workstreams with us.
          </p>
        </div>
      </section>

      <section className="section section--ruled">
        <div className="container">
          <div className="svc-cards">
            {SERVICES.map((s, i) => (
              <article className="svc-card reveal" data-spot style={{ '--delay': `${i * 70}ms` }} key={s.slug}>
                <span className="svc-card__n">{s.n}</span>
                <h2 className="svc-card__title">{s.title}</h2>
                <p className="svc-card__blurb">{s.blurb}</p>
                <ul className="svc-card__list">
                  {s.includes.map((inc) => (
                    <li key={inc.h}><Check size={15} /> {inc.h}</li>
                  ))}
                </ul>
                <a className="link-arrow svc-card__cta" href={`/services/${s.slug}`}>
                  {s.title} in detail <ArrowRight />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container approach__layout">
          <div className="approach__intro">
            <SectionHead
              eyebrow="How it works"
              title="The same four steps, whichever service you start with."
              lede="No long onboarding, no discovery phase you pay for. The first call is free and the strategy comes before the invoice."
            />
          </div>
          <ol className="steps">
            {STEPS.map((s, i) => (
              <li className="step reveal" style={{ '--delay': `${i * 70}ms` }} key={s.n}>
                <span className="step__n">{s.n}</span>
                <div className="step__body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionHead eyebrow="Questions" title="Choosing where to start." center />
          <Faq
            idPrefix="services-faq"
            items={[
              {
                q: 'Which service should we start with?',
                a: 'If nobody knows who you are, business development. If they know you but nothing is converting, sales. If the pipeline works but the brand is quiet, social and content. The free call exists to answer exactly this.',
              },
              {
                q: 'Can we run more than one at once?',
                a: 'Yes, and they work better together. The content fills the social calendar, the social warms the outreach, and the outreach closes. That is how the RCK Consulting engagement runs.',
              },
              {
                q: 'Are these fixed packages?',
                a: 'No. Scope is built around what you actually need after the discovery call, not picked off a pricing page.',
              },
              {
                q: 'How long is a typical engagement?',
                a: 'Project work can be a few weeks; the ongoing services are where it compounds. SilTest ran for two years and ISE for a full event year.',
              },
            ]}
          />
        </div>
      </section>

      <CTABand
        title="Not sure which one you need?"
        body="That is exactly what the free 15 minute call is for. We will tell you where we would start, and say so if it is not us."
      />
    </>
  )
}
