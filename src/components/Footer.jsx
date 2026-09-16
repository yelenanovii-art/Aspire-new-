import Logo from './Logo'
import { SOCIAL, COMPANY } from '../config'
import { LinkedIn, Instagram, YouTube, Mail, Phone, Pin } from './Icons'
import { SERVICES } from '../data/site'
import { ESTATE, AI } from '../data/verticals'
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
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo onDark size="lg" />
            <p>Your sales &amp; marketing partner. We help you get new clients and grow your name.</p>
          </div>
          <div className="footer__social" role="group" aria-label="Aspire on social media">
            <Social href={SOCIAL.linkedin} label="Aspire on LinkedIn"><LinkedIn /></Social>
            <Social href={SOCIAL.instagram} label="Aspire on Instagram"><Instagram /></Social>
            <Social href={SOCIAL.youtube} label="Aspire on YouTube"><YouTube /></Social>
          </div>
        </div>

        <div className="footer__cols">
          <nav className="footer__col" aria-label="Services">
            <h3 className="footer__col-h">Services</h3>
            {SERVICES.map((s) => (
              <a key={s.slug} href={`/services/${s.slug}`}>{s.nav}</a>
            ))}
            <a href={`/${ESTATE.slug}`}>{ESTATE.nav} and yachting</a>
            <a href={`/${AI.slug}`}>{AI.nav}</a>
          </nav>

          <nav className="footer__col" aria-label="Company">
            <h3 className="footer__col-h">Company</h3>
            <a href="/work">Our work</a>
            <a href="/about">About Aspire</a>
            <a href="/contact">Get started</a>
            <a href="/services">All services</a>
          </nav>

          <div className="footer__col footer__col--contact">
            <h3 className="footer__col-h">Get in touch</h3>
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
          <span className="footer__reg">Reg. {COMPANY.registration}</span>
          <a href="/privacy">Privacy</a>
          <a href="/terms">Terms</a>
          <a href="/cookies">Cookies</a>
          <button type="button" className="footer__cookie-btn" onClick={openCookieSettings}>
            Cookie settings
          </button>
        </span>
      </div>
    </footer>
  )
}
