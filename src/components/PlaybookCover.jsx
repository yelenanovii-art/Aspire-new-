import { PLAYBOOK as P } from '../data/playbook'

// The guide cover.
//
// Drawn rather than an image: no cover artwork has been supplied, and a
// placeholder rectangle would look like a missing asset. Set `P.coverSrc` and
// swap this for an <img> once the real cover exists.
export default function PlaybookCover({ className = '' }) {
  return (
    <div className={`pbcover ${className}`} aria-hidden="true">
      <div className="pbcover__inner">
        <span className="pbcover__eyebrow">Free guide</span>
        <span className="pbcover__title">{P.title}</span>
        <span className="pbcover__rule" />
        <span className="pbcover__by">{P.authors}</span>
        <span className="pbcover__mark">Aspire</span>
      </div>
    </div>
  )
}
