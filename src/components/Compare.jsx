import { useState } from 'react'
import { Check } from './Icons'
import { COMPARE } from '../data/site'

// The commercial argument as a spec table. Three ways to solve the problem,
// side by side, with the Aspire column carrying the emphasis.
//
// Below 760px the table stops being a table: a three column comparison in a
// horizontal scroller puts the Aspire column off screen, so on a phone the
// first thing you see is the option we are arguing against. Each row becomes a
// card instead, with the column name printed against each value via data-col.
// On a phone the three column table is a sideways scroll nobody performs. The
// Aspire column is read on its own first, and the two it is being compared
// against sit behind a control for whoever actually wants the comparison.
function MobileCompare({ columns, rows }) {
  const [open, setOpen] = useState(false)
  const mine = columns.find((c) => c.highlight) || columns[columns.length - 1]
  const others = columns.filter((c) => c !== mine)
  return (
    <div className="cmpm">
      <ul className="cmpm__list">
        {rows.map((r) => (
          <li className="cmpm__row" key={r.label}>
            <span className="cmpm__k">{r.label}</span>
            <span className="cmpm__v"><Check size={14} />{r[mine.k]}</span>
            {open && others.map((c) => (
              <span className="cmpm__alt" key={c.k}>
                <span className="cmpm__alt-k">{c.label}</span>
                <span className="cmpm__alt-v">{r[c.k]}</span>
              </span>
            ))}
          </li>
        ))}
      </ul>
      <button type="button" className="cmpm__toggle" onClick={() => setOpen(!open)} aria-expanded={open}>
        {open ? 'Hide the comparison' : 'Compare with hiring or an agency'}
      </button>
    </div>
  )
}

export default function Compare() {
  const { columns, rows } = COMPARE
  return (
    <div className="cmp reveal">
      <MobileCompare columns={columns} rows={rows} />
      <div className="cmp__scroll">
        <table className="cmp__table">
          <thead>
            <tr>
              <th scope="col"><span className="sr-only">Criterion</span></th>
              {columns.map((c) => (
                <th scope="col" key={c.k} className={c.highlight ? 'is-featured' : ''}>
                  {c.highlight && <span className="cmp__badge">Recommended</span>}
                  <span className="cmp__col-label">{c.label}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.label} style={{ '--r': i }}>
                <th scope="row">{r.label}</th>
                {columns.map((c) => (
                  <td key={c.k} className={c.highlight ? 'is-featured' : ''} data-col={c.label}>
                    {c.highlight && <Check size={14} />}
                    <span>{r[c.k]}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
