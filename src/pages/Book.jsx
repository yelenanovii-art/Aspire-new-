import { useEffect, useState } from 'react'
import { ArrowRight } from '../components/Icons'
import { BOOKING_URL, COMPANY } from '../config'

// A first-party step in front of the booking calendar.
//
// Every booking CTA used to hand straight off to calendar.app.google, so the
// one action the site exists to produce happened somewhere we cannot see.
// Netlify Analytics reads the server log, which means it can count a request
// for a page on this domain and nothing at all about a click that leaves it.
//
// So /book is a real page that returns 200, gets counted, and then sends the
// visitor on. The cost is a few hundred milliseconds; the gain is knowing how
// many people actually reach the calendar.
//
// It is noindex (see useSeo) and kept out of the sitemap: it is a turnstile,
// not a page anyone should land on from search.
const PRERENDER =
  typeof navigator !== 'undefined' && /HeadlessChrome|jsdom/i.test(navigator.userAgent)

export default function Book() {
  // Shown only if the redirect has not happened within a moment, so a visitor
  // is never looking at a dead end.
  const [slow, setSlow] = useState(false)

  useEffect(() => {
    // The prerender loads this route in headless Chrome to write its HTML. Let
    // it redirect and the build captures Google's calendar instead of this
    // page, so the guard is what makes the static file exist at all.
    if (PRERENDER || !BOOKING_URL) return undefined
    const t = window.setTimeout(() => {
      // replace(), not assign(): Back should return to the page the visitor
      // came from, not bounce them through the turnstile again.
      window.location.replace(BOOKING_URL)
    }, 60)
    const slowTimer = window.setTimeout(() => setSlow(true), 1500)
    return () => { window.clearTimeout(t); window.clearTimeout(slowTimer) }
  }, [])

  return (
    <section className="section book">
      <div className="container container--narrow">
        <p className="eyebrow">Discovery call</p>
        <h1 className="book__h">Opening your calendar.</h1>
        <p className="book__p">
          Fifteen minutes, free, no obligation. You will leave the call knowing what we
          would do first.
        </p>

        {BOOKING_URL ? (
          <a className="btn btn-accent btn-lg book__cta" href={BOOKING_URL} rel="noopener noreferrer">
            {slow ? 'Open the calendar' : 'Continue to the calendar'} <ArrowRight />
          </a>
        ) : (
          <a className="btn btn-accent btn-lg book__cta" href="/contact">
            Send us a message instead <ArrowRight />
          </a>
        )}

        <p className="book__alt">
          Would rather write? <a className="link-arrow" href="/contact">Use the contact form</a> or
          email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
        </p>
      </div>
    </section>
  )
}
