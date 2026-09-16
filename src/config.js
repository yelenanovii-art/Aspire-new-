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
export const SITE_URL = 'https://www.aspireagencymarketing.com'

// ── "Book a free discovery call" destination ────────────────────────────────
// Drop in a Calendly / Cal.com / Google Calendar scheduling link and every
// primary CTA on the site points at it instead of the contact form. Until a
// real URL is set, all CTAs fall back to the working /contact page — never a
// dead or placeholder link.
const BOOKING_URL_RAW = import.meta.env.VITE_BOOKING_URL || ''
const isPlaceholder = (u) => !u || /your-|example|placeholder|calendly\.com\/$/i.test(u)
export const BOOKING_URL = isPlaceholder(BOOKING_URL_RAW) ? '' : BOOKING_URL_RAW

// Convenience for CTA components: href + the attrs an external link needs.
export const bookHref = BOOKING_URL || '/contact'
export const bookAttrs = BOOKING_URL ? { target: '_blank', rel: 'noopener noreferrer' } : {}

// ── Social profiles (footer) ────────────────────────────────────────────────
// Paste the real profile URLs here (or set VITE_SOCIAL_* in .env.local). Until
// one is set the footer still shows the icon but renders it inert rather than
// shipping a dead link — it goes live automatically once filled in.
const cleanSocial = (u) => (!u || /your-|example|placeholder/i.test(u) ? '' : u)
export const SOCIAL = {
  linkedin: cleanSocial(import.meta.env.VITE_SOCIAL_LINKEDIN || ''),
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
