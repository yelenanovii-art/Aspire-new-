import { useCallback, useEffect, useRef, useState } from 'react'

// A frame that holds a photo or a video once one exists, and an intentional
// placeholder until then.
//
// The placeholder is part of the design rather than a broken image: it states
// what belongs there and the crop to shoot for, so the page can be shown to a
// client before the shoot has happened. Set `src` in the data file and the
// frame fills; video is detected from the file extension.
const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src || '')

export default function MediaSlot({ src, poster, label, hint, ratio = '3 / 2', span = 1, alt }) {
  const style = { aspectRatio: ratio, '--span': span }

  // React sets `muted` as a DOM property, never as an attribute, so it does not
  // survive into the prerendered HTML — and an autoplaying video without the
  // muted ATTRIBUTE is blocked by every browser. Stamp it on directly so the
  // static file carries it too.
  const keepMuted = useCallback((el) => {
    if (el) {
      el.muted = true
      el.setAttribute('muted', '')
    }
  }, [])

  if (src && isVideo(src)) {
    return <SlotVideo src={src} poster={poster} label={alt || label} style={style} keepMuted={keepMuted} />
  }

  if (src) {
    return (
      <figure className="slot slot--filled" style={style}>
        {/* The frame already reserves the box through aspect-ratio; these keep
            it reserved in the moment before the stylesheet applies. */}
        <img src={src} alt={alt || label} loading="lazy" decoding="async" width="900" height="600" />
      </figure>
    )
  }

  return (
    <figure className="slot slot--empty" style={style} aria-label={`${label}, image to follow`}>
      <span className="slot__mark" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4.5" width="18" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4 17l4.8-4.6 3.2 3 3-2.6L20 17" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      </span>
      <figcaption className="slot__cap">
        <span className="slot__label">{label}</span>
        {hint && <span className="slot__hint">{hint}</span>}
      </figcaption>
    </figure>
  )
}

// Autoplaying this costs a viewer the whole file — the clip on /real-estate is
// 5.8MB — so it used to be held back to wide screens with a fine pointer. That
// guard was really about the download, and it read screen width to guess at it,
// which meant every phone got a poster and a button even on good wifi.
//
// Now the gate asks about the connection instead. A phone that can afford the
// file plays the film like a desktop does; a metered or slow one still gets the
// poster, and so does anyone who asked for less motion.
// Whether this visit should autoplay, decided before the first paint.
//
// It used to be worked out in an effect, which meant the element was rendered
// once with no source and then given src + autoplay afterwards. Safari is
// strict about that: an autoplaying video wants to arrive with its source, its
// muted attribute and playsinline already on it, so on iOS the second pass
// often bought a poster and nothing else.
function wantsAutoplay() {
  if (typeof window === 'undefined') return false   // prerender: ship the poster
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    // Network Information API, so this is Chrome and Android and nothing else.
    // Where it is missing we autoplay, which is what every desktop browser was
    // already doing — the known-bad cases are the ones it does report.
    const net = navigator.connection || navigator.mozConnection || navigator.webkitConnection
    if (!net) return true
    return net.saveData !== true && !/^(slow-)?2g$|^3g$/.test(net.effectiveType || '')
  } catch {
    return true
  }
}

function SlotVideo({ src, poster, label, style, keepMuted }) {
  const ref = useRef(null)
  // Lazy initialiser, so the very first render already carries the source.
  const [play, setPlay] = useState(wantsAutoplay)

  useEffect(() => {
    const el = ref.current
    if (!play || !el) return undefined
    // Safari can reject the first play() while it is still opening the file, so
    // try again the moment there are frames to show rather than giving up.
    const go = () => { if (el.paused) el.play().catch(() => {}) }
    go()
    el.addEventListener('loadeddata', go)
    el.addEventListener('canplay', go)
    return () => {
      el.removeEventListener('loadeddata', go)
      el.removeEventListener('canplay', go)
    }
  }, [play])

  return (
    <figure className="slot slot--filled slot--video" style={style}>
      <video
        ref={(el) => {
          ref.current = el
          keepMuted(el)
        }}
        // Only give the element a source once it is going to play. A <video>
        // with a src starts fetching even without autoplay on some browsers.
        src={play ? src : undefined}
        poster={poster}
        muted
        loop
        playsInline
        autoPlay={play || undefined}
        preload={play ? 'auto' : 'none'}
        aria-label={label}
      />
      {!play && (
        <button type="button" className="slot__play" onClick={() => setPlay(true)}>
          <span className="slot__play-icon" aria-hidden="true" />
          Play film
        </button>
      )}
    </figure>
  )
}
