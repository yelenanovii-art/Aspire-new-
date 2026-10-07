import SectionHead from '../components/SectionHead'
import GtmQuiz from '../components/GtmQuiz'
import CTABand from '../components/CTABand'
import { ArrowRight } from '../components/Icons'
import { useJsonLd } from '../hooks/useJsonLd'
import { SITE_URL } from '../config'

export default function GtmQuizPage() {
  useJsonLd('aspire-gtm-quiz', {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Go-to-market readiness check',
    url: `${SITE_URL}/services/go-to-market/quiz/`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    description:
      'Seven questions that score go-to-market readiness out of ten, place a company on the curve from validation to scale, and return three next steps.',
    publisher: { '@id': `${SITE_URL}/#organization` },
  })

  return (
    <>
      <section className="page-hero page-hero--service">
        <div className="container">
          <nav className="crumbs reveal" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <a href="/services/">Services</a>
            <span aria-hidden="true">/</span>
            <a href="/services/go-to-market/">Go-to-market strategy</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Readiness check</span>
          </nav>
          <p className="eyebrow reveal">Free, two minutes</p>
          <h1 className="page-hero__title reveal" style={{ '--delay': '60ms' }}>
            How ready is your go-to-market?
          </h1>
          <p className="lead reveal" style={{ '--delay': '120ms' }}>
            Seven questions about the plan underneath your next launch or new market. You get a
            score out of ten, where you sit on the way to a pipeline that repeats, and the three
            things to do next.
          </p>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container container--narrow">
          <GtmQuiz />
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <SectionHead
            eyebrow="What you get"
            title="Three steps, not a sales call."
            lede="The three things worth doing at the stage you are actually at, built from your seven answers rather than pulled from a template. Yours whether or not you work with us."
            center
          />
          <p className="fit__foot">
            Prefer to talk it through?{' '}
            <a className="link-arrow" href="/contact/">Book the free call instead <ArrowRight /></a>
          </p>
        </div>
      </section>

      <CTABand
        title="Want the plan built properly?"
        body="Fifteen minutes, free. Tell us the market and we will tell you what the plan needs to cover."
        secondary={{ to: '/services/go-to-market/', label: 'See the service' }}
      />
    </>
  )
}
