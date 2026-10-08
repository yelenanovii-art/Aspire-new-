import { useEffect, useRef, useState } from 'react'

// A film that plays itself once it is on screen.
//
// It used to hold its poster until you hovered it, which kept the page light
// but meant most visitors never saw anything move — on a phone there is no
// hover at all, so every card needed a tap. Now the clips are display-sized
// and cheap enough to run: each one arms when it scrolls in, plays muted on a
// loop, and pauses the moment it leaves, so only what is on screen is decoding.
//
// `index` staggers the starts. Five videos calling play() in the same frame
// makes a phone stutter visibly; a few hundred milliseconds apart they come up
// one after another and nothing drops.
export default function FilmCard({ src, poster, label, note, ratio = '16 / 9', index = 0 }) {
  const host = useRef(null)
  const videoRef = useRef(null)
  // armed: the element may have a source. playing: it is actually running.
  const [armed, setArmed] = useState(false)
  const [playing, setPlaying] = useState(false)
  // True when the browser refused to autoplay, so the control stops being
  // decoration and becomes the way in.
  const [blocked, setBlocked] = useState(false)

  // Someone who asked for less motion gets the poster and a button, which is
  // the whole point of the preference. Everyone else gets it playing.
  const calm = () =>
    typeof window !== 'undefined' &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const el = host.current
    if (!el || typeof IntersectionObserver === 'undefined') return undefined

    let timer = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Arm a screen early so the first frames are decoded by the time the
          // card is actually readable, rather than starting from black.
          setArmed(true)
          if (!calm()) return
          timer = window.setTimeout(() => setPlaying(true), index * 240)
        } else {
          window.clearTimeout(timer)
          setPlaying(false)
        }
      },
      { rootMargin: '300px 0px', threshold: 0.01 }
    )
    io.observe(el)
    return () => {
      window.clearTimeout(timer)
      io.disconnect()
    }
  }, [index])

  // play() and pause() are driven from state rather than called inline, so a
  // card that scrolls past mid-stagger cannot end up playing off screen.
  useEffect(() => {
    const v = videoRef.current
    if (!v) return undefined
    if (!playing) {
      if (!v.paused) v.pause()
      return undefined
    }
    // Safari rejects play() while it is still opening the file, which on a
    // phone is most first attempts. One rejection is not a refusal, so try
    // again once there are frames, and only call it blocked if that fails too.
    const go = () => {
      const p = v.play()
      if (p?.catch) p.catch(() => { if (v.readyState >= 2) setBlocked(true) })
    }
    go()
    v.addEventListener('loadeddata', go)
    v.addEventListener('canplay', go)
    return () => {
      v.removeEventListener('loadeddata', go)
      v.removeEventListener('canplay', go)
    }
  }, [playing, armed])

  // React assigns `muted` as a property and never writes the attribute, which
  // means the prerendered HTML ships without it — and a video that is not
  // muted in the markup is one no browser will autoplay. Stamp it on directly.
  const keepMuted = (el) => {
    videoRef.current = el
    if (el) {
      el.muted = true
      el.setAttribute('muted', '')
    }
  }

  const toggle = () => {
    setArmed(true)
    setBlocked(false)
    setPlaying((p) => !p)
  }

  const tall = (() => {
    const [w, h] = String(ratio).split('/').map((n) => parseFloat(n))
    return w > 0 && h > 0 ? w / h < 1 : false
  })()

  return (
    <figure className={`film ${tall ? 'film--tall' : 'film--wide'}`} style={{ aspectRatio: ratio }} ref={host}>
      {/* The poster is always in the markup, so the frame is never an empty
          box while the clip loads or if it never does. */}
      <img src={poster} alt={label} loading="lazy" decoding="async" width="540" height="960" />
      <video
        ref={keepMuted}
        src={armed ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        preload={armed ? 'auto' : 'none'}
        aria-label={label}
        className={playing ? 'is-live' : ''}
      />

      <button
        type="button"
        className={`film__play ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-label={playing ? `Pause ${label}` : `Play ${label}`}
      >
        <svg width="15" height="17" viewBox="0 0 15 17" fill="currentColor" aria-hidden="true">
          {playing ? <path d="M2 1h4v15H2zM9 1h4v15H9z" /> : <path d="M2 1l12 7.5L2 16z" />}
        </svg>
      </button>

      <figcaption className="film__cap">
        <span className="film__label">{label}</span>
        {note && <span className="film__note">{note}</span>}
        {blocked && <span className="film__note">Tap to play</span>}
      </figcaption>
    </figure>
  )
}
