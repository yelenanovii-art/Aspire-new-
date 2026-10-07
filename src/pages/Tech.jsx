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

          {/* The H1 is a line, not a search term. The eyebrow carries what the
              page is actually about so the keyword is on the page without
              turning the headline into a label. */}
          <p className="eyebrow reveal">Specialism &middot; B2B tech marketing and sales</p>
          <h1 className="page-hero__title reveal" style={{ '--delay': '60ms' }}>{t.h1}</h1>
          <p className="lead reveal" style={{ '--delay': '120ms' }}>{t.lede}</p>

          <div className="page-hero__actions reveal" style={{ '--delay': '180ms' }}>
            <a className="btn btn-accent btn-lg" href={bookHref} {...bookAttrs}>
              Book a free 15 minute call <ArrowRight />
            </a>
            <a className="btn btn-outline btn-lg" href="/work/">See the results</a>
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

      {/* "Tech" on its own describes nothing: the buyer in each of these four
          behaves differently, and naming them is also how somebody searching
          for their own sector finds this page. */}
      {t.sectors?.length > 0 && (
        <section className="section">
          <div className="container">
            <SectionHead
              eyebrow="Who this is for"
              title="Four sectors, four different buyers."
              lede="Most of the client list sits in one of these. The work is not interchangeable between them."
            />
            <div className="techsec">
              {t.sectors.map((x, i) => (
                <article className="techsec__i reveal" key={x.h} style={{ '--delay': `${i * 70}ms` }}>
                  <h3 className="techsec__h">{x.h}</h3>
                  <p className="techsec__p">{x.p}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The section that explains why a quarterly campaign plan does not fit
          this audience, which is the objection underneath most of the others. */}
      {t.cycle?.length > 0 && (
        <section className="section section--dark sched sched--rail">
          <div className="container">
            <SectionHead
              eyebrow="The cycle"
              title="Most of the decision happens before you hear about it."
              light
            />
            <ol className="sched__list" style={{ '--n': t.cycle.length }}>
              {t.cycle.map((c, i) => (
                <li className="sched__i reveal" key={c.n} style={{ '--delay': `${i * 90}ms`, '--i': i }}>
                  <span className="sched__axis" aria-hidden="true" />
                  <span className="sched__n" aria-hidden="true">{c.n}</span>
                  <h3 className="sched__h">{c.h}</h3>
                  <p className="sched__p">{c.p}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

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
            secondary={{ to: '/services/', label: 'See all six services' }}
            />
          </div>
        </div>
      </section>
    </>
  )
}
