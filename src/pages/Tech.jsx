import SectionHead from '../components/SectionHead'
import CaseCard from '../components/CaseCard'
import Faq from '../components/Faq'
import CTABand from '../components/CTABand'
import { ArrowRight, Check } from '../components/Icons'
import { useJsonLd } from '../hooks/useJsonLd'
import { faqSchema } from '../lib/faqSchema'
import { bookHref, bookAttrs } from '../config'
import { caseBySlug } from '../data/site'
import { TECH } from '../data/verticals'

// The tech specialism. Same shape as the other specialism pages — hero, what
// it covers, proof, questions, CTA — with placeholder copy where the real
// words have not been written yet. It exists so the nav, the home section and
// the footer can all point at something real rather than a dead link.
export default function Tech() {
  const t = TECH
  useJsonLd('aspire-faq-tech', faqSchema(t.faq))
  const cases = (t.proofCaseSlugs || []).map(caseBySlug).filter(Boolean)

  return (
    <>
      <section className="page-hero page-hero--service">
        <div className="container">
          <nav className="crumbs reveal" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{t.nav}</span>
          </nav>

          <p className="eyebrow reveal">Specialism</p>
          <h1 className="page-hero__title reveal" style={{ '--delay': '60ms' }}>{t.h1}</h1>
          <p className="lead reveal" style={{ '--delay': '120ms' }}>{t.lede}</p>

          <div className="page-hero__actions reveal" style={{ '--delay': '180ms' }}>
            <a className="btn btn-accent btn-lg" href={bookHref} {...bookAttrs}>
              Book a free discovery call <ArrowRight />
            </a>
            <a className="btn btn-outline btn-lg" href="/work">See the results</a>
          </div>

          <ul className="page-hero__tags reveal" style={{ '--delay': '240ms' }}>
            {t.tags.map((x) => <li key={x}>{x}</li>)}
          </ul>
        </div>
      </section>

      <section className="section section--ruled">
        <div className="container">
          <SectionHead eyebrow="What it covers" title="How selling to technical buyers differs." />
          <div className="spec-grid">
            {t.includes.map((it, i) => (
              <article className="spec" style={{ '--delay': `${i * 60}ms` }} key={it.h}>
                <span className="spec__check"><Check size={16} /></span>
                <div>
                  <h3>{it.h}</h3>
                  <p>{it.p}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {cases.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <SectionHead eyebrow="Proof" title="Where this has been done before." />
            <div className="work-grid">
              {cases.map((c, i) => <CaseCard c={c} i={i} compact key={c.slug} />)}
            </div>
          </div>
        </section>
      )}

      {/* Questions and the call to action sat one above the other, each in a
          narrow centred column with a lot of empty page either side. Paired,
          they fill the width and the CTA is beside the objections it answers. */}
      <section className="section pair">
        <div className="container pair__grid">
          <div className="pair__a">
              <SectionHead eyebrow="Questions" title="Tech, answered." />
              <Faq items={t.faq} idPrefix="tech-faq" />
          </div>
          <div className="pair__b">
            <CTABand
              boxed
            title="Selling something technical?"
            body="Tell us who buys it and how long they take. Fifteen minutes, free, and you leave with a view either way."
            secondary={{ to: '/services', label: 'See all five services' }}
            />
          </div>
        </div>
      </section>
    </>
  )
}
