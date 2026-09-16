// Infinite client marquee. The track is duplicated so the loop is seamless;
// the duplicate is aria-hidden so each client is announced only once.
//
// Items carry a logo where one exists and fall back to the name set as a
// wordmark where it does not, so a missing asset never leaves a gap in the row.
export default function Marquee({ items, label }) {
  return (
    <div className="marquee-wrap">
      {label && <p className="marquee-label reveal">{label}</p>}
      <div className="marquee reveal" style={{ '--delay': '80ms' }}>
        <div className="marquee__track">
          {[0, 1].map((dup) => (
            <ul className="marquee__group" aria-hidden={dup === 1} key={dup}>
              {items.map((c) => (
                <li key={c.name} className={c.logo ? 'has-logo' : ''}>
                  {c.logo ? <img src={c.logo} alt={c.name} loading="lazy" /> : c.name}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  )
}
