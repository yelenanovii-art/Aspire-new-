import { ArrowRight, Check } from '../components/Icons'
import SectionHead from '../components/SectionHead'
import CaseCard from '../components/CaseCard'
import Faq from '../components/Faq'
import CTABand from '../components/CTABand'
import { bookHref, bookAttrs } from '../config'
import { SERVICES, caseBySlug, FILM } from '../data/site'
import FilmCard from '../components/FilmCard'
import { useJsonLd } from '../hooks/useJsonLd'
import { SITE_URL } from '../config'

// One component renders all four service pages — the route table passes the
// slug, and everything else comes from src/data/site.js. Adding a service is a
// data edit plus one route entry, never a new page component.
export default function ServiceDetail({ service }) {
  const s = service

  // Only the content page carries film, so only it emits video markup.
  useJsonLd(
    s.slug === 'content-creation' ? 'aspire-film-video' : null,
    s.slug === 'content-creation'
      ? {
          '@context': 'https://schema.org',
          '@graph': FILM.map((f) => ({
            '@type': 'VideoObject',
            name: `${f.label}: ${f.note}`,
            description: f.note,
            thumbnailUrl: SITE_URL + f.poster,
            contentUrl: SITE_URL + f.src,
            uploadDate: '2026-09-13',
            isFamilyFriendly: true,
            publisher: { '@id': SITE_URL + '/#organization' },
          })),
        }
      : null
  )
  const cases = (s.proof?.caseSlugs || []).map(caseBySlug).filter(Boolean)
  const others = SERVICES.filter((o) => o.slug !== s.slug)

  return (
    <>
      <section className="page-hero page-hero--service">
        <div className="container">
          <nav className="crumbs reveal" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <a href="/services">Services</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{s.title}</span>
          </nav>

          <p className="eyebrow reveal">{s.n} · {s.title}</p>
          <h1 className="page-hero__title reveal" style={{ '--delay': '60ms' }}>{s.h1}</h1>
          <p className="lead reveal" style={{ '--delay': '120ms' }}>{s.lede}</p>

          <div className="page-hero__actions reveal" style={{ '--delay': '180ms' }}>
            <a className="btn btn-accent btn-lg" href={bookHref} {...bookAttrs}>
              Book a free discovery call <ArrowRight />
            </a>
            <a className="btn btn-outline btn-lg" href="/work">See the results</a>
          </div>

          <ul className="page-hero__tags reveal" style={{ '--delay': '240ms' }}>
            {s.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
        </div>
      </section>

      {/* ── What's included ──────────────────────────────────────────── */}
      <section className="section section--ruled">
        <div className="container">
          <SectionHead eyebrow="What it includes" title="What you actually get." />
          <div className="spec-grid">
            {s.includes.map((inc, i) => (
              <article className="spec" style={{ '--delay': `${i * 60}ms` }} key={inc.h}>
                <span className="spec__check"><Check size={16} /></span>
                <div>
                  <h3>{inc.h}</h3>
                  <p>{inc.p}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Film, where the service has moving work to show ──────────── */}
      {s.slug === 'content-creation' && (
        <section className="section section--dark film-section">
          <div className="container">
            <SectionHead
              eyebrow="In motion"
              title="Shot, cut and delivered for every channel."
              lede="One shoot feeds the long cut, the listing page and the vertical reel. Hover any frame to watch it move."
              light
            />
            <div className="film-grid">
              {FILM.map((f) => <FilmCard key={f.id} {...f} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Proof ────────────────────────────────────────────────────── */}
      {cases.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <div className="sec-head sec-head--split">
              <SectionHead eyebrow="Proof" title="Where this has been done before." />
              <a className="link-arrow reveal" href="/work">All client cases <ArrowRight /></a>
            </div>
            <div className="work-grid">
              {cases.map((c, i) => <CaseCard c={c} i={i} compact key={c.slug} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container container--narrow">
          <SectionHead eyebrow="Questions" title={`${s.title}, answered.`} center />
          <Faq items={s.faq} idPrefix={`svc-${s.slug}`} />
        </div>
      </section>

      {/* ── Cross-links ──────────────────────────────────────────────── */}
      <section className="section section--tight section--ruled">
        <div className="container">
          <h2 className="related__h">The other three</h2>
          <div className="related">
            {others.map((o) => (
              <a className="related__card reveal" href={`/services/${o.slug}`} key={o.slug}>
                <span className="related__n">{o.n}</span>
                <span className="related__title">{o.title}</span>
                <span className="related__blurb">{o.blurb}</span>
                <span className="related__go"><ArrowRight size={15} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title={`Want ${s.title.toLowerCase()} handled properly?`}
        body="Fifteen minutes, free, no obligation. You will leave the call knowing what we would do first."
      />
    </>
  )
}
