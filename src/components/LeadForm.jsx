import { useState } from 'react'
import { ArrowRight, Check } from './Icons'
import { submitForm } from '../lib/submitForm'
import { leadFormFor, originParam, currentPathname, LEAD_FORM_ESTATE } from '../lib/leadRouting'
import { COMPANY } from '../config'
import { SERVICES } from '../data/site'

// Reusable lead-capture form. Submissions go to the endpoint configured in
// src/config.js, or to Netlify Forms as a fallback.
const FIELD_DEFS = {
  name: { label: 'Your name', type: 'text', required: true, ph: 'Jane Doe' },
  company: { label: 'Company', type: 'text', ph: 'Acme B.V.' },
  email: { label: 'Email', type: 'email', required: true, ph: 'jane@acme.com' },
  phone: { label: 'Phone', type: 'tel', ph: '+34 …' },
  interest: {
    label: 'What are you interested in?',
    type: 'select',
    options: [
      ['not-sure', 'Not sure yet, help me work it out'],
      ...SERVICES.map((s) => [s.slug, s.title]),
      // These two route the submission to the property and charter form, so
      // the values have to stay in step with ESTATE_INTERESTS in leadRouting.
      ['real-estate', 'Real estate content'],
      ['yachting', 'Yachting and charter content'],
      ['everything', 'A combination of the above'],
    ],
  },
  message: {
    label: 'Where do you want to grow?',
    type: 'textarea',
    required: true,
    ph: 'A sentence or two is plenty.',
  },
}

// Turns what someone already typed into a ready-to-send email. A failed form
// usually means retyping everything into a blank message, which most people
// will not do, so the lead dies with the request.
function mailtoFallback(to, subject, data) {
  if (!data) return `mailto:${to}`
  const body = Object.entries(data)
    .filter(([k, v]) => k !== 'bot-field' && String(v).trim())
    .map(([k, v]) => `${k.replace(/^quiz_/, 'Q: ').replace(/_/g, ' ')}: ${v}`)
    .join('\n')
  return `mailto:${to}?subject=${encodeURIComponent(`Aspire website: ${subject}`)}&body=${encodeURIComponent(body)}`
}

// Fields that sit nicely two-up on wide screens.
const PAIR = new Set(['name', 'company', 'email', 'phone'])

export default function LeadForm({
  fields = ['name', 'company', 'email', 'phone', 'interest', 'message'],
  submitLabel = 'Book my free discovery call',
  note = 'We never share your details. Your first call is free and there is no obligation.',
  successTitle = 'Thank you, that is with us.',
  successBody = 'Elena will be in touch within one business day to book your free 15-minute call. Talk soon.',
  source = 'contact',
  hidden,
  // Overrides the routing below. Left unset everywhere so far: the three
  // rules in leadRouting already resolve the quiz to the default form.
  formName,
  // When set, the caller renders what happens next instead of the built in
  // confirmation. The quiz uses it to show the plan in place of a thank you.
  onSuccess,
}) {
  const [sent, setSent] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | error
  // Kept so a failed send can still be rescued as a pre-filled email rather
  // than asking someone to type everything a second time.
  const [typed, setTyped] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setStatus('sending')
    // Decided at submit time, not at render: the interest select is one of the
    // three things that can route an enquiry, and it is only known now.
    const from = originParam()
    const target =
      formName ||
      leadFormFor({ path: currentPathname(), from, interest: data.interest })
    const res = await submitForm(
      {
        _subject: `Aspire website: ${submitLabel}`,
        source,
        // Only the estate form declares `from`, and Netlify drops undeclared
        // fields, so there is nothing to record on the default form.
        ...(target === LEAD_FORM_ESTATE && from ? { from } : {}),
        ...data,
      },
      { formName: target }
    )
    if (res.ok) {
      setStatus('idle')
      if (onSuccess) onSuccess({ delivered: true })
      else setSent(true)
    } else {
      // Delivery is our problem, not the visitor's. Where the form buys
      // something — the quiz trades an email for a plan — hand over what was
      // promised anyway and say plainly that we could not file their details.
      // Withholding it would punish them for our outage and lose the lead
      // twice over.
      setTyped(data)
      if (onSuccess) onSuccess({ delivered: false })
      else setStatus('error')
    }
  }

  if (sent) {
    return (
      <div className="form-success">
        <span className="form-success__check"><Check size={22} /></span>
        <h3>{successTitle}</h3>
        <p>{successBody}</p>
      </div>
    )
  }

  // Group paired fields into rows for a tidy layout.
  const rows = []
  let buffer = []
  fields.forEach((f) => {
    if (PAIR.has(f)) {
      buffer.push(f)
      if (buffer.length === 2) { rows.push(buffer); buffer = [] }
    } else {
      if (buffer.length) { rows.push(buffer); buffer = [] }
      rows.push([f])
    }
  })
  if (buffer.length) rows.push(buffer)

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {/* Netlify spam honeypot. Bots fill every field they find; humans never
          see this one, so any submission with it filled is discarded at the
          edge. Hidden via CSS rather than [hidden] so it is still submitted,
          and taken out of the a11y tree so nobody tabs into an unlabelled
          input. */}
      <p className="sr-only" aria-hidden="true">
        <label>
          Do not fill this in
          <input type="text" name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      {hidden &&
        Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}

      {rows.map((row, i) => (
        <div key={i} className={row.length === 2 ? 'field-row' : ''}>
          {row.map((f) => (
            <Field key={f} name={f} def={FIELD_DEFS[f]} />
          ))}
        </div>
      ))}

      <button className="btn btn-accent btn-lg contact-form__submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : submitLabel}
        {status !== 'sending' && <ArrowRight />}
      </button>

      {status === 'error' && (
        <p className="form-error" role="alert">
          We could not send that from here. Nothing you typed is lost —{' '}
          <a href={mailtoFallback(COMPANY.email, submitLabel, typed)}>
            send it as an email instead
          </a>
          , already filled in, or try again.
        </p>
      )}
      {note && <p className="form-note">{note}</p>}
    </form>
  )
}

function Field({ name, def }) {
  const id = `lf-${name}`
  return (
    <div className="field">
      <label htmlFor={id}>
        {def.label}
        {def.required && <span aria-hidden="true" className="req"> *</span>}
      </label>
      {def.type === 'textarea' ? (
        <textarea id={id} name={name} rows="4" placeholder={def.ph} required={def.required} />
      ) : def.type === 'select' ? (
        <select id={id} name={name} defaultValue={def.options[0][0]}>
          {def.options.map(([v, label]) => (
            <option key={v} value={v}>{label}</option>
          ))}
        </select>
      ) : (
        <input id={id} name={name} type={def.type} placeholder={def.ph} required={def.required} />
      )}
    </div>
  )
}
