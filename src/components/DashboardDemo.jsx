import Sparkline from './Sparkline'
import { Check } from './Icons'
import { AI } from '../data/verticals'

// An illustrative readout of the kind of system this page sells. Labelled as an
// example so it is never mistaken for live client data.
export default function DashboardDemo() {
  const d = AI.demo
  return (
    <figure className="dash reveal" style={{ '--delay': '200ms' }}>
      <figcaption className="dash__bar">
        <span className="dash__dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="dash__title">{d.title}</span>
        <span className="dash__sync">{d.updated}</span>
      </figcaption>

      <div className="dash__body">
        <dl className="dash__metrics">
          {d.metrics.map((m) => (
            <div key={m.k}>
              <dt>{m.k}</dt>
              <dd>{m.v}</dd>
              <span className={m.delta.startsWith('-') ? 'is-down' : 'is-up'}>{m.delta}</span>
            </div>
          ))}
        </dl>

        <div className="dash__chart">
          <Sparkline points={d.series} id="dash-spark" w={420} h={92} />
        </div>

        <ul className="dash__rows">
          {d.rows.map((r) => (
            <li key={r.a} className={r.ok ? 'is-auto' : 'is-manual'}>
              <span className="dash__row-a">
                {r.ok ? <Check size={13} /> : <span className="dash__pending" aria-hidden="true" />}
                {r.a}
              </span>
              <span className="dash__row-b">{r.b}</span>
            </li>
          ))}
        </ul>
      </div>
      <span className="dash__note">Example readout, not client data</span>
    </figure>
  )
}
