import { useEffect, useState } from 'react'
import { readConsent, writeConsent, REOPEN_EVENT } from '../lib/consent'

// Consent banner. Appears once until a choice is made, and can be reopened from
// the footer. Declining is a single click with the same weight as accepting,
// which is what Spanish and EU guidance actually requires.
export default function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Never render during prerender: the built HTML would ship with the banner
    // baked open on every page, and crawlers would index it as page content.
    if (/HeadlessChrome/i.test(navigator.userAgent)) return
    if (!readConsent()) setOpen(true)
    const reopen = () => setOpen(true)
    window.addEventListener(REOPEN_EVENT, reopen)
    return () => window.removeEventListener(REOPEN_EVENT, reopen)
  }, [])

  if (!open) return null

  const choose = (analytics) => {
    writeConsent(analytics)
    setOpen(false)
  }

  return (
    <div className="consent" role="dialog" aria-live="polite" aria-label="Cookie choices">
      <div className="consent__inner">
        <p className="consent__text">
          We use only what the site needs to work. Nothing is tracked or shared unless you
          choose to allow analytics, which help us see which pages are useful.{' '}
          <a href="/cookies">Read the cookie policy</a>.
        </p>
        <div className="consent__actions">
          <button type="button" className="btn btn-outline-light btn-sm" onClick={() => choose(false)}>
            Essential only
          </button>
          <button type="button" className="btn btn-accent btn-sm" onClick={() => choose(true)}>
            Allow analytics
          </button>
        </div>
      </div>
    </div>
  )
}
