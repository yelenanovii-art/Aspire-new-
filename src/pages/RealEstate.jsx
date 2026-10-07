import { useState } from 'react'
import { ArrowRight, Check } from '../components/Icons'
import SectionHead from '../components/SectionHead'
import Gallery from '../components/Gallery'
import MediaSlot from '../components/MediaSlot'
import Faq from '../components/Faq'
import CTABand from '../components/CTABand'
import PlaybookPopup from '../components/PlaybookPopup'
import PlaybookCover from '../components/PlaybookCover'
import { PLAYBOOK } from '../data/playbook'
import { bookHrefFrom, bookAttrs, SITE_URL } from '../config'
import { ESTATE_ORIGIN } from '../lib/leadRouting'
import { ESTATE } from '../data/verticals'
import { useGlow, useSpotlight } from '../hooks/useInteractions'
import { useJsonLd } from '../hooks/useJsonLd'
import { faqSchema } from '../lib/faqSchema'

export default function RealEstate() {
  // Set by the locked cover and the band button; cleared when the pop-up closes.
  const [unlock, setUnlock] = useState(false)
  const e = ESTATE

  // The film plate now carries real footage, so declare it. Without this the
  // page has video Google cannot see, and video is the one rich result this
  // page can realistically win.
  useJsonLd(
    /\.(mp4|webm|mov)$/i.test(e.film.src || '')
      ? 'aspire-estate-video'
      : null,
    {
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: 'Aerial film of a Tuscan villa estate',
      description:
        'Cinematic aerial walkthrough of a villa estate in the Tuscan hills, shot and cut by Aspire for a property listing.',
      thumbnailUrl: SITE_URL + (e.film.poster || ''),
      contentUrl: SITE_URL + e.film.src,
      uploadDate: '2026-09-30',
      isFamilyFriendly: true,
      publisher: { '@id': SITE_URL + '/#organization' },
    }
  )

  useJsonLd('aspire-faq-real-estate', faqSchema(e.faq))
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
            {/* Tagged so an enquiry finished on /contact still arrives in the
                property and charter pipeline rather than the general one. */}
            <a className="btn btn-accent btn-lg" href={bookHrefFrom(ESTATE_ORIGIN)} {...bookAttrs}>
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

      {/* The lead magnet, directly above the band that asks for a call. Both
          exist on purpose: that one asks for a meeting, this asks for an email
          from the larger group who are not ready to book one. */}
      <section className="section pbband">
        <div className="container pbband__inner">
          {/* The cover is the control. A form sitting open on the page asks
              for an address before it has said what the thing is; a locked
              cover shows the thing and asks afterwards. */}
          <PlaybookCover className="pbband__cover" locked onUnlock={() => setUnlock(true)} />
          <div className="pbband__body">
            <p className="eyebrow">Free guide</p>
            <h2 className="pbband__title">{PLAYBOOK.band.headline}</h2>
            <p className="pbband__sub">{PLAYBOOK.band.subline}</p>
            <button type="button" className="btn btn-accent btn-lg pbband__cta" onClick={() => setUnlock(true)}>
              {PLAYBOOK.unlockLabel} <ArrowRight />
            </button>
            <p className="pbband__note">{PLAYBOOK.smallPrint}</p>
          </div>
        </div>
      </section>

      <PlaybookPopup forceOpen={unlock} onClose={() => setUnlock(false)} />

      {/* Questions and the call to action sat one above the other, each in a
          narrow centred column with a lot of empty page either side. Paired,
          they fill the width and the CTA is beside the objections it answers. */}
      <section className="section section--alt pair">
        <div className="container pair__grid">
          <div className="pair__a">
              <SectionHead eyebrow="Questions" title="Before the shoot." />
              <Faq items={e.faq} idPrefix="estate-faq" />
          </div>
          <div className="pair__b">
            <CTABand
              boxed
            title="Bring us a listing."
            body="Send one property or one vessel and we will tell you exactly how we would shoot it. Fifteen minutes, free."
            secondary={{ to: '/services/content-creation', label: 'All content services' }}
            from={ESTATE_ORIGIN}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
