import { useEffect } from 'react'
import { CASE_DETAIL } from '../data/caseDetail'
import { TECH } from '../data/verticals'
import { INSIGHTS } from '../data/insights'
import { SITE_URL } from '../config'
import { SERVICES, CASES } from '../data/site'
import { ESTATE, AI } from '../data/verticals'

// Per-route <title>, meta description, canonical URL, Open Graph and JSON-LD.
// Every route is a real crawlable path with prerendered static HTML, so these
// tags are baked in for crawlers and social / AI link-preview bots.
//
// Service pages derive their meta from src/data/site.js rather than repeating
// it here, so a service is described in exactly one place.
const SERVICE_META = Object.fromEntries(
  SERVICES.map((s) => [`/services/${s.slug}`, { t: s.metaTitle, d: s.metaDesc, k: s.keywords }])
)

// Case studies describe themselves in src/data/caseDetail.js, for the same
// reason the services do: one place per subject.
const CASE_META = Object.fromEntries(
  CASES.map((c) => {
    const d = CASE_DETAIL[c.slug] || {}
    return [
      `/work/${c.slug}`,
      {
        t: d.metaTitle || `${c.client}: ${c.result}`,
        d: d.metaDesc || c.body,
        k: `${c.client}, ${c.sector}, B2B case study, ${c.services.join(', ')}`,
      },
    ]
  })
)

// Articles describe themselves in src/data/insights.js.
const INSIGHT_META = Object.fromEntries(
  INSIGHTS.map((a) => [
    `/insights/${a.slug}`,
    { t: a.metaTitle || a.title, d: a.metaDesc || a.dek, k: a.keywords || a.tags.join(', ') },
  ])
)

const META = {
  '/': {
    t: 'Sales and Marketing for B2B Tech',
    d: 'The outsourced sales and marketing team for B2B tech companies. Five specialists in Barcelona covering sales, events, social, content and go-to-market.',
    k: 'B2B tech marketing agency, sales agency Barcelona, lead generation, social media management',
  },
  '/services': {
    t: 'B2B Sales and Marketing Services',
    d: 'Six services run as one plan: go-to-market, in person and digital sales, events and conferences, business development, social media and content creation.',
    k: 'B2B sales services, business development, social media management, content creation',
  },
  '/work': {
    t: 'Client Cases and Results',
    d: 'Six engagements across fintech, semiconductors, live events, legal and hospitality, including 300 new users onboarded for BUNQ in 2.5 months.',
    k: 'case studies, client results, BUNQ, ISE, SilTest, B2B agency results',
  },
  '/about': {
    t: 'About Aspire and the Team',
    d: 'Founded in Barcelona in 2022. Five specialists covering sales, content, paid acquisition and custom AI systems, working across Europe with B2B tech companies.',
    k: 'about Aspire, Elena Novikova, B2B tech agency Barcelona, marketing team',
  },
  '/fit': {
    t: 'Find Out Where Your Growth Should Start',
    d: 'Six questions that match your company to the growth service to start with, plus a ninety day plan you get on the spot. Free, no obligation.',
    k: 'growth assessment, marketing quiz, which marketing service, B2B growth plan',
  },
  '/contact': {
    t: 'Book a Free 15 Minute Call',
    d: 'Tell us where growth is stuck. We reply within one business day to book your free 15 minute call. No obligation, and you leave with a view either way.',
    k: 'contact Aspire, discovery call, B2B growth consultation Barcelona',
  },
  // Noindex (see below), but it still needs its own title: without an entry
  // here it inherits the home page's, which is what a visitor sees in the tab
  // for the second it is on screen.
  '/book': {
    t: 'Book a Discovery Call',
    d: 'Opening the booking calendar for a free fifteen minute discovery call with Aspire.',
  },
  [`/${ESTATE.slug}`]: { t: ESTATE.metaTitle, d: ESTATE.metaDesc, k: ESTATE.keywords },
  [`/${AI.slug}`]: { t: AI.metaTitle, d: AI.metaDesc, k: AI.keywords },
  '/cookies': {
    t: 'Cookie Policy and Your Choices',
    d: 'What Aspire stores on your device and why. No advertising cookies, no third party trackers, and analytics only if you allow them.',
  },
  '/privacy': {
    t: 'Privacy Policy and Your Data Rights',
    d: 'How Aspire Agency Marketing collects, uses and protects your personal data, how long we keep it, and your rights under the GDPR.',
  },
  '/terms': {
    t: 'Terms of Use for This Website',
    d: 'The terms on which you may use the Aspire Agency Marketing website, including permitted use, intellectual property and limitation of liability.',
  },
  ...SERVICE_META,
  ...CASE_META,
  '/services/go-to-market/quiz': {
    t: 'Go-to-Market Readiness Check',
    d: 'Seven questions that score your go-to-market readiness out of ten, place you on the curve from validation to scale, and return three next steps. Free.',
    k: 'go to market readiness, GTM quiz, market entry assessment, launch readiness',
  },
  '/tech': { t: TECH.metaTitle, d: TECH.metaDesc, k: TECH.keywords },
  '/insights': {
    t: 'Insights on B2B Sales and Marketing',
    d: 'Written pieces on B2B outbound, social for technical audiences, trade shows, CRM and market entry, drawn from the engagements we run.',
    k: 'B2B marketing insights, sales articles, outbound strategy, technical audience marketing',
  },
  ...INSIGHT_META,
}

