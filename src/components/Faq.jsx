import { useState } from 'react'

// Accordion FAQ.
//
// Everything starts closed. The first item used to open on load, which made the
// column a different height on every page and left the card beside it stretched
// to match a panel nobody had asked to see. Closed, four questions are four
// equal rows and the pair sits level.
//
// One open at a time: opening the second closes the first, so the block never
// grows past the space it was laid out in.
//
// The panel animates on grid-template-rows rather than height, which is the one
// way to transition to a content height the browser works out itself. `hidden`
// cannot animate, so it is gone; the panel is removed from the accessibility
// tree with inert content height of zero and aria-hidden instead.
function Item({ q, a, open, onToggle, id }) {
  return (
    <div className={`faq__item ${open ? 'is-open' : ''}`}>
      <h3 className="faq__q">
        <button type="button" aria-expanded={open} aria-controls={`${id}-panel`} id={`${id}-btn`} onClick={onToggle}>
          <span>{q}</span>
          <span className="faq__sign" aria-hidden="true" />
        </button>
      </h3>
      <div className="faq__panel" id={`${id}-panel`} role="region" aria-labelledby={`${id}-btn`} aria-hidden={!open}>
        <div className="faq__panel-inner">
          <p>{a}</p>
        </div>
      </div>
    </div>
  )
}

// `max` caps what a page shows. Four is the point past which a reader stops
// reading and starts scrolling, and it is what keeps this column the same
// height as the card beside it.
export default function Faq({ items, idPrefix = 'faq', max = 4 }) {
  const [openIdx, setOpenIdx] = useState(-1)
  const shown = items.slice(0, max)
  return (
    <div className="faq">
      {shown.map((it, i) => (
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
