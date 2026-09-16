import { Check } from './Icons'
import { COMPARE } from '../data/site'

// The commercial argument as a spec table. Three ways to solve the problem,
// side by side, with the Aspire column carrying the emphasis.
//
// Below 760px the table stops being a table: a three column comparison in a
// horizontal scroller puts the Aspire column off screen, so on a phone the
// first thing you see is the option we are arguing against. Each row becomes a
// card instead, with the column name printed against each value via data-col.
export default function Compare() {
  const { columns, rows } = COMPARE
  return (
    <div className="cmp reveal">
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
