import { useEffect, useState } from 'react'
import Logo from './Logo'
import { ArrowRight } from './Icons'
import { bookHref, bookAttrs } from '../config'
import { SERVICES } from '../data/site'
import { ESTATE, AI } from '../data/verticals'

// A blurb that is already a single sentence keeps its own full stop; appending
// one unconditionally produced "…and Instagram.." in the menu.
const firstSentence = (t) => {
  const i = t.indexOf('. ')
  return i === -1 ? t : t.slice(0, i + 1)
}

// Navigation is four top level items, not six.
//
// Everything Aspire sells lives under one "Services" panel, split into two
// labelled groups: the four growth disciplines that apply to any client, and
// the two specialisms that only some clients need. Real Estate and AI Systems
// previously sat both inside the dropdown and beside it, which is why the bar
// read as a list rather than a structure.
const NAV = [
  {
    type: 'mega',
    label: 'Services',
    to: '/services',
    // Any path under these lights the Services item as current.
    match: (p) => p.startsWith('/services') || p === `/${ESTATE.slug}` || p === `/${AI.slug}`,
    columns: [
      {
        heading: 'Growth services',
        note: 'Run together or on their own',
        items: SERVICES.map((s) => ({
          to: `/services/${s.slug}`,
          label: s.nav,
          desc: firstSentence(s.blurb),
        })),
      },
      {
        heading: 'Specialisms',
        note: 'Where we go deeper',
        items: [
          { to: `/${ESTATE.slug}`, label: `${ESTATE.nav} and yachting`, desc: ESTATE.navDesc },
          { to: `/${AI.slug}`, label: AI.nav, desc: AI.navDesc },
        ],
      },
    ],
    featured: { to: '/services', label: 'How the four disciplines work as one plan' },
  },
  { type: 'link', to: '/work', label: 'Work' },
  { type: 'link', to: '/about', label: 'About' },
  { type: 'link', to: '/contact', label: 'Contact' },
]

function Caret() {
  return (
    <svg className="caret" width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Nav({ path, onDark = false }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [path])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (to) => path === to
  const overDark = onDark && !scrolled && !open

  const MenuLink = ({ it }) => (
    <a href={it.to} role="menuitem" className={`nav__menu-link ${isActive(it.to) ? 'is-active' : ''}`}>
      <span className="nav__menu-label">{it.label}</span>
      {it.desc && <span className="nav__menu-desc">{it.desc}</span>}
    </a>
  )

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''} ${open ? 'nav--open' : ''} ${overDark ? 'nav--over-dark' : ''}`}>
      <div className="nav__inner container">
        <Logo onDark={overDark} />

        <nav className="nav__links" aria-label="Primary">
          {NAV.map((n) =>
            n.type === 'link' ? (
              <a key={n.to} href={n.to} className={`nav__link ${isActive(n.to) ? 'is-active' : ''}`}>
                {n.label}
              </a>
            ) : (
              <div className="nav__group nav__group--mega" key={n.label}>
                <a href={n.to} className={`nav__link nav__trigger ${n.match(path) ? 'is-active' : ''}`} aria-haspopup="true">
                  {n.label}
                  <Caret />
                </a>
                <div className="nav__menu nav__menu--mega" role="menu">
                  <div className="nav__menu-inner">
                    <div className="nav__mega">
                      {n.columns.map((col) => (
                        <div className="nav__mega-col" key={col.heading}>
                          <div className="nav__mega-h">
                            {col.heading}
                            {col.note && <span>{col.note}</span>}
                          </div>
                          {col.items.map((it) => <MenuLink it={it} key={it.to} />)}
                        </div>
                      ))}
                    </div>
                    {n.featured && (
                      <a href={n.featured.to} className="nav__mega-featured">
                        {n.featured.label} <ArrowRight size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </nav>

        <div className="nav__actions">
          <a className="btn btn-accent btn-sm nav__cta" href={bookHref} {...bookAttrs}>
            Book a free call <ArrowRight />
          </a>
          <button
            className="nav__burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      {/* Mobile drawer: the same two groups, so the structure is identical on
          both, rather than a flat list on small screens. */}
      <div className="nav__drawer" role="dialog" aria-modal="true" aria-hidden={!open}>
        <div className="nav__drawer-scroll">
          {NAV.filter((n) => n.type === 'mega').map((n) =>
            n.columns.map((col) => (
              <div className="nav__drawer-group" key={col.heading}>
                <div className="nav__drawer-h">{col.heading}</div>
                {col.items.map((it, i) => (
                  <a key={it.to} href={it.to} className={`nav__drawer-link ${isActive(it.to) ? 'is-active' : ''}`} style={{ '--i': i }}>
                    {it.label}
                  </a>
                ))}
              </div>
            ))
          )}
          <div className="nav__drawer-group">
            <div className="nav__drawer-h">Company</div>
            {NAV.filter((n) => n.type === 'link').map((n, i) => (
              <a key={n.to} href={n.to} className={`nav__drawer-link ${isActive(n.to) ? 'is-active' : ''}`} style={{ '--i': i }}>
                {n.label}
              </a>
            ))}
          </div>
        </div>
        <a className="btn btn-accent nav__drawer-cta" href={bookHref} {...bookAttrs}>
          Book a free call <ArrowRight />
        </a>
        <div className="nav__drawer-meta">Sales and marketing for B2B tech, Barcelona</div>
      </div>
      <button
        className="nav__scrim"
        aria-label="Close menu"
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
    </header>
  )
}
