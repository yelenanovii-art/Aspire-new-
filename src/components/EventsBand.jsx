import { ArrowRight } from './Icons'
import { bookHref, bookAttrs } from '../config'
import { serviceBySlug } from '../data/site'

// A feature band for the events practice.
//
// It sits apart from the five-row services list because position in a list
// only buys so much: the discipline that earns most needs its own frame, a
// photograph of the thing being sold, and a route into the service as well as
// into the diary. The other four are bought by the month and are happy in a
// list; this one is bought per show, which is a decision someone makes in one
// sitting.
export default function EventsBand() {
  const s = serviceBySlug('events')
  if (!s) return null

  return (
    <section className="evb">
      <div className="container evb__inner">
        <div className="evb__body">
          <p className="eyebrow eyebrow--light reveal">{s.flag}</p>
          <h2 className="evb__title reveal" style={{ '--delay': '60ms' }}>
            Your whole market is in one building for a week. Then it is gone.
          </h2>
          <p className="evb__lead reveal" style={{ '--delay': '110ms' }}>
            We join your team for the run-up, the floor and the follow-up: meetings in the
            diary before you land, leads captured with the conversation attached, content
            published while it is happening. Three years running the show floors at
            Integrated Systems Europe, and external sales at SilTest.
          </p>
          <ul className="evb__points reveal" style={{ '--delay': '150ms' }}>
            {s.tags.map((t) => <li key={t}>{t}</li>)}
          </ul>
          <div className="evb__actions reveal" style={{ '--delay': '190ms' }}>
            <a className="btn btn-accent btn-lg" href={`/services/${s.slug}`}>
              See how it works <ArrowRight />
            </a>
            <a className="btn btn-outline-light btn-lg" href={bookHref} {...bookAttrs}>
              Book the week
            </a>
          </div>
        </div>

        <figure className="evb__media reveal" style={{ '--delay': '90ms' }} aria-hidden="true">
          <img
            src={s.photo.src}
            srcSet={`${s.photo.src.replace(/\.webp$/, '-760.webp')} 760w, ${s.photo.src} ${s.photo.w}w`}
            sizes="(max-width: 940px) 92vw, 46vw"
            alt=""
            width={s.photo.w}
            height={s.photo.h}
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </section>
  )
}