// One title template for the whole site: META holds the bare page name and the
// hook appends this suffix, so every tab, bookmark and search result ends in
// the identical brand string and any new page inherits it automatically.
const BRAND_SUFFIX = ' | Aspire Agency'

const OG_IMAGE = SITE_URL + '/og.png'
const ORG_ID = SITE_URL + '/#organization'
const SITE_ID = SITE_URL + '/#website'
const SITE_PUBLISHED = '2026-09-01'
const SITE_MODIFIED = '2026-09-11' // bump on major content changes

// Page-scoped JSON-LD injected by individual pages via useJsonLd. Each is owned
// by exactly one route. Because the SPA shell (and any host 404 fallback) is
// served for unmatched URLs, a stale copy can otherwise ride along on the wrong
// page — a structured-data/visible-content mismatch. We strip any whose owner
// is not the current route. Child effects run before this parent effect, so the
// owning page keeps the copy its own component just injected.
const PAGE_SCHEMA_OWNERS = {
  'aspire-home-faq': '/',
  // One FAQPage per service and specialism. The SPA shell is served for any
  // URL that has not been prerendered, so without an owner a block could ride
  // along onto a page whose questions it does not answer.
  'aspire-faq-sales': '/services/sales',
  'aspire-faq-business-development': '/services/business-development',
  'aspire-faq-social-media': '/services/social-media',
  'aspire-faq-content-creation': '/services/content-creation',
  'aspire-faq-events': '/services/events',
  'aspire-faq-tech': '/tech',
  'aspire-gtm-quiz': '/services/go-to-market/quiz',
  'aspire-faq-real-estate': '/real-estate',
  'aspire-faq-ai-systems': '/ai-systems',
  'aspire-person': '/about',
  'aspire-film-video': '/services/content-creation',
  'aspire-team': '/about',
  'aspire-estate-video': '/real-estate',
}

// Readable names for the final breadcrumb crumb.
const SEG_NAME = {
  services: 'Services',
  'real-estate': 'Real Estate and Yachting',
  tech: 'Tech',
  'ai-systems': 'AI Systems',
  cookies: 'Cookie Policy',
  work: 'Our Work',
  about: 'About',
  contact: 'Contact',
  privacy: 'Privacy Policy',
  terms: 'Terms of Use',
  ...Object.fromEntries(SERVICES.map((s) => [s.slug, s.title])),
  // Case slugs are client names in the trail, and none of them collide with a
  // service slug.
  ...Object.fromEntries(CASES.map((c) => [c.slug, c.client])),
  insights: 'Insights',
  quiz: 'Readiness check',
  ...Object.fromEntries(INSIGHTS.map((a) => [a.slug, a.title])),
}

