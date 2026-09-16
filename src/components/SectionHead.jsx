// Eyebrow + title + optional lede — the standard section opener.
export default function SectionHead({ eyebrow, title, lede, center = false, light = false, wide = false, index, id, children }) {
  return (
    <div
      className={`sec-head ${center ? 'sec-head--center' : ''} ${light ? 'sec-head--light' : ''} ${index ? 'sec-head--indexed' : ''}`}
      id={id}
    >
      {/* Sits in the left margin on wide screens, above the eyebrow on narrow.
          Decorative: the heading below already names the section. */}
      {index && <span className="sec-head__index" aria-hidden="true">{index}</span>}
      {eyebrow && (
        <p className={`eyebrow reveal ${light ? 'eyebrow--light' : ''} ${center ? 'eyebrow--center' : ''}`}>{eyebrow}</p>
      )}
      {title && <h2 className={`section-title reveal reveal--rise ${wide ? 'section-title--wide' : ''}`}>{title}</h2>}
      {lede && <p className="lead reveal" style={{ '--delay': '80ms' }}>{lede}</p>}
      {children}
    </div>
  )
}
