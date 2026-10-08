import { useState } from 'react'
import { ArrowRight, Check } from './Icons'
import { track } from '../lib/analytics'
import { submitForm } from '../lib/submitForm'
import { LEAD_FORM_TECH } from '../lib/leadRouting'
import { TECH_PLAYBOOK as P } from '../data/techPlaybook'
import PlaybookFlip from './PlaybookFlip'

// The trade show guide, behind an email.
//
// Same shape as the property playbook on /real-estate: the cover is the
// control, carrying a lock, and the form arrives once somebody has asked for
// it. Asking to open a thing is a smaller request than filling in a form even
// though it leads to the same place.
//
// The file is served from this domain, so the success state hands it over
// immediately rather than promising an email that has to arrive.
export default function TechPlaybook({ placement }) {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState('idle') // idle | sending | done | error
  const [consent, setConsent] = useState(false)
  const [riffling, setRiffling] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setState('sending')
    const res = await submitForm(
      {
        ...data,
        _subject: 'New B2B tech lead: Trade Show Playbook',
        source: `tech-playbook-${placement}`,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        submitted_at: new Date().toISOString(),
      },
      { formName: LEAD_FORM_TECH }
    )
    // The guide is what they were promised. Our delivery failing is not their
    // problem, so they get it either way and the error only says we could not
    // file their details.
    setState(res.ok ? 'done' : 'error')
    try { window.localStorage.setItem(P.keySubmitted, '1') } catch { /* private window */ }
    track('playbook_download', { path: window.location.pathname, placement, guide: 'trade-show' })
  }

  if (!P.enabled) return null

  return (
    <section className="section pbband">
      <div className="container pbband__inner">
        {open || state === 'done' ? (
          <figure className="pbcover pbband__cover">
            <img
              className="pbcover__img"
              src={P.cover.src}
              srcSet={`${P.cover.src.replace('.webp', '-640.webp')} 640w, ${P.cover.src} ${P.cover.w}w`}
              sizes="(max-width: 859px) 92vw, 520px"
              alt={P.cover.alt}
              width={P.cover.w}
              height={P.cover.h}
              loading="lazy"
              decoding="async"
            />
          </figure>
        ) : (
          <button
            type="button"
            className="pbcover pbcover--locked pbband__cover"
            onClick={() => setOpen(true)}
            onPointerEnter={() => setRiffling(true)}
            onPointerLeave={() => setRiffling(false)}
            onFocus={() => setRiffling(true)}
            onBlur={() => setRiffling(false)}
          >
            <PlaybookFlip pages={P.pages} active={riffling} />
            <span className="pbcover__veil" aria-hidden="true" />
            <span className="pbcover__lock">
              <span className="pbcover__lock-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              <span className="pbcover__lock-label">{P.unlockLabel}</span>
            </span>
          </button>
        )}

        <div className="pbband__body">
          <p className="eyebrow">Free guide</p>
          <h2 className="pbband__title">{P.band.headline}</h2>
          <p className="pbband__sub">{P.band.subline}</p>

          {state === 'done' ? (
            <div className="pbf__done">
              <p className="pbf__done-h"><Check size={18} /> {P.successTitle}</p>
              <a className="btn btn-accent btn-lg pbband__cta" href={P.assetUrl} download>
                {P.downloadLabel} <ArrowRight />
              </a>
            </div>
          ) : open ? (
            <form className="pbf" onSubmit={submit}>
              <p className="pbf__hp" aria-hidden="true">
                <label>Leave this empty<input type="text" name="bot-field" tabIndex={-1} autoComplete="off" /></label>
              </p>
              <div className="field-row">
                <label className="field"><span>First name <span className="req">*</span></span>
                  <input type="text" name="name" required placeholder="Jane" autoComplete="given-name" /></label>
                <label className="field"><span>Work email <span className="req">*</span></span>
                  <input type="email" name="email" required placeholder="jane@acme.com" autoComplete="email" /></label>
              </div>
              <label className="field"><span>Company</span>
                <input type="text" name="company" placeholder="Acme B.V." autoComplete="organization" /></label>
              <label className="pbf__consent">
                <input type="checkbox" name="consent" required value="yes"
                       checked={consent} onChange={(e) => setConsent(e.target.checked)} />
                <span>I agree to Aspire storing my details as described in the <a href="/privacy/">privacy policy</a>.</span>
              </label>
              <button className="btn btn-accent btn-lg pbband__cta" type="submit" disabled={state === 'sending'}>
                {state === 'sending' ? 'Sending…' : P.submitLabel} <ArrowRight />
              </button>
              {state === 'error' && (
                <p className="pbf__err" role="alert">
                  We could not file your details, but the guide is yours:{' '}
                  <a href={P.assetUrl} download>download it here</a>.
                </p>
              )}
              <p className="pbband__note">{P.smallPrint}</p>
            </form>
          ) : (
            <>
              <button type="button" className="btn btn-accent btn-lg pbband__cta" onClick={() => setOpen(true)}>
                {P.unlockLabel} <ArrowRight />
              </button>
              <p className="pbband__note">{P.smallPrint}</p>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
