import { ArrowRight } from '../components/Icons'
import { SERVICES } from '../data/site'

export default function NotFound() {
  return (
    <section className="section notfound">
      <div className="container container--narrow">
        <p className="eyebrow">404</p>
        <h1 className="notfound__title">That page does not exist.</h1>
        <p className="lead">
          The link may be old, or we may have moved something. Here is everything that does
          exist, or go straight to the free discovery call.
        </p>

        <div className="notfound__links">
          <a href="/">Home</a>
          <a href="/services">Services</a>
          {SERVICES.map((s) => (
            <a key={s.slug} href={`/services/${s.slug}`}>{s.nav}</a>
          ))}
          <a href="/work">Our work</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>

        <a className="btn btn-accent btn-lg notfound__cta" href="/contact">
          Book a free discovery call <ArrowRight />
        </a>
      </div>
    </section>
  )
}
