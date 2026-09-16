import { ArrowRight } from './Icons'
import { bookHref, bookAttrs } from '../config'
import Magnetic from './Magnetic'
import { useGlow } from '../hooks/useInteractions'

// The dark closing band that ends every page. One primary action.
export default function CTABand({
  eyebrow = 'Get started',
  title = 'Set up your free 15-minute discovery call.',
  body = 'Tell us where you want to grow. We will come back with a plan, whether or not you run it with us.',
  cta = 'Book a free discovery call',
  secondary,
}) {
  const glow = useGlow()
  return (
    <section className="cta-band has-glow" ref={glow}>
      <span className="glow-layer" aria-hidden="true" />
      <div className="container cta-band__inner">
        <p className="eyebrow eyebrow--light reveal">{eyebrow}</p>
        <h2 className="cta-band__title reveal" style={{ '--delay': '60ms' }}>{title}</h2>
        <p className="cta-band__body reveal" style={{ '--delay': '110ms' }}>{body}</p>
        <div className="cta-band__actions reveal" style={{ '--delay': '160ms' }}>
          <Magnetic>
            <a className="btn btn-accent btn-lg" href={bookHref} {...bookAttrs}>
              {cta} <ArrowRight />
            </a>
          </Magnetic>
          {secondary && (
            <a className="btn btn-outline-light btn-lg" href={secondary.to}>{secondary.label}</a>
          )}
        </div>
      </div>
    </section>
  )
}
