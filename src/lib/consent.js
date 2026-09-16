// Cookie consent state.
//
// The site currently sets no analytics or advertising cookies, so nothing here
// gates a real tracker yet. It exists so that when analytics are added they can
// be switched on ONLY for visitors who chose it, rather than the usual pattern
// of loading the tracker first and showing a banner afterwards.
//
// Storage can throw (private windows, blocked site data, embedded previews), so
// every read and write is guarded and a failure is treated as "no choice made".
const KEY = 'aspire-consent'
export const CONSENT_EVENT = 'aspire:consent'

export function readConsent() {
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return null
    const v = JSON.parse(raw)
    return v && typeof v.analytics === 'boolean' ? v : null
  } catch {
    return null
  }
}

export function writeConsent(analytics) {
  const value = { analytics, at: new Date().toISOString() }
  try {
    window.localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    // A visitor who cannot store the choice simply gets asked again next time,
    // which is the correct failure mode: never assume consent.
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }))
  return value
}

// Call before loading any analytics script.
export const hasAnalyticsConsent = () => readConsent()?.analytics === true

// The footer "Cookie settings" control reopens the banner through this.
export const REOPEN_EVENT = 'aspire:cookie-settings'
export const openCookieSettings = () => window.dispatchEvent(new CustomEvent(REOPEN_EVENT))
