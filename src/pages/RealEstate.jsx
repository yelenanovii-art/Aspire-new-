import { ArrowRight, Check } from '../components/Icons'
import SectionHead from '../components/SectionHead'
import Gallery from '../components/Gallery'
import MediaSlot from '../components/MediaSlot'
import Faq from '../components/Faq'
import CTABand from '../components/CTABand'
import { bookHref, bookAttrs } from '../config'
import { ESTATE } from '../data/verticals'
import { useGlow, useSpotlight } from '../hooks/useInteractions'

export default function RealEstate() {
  const e = ESTATE
  const heroGlow = useGlow()
  const grids = useSpotlight()
  return (
    <div ref={grids}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="estate-hero" ref={heroGlow}>
        <div className="estate-hero__bg" aria-hidden="true">
          <span className="glow-layer" />
          <span className="estate-hero__wash" />
          <span className="hero__grain" />
        </div>
        <div className="container estate-hero__inner">
          <p className="eyebrow eyebrow--light reveal">Real estate and yachting</p>
          <h1 className="estate-hero__title reveal" style={{ '--delay': '60ms' }}>{e.h1}</h1>
          <p className="estate-hero__lede reveal" style={{ '--delay': '120ms' }}>{e.lede}</p>
          <div className="estate-hero__actions reveal" style={{ '--delay': '180ms' }}>
            <a className="btn btn-accent btn-lg" href={bookHref} {...bookAttrs}>
              Book a free call <ArrowRight />
            </a>
            <a className="btn btn-outline-light btn-lg" href="#portfolio">See the work</a>
          </div>
        </div>
      </section>

      {/* ── Film ─────────────────────────────────────────────────────── */}
      <section className="section section--tight estate-film">
        <div className="container">
          <MediaSlot {...e.film} />
        </div>
      </section>

      {/* ── The two markets ──────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHead
            eyebrow="Two markets"
            title="Property and marine, shot by the same eye."
            lede="The buyers are different and so is the brief. What stays the same is that both are sold on atmosphere before they are sold on specification."
          />
          <div className="markets">
            {e.markets.map((m, i) => (
              <article className="market reveal" data-spot style={{ '--delay': `${i * 80}ms` }} key={m.k}>
                <span className="market__k">{m.k}</span>
                <h3>{m.h}</h3>
                <p>{m.p}</p>
                <ul className="market__points">
                  {m.points.map((pt) => <li key={pt}><Check size={14} /> {pt}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Portfolio ────────────────────────────────────────────────── */}
      <section className="section section--alt" id="portfolio">
        <div className="container">
          <SectionHead
            eyebrow="Selected frames"
            title="One look, held across a whole portfolio."
            lede="Set the grade and the framing rules once and every listing matches. That consistency is what makes a brokerage feed read as expensive rather than assembled."
          />
          <Gallery items={e.gallery} />
        </div>
      </section>

      {/* ── What it includes ─────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <SectionHead eyebrow="What it includes" title="Shot, cut, published, measured." />
          <div className="spec-grid">
            {e.includes.map((inc) => (
              <article className="spec" key={inc.h}>
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

      <section className="section section--alt">
        <div className="container container--narrow">
          <SectionHead eyebrow="Questions" title="Before the shoot." center />
          <Faq items={e.faq} idPrefix="estate-faq" />
        </div>
      </section>

      <CTABand
        title="Bring us a listing."
        body="Send one property or one vessel and we will tell you exactly how we would shoot it. Fifteen minutes, free."
        secondary={{ to: '/services/content-creation', label: 'All content services' }}
      />
    </div>
  )
}
