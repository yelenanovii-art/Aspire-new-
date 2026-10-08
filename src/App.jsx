import { Suspense, lazy, useEffect } from 'react'
import { useRoute } from './hooks/useRoute'
import { useReveal } from './hooks/useReveal'
import { useSeo } from './hooks/useSeo'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
const Services = lazy(() => import('./pages/Services'))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'))
const Work = lazy(() => import('./pages/Work'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
import { Privacy, Terms, Cookies } from './pages/Legal'
const NotFound = lazy(() => import('./pages/NotFound'))
const RealEstate = lazy(() => import('./pages/RealEstate'))
const AiSystems = lazy(() => import('./pages/AiSystems'))
const Tech = lazy(() => import('./pages/Tech'))
const GtmQuizPage = lazy(() => import('./pages/GtmQuizPage'))
const Fit = lazy(() => import('./pages/Fit'))
const CaseStudy = lazy(() => import('./pages/CaseStudy'))
const Insights = lazy(() => import('./pages/Insights'))
const Article = lazy(() => import('./pages/Article'))
const Book = lazy(() => import('./pages/Book'))
const ThankYou = lazy(() => import('./pages/ThankYou'))
import BookBar from './components/BookBar'
import { initAnalytics, trackBookingClicks } from './lib/analytics'
import AiPromo from './components/AiPromo'
import CookieConsent from './components/CookieConsent'
import { SERVICES } from './data/site'
import { CASE_SLUGS, INSIGHT_SLUGS } from './data/slugs'

// One entry per crawlable URL. The four service pages share a single component
// and are generated from the content data, so adding a service to
// src/data/site.js adds its route, its nav entry and its footer link.
const ROUTES = {
  '/fit': Fit,
  '/': Home,
  '/services': Services,
  '/real-estate': RealEstate,
  '/ai-systems': AiSystems,
  '/tech': Tech,
  '/services/go-to-market/quiz': GtmQuizPage,
  '/work': Work,
  '/about': About,
  '/contact': Contact,
  '/book': Book,
  '/thank-you': ThankYou,
  '/privacy': Privacy,
  '/terms': Terms,
  '/cookies': Cookies,
  ...Object.fromEntries(
    SERVICES.map((s) => [`/services/${s.slug}`, () => <ServiceDetail service={s} />])
  ),
  ...Object.fromEntries(CASE_SLUGS.map((slug) => [`/work/${slug}`, () => <CaseStudy slug={slug} />])),
  '/insights': Insights,
  ...Object.fromEntries(INSIGHT_SLUGS.map((slug) => [`/insights/${slug}`, () => <Article slug={slug} />])),
}

// Old URLs from the previous site, redirected to their canonical page so
// nothing that is already linked or indexed 404s.
const REDIRECTS = {
  '/home': '/',
  '/our-work': '/work',
  '/about-us': '/about',
  '/get-started': '/contact',
  '/services/in-person-digital-sales': '/services/sales',
  '/services/sales-digital-sales': '/services/sales',
  '/services/social-media-management': '/services/social-media',
  '/services/content': '/services/content-creation',
  '/privacy-policy': '/privacy',
  '/terms-conditions': '/terms',
  '/terms-and-conditions': '/terms',
  '/cookie-policy': '/cookies',
  '/realestate': '/real-estate',
  '/real-estate-yachting': '/real-estate',
  '/yachting': '/real-estate',
  '/ai': '/ai-systems',
}

// Pages whose hero is dark, so the nav renders light until it is scrolled.
const DARK_HERO = new Set(['/', '/ai-systems', '/real-estate'])

export default function App() {
  const path = useRoute()
  const redirect = REDIRECTS[path]

  useEffect(() => {
    if (redirect) window.history.replaceState({}, '', redirect)
  }, [redirect])

  const activePath = redirect || path
  const known = Boolean(ROUTES[activePath])

  // One listener for every booking CTA on the site, and the loader that only
  // fires for visitors who chose analytics.
  useEffect(() => {
    const stopInit = initAnalytics()
    const stopClicks = trackBookingClicks()
    return () => { if (stopInit) stopInit(); if (stopClicks) stopClicks() }
  }, [])

  useReveal(activePath)
  useSeo(activePath, known)

  const Page = ROUTES[activePath] || NotFound

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollProgress />
      <Nav path={activePath} onDark={DARK_HERO.has(activePath)} />
      <main id="main">
        {/* Nothing is rendered in place of a page while its chunk arrives. The
            HTML is prerendered, so on a cold load the content is already on
            screen and this only covers an in-app navigation, where a flash of
            a spinner is worse than a beat of the previous page. */}
        <Suspense fallback={null}>
          <Page />
        </Suspense>
      </main>
      <Footer />
      <CookieConsent />
      {/* Page scoped: it reads the route and shows itself only on the pages
          named in src/data/aiPromo.js. */}
      <AiPromo path={activePath} />
      <BookBar path={activePath} />
    </div>
  )
}
