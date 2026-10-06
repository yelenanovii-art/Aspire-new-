import SectionHead from '../components/SectionHead'
import Quiz from '../components/Quiz'
import CTABand from '../components/CTABand'
import { ArrowRight } from '../components/Icons'
import { useJsonLd } from '../hooks/useJsonLd'
import { SITE_URL } from '../config'

// A six question route into the right service, with the written plan gated on
// an email. It exists because "which of your five services do I need" is the
// question most first-time visitors actually have, and a services index makes
// them answer it themselves.
export default function Fit() {
  useJsonLd('aspire-fit-quiz', {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Growth fit check',
    url: `${SITE_URL}/fit`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
    description:
      'Six questions that match a B2B company to the growth service to start with, and a written 90 day plan by email.',
    publisher: { '@id': `${SITE_URL}/#organization` },
  })

  return (
    <>
      <section className="page-hero">
        <div className="container page-hero__inner">
          <p className="eyebrow">Free, two minutes</p>
          <h1 className="page-hero__title">Find out where to start.</h1>
          <p className="page-hero__lead">
            Six questions about how growth actually works in your company right now. At the end
            you get the service to start with and a plan for the first ninety days, on the
            spot rather than in an email next week.
          </p>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container container--narrow">
          <Quiz />
        </div>
      </section>

      <section className="section section--alt">
        <div className="container container--narrow">
          <SectionHead
            eyebrow="What you get"
            title="A plan, not a sales call."
            lede="What to start with, what to park this quarter, and what it should produce. It is built from your six answers rather than pulled from a template, it appears as soon as you ask for it, and it is yours whether or not you ever work with us."
            center
          />
          <p className="fit__foot">
            Prefer to talk it through?{' '}
            <a className="link-arrow" href="/contact">
              Book the free call instead <ArrowRight />
            </a>
          </p>
        </div>
      </section>

      <CTABand
        title="Already know what you need?"
        body="Skip the questions and tell us where growth is stuck. Fifteen minutes, free, no obligation."
        secondary={{ to: '/services', label: 'See all five services' }}
      />
    </>
  )
}