function setMeta(key, value, attr = 'name') {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function setLink(rel, href, hreflang) {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`
  let el = document.head.querySelector(sel)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setJsonLd(id, data) {
  let el = document.getElementById(id)
  if (!el) {
    el = document.createElement('script')
    el.type = 'application/ld+json'
    el.id = id
    document.head.appendChild(el)
  }
  el.textContent = JSON.stringify(data)
}

function crumbName(path) {
  const seg = path.split('/').filter(Boolean).pop()
  return SEG_NAME[seg] || seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

function webpageType(path) {
  if (path === '/contact') return 'ContactPage'
  if (path === '/about') return 'AboutPage'
  if (path === '/work' || path === '/services') return 'CollectionPage'
  return 'WebPage'
}

// Breadcrumbs mirror the URL, so /services/social-media gets all three levels.
function crumbs(path, url) {
  const list = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL + '/' }]
  if (path === '/') return list
  const segs = path.split('/').filter(Boolean)
  segs.forEach((seg, i) => {
    const sub = '/' + segs.slice(0, i + 1).join('/')
    list.push({
      '@type': 'ListItem',
      position: i + 2,
      name: crumbName(sub),
      item: i === segs.length - 1 ? url : SITE_URL + sub,
    })
  })
  return list
}

function buildGraph(path, m, url) {
  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': url + '#breadcrumb',
    itemListElement: crumbs(path, url),
  }
  const webpage = {
    '@type': webpageType(path),
    '@id': url + '#webpage',
    url,
    name: m.t,
    description: m.d,
    inLanguage: 'en',
    isPartOf: { '@id': SITE_ID },
    about: { '@id': ORG_ID },
    primaryImageOfPage: { '@type': 'ImageObject', url: OG_IMAGE },
    breadcrumb: { '@id': url + '#breadcrumb' },
    datePublished: SITE_PUBLISHED,
    dateModified: SITE_MODIFIED,
  }
  const graph = [breadcrumb, webpage]
  if (path.startsWith('/services/') || path === `/${ESTATE.slug}` || path === `/${AI.slug}`) {
    graph.push({
      '@type': 'Service',
      '@id': url + '#service',
      name: crumbName(path),
      serviceType: crumbName(path),
      description: m.d,
      provider: { '@id': ORG_ID },
      areaServed: ['ES', 'EU', 'NL', 'GB'],
      url,
    })
  }
  return { '@context': 'https://schema.org', '@graph': graph }
}

export function useSeo(path, known = true) {
  useEffect(() => {
    const m = META[path] || META['/']
    const url = SITE_URL + (path === '/' ? '/' : path)

    // Google truncates around sixty characters. Eleven pages, all cases and
    // insights, ran past it and lost the end of a real sentence to keep a
    // brand name that is already in the URL and the logo. The suffix is worth
    // having; it is not worth the last five words of the title.
    const bare = known ? m.t : 'Page Not Found'
    document.title = bare.length + BRAND_SUFFIX.length > 60 ? bare : bare + BRAND_SUFFIX
    setMeta('description', known ? m.d : 'The page you are looking for could not be found.')
    setMeta('keywords', (known && m.k) || '')
    // /book forwards to the calendar. Indexing a turnstile puts it in results
    // ahead of the page that explains what the call is for.
    const indexable = known && path !== '/book'
    setMeta('robots', indexable ? 'index, follow, max-image-preview:large, max-snippet:-1' : 'noindex, follow')

    setLink('canonical', url)
    setLink('alternate', url, 'en')
    setLink('alternate', url, 'x-default')

    setMeta('og:url', url, 'property')
    setMeta('og:type', 'website', 'property')
    setMeta('og:title', document.title, 'property')
    setMeta('og:description', known ? m.d : '', 'property')
    setMeta('twitter:title', document.title)
    setMeta('twitter:description', known ? m.d : '')

    setJsonLd('aspire-page-schema', buildGraph(path, m, url))

    // Strip page-scoped schema that belongs to a different route.
    for (const [id, owner] of Object.entries(PAGE_SCHEMA_OWNERS)) {
      if (path !== owner) document.getElementById(id)?.remove()
    }
  }, [path, known])
}

// The prerender script and sitemap both need the canonical route list; deriving
// it from META keeps them in step with the pages that actually exist.
export const ALL_ROUTES = Object.keys(META)
