import { PLAYBOOK as P } from '../data/playbook'

// The guide cover.
//
// Two jobs now. In the pop-up it is just the artwork. On /real-estate it is
// the way in: the cover carries a lock and the whole thing is a button, so
// what the page asks for is "open this" rather than "fill in a form", which is
// a smaller thing to agree to even though it leads to the same place.
//
// The lock is a real <button> rather than an overlay on a div, so it is
// reachable by keyboard and announces itself. The image behind it is marked
// decorative in that state: the button's label already says what it is.
export default function PlaybookCover({ className = '', locked = false, onUnlock }) {
  const art = (
    <img
      className="pbcover__img"
      src={P.cover.src}
      srcSet={`${P.cover.src.replace('.webp', '-640.webp')} 640w, ${P.cover.src} ${P.cover.w}w`}
      sizes="(max-width: 859px) 92vw, 520px"
      alt={locked ? '' : P.cover.alt}
      width={P.cover.w}
      height={P.cover.h}
      loading="lazy"
      decoding="async"
    />
  )

  if (!locked) {
    return <figure className={`pbcover ${className}`}>{art}</figure>
  }

  return (
    <button type="button" className={`pbcover pbcover--locked ${className}`} onClick={onUnlock}>
      {art}
      <span className="pbcover__veil" aria-hidden="true" />
      <span className="pbcover__lock">
        <span className="pbcover__lock-icon" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <rect x="4" y="10" width="16" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
            <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </span>
        <span className="pbcover__lock-label">{P.unlockLabel}</span>
      </span>
    </button>
  )
}
