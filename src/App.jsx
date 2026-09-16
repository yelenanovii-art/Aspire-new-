import { useEffect } from 'react'
import { useRoute } from './hooks/useRoute'
import { useReveal } from './hooks/useReveal'
import { useSeo } from './hooks/useSeo'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Services from './pages/Services'
import ServiceDetail from './pages/ServiceDetail'
import Work from './pages/Work'
import About from './pages/About'
import Contact from './pages/Contact'
import { Privacy, Terms, Cookies } from './pages/Legal'
import NotFound from './pages/NotFound'
import RealEstate from './pages/RealEstate'
import AiSystems from './pages/AiSystems'
import CookieConsent from './components/CookieConsent'
import { SERVICES } from './data/site'

// One entry per crawlable URL. The four service pages share a single component
// and are generated from the content data, so adding a service to
// src/data/site.js adds its route, its nav entry and its footer link.
const ROUTES = {
  '/': Home,
  '/services': Services,
  '/real-estate': RealEstate,
  '/ai-systems': AiSystems,
  '/work': Work,
  '/about': About,
  '/contact': Contact,
  '/privacy': Privacy,
  '/terms': Terms,
  '/cookies': Cookies,
  ...Object.fromEntries(
    SERVICES.map((s) => [`/services/${s.slug}`, () => <ServiceDetail service={s} />])
  ),
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

  useReveal(activePath)
  useSeo(activePath, known)

  const Page = ROUTES[activePath] || NotFound

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollProgress />
      <Nav path={activePath} onDark={DARK_HERO.has(activePath)} />
      <main id="main">
        <Page />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}
