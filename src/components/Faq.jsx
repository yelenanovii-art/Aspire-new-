import { useState } from 'react'

// Accordion FAQ. First item open by default so the pattern is obvious.
function Item({ q, a, open, onToggle, id }) {
  return (
    <div className={`faq__item ${open ? 'is-open' : ''}`}>
      <h3 className="faq__q">
        <button type="button" aria-expanded={open} aria-controls={`${id}-panel`} id={`${id}-btn`} onClick={onToggle}>
          <span>{q}</span>
          <span className="faq__sign" aria-hidden="true" />
        </button>
      </h3>
      <div className="faq__panel" id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} hidden={!open}>
        <p>{a}</p>
      </div>
    </div>
  )
}

export default function Faq({ items, idPrefix = 'faq' }) {
  const [openIdx, setOpenIdx] = useState(0)
  return (
    <div className="faq">
      {items.map((it, i) => (
        <Item
          key={it.q}
          {...it}
          id={`${idPrefix}-${i}`}
          open={openIdx === i}
          onToggle={() => setOpenIdx(openIdx === i ? -1 : i)}
        />
      ))}
    </div>
  )
}
