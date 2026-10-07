import CTABand from './CTABand'
import CountUp from './CountUp'
import { ArrowRight } from './Icons'
import { logoFor } from '../data/site'
import { logoWidth } from '../lib/logoSize'

// The RatTech case, on its own layout.
//
// The shared case template tells every engagement the same way on purpose, so
// they can be compared. This one is read by people deciding whether to enter a
// market, and what persuades them is the shape of the work and the numbers it
// produced, not a narrative. So: header, numbers, problem, what was built,
// the order it happened in, what is still running.
//
// Opted into from the data (layout: 'premium'), so every other case is
// untouched.

// Line icons at a single weight, drawn here rather than pulled from a set, so
// the six read as one family and inherit the card's colour.
const ICON = {
  map: (
    <>
      <path d="M3 6.5 8 4.5l5 2 5-2v11l-5 2-5-2-5 2z" />
      <path d="M8 4.5v13M13 6.5v13" />
    </>
  ),
  team: (
    <>
      <circle cx="8" cy="7.5" r="3" />
      <path d="M2.5 18c0-3 2.5-4.8 5.5-4.8s5.5 1.8 5.5 4.8" />
      <path d="M14.5 5.3a3 3 0 0 1 0 5.9M16 13.6c2 .6 3.5 2.2 3.5 4.4" />
    </>
  ),
  deck: (
    <>
      <rect x="2.5" y="3.5" width="17" height="11.5" rx="1.6" />
      <path d="M8 18.5h6M11 15v3.5" />
      <path d="M6.5 11.5 9.5 8l2.5 2.5L15.5 6" />
    </>
  ),
  doc: (
    <>
      <path d="M5 2.5h7.5L17.5 7.5v12a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-15A1.5 1.5 0 0 1 5 2.5Z" />
      <path d="M12.5 2.5v5h5M7 12h8M7 15.5h8M7 8.5h2.5" />
    </>
  ),
  social: (
    <>
      <circle cx="17" cy="5.5" r="2.5" />
      <circle cx="5" cy="11" r="2.5" />
      <circle cx="17" cy="16.5" r="2.5" />
      <path d="m7.3 9.8 7.4-3M7.3 12.2l7.4 3" />
    </>
  ),
  web: (
    <>
      <rect x="2.5" y="4" width="19" height="15" rx="2" />
      <path d="M2.5 8.5h19" />
      <circle cx="5.6" cy="6.2" r=".6" fill="currentColor" stroke="none" />
      <circle cx="7.8" cy="6.2" r=".6" fill="currentColor" stroke="none" />
    </>
  ),
}

const Icon = ({ name }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor"
       strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {ICON[name] || ICON.doc}
  </svg>
)

export default function CaseStudyPremium({ c, d }) {
  return (
    <>
      {/* ── a. Header ─────────────────────────────────────────────────── */}
      <section className="cs2-head">
        <div className="container cs2-head__grid">
          <div className="cs2-head__text">
            <nav className="crumbs reveal" aria-label="Breadcrumb">
              <a href="/">Home</a>
              <span aria-hidden="true">/</span>
              <a href="/work/">Work</a>
              <span aria-hidden="true">/</span>
              <span aria-current="page">{c.client}</span>
            </nav>

            {logoFor(c.client) ? (
              <img className="cs2-head__logo reveal" src={logoFor(c.client)} alt={c.client}
                   width={logoWidth(c.client, 34)} height="34" loading="lazy" decoding="async" />
            ) : (
              <p className="cs2-head__client reveal">{c.client}</p>
            )}

            <h1 className="cs2-head__h reveal" style={{ '--delay': '60ms' }}>{d.summary}</h1>

            <ul className="cs2-tags reveal" style={{ '--delay': '120ms' }}>
              {d.tags.map((t) => <li key={t}>{t}</li>)}
            </ul>
          </div>

          {/* Deliberately about a third of the width rather than a full bleed
              plate: the numbers below are the thing worth looking at. */}
          {d.photo && (
            <figure className="cs2-head__media reveal" style={{ '--delay': '160ms' }}>
              <img
                src={d.photo.src}
                srcSet={`${d.photo.src.replace('.webp', '-520.webp')} 520w, ${d.photo.src} ${d.photo.w}w`}
                sizes="(max-width: 900px) 92vw, 380px"
                alt={d.photo.alt}
                width={d.photo.w}
                height={d.photo.h}
                loading="lazy"
                decoding="async"
              />
            </figure>
          )}
        </div>
      </section>

      {/* ── b. Results ────────────────────────────────────────────────── */}
      {d.stats?.length > 0 && (
        <section className="section section--tight cs2-results">
          <div className="container">
            <div className="cs2-stats">
              {d.stats.map((s, i) => (
                <article className="cs2-stat reveal" key={s.k} style={{ '--delay': `${i * 80}ms` }}>
                  <span className="cs2-stat__v"><CountUp value={s.v} /></span>
                  <span className="cs2-stat__k">{s.k}</span>
                </article>
              ))}
            </div>
            {d.statsCaption && <p className="cs2-stats__cap reveal">{d.statsCaption}</p>}
          </div>
        </section>
      )}

      {/* ── c. The challenge ──────────────────────────────────────────── */}
      {d.challenge && (
        <section className="section section--tight">
          <div className="container cs2-split">
            <p className="eyebrow reveal">The challenge</p>
            <p className="cs2-lede reveal">{d.challenge}</p>
          </div>
        </section>
      )}

      {/* ── d. What we did ────────────────────────────────────────────── */}
      {d.did?.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <p className="eyebrow reveal">What we did</p>
            <h2 className="cs2-h2 reveal">Six pieces, built in order.</h2>
            <div className="cs2-cards">
              {d.did.map((x, i) => (
                <article className="cs2-card reveal" key={x.h} style={{ '--delay': `${i * 60}ms` }}>
                  <span className="cs2-card__icon"><Icon name={x.icon} /></span>
                  <h3 className="cs2-card__h">{x.h}</h3>
                  <p className="cs2-card__p">{x.p}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── e. How it worked ──────────────────────────────────────────── */}
      {d.timeline?.length > 0 && (
        <section className="section">
          <div className="container">
            <p className="eyebrow reveal">How it worked</p>
            <h2 className="cs2-h2 reveal">Strategy first, meetings last.</h2>
            <ol className="cs2-time">
              {d.timeline.map((t, i) => (
                <li className="cs2-time__i reveal" key={t} style={{ '--delay': `${i * 70}ms` }}>
                  <span className="cs2-time__dot" aria-hidden="true" />
                  <span className="cs2-time__n">{String(i + 1).padStart(2, '0')}</span>
                  <span className="cs2-time__t">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ── f. What's next ────────────────────────────────────────────── */}
      {d.next && (
        <section className="section section--tight">
          <div className="container">
            <aside className="cs2-next reveal">
              <span className="cs2-next__tag">
                <span className="cs2-next__pulse" aria-hidden="true" />
                In progress
              </span>
              <p className="cs2-next__p">{d.next}</p>
            </aside>
          </div>
        </section>
      )}

      {/* ── g. CTA ────────────────────────────────────────────────────── */}
      <CTABand
        eyebrow="Get started"
        title={d.cta?.title || "Entering a new market? Let's build your go-to-market."}
        body="Fifteen minutes, free, no obligation. You will leave the call knowing what we would do first."
        cta={d.cta?.label || 'Book a free call'}
        from={`case-${c.slug}`}
      />
    </>
  )
}
