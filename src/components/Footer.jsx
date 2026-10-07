import Logo from './Logo'
import { useState } from 'react'
import { SOCIAL, COMPANY } from '../config'
import { LinkedIn, Mail, Phone, Pin } from './Icons'
import { SERVICES } from '../data/site'
import { ESTATE, AI, TECH } from '../data/verticals'
import { openCookieSettings } from '../lib/consent'

// One footer social button. Renders a live link when its URL is configured in
// src/config.js; until then it stays visible but inert, so no dead link ships —
// it activates automatically once the URL is filled in.
function Social({ href, label, children }) {
  if (!href) {
    return (
      <span className="footer__social-btn is-pending" aria-disabled="true" title="Link coming soon" aria-label={`${label}, link coming soon`}>
        {children}
      </span>
    )
  }
  return (
    <a className="footer__social-btn" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
      {children}
    </a>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()
  // Phones only: the CSS hides the links and shows the control below 680px,
  // so on a desktop this state is simply never read.
  const [openServices, setOpenServices] = useState(false)
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo onDark size="lg" />
            <p>The outsourced sales and marketing team for B2B tech companies.</p>
          </div>
          <div className="footer__social" role="group" aria-label="Aspire on social media">
            {/* Only the profiles that exist. Two inert icons promised accounts
                that are not there, which costs more trust than the icons buy.
                Fill in VITE_SOCIAL_INSTAGRAM or _YOUTUBE and add the line back. */}
            <Social href={SOCIAL.linkedin} label="Aspire on LinkedIn"><LinkedIn /></Social>
          </div>
        </div>

        <div className="footer__cols">
          <nav className={`footer__col footer__col--fold ${openServices ? 'is-open' : ''}`} aria-label="Services">
            {/* Nine links is most of the footer on a phone. Folded there,
                always open on a desktop, where there is room. */}
            <span
              className="footer__col-h footer__col-toggle"
              role="button"
              tabIndex={0}
              aria-expanded={openServices}
              onClick={() => setOpenServices((v) => !v)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenServices((v) => !v) } }}
            >
              Services
            </span>
            {SERVICES.map((s) => (
              <a key={s.slug} href={`/services/${s.slug}/`}>{s.nav}</a>
            ))}
            <a href={`/${TECH.slug}/`}>{TECH.nav}</a>
            <a href={`/${ESTATE.slug}/`}>{ESTATE.nav} and Yachting</a>
            <a href={`/${AI.slug}/`}>{AI.nav}</a>
          </nav>

          <nav className="footer__col" aria-label="Company">
            <span className="footer__col-h">Company</span>
            <a href="/work/">Our work</a>
            <a href="/about/">About Aspire</a>
            <a href="/insights/">Insights</a>
            <a href="/contact/">Get started</a>
            <a href="/services/">All services</a>
          </nav>

          <div className="footer__col footer__col--contact">
            <span className="footer__col-h">Get in touch</span>
            <a href={`mailto:${COMPANY.email}`}><Mail /> {COMPANY.email}</a>
            <a href={`tel:${COMPANY.phoneHref}`}><Phone /> {COMPANY.phone}</a>
            <span className="footer__addr">
              <Pin />
              <span>
                {COMPANY.street}<br />
                {COMPANY.postalCode} {COMPANY.city}, {COMPANY.country}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="container footer__base">
        <span>© {year} {COMPANY.name}. All rights reserved.</span>
        <span className="footer__base-links">
          <span className="footer__reg">VAT {COMPANY.registration}</span>
          <a href="/privacy/">Privacy</a>
          <a href="/terms/">Terms</a>
          <a href="/cookies/">Cookies</a>
          <button type="button" className="footer__cookie-btn" onClick={openCookieSettings}>
            Cookie settings
          </button>
        </span>
      </div>
    </footer>
  )
}
