import { ArrowRight } from '../components/Icons'
import SectionHead from '../components/SectionHead'
import Stat from '../components/Stat'
import Marquee from '../components/Marquee'
import CaseCard from '../components/CaseCard'
import PullQuote from '../components/PullQuote'
import Faq from '../components/Faq'
import CTABand from '../components/CTABand'
import Magnetic from '../components/Magnetic'
import { useGlow, useSpotlight } from '../hooks/useInteractions'
import Compare from '../components/Compare'
import Carousel from '../components/Carousel'
import Specialisms from '../components/Specialisms'
import EventsBand from '../components/EventsBand'
import ServiceCarousel from '../components/ServiceCarousel'
import EventsPromo from '../components/EventsPromo'
import CountUp from '../components/CountUp'
import { bookHref, bookAttrs } from '../config'
import { SERVICES, CASES, CLIENTS, STATS, STEPS, PROBLEM, FAQ, PERFORMANCE } from '../data/site'
import { useJsonLd } from '../hooks/useJsonLd'

// The page is ordered as an argument, not as a brochure:
//   what we are  ->  what is wrong  ->  why the usual fixes fail  ->  what we do
//   ->  proof it worked  ->  how it runs  ->  who does it  ->  book the call
// Spelled counts, read off the data. Typed out, "six cases" and "all four"
// went stale the moment a seventh case and a fifth person were added, which
// is the kind of thing nobody re-reads and every visitor can check.
const COUNT_WORD = ['none', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']

export default function Home() {
  const heroGlow = useGlow()
  const compareGlow = useGlow()
  const quoteGlow = useGlow()
  const grids = useSpotlight()

  useJsonLd('aspire-home-faq', {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  })

  return (
    <div ref={grids}>
      {/* ── 1. What we are ───────────────────────────────────────────── */}
      <section className="hero" ref={heroGlow}>
        <div className="hero__bg" aria-hidden="true">
          <span className="glow-layer" />
          <span className="hero__glow hero__glow--1" />
          <span className="hero__glow hero__glow--2" />
          <span className="hero__grid" />
          <span className="hero__grain" />
        </div>

        <div className="container hero__inner">
          <p className="eyebrow eyebrow--light reveal">Sales and marketing for B2B tech</p>

          <h1 className="hero__title reveal" style={{ '--delay': '60ms' }}>
            Your product is ready.<br /> <em>Your pipeline is not.</em>
          </h1>

          <p className="hero__lead reveal" style={{ '--delay': '120ms' }}>
            Aspire is the outsourced sales and marketing team for B2B tech companies.
            We find the buyers, start the conversations, and build the brand that makes
            them answer.
          </p>

          <div className="hero__actions reveal" style={{ '--delay': '180ms' }}>
            <Magnetic>
              <a className="btn btn-accent btn-lg" href={bookHref} {...bookAttrs}>
                Book a free 15 minute call <ArrowRight />
              </a>
            </Magnetic>
            {/* The second slot was "See the work", which browses and captures
                nothing. The quiz is the lower-commitment path for the larger
                group who are not ready to book a call yet, and it asks a
                question rather than naming a page, so the click is driven by
                wanting the answer. Work is still one tap away in the nav. */}
            {/* The note belongs to this button. Under the row it read as a
                condition on both, which made the call look like a quiz. */}
            <span className="hero__quiz">
              <a className="btn btn-outline-light btn-lg" href="/fit/">
                Find your match
              </a>
              <span className="hero__cta-note">Six questions, two minutes, no sales call.</span>
            </span>
          </div>

          {/* With the readout panel gone, the proof moves inline so the hero
              still answers "why should I believe you" above the fold. */}
          <dl className="hero__stats reveal" style={{ '--delay': '230ms' }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <dt>
                  <CountUp
                    value={s.plain ? String(s.value) : `${s.value.toLocaleString()}${s.suffix || ''}`}
                    plain={s.plain}
                  />
                </dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* A real frame from the floor rather than stock, directly under the
          hero. The gradient is doing two jobs: it ties the band to the dark
          hero above it so the join does not read as a seam, and it keeps the
          caption legible over a busy photograph. */}
      <section className="herophoto" aria-hidden="false">
        <img
          src="/media/pages/hero-ise26.webp"
          srcSet="/media/pages/hero-ise26-760.webp 760w, /media/pages/hero-ise26.webp 1920w"
          sizes="100vw"
          alt="The Aspire team in a working meeting with a client at Integrated Systems Europe 2026"
          width="1920"
          height="823"
          loading="lazy"
          decoding="async"
        />
        <span className="herophoto__veil" aria-hidden="true" />
        <p className="herophoto__cap">Integrated Systems Europe 2026, Barcelona.</p>
      </section>

      <section className="logos">
        <div className="container">
          <Marquee items={CLIENTS} label="Trusted by" />
        </div>
      </section>

      {/* ── 2. What is wrong ─────────────────────────────────────────── */}
      <section className="section problem">
        <div className="container">
          <SectionHead
            index="01"
            eyebrow="The problem"
            title="Good tech companies stall at the same point."
            lede="It is almost never the product. It is that nobody senior is running growth, and the pieces that should compound are being bought separately."
          />
          <ol className="prob-list">
            {PROBLEM.map((p, i) => (
              <li className="prob reveal" data-spot style={{ '--delay': `${i * 70}ms` }} key={p.k}>
                <span className="prob__k" aria-hidden="true">{p.k}</span>
                <div className="prob__body">
                  <h3>{p.h}</h3>
                  <p>{p.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 3. Why the usual fixes fail ──────────────────────────────── */}
      <section className="section section--dark compare-section has-glow" ref={compareGlow}>
        <span className="glow-layer" aria-hidden="true" />
        <div className="container">
          <SectionHead
            index="02"
            eyebrow="Your options"
            title="Three ways to fix it. One of them starts this month."
            lede="Hiring takes a quarter you do not have. A retainer agency puts a junior team behind an account manager. We are the third option."
            light
          />
          <Compare />
        </div>
      </section>

      {/* ── 4. What we do ────────────────────────────────────────────── */}
      <section className="section services" id="services">
        <div className="container">
          <SectionHead
            index="03"
            eyebrow="What we do"
            title="Six services, run as one plan."
            lede="Most companies buy these from four suppliers who never speak. Run together, the content fills the social, the social warms the outreach, and the outreach closes."
          />

          <ServiceCarousel />

          <p className="svc-list__fit">
            Not sure which of the six you need?{' '}
            <a className="link-arrow" href="/fit/">
              Answer six questions <ArrowRight />
            </a>
          </p>

          <SectionHead
            eyebrow="Specialisms"
            title="Selling in a market where trust is everything? We know it from the inside."
            lede="Some industries do not buy from strangers. We have worked inside them, so we know who decides, what they need to hear, and how to get you in the room."
          />
          <Specialisms />
        </div>
      </section>

      {/* ── 4b. The one bought per show ──────────────────────────────── */}
      <EventsBand />

      {/* ── 5. Proof ─────────────────────────────────────────────────── */}
      <section className="section section--alt work" id="work">
        <div className="container">
          <SectionHead
            index="04"
            eyebrow="Proof"
            title="What it has produced so far."
            lede={`Averages across the accounts we run, and three of the ${COUNT_WORD[CASES.length] || CASES.length} client engagements behind them.`}
          />

          <div className="stat-grid stat-grid--bordered stat-grid--three">
            {[PERFORMANCE.leads, PERFORMANCE.engagement, PERFORMANCE.conversion].map((m) => (
              <Stat key={m.label} staticText={<CountUp value={m.value} />} label={m.label} note={m.note} />
            ))}
          </div>

          <div className="sec-head sec-head--split work__head">
            <h3 className="work__h">Selected client cases</h3>
            <a className="link-arrow reveal" href="/work/">All {COUNT_WORD[CASES.length] || CASES.length} cases <ArrowRight /></a>
          </div>

          <div className="work-grid work-grid--lead work-grid--swipe">
            {CASES.slice(0, 3).map((c, i) => (
              <CaseCard c={c} i={i} compact={i > 0} key={c.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. How it runs ───────────────────────────────────────────── */}
      <section className="section approach" id="approach">
        <div className="container approach__layout">
          <div className="approach__intro">
            <SectionHead
              index="05"
            eyebrow="How it works"
              title="From a free call to live execution in two weeks."
              lede="No long onboarding and no discovery phase you pay for. You get the strategy before you get an invoice, and it is yours either way."
            />
            <a className="btn btn-ink reveal approach__cta" href={bookHref} {...bookAttrs}>
              Start with the free call <ArrowRight />
            </a>
          </div>

          <ol className="steps">
            {STEPS.map((s, i) => (
              <li className="step reveal" style={{ '--delay': `${i * 70}ms` }} key={s.n}>
                <span className="step__n">{s.n}</span>
                <div className="step__body">
                  <span className="step__meta">{s.meta}</span>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>


      {/* ── 7b. The same four, on site ───────────────────────────────── */}
      <section className="section section--tight onsite-section">
        <div className="container">
          <div className="sec-head sec-head--split onsite__head">
            <SectionHead
              eyebrow="On site"
              title="Where the work actually happens."
            />
            <a className="link-arrow reveal" href="/services/content-creation/">Content and events <ArrowRight /></a>
          </div>
        </div>
        <Carousel />
      </section>

      {/* ── 8. In their words ────────────────────────────────────────── */}
      <section className="section pull-section" ref={quoteGlow}>
        <div className="pull-section__bg" aria-hidden="true">
          <span className="glow-layer" />
          <span className="brandmark">A</span>
        </div>
        <div className="container">
          <PullQuote />
        </div>
      </section>

      {/* ── 9. Objections ────────────────────────────────────────────── */}
      {/* Questions and the call to action sat one above the other, each in a
          narrow centred column with a lot of empty page either side. Paired,
          they fill the width and the CTA is beside the objections it answers. */}
      <section className="section section--alt faq-section pair">
        <div className="container pair__grid">
          <div className="pair__a">
              <SectionHead eyebrow="Questions" title="Before you book the call." />
              <Faq items={FAQ} idPrefix="home-faq" />
          </div>
          <div className="pair__b">
            <CTABand
              boxed
            title="Tell us where growth is stuck."
            body="Fifteen minutes, free, no obligation. You leave with a view on what to do first, whether or not you run it with us."
            secondary={{ to: '/services/', label: 'See what we do' }}
            />
          </div>
        </div>
      </section>

      <EventsPromo />
    </div>
  )
}
