import { useEffect } from 'react'
import { ArrowRight } from '../components/Icons'
import { track } from '../lib/analytics'
import { COMPANY, BOOKING_URL } from '../config'

// Where a successful submission lands.
//
// The forms used to swap themselves for a success panel in place, which works
// but leaves the conversion invisible to anything that counts pages, and gives
// nobody a URL to point an ad or a report at. A real page is a real event.
//
// noindex: it is the other side of a form, not a page anyone should arrive at
// from search.
export default function ThankYou() {
  useEffect(() => {
    const kind = new URLSearchParams(window.location.search).get('f') || 'contact'
    track('form_submitted', { form: kind, path: '/thank-you/' })
  }, [])

  return (
    <section className="section ty">
      <div className="container container--narrow">
        <p className="eyebrow">Received</p>
        <h1 className="ty__h">That is with us.</h1>
        <p className="ty__p">
          Someone will read it properly and come back within one business day, usually
          sooner. If it is urgent, the calendar below is the fastest route.
        </p>

        <div className="ty__actions">
          {BOOKING_URL && (
            <a className="btn btn-accent btn-lg" href="/book/">
              Book a free 15 minute call <ArrowRight />
            </a>
          )}
          <a className="btn btn-outline btn-lg" href="/work/">See the client cases</a>
        </div>

        <p className="ty__alt">
          Nothing arrived? Email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> and
          we will pick it up from there.
        </p>
      </div>
    </section>
  )
}
