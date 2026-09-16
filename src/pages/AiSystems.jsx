import { ArrowRight, Check } from '../components/Icons'
import SectionHead from '../components/SectionHead'
import DashboardDemo from '../components/DashboardDemo'
import Faq from '../components/Faq'
import CTABand from '../components/CTABand'
import { bookHref, bookAttrs } from '../config'
import { AI } from '../data/verticals'
import Magnetic from '../components/Magnetic'
import { useGlow, useSpotlight } from '../hooks/useInteractions'

export default function AiSystems() {
  const heroGlow = useGlow()
  const grids = useSpotlight()
  return (
    <div ref={grids}>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="hero hero--ai" ref={heroGlow}>
        <div className="hero__bg" aria-hidden="true">
          <span className="glow-layer" />
          <span className="hero__glow hero__glow--1" />
          <span className="hero__glow hero__glow--2" />
          <span className="hero__grid" />
          <span className="hero__grain" />
        </div>
        <div className="container hero__inner">
          <div className="hero__copy">
            <p className="eyebrow eyebrow--light reveal">AI systems</p>
            <h1 className="hero__title reveal" style={{ '--delay': '60ms' }}>{AI.h1}</h1>
            <p className="hero__lead reveal" style={{ '--delay': '120ms' }}>{AI.lede}</p>
            <div className="hero__actions reveal" style={{ '--delay': '180ms' }}>
              <Magnetic>
                <a className="btn btn-accent btn-lg" href={bookHref} {...bookAttrs}>
                  Scope a system <ArrowRight />
                </a>
              </Magnetic>
              <a className="btn btn-outline-light btn-lg" href="#build">What we build</a>
            </div>
            <p className="hero__trust reveal" style={{ '--delay': '220ms' }}>
              Built in your cloud. Your data, your access rules, your source at handover.
            </p>
          </div>
          <DashboardDemo />
        </div>
      </section>

      {/* ── What we build ────────────────────────────────────────────── */}
      <section className="section" id="build">
        <div className="container">
          <SectionHead
            eyebrow="What we build"
            title="Four things, all of them boring in the best way."
            lede="Most of this is data plumbing and interface: getting the right numbers into one place and making them actionable. A model is used where it earns its place, not as the product."
          />
          <div className="builds">
            {AI.builds.map((b, i) => (
              <article className="build reveal" data-spot style={{ '--delay': `${i * 70}ms` }} key={b.k}>
                <span className="build__k">{b.k}</span>
                <h3>{b.h}</h3>
                <p>{b.p}</p>
                <ul className="build__tags">
                  {b.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principles ───────────────────────────────────────────────── */}
      <section className="section section--dark">
        <div className="container">
          <SectionHead
            eyebrow="How we work with your data"
            title="The three rules we do not bend."
            lede="Anything touching company data has to be trustworthy before it is clever. These are written into the engagement rather than promised on a slide."
            light
          />
          <div className="principles">
            {AI.principles.map((p, i) => (
              <article className="principle reveal" style={{ '--delay': `${i * 70}ms` }} key={p.h}>
                <span className="principle__check"><Check size={15} /></span>
                <h3>{p.h}</h3>
                <p>{p.p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ──────────────────────────────────────────────────── */}
      <section className="section section--alt">
        <div className="container approach__layout">
          <div className="approach__intro">
            <SectionHead
              eyebrow="How it runs"
              title="A working prototype before a full build."
              lede="You use it on your own data in week three. If it is not earning its place, we stop there and you have paid for a prototype rather than a project."
            />
            <a className="btn btn-ink reveal approach__cta" href={bookHref} {...bookAttrs}>
              Scope a system <ArrowRight />
            </a>
          </div>
          <ol className="steps">
            {AI.process.map((s, i) => (
              <li className="step reveal" style={{ '--delay': `${i * 70}ms` }} key={s.n}>
                <span className="step__n">{s.n}</span>
                <div className="step__body">
                  <span className="step__meta">{s.meta}</span>
                  <h3>{s.h}</h3>
                  <p>{s.p}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <SectionHead eyebrow="Questions" title="The ones that come up first." center />
          <Faq items={AI.faq} idPrefix="ai-faq" />
        </div>
      </section>

      <CTABand
        title="Tell us what you rebuild every week."
        body="If it lives in a spreadsheet and somebody updates it by hand, it is probably a system. Fifteen minutes, free, and you leave with a view on whether it is worth building."
        secondary={{ to: '/contact', label: 'Contact us' }}
      />
    </div>
  )
}
