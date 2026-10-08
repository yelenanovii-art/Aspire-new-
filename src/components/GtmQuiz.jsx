import { useMemo, useRef, useState } from 'react'
import { ArrowRight, Check } from './Icons'
import { submitForm } from '../lib/submitForm'
import { LEAD_FORM } from '../lib/leadRouting'
import { bookHref, bookAttrs } from '../config'
import { GTM_QUESTIONS, GTM_MAX, scoreGtm } from '../data/gtmQuiz'
import { track } from '../lib/analytics'

// Three stages, the same shape as the fit quiz: answer, a gate, then the plan.
// The score and the stage are shown at the gate so there is a reason to hand
// over an address, and the three steps sit behind it.
export default function GtmQuiz() {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [stage, setStage] = useState('quiz') // quiz | gate | plan
  const [sent, setSent] = useState(true)

  const result = useMemo(() => scoreGtm(answers), [answers])
  const q = GTM_QUESTIONS[idx]
  const pct = Math.round((Object.keys(answers).length / GTM_QUESTIONS.length) * 100)


  // After an answer the next question renders above the fold only if the card
  // is already at the top. On a phone it usually is not, so the first thing
  // you see is the bottom of a question you have not read.
  const card = useRef(null)
  const lift = () => {
    const el = card.current
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY - 86
    if (window.scrollY > y) window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const choose = (v) => {
    lift()
    setAnswers({ ...answers, [q.id]: v })
    if (idx + 1 < GTM_QUESTIONS.length) setIdx(idx + 1)
    else setStage('gate')
  }

  const submit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const res = await submitForm(
      {
        ...data,
        _subject: 'Aspire website: GTM readiness check',
        source: 'gtm-quiz',
        gtm_score: `${result.score} of ${GTM_MAX}`,
        gtm_stage: result.stage.name,
        // q_ rather than gtm_: two question ids are "stage" and "market", and
        // under the old prefix the answers overwrote gtm_stage and gtm_market.
        ...Object.fromEntries(GTM_QUESTIONS.map((x) => [`q_${x.id}`, answers[x.id] || ''])),
      },
      { formName: LEAD_FORM }
    )
    setSent(res.ok)
    track('quiz_complete', {
      quiz: 'gtm-readiness',
      result: result.stage.name,
      score: String(result.score),
      type: data.gtm_type,
    })
    setStage('plan')
  }

  // The dial is the fit quiz's, reading out of ten rather than a hundred.
  const dialPct = Math.round((result.score / GTM_MAX) * 100)

  return (
    <div className="quiz" ref={card}>
      <div className="quiz__bar" aria-hidden="true">
        <span className="quiz__bar-fill" style={{ width: `${stage === 'quiz' ? pct : 100}%` }} />
      </div>

      {stage === 'quiz' && (
        <div className="quiz__step">
          <p className="quiz__count">Question {idx + 1} of {GTM_QUESTIONS.length}</p>
          <h2 className="quiz__q">{q.q}</h2>
          <ul className="quiz__options">
            {q.options.map((o) => (
              <li key={o.v}>
                <button
                  type="button"
                  className={`quiz__option ${answers[q.id] === o.v ? 'is-chosen' : ''}`}
                  onClick={() => choose(o.v)}
                >
                  <span>{o.label}</span>
                  <ArrowRight size={16} />
                </button>
              </li>
            ))}
          </ul>
          {idx > 0 && (
            <button type="button" className="quiz__back" onClick={() => setIdx(idx - 1)}>Back</button>
          )}
        </div>
      )}

      {stage === 'gate' && (
        <div className="quiz__step">
          <p className="quiz__count">Your result</p>
          <div className="quiz__score">
            <div className="quiz__dial" role="img" aria-label={`Readiness ${result.score} out of ${GTM_MAX}`}>
              <span className="quiz__dial-fill" style={{ '--pct': `${dialPct}%` }} />
              <span className="quiz__dial-num quiz__dial-num--sm">{result.score}</span>
            </div>
            <div>
              <p className="quiz__score-band">{result.stage.name}</p>
              <p className="quiz__score-note">Go-to-market readiness, out of {GTM_MAX}.</p>
            </div>
          </div>

          <p className="quiz__help">{result.stage.line}</p>

          <div className="quiz__gate">
            <p className="quiz__gate-head">Get your three next steps</p>
            <p className="quiz__gate-note">
              The three things to do next at this stage, on this page as soon as you send this.
            </p>
            <form className="contact-form" onSubmit={submit}>
              <p className="pbf__hp" aria-hidden="true">
                <label>Leave this empty<input type="text" name="bot-field" tabIndex={-1} autoComplete="off" /></label>
              </p>
              <div className="field-row">
                <label className="field"><span>Name <span className="req">*</span></span>
                  <input type="text" name="name" required placeholder="Jane Doe" autoComplete="name" /></label>
                <label className="field"><span>Work email <span className="req">*</span></span>
                  <input type="email" name="email" required placeholder="jane@acme.com" autoComplete="email" /></label>
              </div>
              {/* Seven answers say what stage they are at. These say who is
                  asking, which is what makes the reply worth reading: the site
                  tells us more than the answers do, and the market and the
                  timing decide whether this is a conversation now or in a
                  quarter. Only the site is required on top of the original
                  three, so the form stays short enough to finish. */}
              <div className="field-row">
                <label className="field"><span>Company <span className="req">*</span></span>
                  <input type="text" name="company" required placeholder="Acme B.V." autoComplete="organization" /></label>
                <label className="field"><span>Company website <span className="req">*</span></span>
                  <input type="url" name="website" required placeholder="https://acme.com" autoComplete="url" /></label>
              </div>
              <div className="field-row">
                <label className="field"><span>Your role</span>
                  <input type="text" name="role" placeholder="Head of Growth" autoComplete="organization-title" /></label>
                <label className="field"><span>Which is this? <span className="req">*</span></span>
                  <select name="gtm_type" required defaultValue="">
                    <option value="" disabled>Choose one</option>
                    <option value="first">First go-to-market</option>
                    <option value="expansion">New market expansion</option>
                  </select></label>
              </div>
              <label className="field"><span>Which market are you going into?</span>
                <input type="text" name="gtm_market" placeholder="Netherlands, UAE, mid market SaaS" /></label>
              <label className="field"><span>Anything else worth knowing?</span>
                <textarea name="notes" rows={3} placeholder="What you sell, what you have tried, when you want to launch." /></label>
              <label className="pbf__consent">
                <input type="checkbox" name="consent" required value="yes" />
                <span>I agree to Aspire storing my details as described in the <a href="/privacy/">privacy policy</a>.</span>
              </label>
              <button className="btn btn-accent btn-lg contact-form__submit" type="submit">
                Show me the steps <ArrowRight />
              </button>
            </form>
          </div>
        </div>
      )}

      {stage === 'plan' && (
        <div className="quiz__step">
          <p className="quiz__count">{result.stage.name} · {result.score}/{GTM_MAX}</p>
          <h2 className="quiz__q">What to do next.</h2>
          <p className="quiz__help">{result.stage.line}</p>

          {!sent && (
            <p className="quiz__note quiz__note--warn" role="alert">
              Your steps are below as promised. We could not file your details from here, so if
              you want us to go through this with you, email elena.novikova@aspireagencymarketing.com.
            </p>
          )}

          <ol className="quiz__plan">
            {result.stage.steps.map((st, i) => (
              <li key={st}>
                <span className="quiz__plan-when">Step {i + 1}</span>
                <p>{st}</p>
              </li>
            ))}
          </ol>

          <div className="quiz__actions">
            <a className="btn btn-accent" href={bookHref} {...bookAttrs}>
              Book a free call <ArrowRight />
            </a>
            <a className="btn btn-outline" href="/services/go-to-market/">See the service</a>
          </div>

          <button type="button" className="quiz__back" onClick={() => { setAnswers({}); setIdx(0); setStage('quiz') }}>
            Start again
          </button>
        </div>
      )}
    </div>
  )
}
