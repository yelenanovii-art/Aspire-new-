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
import Team from '../components/Team'
import Carousel from '../components/Carousel'
import { bookHref, bookAttrs } from '../config'
import { SERVICES, CASES, CLIENTS, STATS, STEPS, PROBLEM, FAQ, PERFORMANCE } from '../data/site'
import { useJsonLd } from '../hooks/useJsonLd'

// The page is ordered as an argument, not as a brochure:
//   what we are  ->  what is wrong  ->  why the usual fixes fail  ->  what we do
//   ->  proof it worked  ->  how it runs  ->  who does it  ->  book the call
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
            Your product is ready. <em>Your pipeline is not.</em>
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
            <a className="btn btn-outline-light btn-lg" href="/work">See the work</a>
          </div>

          {/* With the readout panel gone, the proof moves inline so the hero
              still answers "why should I believe you" above the fold. */}
          <dl className="hero__stats reveal" style={{ '--delay': '230ms' }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <dt>{s.plain ? s.value : `${s.value.toLocaleString()}${s.suffix || ''}`}</dt>
                <dd>{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
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
            title="Four disciplines, run as one plan."
            lede="Most companies buy these from four suppliers who never speak. Run together, the content fills the social, the social warms the outreach, and the outreach closes."
          />

          <ol className="svc-list">
            {SERVICES.map((s, i) => (
              <li className="svc-row reveal" style={{ '--delay': `${i * 60}ms` }} key={s.slug}>
                <a className="svc-row__link" href={`/services/${s.slug}`}>
                  <span className="svc-row__n">{s.n}</span>
                  <span className="svc-row__main">
                    <span className="svc-row__title">{s.title}</span>
                    <span className="svc-row__blurb">{s.blurb}</span>
                    <span className="svc-row__tags">
                      {s.tags.map((t) => <span key={t}>{t}</span>)}
                    </span>
                  </span>
                  <span className="svc-row__go" aria-hidden="true"><ArrowRight size={18} /></span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 5. Proof ─────────────────────────────────────────────────── */}
      <section className="section section--alt work" id="work">
        <div className="container">
          <SectionHead
            index="04"
            eyebrow="Proof"
            title="What it has produced so far."
            lede="Averages across the accounts we run, and three of the six client engagements behind them."
          />

          <div className="stat-grid stat-grid--bordered stat-grid--three">
            {[PERFORMANCE.leads, PERFORMANCE.engagement, PERFORMANCE.conversion].map((m) => (
              <Stat key={m.label} staticText={m.value} label={m.label} note={m.note} />
            ))}
          </div>

          <div className="sec-head sec-head--split work__head">
            <h3 className="work__h">Selected client cases</h3>
            <a className="link-arrow reveal" href="/work">All six cases <ArrowRight /></a>
          </div>

          <div className="work-grid work-grid--lead">
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

      {/* ── 7. Who does it ───────────────────────────────────────────── */}
      <section className="section section--dark team-section" id="team">
        <div className="container">
          <SectionHead
            index="06"
            eyebrow="The team"
            title="Four specialists. You will know all of them."
            lede="Not an account manager relaying messages to a junior team. The person shooting your video is not the person running your pipeline, and neither of them is learning on your account."
            light
          />
          {/* Roster only. The portraits belong on /about, where there is room
              to give them the space they deserve. */}
          <Team photos={false} />
          <a className="link-arrow link-arrow--light reveal team-section__more" href="/about">
            Meet the team <ArrowRight />
          </a>
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
            <a className="link-arrow reveal" href="/services/content-creation">Content and events <ArrowRight /></a>
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
      <section className="section section--alt faq-section">
        <div className="container container--narrow">
          <SectionHead eyebrow="Questions" title="Before you book the call." center />
          <Faq items={FAQ} idPrefix="home-faq" />
        </div>
      </section>

      <CTABand
        title="Tell us where growth is stuck."
        body="Fifteen minutes, free, no obligation. You leave with a view on what to do first, whether or not you run it with us."
        secondary={{ to: '/services', label: 'See what we do' }}
      />
    </div>
  )
}
