import { useMemo, useState } from 'react'
import { ArrowRight } from './Icons'
import LeadForm from './LeadForm'
import { QUESTIONS, scoreQuiz, matchFor } from '../data/quiz'

// Three stages: answer, then a gate, then the plan.
//
// The gate shows the match by name before asking for an email. Withholding it
// entirely reads as a toll gate and people leave; showing everything means
// there is no reason to hand over an address. Naming the match and holding back
// what to do about it is the honest middle.
export default function Quiz() {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [stage, setStage] = useState('quiz') // quiz | gate | plan

  const result = useMemo(() => scoreQuiz(answers), [answers])
  const match = useMemo(() => matchFor(result), [result])
  const q = QUESTIONS[idx]
  const pct = Math.round((Object.keys(answers).length / QUESTIONS.length) * 100)

  const choose = (v) => {
    const next = { ...answers, [q.id]: v }
    setAnswers(next)
    if (idx + 1 < QUESTIONS.length) setIdx(idx + 1)
    else setStage('gate')
  }

  const back = () => (idx > 0 ? setIdx(idx - 1) : null)

  const restart = () => {
    setAnswers({})
    setIdx(0)
    setStage('quiz')
  }

  return (
    <div className="quiz">
      <div className="quiz__bar" aria-hidden="true">
        <span className="quiz__bar-fill" style={{ width: `${stage === 'quiz' ? pct : 100}%` }} />
      </div>

      {/* ── Questions ─────────────────────────────────────────── */}
      {stage === 'quiz' && (
        <div className="quiz__step">
          <p className="quiz__count">
            Question {idx + 1} of {QUESTIONS.length}
          </p>
          <h3 className="quiz__q">{q.q}</h3>
          {q.help && <p className="quiz__help">{q.help}</p>}

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
            <button type="button" className="quiz__back" onClick={back}>
              Back
            </button>
          )}
        </div>
      )}

      {/* ── Gate: name the match, hold the plan ───────────────── */}
      {stage === 'gate' && (
        <div className="quiz__step">
          <p className="quiz__count">Your match</p>
          <h3 className="quiz__q">{match.title}</h3>
          <p className="quiz__help">{match.line}</p>

          <div className="quiz__gate">
            <p className="quiz__gate-head">Where to send the plan</p>
            <p className="quiz__gate-note">
              A short written plan for the first 90 days, based on these six answers: what to
              start with, what to leave alone for now, and what it should produce. No charge,
              and it is yours whether or not you work with us.
            </p>
            <LeadForm
              fields={['name', 'company', 'email']}
              submitLabel="Send me the plan"
              note="One email with the plan. We never share your details."
              successTitle="On its way."
              successBody="Elena will send your plan within one business day. If it raises questions, the first call is free."
              source="growth-quiz"
              hidden={{
                quiz_match: match.title,
                ...Object.fromEntries(
                  QUESTIONS.map((question) => [`quiz_${question.id}`, answers[question.id] || ''])
                ),
              }}
            />
          </div>

          <button type="button" className="quiz__back" onClick={() => setStage('plan')}>
            Just show me the match
          </button>
        </div>
      )}

      {/* ── Plan: the match without the written follow-up ─────── */}
      {stage === 'plan' && (
        <div className="quiz__step">
          <p className="quiz__count">Your match</p>
          <h3 className="quiz__q">{match.title}</h3>
          <p className="quiz__help">{match.line}</p>

          <div className="quiz__actions">
            <a className="btn btn-accent" href={match.href}>
              See what that involves <ArrowRight />
            </a>
            {match.second && (
              <a className="btn btn-outline" href={match.second.href}>
                Then {match.second.title.toLowerCase()}
              </a>
            )}
          </div>

          <button type="button" className="quiz__back" onClick={restart}>
            Start again
          </button>
        </div>
      )}
    </div>
  )
}
