import { ArrowRight, Check } from '../components/Icons'
import SectionHead from '../components/SectionHead'
import MediaSlot from '../components/MediaSlot'
import PhaseArt from '../components/PhaseArt'
import TechPlaybook from '../components/TechPlaybook'
import CaseCard from '../components/CaseCard'
import Faq from '../components/Faq'
import CTABand from '../components/CTABand'
import { bookHref, bookAttrs } from '../config'
import { SERVICES, caseBySlug, FILM } from '../data/site'
import FilmCard from '../components/FilmCard'
import EstatePromo from '../components/EstatePromo'
import { useJsonLd } from '../hooks/useJsonLd'
import { faqSchema } from '../lib/faqSchema'
import { SITE_URL } from '../config'

// One component renders all six service pages — the route table passes the
// slug, and everything else comes from src/data/site.js. Adding a service is a
// data edit plus one route entry, never a new page component.
//
// The related heading counts the others rather than naming a number. It said
// "The other three" and went stale the moment a fifth service existed, which
// is exactly the kind of thing nobody re-reads.
const COUNT_WORD = ['none', 'one', 'two', 'three', 'four', 'five', 'six', 'seven']

// Portrait or landscape, read off the ratio the data already carries, so a new
// film is sorted into the right row by its own shape and nothing else.
const isTall = (f) => {
  const [w, h] = String(f.ratio || '16 / 9').split('/').map((n) => parseFloat(n))
  return w > 0 && h > 0 ? w / h < 1 : false
}
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
  // One id per slug, so the block belongs to this page and is stripped
  // from every other one.
  useJsonLd(`aspire-faq-${s.slug}`, faqSchema(s.faq))

  const cases = (s.proof?.caseSlugs || []).map(caseBySlug).filter(Boolean)
  const others = SERVICES.filter((o) => o.slug !== s.slug)

  return (
    <>
      <section className="page-hero page-hero--service">
        <div className="container">
          <nav className="crumbs reveal" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span aria-hidden="true">/</span>
            <a href="/services/">Services</a>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{s.title}</span>
          </nav>

          <p className="eyebrow reveal">{s.n} · {s.title}</p>
          <h1 className="page-hero__title reveal" style={{ '--delay': '60ms' }}>{s.h1}</h1>
          <p className="lead reveal" style={{ '--delay': '120ms' }}>{s.lede}</p>

          <div className="page-hero__actions reveal" style={{ '--delay': '180ms' }}>
            <a className="btn btn-accent btn-lg" href={bookHref} {...bookAttrs}>
              Book a free 15 minute call <ArrowRight />
            </a>
            <a className="btn btn-outline btn-lg" href="/work/">See the results</a>
          </div>

          <ul className="page-hero__tags reveal" style={{ '--delay': '240ms' }}>
            {s.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>

          {/* Scope and timeline above the fold. On a strategy page these are
              the first two questions, and burying them in the FAQ makes the
              hero all claim and no substance. */}
          {s.meta && (
            <dl className="svcmeta reveal" style={{ '--delay': '300ms' }}>
              {s.meta.map((m) => (
                <div className="svcmeta__i" key={m.k}>
                  <dt>{m.k}</dt>
                  <dd>{m.v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* ── What's included ──────────────────────────────────────────── */}
      {/* A film takes the banner slot where one exists; MediaSlot handles the
          autoplay, the muted attribute the prerender would otherwise drop, and
          holding the source back on narrow screens. */}
      {s.film && (
        <section className="section section--flush-top section--tight">
          <div className="container">
            <div className="page-banner page-banner--film plate reveal">
              <MediaSlot {...s.film} />
            </div>
          </div>
        </section>
      )}

      {/* No photograph for this service yet, so the frame states what belongs
          there rather than being quietly absent. */}
      {!s.film && !s.photo && s.photoTodo && (
        <section className="section section--flush-top section--tight">
          <div className="container">
            {/* 21:9 rather than 16:9. Empty, a 16:9 is a third of the screen
                of nothing directly under the headline, which is most of why
                the page read as unfinished. A letterbox plate holds the same
                place and stays a composed band until the photograph lands. */}
            <div className="plate reveal">
              <MediaSlot ratio="21 / 9" label={s.photoTodo.label} hint={s.photoTodo.hint} />
            </div>
          </div>
        </section>
      )}

      {!s.film && s.photo && (
        <section className="section section--flush-top section--tight">
          <div className="container">
            <figure className="page-banner plate reveal">
              {/* The banner is 1068px on desktop, which at 2x genuinely wants
                  the full 1920. On a phone the same box is 350px, so the full
                  file is five times the pixels that can be shown — by far the
                  heaviest thing on these pages. The pair lets the browser
                  choose; sizes mirrors the real box at each width. */}
              <img
                src={s.photo.src}
                srcSet={`${s.photo.src.replace(/\.webp$/, '-760.webp')} 760w, ${s.photo.src} ${s.photo.w || 1920}w`}
                sizes="(max-width: 860px) 90vw, 1068px"
                alt={s.photo.alt}
                width={s.photo.w || 1920}
                height={s.photo.h || 720}
                decoding="async"
              />
            </figure>
          </div>
        </section>
      )}

      {s.audience && (
        <section className="section section--ruled">
          <div className="container">
            <SectionHead eyebrow="Who it is for" title="Two situations this is built for." />
            {/* These are two different buyers with two different problems, so
                they are set as two routes to choose between rather than two
                bullet points of equal weight in a list. */}
            <div className="routes">
              {s.audience.map((a, i) => (
                <article className="route reveal" style={{ '--delay': `${i * 90}ms` }} key={a.h}>
                  <span className="route__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="route__h">{a.h}</h3>
                  <p className="route__p">{a.p}</p>
                </article>
              ))}
            </div>
            <p className="svc-list__fit">
              Not sure which you are?{' '}
              <a className="link-arrow" href={s.quiz ? s.quiz.to : '/fit'}>
                Answer seven questions <ArrowRight />
              </a>
            </p>
          </div>
        </section>
      )}

      <section className="section section--ruled">
        <div className="container">
          <SectionHead eyebrow="What it includes" title="What you actually get." />
          {/* Seven named documents are a contents page, and setting them as one
              says more about what is being bought than seven ticks do. Opt in
              from the data; every other service keeps the check list. */}
          {s.includesLayout === 'ledger' ? (
            <ol className="ledger">
              {s.includes.map((inc, i) => (
                <li className="ledger__row reveal" style={{ '--delay': `${i * 45}ms` }} key={inc.h}>
                  <span className="ledger__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="ledger__h">{inc.h}</h3>
                  <p className="ledger__p">{inc.p}</p>
                </li>
              ))}
            </ol>
          ) : (
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
          )}
        </div>
      </section>

      {/* ── Film, where the service has moving work to show ──────────── */}
      {s.slug === 'content-creation' && (
        <section className="section section--dark film-section">
          <div className="container">
            <SectionHead
              eyebrow="In motion"
              title="Shot, cut and delivered for every channel."
              lede="One shoot feeds the long cut, the listing page and the vertical reel. Each one plays as it reaches you."
              light
            />
            {/* Two rows on purpose. Mixing orientations in one grid squeezed
                every vertical down to share a row with a 16:9, which is the
                difference between watching a vertical film and squinting at
                one. Verticals sit together at a usable size; the horizontals
                take the full width of the same container underneath.
                Both rows are built from the list, so adding films to FILM in
                src/data/site.js is the only edit needed. */}
            <div className="film-rail">
              {FILM.filter(isTall).map((f, i) => <FilmCard key={f.id} index={i} {...f} />)}
            </div>
            <div className="film-wides">
              {FILM.filter((f) => !isTall(f)).map((f, i) => (
                <FilmCard key={f.id} index={FILM.filter(isTall).length + i} {...f} />
              ))}
            </div>
          </div>
        </section>
      )}
      {/* Outside the section, so the marker sits below its bottom padding: the
          last film has to be properly off the top of the screen before the
          pop-up arrives, not merely level with it. */}
      {s.slug === 'content-creation' && <EstatePromo />}

      {/* ── Proof ────────────────────────────────────────────────────── */}
      {/* The centre of the page, and the answer to the only real objection on
          a strategy sale, which is that it is vague. So it is the one dark
          section: a dated schedule with an axis running through it, rather
          than three cards that happen to be numbered. */}
      {s.phases && (
        <section className={`section section--dark sched sched--${s.scheduleKind || 'rail'}`}>
          <div className="container">
            <SectionHead eyebrow={s.scheduleEyebrow} title={s.scheduleTitle} light />
            <ol className="sched__list" style={{ '--n': s.phases.length }}>
              {s.phases.map((ph, i) => (
                <li
                  className="sched__i reveal"
                  key={ph.n}
                  // --i drives the shape: how far the funnel has narrowed by
                  // this stage, how far the stack has stepped across.
                  style={{ '--delay': `${i * 90}ms`, '--i': i, '--n': s.phases.length }}
                >
                  <span className="sched__axis" aria-hidden="true" />
                  <span className="sched__w">{ph.w}</span>
                  <span className="sched__n" aria-hidden="true">{ph.n}</span>
                  <h3 className="sched__h">{ph.h}</h3>
                  <p className="sched__p">{ph.p}</p>
                  {/* Drawn, not photographed. A picture of a strategy phase is
                      always people at a table, which says nothing; a diagram
                      can say what the paragraph beside it claims. */}
                  {s.phaseArt && <PhaseArt n={ph.n} />}
                </li>
              ))}
            </ol>
            {s.scheduleNote && <p className="sched__note reveal">{s.scheduleNote}</p>}
          </div>
        </section>
      )}

      {s.quiz && (
        <section className="section section--tight">
          <div className="container">
            <div className="quizcta reveal">
              {/* The dial is the thing being offered, so it is on the card
                  rather than described on it. Ten is the scale the quiz
                  actually scores out of. */}
              <span className="quizcta__dial" aria-hidden="true">
                <span className="quizcta__dial-n">?</span>
                <span className="quizcta__dial-k">/10</span>
              </span>
              <div className="quizcta__body">
                <p className="eyebrow">Free, two minutes</p>
                <h2 className="quizcta__h">{s.quiz.label}</h2>
                <p className="quizcta__p">{s.quiz.note}</p>
              </div>
              <a className="btn btn-accent btn-lg" href={s.quiz.to}>
                Start the check <ArrowRight />
              </a>
            </div>
          </div>
        </section>
      )}

      {cases.length > 0 && (
        <section className="section section--alt">
          <div className="container">
            <div className="sec-head sec-head--split">
              <SectionHead eyebrow="Proof" title="Where this has been done before." />
              <a className="link-arrow reveal" href="/work/">All client cases <ArrowRight /></a>
            </div>
            <div className="work-grid">
              {cases.map((c, i) => <CaseCard c={c} i={i} compact key={c.slug} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Cross-links ──────────────────────────────────────────────── */}

      {/* An optional second photograph, after the questions and before the
          other services. Only set where there is a frame that says something
          the banner cannot — on events, the size of the crowd we work. */}
      {s.photoLower && (
        <section className="section section--tight">
          <div className="container">
            <figure className="svc-wide reveal">
              <img
                src={s.photoLower.src}
                srcSet={`${s.photoLower.src.replace(/\.webp$/, '-760.webp')} 760w, ${s.photoLower.src} ${s.photoLower.w}w`}
                alt={s.photoLower.alt}
                width={s.photoLower.w}
                height={s.photoLower.h}
                loading="lazy"
                decoding="async"
                sizes="(max-width: 860px) 92vw, 1068px"
              />
              {s.photoLower.caption && <figcaption>{s.photoLower.caption}</figcaption>}
            </figure>
          </div>
        </section>
      )}

      <section className="section section--tight section--ruled">
        <div className="container">
          <p className="related__h">The other {COUNT_WORD[others.length] || others.length}</p>
          <div className="related">
            {others.map((o) => (
              <a className="related__card reveal" href={`/services/${o.slug}/`} key={o.slug}>
                <span className="related__n">{o.n}</span>
                <span className="related__title">{o.title}</span>
                <span className="related__blurb">{o.blurb}</span>
                <span className="related__go"><ArrowRight size={15} /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* The guide, for the larger group who are not ready to book a call.
          Only on events: it is a trade show playbook, and a magnet on a page
          it does not answer is just another form. */}
      {s.slug === 'events' && <TechPlaybook placement="events-service" />}

      {/* The questions and the call to action closed the page one under the
          other, which left a narrow column down the middle and a lot of empty
          margin. Side by side on desktop, the same pairing /about uses;
          stacked again below 1000px with the questions first, since that is
          the order they are read in. */}
      <section className="section pair">
        <div className="container pair__grid">
          <div className="pair__a">
            <SectionHead eyebrow="Questions" title={`${s.title}, answered.`} />
            <Faq items={s.faq} idPrefix={`svc-${s.slug}`} />
          </div>
          <div className="pair__b">
            <CTABand
              boxed
              title={`Want ${s.title.toLowerCase()} handled properly?`}
              body="Fifteen minutes, free, no obligation. You will leave the call knowing what we would do first."
            />
          </div>
        </div>
      </section>
    </>
  )
}
