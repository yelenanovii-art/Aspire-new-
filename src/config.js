// ── Where form submissions are sent ─────────────────────────────────────────
// Paste a Formspree / Web3Forms endpoint between the quotes, e.g.
//   export const FORM_ENDPOINT = 'https://formspree.io/f/abcdwxyz'
// (Or set VITE_FORM_ENDPOINT in a .env.local file instead of editing here.)
//
// Until this is set, forms fall back to Netlify Forms on a deployed Netlify
// site, and on the plain Vite dev server they show the success state WITHOUT
// sending anything — safe for preview. See README, "Wiring the forms".
export const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''

// ── Canonical site origin (no trailing slash) ───────────────────────────────
// Used for canonical URLs, Open Graph URLs, sitemap.xml and structured data.
// Apex, not www. Netlify serves the apex and 301s www to it, so a www
// canonical pointed every page at a URL that redirects. This string drives
// canonicals, OG urls, the sitemap and the structured data, so it has to match
// the host that actually answers 200.
export const SITE_URL = 'https://aspireagencymarketing.com'

// ── "Book a free discovery call" destination ────────────────────────────────
// Drop in a Calendly / Cal.com / Google Calendar scheduling link and every
// primary CTA on the site points at it instead of the contact form. Until a
// real URL is set, all CTAs fall back to the working /contact page — never a
// dead or placeholder link.
const BOOKING_URL_RAW =
  import.meta.env.VITE_BOOKING_URL || 'https://calendar.app.google/NsYNjAokyEy1Nfj58'
const isPlaceholder = (u) => !u || /your-|example|placeholder|calendly\.com\/$/i.test(u)
export const BOOKING_URL = isPlaceholder(BOOKING_URL_RAW) ? '' : BOOKING_URL_RAW

// Convenience for CTA components.
//
// These point at /book rather than at the calendar directly. /book is a real
// page on this domain that forwards to the calendar, which means Netlify
// Analytics counts it: without that step the one action the site exists to
// produce happens off-site and is invisible. BOOKING_URL stays the single
// place the calendar address lives.
export const bookHref = BOOKING_URL ? '/book/' : '/contact/'
// Same tab. It is our own page now, and a new tab would hide the hand-off.
export const bookAttrs = {}

// The same booking action, tagged with where it was clicked, so an enquiry
// finished on /contact still records the page that sent it.
//
// Now that booking goes to a calendar, this only tags the people who take the
// form instead — someone who books a slot never touches our form, so there is
// nothing to carry and nothing to record. That is the right trade (a booked
// meeting beats a form fill) but it does mean the property and charter form
// loses the CTA route into it. The other two routes still hold: a submission
// made on /real-estate, and the two estate options in the interest select.
// ?from= rides along so the referrer in the log says which page sent them.
export const bookHrefFrom = (origin) =>
  BOOKING_URL ? `/book/?from=${encodeURIComponent(origin)}` : `/contact/?from=${encodeURIComponent(origin)}`

// ── Social profiles (footer) ────────────────────────────────────────────────
// Paste the real profile URLs here (or set VITE_SOCIAL_* in .env.local). Until
// one is set the footer still shows the icon but renders it inert rather than
// shipping a dead link — it goes live automatically once filled in.
const cleanSocial = (u) => (!u || /your-|example|placeholder/i.test(u) ? '' : u)
export const SOCIAL = {
  // Public company page, recovered from the Wix site's admin link
  // (company 87186403). Env var still overrides if it ever changes.
  linkedin: cleanSocial(import.meta.env.VITE_SOCIAL_LINKEDIN || 'https://www.linkedin.com/company/87186403/'),
  // LinkedIn is the only account that exists. Instagram and YouTube are kept
  // here so that setting the env var is the whole job if either is ever
  // opened; the footer already leaves the icon out while they are empty, so
  // nothing dead ships in the meantime.
  instagram: cleanSocial(import.meta.env.VITE_SOCIAL_INSTAGRAM || ''),
  youtube: cleanSocial(import.meta.env.VITE_SOCIAL_YOUTUBE || ''),
}

// ── Contact + legal identity, in one place ──────────────────────────────────
// Referenced by the contact page, footer, privacy/terms pages and the
// structured data, so these strings are never duplicated.
export const COMPANY = {
  // `name` must match the Google Business Profile listing and real-world
  // branding exactly, or the listing and the site do not corroborate each
  // other. The registered entity goes in `legalName`, used on the legal pages.
  name: 'Aspire Agency',
  legalName: 'Aspire Agency Marketing',
  founder: 'Elena Novikova',
  email: 'elena.novikova@aspireagencymarketing.com',
  phone: '+34 651 349 497',
  phoneHref: '+34651349497',
  street: 'Rambla de Catalunya 8',
  postalCode: '08007',
  city: 'Barcelona',
  country: 'Spain',
  countryCode: 'ES',
  // Shown on the live site's footer. Verify before launch.
  registration: 'NL 003944570B70',
}

// Optional: extra fields merged into every submission. For Web3Forms, set
// FORM_ENDPOINT to 'https://api.web3forms.com/submit' and put the key here:
//   export const FORM_EXTRA = { access_key: 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' }
export const FORM_EXTRA = {}

// Open the contact form with the interest select already on a value, so a
// visitor who clicked an events CTA is not asked what they are interested in
// immediately after saying so. The value has to match an option in
// FIELD_DEFS.interest, which is generated from SERVICES.
export const contactHrefFor = (interest, from) =>
  `/contact/?interest=${encodeURIComponent(interest)}` +
  (from ? `&from=${encodeURIComponent(from)}` : '')
