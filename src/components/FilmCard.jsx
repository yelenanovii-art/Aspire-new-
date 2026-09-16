import { useRef, useState } from 'react'

// A film still that becomes the film.
//
// The poster is a sharp, properly graded image; the clip is small and soft by
// comparison, so the still is what you see until you ask for motion. The video
// element carries no `src` until first interaction, so a page with three of
// these costs three images to load, not three videos.
export default function FilmCard({ src, poster, label, note, ratio = '16 / 9', span = 1 }) {
  const [armed, setArmed] = useState(false)
  const videoRef = useRef(null)

  const play = () => {
    setArmed(true)
    // The element exists on the next paint; play() is safe to call late.
    requestAnimationFrame(() => videoRef.current?.play?.().catch(() => {}))
  }
  const stop = () => {
    videoRef.current?.pause?.()
  }

  const fine = typeof window !== 'undefined' &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches

  return (
    <figure
      className="film"
      style={{ aspectRatio: ratio, '--span': span }}
      onPointerEnter={fine ? play : undefined}
      onPointerLeave={fine ? stop : undefined}
    >
      <img src={poster} alt={label} loading="lazy" />
      {armed && (
        <video ref={videoRef} src={src} muted loop playsInline preload="none" aria-label={label} />
      )}

      {/* On touch there is no hover, so the control is the control. */}
      <button
        type="button"
        className={`film__play ${armed ? 'is-playing' : ''}`}
        onClick={() => (armed ? stop() : play())}
        aria-label={armed ? `Pause ${label}` : `Play ${label}`}
      >
        <svg width="15" height="17" viewBox="0 0 15 17" fill="currentColor" aria-hidden="true">
          {armed ? <path d="M2 1h4v15H2zM9 1h4v15H9z" /> : <path d="M2 1l12 7.5L2 16z" />}
        </svg>
      </button>

      <figcaption className="film__cap">
        <span className="film__label">{label}</span>
        {note && <span className="film__note">{note}</span>}
      </figcaption>
    </figure>
  )
}
