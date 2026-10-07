// Plausible, loaded only for visitors who chose analytics.
//
// Cookieless and stores no personal data, so it does not legally need consent
// at all. It is gated anyway, because the banner on this site promises a
// choice and a promise that is not kept is worse than the data is worth. One
// consequence worth knowing: everyone who declines is invisible, which is
// usually a third of visitors. Loading it unconditionally is the GATE
// constant below, and it would be defensible.
import { hasAnalyticsConsent, CONSENT_EVENT } from './consent'

// The site-specific script from the Plausible dashboard. The site is encoded
// in the filename, so there is no data-domain attribute on this version, and
// what it tracks (outbound links, file downloads) is configured in Plausible
// rather than by swapping the filename. Public by design: it ships in the page.
const SRC = 'https://plausible.io/js/pa-UmQfeaiPLoEZRv8c0ZZ6j.js'
const GATE = true

// The prerender would otherwise ship the script tag inside every static file
// and count a pageview for every route at build time.
const isPrerender = () =>
  typeof navigator !== 'undefined' && /HeadlessChrome|jsdom/i.test(navigator.userAgent)

let loaded = false

function load() {
  if (loaded || isPrerender() || typeof document === 'undefined') return
  if (document.querySelector(`script[src="${SRC}"]`)) { loaded = true; return }
  loaded = true

  // Plausible's own stub, verbatim from the dashboard snippet. Calls made
  // before the script arrives are queued on .q and replayed, so track() never
  // has to wait or drop an event.
  window.plausible =
    window.plausible ||
    function stub() {
      ;(window.plausible.q = window.plausible.q || []).push(arguments)
    }
  window.plausible.init =
    window.plausible.init ||
    function initStub(i) {
      window.plausible.o = i || {}
    }
  window.plausible.init()

  const s = document.createElement('script')
  s.async = true
  s.src = SRC
  document.head.appendChild(s)
}

// Called once from App. Loads now if the choice is already made, and listens
// in case it is made later in the same visit.
export function initAnalytics() {
  if (!GATE || hasAnalyticsConsent()) load()
  if (typeof window === 'undefined') return undefined
  const onChoice = (e) => { if (!GATE || e.detail?.analytics === true) load() }
  window.addEventListener(CONSENT_EVENT, onChoice)
  return () => window.removeEventListener(CONSENT_EVENT, onChoice)
}

// One conversion. Silent and harmless when nothing is loaded, so call sites
// never need to know whether analytics are on.
export function track(name, props = {}) {
  if (isPrerender()) return
  if (GATE && !hasAnalyticsConsent()) return
  load()
  const clean = Object.fromEntries(
    Object.entries(props).filter(([, v]) => v !== undefined && v !== null && v !== '')
  )
  try {
    window.plausible?.(name, Object.keys(clean).length ? { props: clean } : undefined)
  } catch {
    /* A measurement must never break the thing being measured. */
  }
}

// Where on the page a control was, derived from its surroundings rather than
// from a data attribute on every button. Adding a CTA anywhere is then still
// just a CTA, with no tagging to remember.
const ZONES = [
  ['nav', '.nav'],
  ['mobile-menu', '.nav__drawer'],
  ['hero', '.hero, .page-hero'],
  ['popup', '.promo, .pbp'],
  ['closing-cta', '.cta-band'],
  ['quiz-band', '.quizcta'],
  ['footer', 'footer, .footer'],
]

function zoneOf(el) {
  for (const [name, sel] of ZONES) if (el.closest(sel)) return name
  return 'body'
}

// Every booking CTA points at /book, so one delegated listener catches all of
// them, including any added later.
export function trackBookingClicks() {
  if (typeof document === 'undefined') return undefined
  const onClick = (e) => {
    const a = e.target instanceof Element ? e.target.closest('a[href^="/book"]') : null
    if (!a) return
    track('booking_click', {
      path: window.location.pathname,
      position: zoneOf(a),
      from: new URL(a.href, window.location.origin).searchParams.get('from') || '',
    })
  }
  document.addEventListener('click', onClick, true)
  return () => document.removeEventListener('click', onClick, true)
}
