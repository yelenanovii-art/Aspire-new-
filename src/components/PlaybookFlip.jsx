import { useEffect, useRef, useState } from 'react'

// The locked cover, riffled.
//
// A gated guide asks for an address on the strength of a cover, which is the
// least informative page in it. Hovering turns the pages instead: four spreads
// chosen because they are the working ones, so the question "what is actually
// in it" gets an answer without ungating the thing.
//
// Pointer only. On a touch screen there is no hover to key it to, and a tap is
// already spoken for by the unlock, so it stays a still cover there.
//
// prefers-reduced-motion stops the turning entirely rather than merely
// shortening it: the whole effect is movement.
export default function PlaybookFlip({ pages, active = false, interval = 1100 }) {
  const [i, setI] = useState(0)
  const timer = useRef(null)

  useEffect(() => {
    if (!active) { setI(0); return undefined }  // back to the cover on leave
    if (typeof window === 'undefined') return undefined
    // Pointer only: a touch screen has no hover to key this to, and a tap is
    // already spoken for by the unlock.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    timer.current = window.setInterval(() => setI((v) => (v + 1) % pages.length), interval)
    return () => window.clearInterval(timer.current)
  }, [active, pages.length, interval])

  return (
    <span className="pbflip" aria-hidden="true">
      {pages.map((p, idx) => (
        <img
          key={p.src}
          className={`pbflip__page ${idx === i ? 'is-face' : ''} ${idx < i ? 'is-turned' : ''}`}
          src={p.src}
          srcSet={`${p.src.replace('.webp', '-640.webp')} 640w, ${p.src} 1200w`}
          sizes="(max-width: 859px) 92vw, 520px"
          alt=""
          width="1200"
          height="675"
          // Only the cover is worth the bytes until somebody hovers. The rest
          // are small and will be wanted within a second of the first turn.
          loading={idx === 0 ? 'eager' : 'lazy'}
          decoding="async"
          style={{ '--z': pages.length - idx }}
        />
      ))}
    </span>
  )
}
