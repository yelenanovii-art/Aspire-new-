import { useState } from 'react'
import { ArrowRight, Check } from './Icons'
import { submitForm } from '../lib/submitForm'
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
}) {
  const [sent, setSent] = useState(false)
  const [status, setStatus] = useState('idle') // idle | sending | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    setStatus('sending')
    const res = await submitForm(
      { _subject: `Aspire website: ${submitLabel}`, source, ...data },
      { formName: 'aspire-lead' }
    )
    if (res.ok) {
      setStatus('idle')
      setSent(true)
    } else {
      setStatus('error')
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
          Something went wrong sending that. Please try again, or email{' '}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> directly.
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
