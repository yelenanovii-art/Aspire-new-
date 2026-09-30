import { ArrowRight } from '../components/Icons'
import SectionHead from '../components/SectionHead'
import CaseCard from '../components/CaseCard'
import Stat from '../components/Stat'
import Testimonials from '../components/Testimonials'
import Marquee from '../components/Marquee'
import CTABand from '../components/CTABand'
import { CASES, STATS, CLIENTS, WORK_BAND } from '../data/site'

export default function Work() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow reveal">Client cases</p>
          <h1 className="page-hero__title reveal" style={{ '--delay': '60ms' }}>
            Six engagements. <em>Real numbers.</em>
          </h1>
          <p className="lead reveal" style={{ '--delay': '120ms' }}>
            Fintech market entry, a semiconductor testing firm, the largest AV show in the
            world, a notary practice and a private members’ lounge. Different industries,
            the same job: get new clients and grow the name.
          </p>
        </div>
      </section>

      <section className="section section--tight section--ruled">
        <div className="container">
          <div className="stat-grid">
            {STATS.map((s) => (
              <Stat key={s.label} value={s.value} plain={s.plain} suffix={s.suffix} label={s.label} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="container">
          {/* The cards are h3; without this the page jumped h1 -> h3. It is
              visually redundant beside the h1, so it is for assistive tech. */}
          <h2 className="sr-only">Client cases</h2>
          <div className="work-grid work-grid--full">
            {CASES.map((c, i) => (
              <CaseCard c={c} i={i} showServices key={c.slug} />
            ))}
          </div>
        </div>
      </section>

      {/* The cases above are told in numbers; this is what the work looked
          like. All six frames are from the ISE engagement listed above, not
          stock event photography. */}
      <section className="section section--tight">
        <div className="container">
          <SectionHead
            eyebrow="On the ground"
            title="A year at Integrated Systems Europe."
            lede="Onsite marketing partner at the largest AV show in the world, in Barcelona. Stand presence, social coverage and the content cut from the floor while the show ran."
          />
          <ul className="band band--six">
            {WORK_BAND.map((b, i) => (
              <li className="band__item reveal" style={{ '--delay': `${i * 60}ms` }} key={b.src}>
                <img src={b.src} alt={b.alt} width="1440" height="900" loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--alt">
        <div className="container about-strip__inner">
          <div className="about-strip__copy">
            <SectionHead
              eyebrow="In their words"
              title="What clients say when the engagement ends."
              lede="Three of the companies we have worked with, on what the work was actually like."
            />
            <a className="link-arrow reveal" href="/about">How we work <ArrowRight /></a>
          </div>
          <div className="about-strip__quote reveal" style={{ '--delay': '100ms' }}>
            <Testimonials />
          </div>
        </div>
      </section>

      <section className="section section--tight">
        <div className="container">
          <Marquee items={CLIENTS} label="Companies we have worked with" />
        </div>
      </section>

      <CTABand
        title="Your case could be next."
        body="Tell us where you want to grow. The first 15-minute call is free, and you leave with a view either way."
      />
    </>
  )
}
