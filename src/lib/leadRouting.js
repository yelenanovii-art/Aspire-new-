// Which Netlify form a submission belongs to.
//
// Netlify stores submissions per form name, so routing the property and
// charter enquiries to their own form keeps that pipeline separate in the
// dashboard and in notifications, rather than filtered out of one pile by eye.
//
// Both names are declared statically in index.html. Netlify only detects forms
// at build time and only stores fields that appear in those declarations, so a
// name or field added here without the matching declaration is silently
// dropped on submit.
export const LEAD_FORM = 'aspire-lead'
export const LEAD_FORM_ESTATE = 'aspire-lead-real-estate'

// Interest values that belong to the property and charter practice. These are
// the option keys in LeadForm's interest select.
const ESTATE_INTERESTS = new Set(['real-estate', 'yachting'])

// The value carried on a CTA as ?from=, and matched back here.
export const ESTATE_ORIGIN = 'real-estate'

// Three ways an enquiry counts as coming from that side of the business:
// it was sent from the page itself, it came from a CTA on that page and was
// finished on /contact, or the sender picked one of its interests.
export function isEstateLead({ path = '', from = '', interest = '' } = {}) {
  if (path === `/${ESTATE_ORIGIN}` || path.startsWith(`/${ESTATE_ORIGIN}/`)) return true
  if (from === ESTATE_ORIGIN) return true
  return ESTATE_INTERESTS.has(interest)
}

export function leadFormFor(context) {
  return isEstateLead(context) ? LEAD_FORM_ESTATE : LEAD_FORM
}

// The ?from= on the URL being viewed. Guarded for the prerender pass, which
// runs this module with no window.
export function originParam() {
  if (typeof window === 'undefined') return ''
  return new URLSearchParams(window.location.search).get('from') || ''
}

export function currentPathname() {
  if (typeof window === 'undefined') return ''
  const p = window.location.pathname || '/'
  return p.length > 1 && p.endsWith('/') ? p.slice(0, -1) : p
}
