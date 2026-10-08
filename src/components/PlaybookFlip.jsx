import { useEffect, useRef, useState } from 'react'

// The locked cover, riffled.
//
// A gated guide asks for an address on the strength of a cover, which is the
// least informative page in it. Turning the pages instead answers "what is
// actually in it" without ungating the thing: four spreads, chosen because
// they are the working ones.
//
// It keys to hover on a pointer, and on a touch screen it runs itself once the
// cover is on screen — a phone has no hover, and the tap is already spoken for
// by the unlock, so waiting for an input that cannot arrive just meant nobody
// on a phone ever saw it move.
//
// prefers-reduced-motion stops the turning entirely rather than merely
// shortening it: the whole effect is movement.
export default function PlaybookFlip({ pages, active = false, interval = 1100 }) {
  const [i, setI] = useState(0)
  const host = useRef(null)
  // On touch, the cover being on screen is what stands in for hover.
  const [seen, setSeen] = useState(false)
  const [touch, setTouch] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    setTouch(!window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  useEffect(() => {
    const el = host.current
    if (!touch || !el || typeof IntersectionObserver === 'undefined') return undefined
    const io = new IntersectionObserver(
      ([e]) => setSeen(e.isIntersecting),
      // Most of the cover, so it riffles while it is being looked at rather
      // than from the moment its top edge appears.
      { threshold: 0.5 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [touch])

  const running = touch ? seen : active

  useEffect(() => {
    if (!running) { setI(0); return undefined }  // back to the cover at rest
    if (typeof window === 'undefined') return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const t = window.setInterval(() => setI((v) => (v + 1) % pages.length), interval)
    return () => window.clearInterval(t)
  }, [running, pages.length, interval])

  return (
    <span className="pbflip" aria-hidden="true" ref={host}>
      {pages.map((p, idx) => (
        <img
          key={p.src}
          className={`pbflip__page ${idx === i ? 'is-face' : ''} ${idx < i ? 'is-turned' : ''}`}
          src={p.src}
          srcSet={`${p.src.replace('.webp', '-640.webp')} 640w, ${p.src} 900w`}
          sizes="(max-width: 859px) 320px, 440px"
          alt=""
          width="900"
          height="1273"
          // The cover is the only one worth the bytes up front. On a phone the
          // rest are wanted a second after it scrolls in, so they are fetched
          // as soon as we know this is a touch screen rather than on lazy.
          loading={idx === 0 || touch ? 'eager' : 'lazy'}
          decoding="async"
          style={{ '--z': pages.length - idx }}
        />
      ))}
    </span>
  )
}
