import { useState } from 'react'
import { ArrowRight, Check } from './Icons'
import { submitForm } from '../lib/submitForm'
import { LEAD_FORM_ESTATE } from '../lib/leadRouting'
import { bookHrefFrom, bookAttrs } from '../config'
import { PLAYBOOK as P } from '../data/playbook'

// The playbook form, used by both the pop-up and the end-of-page band.
//
// It posts to aspire-lead-real-estate, the form the property and charter
// pipeline already uses, rather than a new one — that is what keeps the
// existing notification working untouched and keeps Jackson on estate leads
// only. `placement` is what tells the two apart in the dashboard.
export default function PlaybookForm({ placement, onSubmitted }) {
  const [state, setState] = useState('idle') // idle | sending | done | error
  const [consent, setConsent] = useState(false)

  const track = (name) => {
    // No analytics provider is installed yet. Pushing to the dataLayer and
    // firing a DOM event means whichever one is added later picks these up
    // without the form needing to change.
    try {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: name, placement })
      window.dispatchEvent(new CustomEvent(name, { detail: { placement } }))
    } catch { /* analytics must never break a submit */ }
  }

  const handle = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setState('sending')
    const res = await submitForm(
      {
        ...data,
        _subject: 'New Real Estate & Yachting lead: Playbook download',
        source: `playbook-${placement}`,
        from: 'real-estate',
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        submitted_at: new Date().toISOString(),
      },
      { formName: LEAD_FORM_ESTATE }
    )
    track(placement === 'popup' ? 'playbook_popup_submit' : 'playbook_footer_submit')
    // The guide is the thing they were promised. Our delivery failing is not
    // their problem, so they get it either way; the error only says we could
    // not file their details.
    setState(res.ok ? 'done' : 'error')
    try { window.localStorage.setItem(P.keySubmitted, '1') } catch { /* private window */ }
    if (onSubmitted) onSubmitted()
  }

  if (state === 'done' || state === 'error') {
    return (
      <div className="pbf pbf--done">
        <span className="pbf__tick" aria-hidden="true"><Check size={20} /></span>
        <p className="pbf__done-h">{P.successTitle}</p>
        {state === 'error' && (
          <p className="pbf__warn" role="alert">
            Your guide is below either way. We could not file your details from here, so if you
            would like us to follow up, email elena.novikova@aspireagencymarketing.com.
          </p>
        )}
        <a
          className="btn btn-accent btn-lg pbf__dl"
          href={P.assetUrl}
          {...(P.assetIsExternal ? { target: '_blank', rel: 'noopener noreferrer' } : { download: '' })}
        >
          {P.downloadLabel} <ArrowRight />
        </a>
        <a className="link-arrow pbf__second" href={bookHrefFrom('real-estate')} {...bookAttrs}>
          {P.secondaryCta} <ArrowRight size={15} />
        </a>
      </div>
    )
  }

  return (
    <form className="pbf" onSubmit={handle}>
      {/* Honeypot. Netlify is told to watch this field; a human never sees it. */}
      <p className="pbf__hp" aria-hidden="true">
        <label>
          Leave this empty
          <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="pbf__row">
        <label className="field">
          <span>First name <span className="req">*</span></span>
          <input type="text" name="name" required placeholder="Jane" autoComplete="given-name" />
        </label>
        <label className="field">
          <span>Email <span className="req">*</span></span>
          <input type="email" name="email" required placeholder="jane@acme.com" autoComplete="email" />
        </label>
      </div>

      <label className="field">
        <span>I work in <span className="req">*</span></span>
        <select name="market" required defaultValue="">
          <option value="" disabled>Choose one</option>
          {P.markets.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </label>

      <label className="pbf__consent">
        <input
          type="checkbox"
          name="consent"
          required
          checked={consent}
          onChange={(e) => setConsent(e.target.checked)}
          value="yes"
        />
        <span>
          I agree to Aspire sending me the guide and storing my details, as described in the{' '}
          <a href="/privacy">privacy policy</a>.
        </span>
      </label>

      <button className="btn btn-accent btn-lg pbf__submit" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? 'Sending…' : P.submitLabel}
        {state !== 'sending' && <ArrowRight />}
      </button>
      <p className="pbf__print">{P.smallPrint}</p>
    </form>
  )
}
