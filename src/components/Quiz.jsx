import { useMemo, useState } from 'react'
import { ArrowRight } from './Icons'
import LeadForm from './LeadForm'
import { QUESTIONS, scoreQuiz, matchFor, planFor, scoreOf, archetypeOf } from '../data/quiz'
import { track } from '../lib/analytics'
import { COMPANY } from '../config'

// Three stages: answer, then a gate, then the plan.
//
// The gate shows the match by name before asking for an email. Withholding it
// entirely reads as a toll gate and people leave; showing everything means
// there is no reason to hand over an address. Naming the match and holding back
// what to do about it is the honest middle.
export default function Quiz() {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState({})
  const [stage, setStage] = useState('quiz') // quiz | gate | match | plan
  // False when the send failed: the plan is still owed, but we should not
  // imply we have their details when we do not.
  const [delivered, setDelivered] = useState(true)

  const result = useMemo(() => scoreQuiz(answers), [answers])
  const match = useMemo(() => matchFor(result), [result])
  const plan = useMemo(() => planFor(result, answers), [result, answers])
  const score = useMemo(() => scoreOf(answers), [answers])
  const archetype = useMemo(() => archetypeOf(answers, result), [answers, result])
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
          <p className="quiz__count">Your result</p>

          <div className="quiz__score">
            <div className="quiz__dial" role="img" aria-label={`Growth readiness ${score.pct} out of 100`}>
              <span className="quiz__dial-fill" style={{ '--pct': `${score.pct}%` }} />
              <span className="quiz__dial-num">{score.pct}</span>
            </div>
            <div>
              <p className="quiz__score-band">{score.band}</p>
              <p className="quiz__score-note">
                Growth readiness, out of 100. Most companies at your stage land between 40 and 65.
              </p>
            </div>
          </div>

          <h3 className="quiz__q quiz__archetype">{archetype.name}</h3>
          <p className="quiz__help">{archetype.line}</p>

          <p className="quiz__match-line">
            <span>Start with</span> {match.title}
          </p>

          <div className="quiz__gate">
            <p className="quiz__gate-head">Unlock the ninety day plan</p>
            <p className="quiz__gate-note">
              Your plan for the first 90 days appears on this page as soon as you send this:
              what to start with, what to park, and what it should produce. No charge, and it
              is yours whether or not you work with us.
            </p>
            <LeadForm
              fields={['name', 'company', 'email']}
              submitLabel="Show me the plan"
              note="Your plan appears straight away. We never share your details."
              successTitle="On its way."
              successBody="Elena will send your plan within one business day. If it raises questions, the first call is free."
              source="growth-quiz"
              onSuccess={(res) => {
                setDelivered(res?.delivered !== false)
                track('quiz_complete', {
                  quiz: 'growth-fit',
                  result: match.title,
                  score: String(score.pct),
                  archetype: archetype.name,
                })
                setStage('plan')
              }}
              hidden={{
                quiz_match: match.title,
                ...Object.fromEntries(
                  QUESTIONS.map((question) => [`quiz_${question.id}`, answers[question.id] || ''])
                ),
              }}
            />
          </div>

          <button type="button" className="quiz__back" onClick={() => setStage('match')}>
            Skip, just show me the match
          </button>
        </div>
      )}

      {/* ── Plan ──────────────────────────────────────────────── */}
      {(stage === 'plan' || stage === 'match') && (
        <div className="quiz__step">
          <p className="quiz__count">{archetype.name} · {score.pct}/100</p>
          <h3 className="quiz__q">{match.title}</h3>
          <p className="quiz__help">{match.line}</p>

          {stage === 'plan' && !delivered && (
            <p className="quiz__note quiz__note--warn" role="alert">
              Your plan is below as promised. One thing though: we could not file
              your details from here, so nobody at our end has them. If you want us
              to go through this with you,{' '}
              <a href={`mailto:${COMPANY.email}?subject=${encodeURIComponent('My growth plan: ' + match.title)}`}>
                email {COMPANY.email}
              </a>
              .
            </p>
          )}

          {stage === 'plan' && plan.note && <p className="quiz__note">{plan.note}</p>}

          {stage === 'plan' && (
          <ol className="quiz__plan">
            <li>
              <span className="quiz__plan-when">First 30 days</span>
              <p>{plan.first}</p>
            </li>
            <li>
              <span className="quiz__plan-when">The rest of the quarter</span>
              <p>{plan.then}</p>
            </li>
            <li>
              <span className="quiz__plan-when">Park this for now</span>
              <p>{plan.park}</p>
            </li>
            <li>
              <span className="quiz__plan-when">What it should produce</span>
              <p>{plan.expect}</p>
            </li>
          </ol>
          )}

          {stage === 'match' && (
            <p className="quiz__note">
              The ninety day plan for this is a few lines long and sits behind the form above,
              which is the only thing we ask for.{' '}
              <button type="button" className="quiz__inline" onClick={() => setStage('gate')}>
                Go back and get it
              </button>
            </p>
          )}

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
