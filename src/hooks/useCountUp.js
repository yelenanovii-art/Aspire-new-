import { useEffect, useRef, useState } from 'react'

// Counts from 0 to `end` once the element scrolls into view.
//
// Two guards, because a stat stuck at "0" is worse than no animation — it reads
// as a real figure that says the opposite of what the page is claiming:
//
//   1. Prerender. The build renders each route in headless Chrome and dumps the
//      DOM, so whatever is on screen at that moment is what crawlers and AI
//      answer engines read. Below-the-fold stats never intersect there, so they
//      would be baked in as "0". Headless skips the animation entirely.
//   2. Failsafe. If the observer has not fired within 2.5s for any other reason
//      (a missed callback, a fast scroll past), we finish the count anyway.
const isPrerender = () =>
  typeof navigator !== 'undefined' && /HeadlessChrome|jsdom/i.test(navigator.userAgent)

export function useCountUp(end, { duration = 1500, decimals = 0, group = true } = {}) {
  const ref = useRef(null)
  // Start at the final value when prerendering so the static HTML is correct.
  const [value, setValue] = useState(() => (isPrerender() ? end : 0))
  const done = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const snap = reduce || isPrerender()

    const run = () => {
      if (done.current) return
      done.current = true
      if (snap) {
        setValue(end)
        return
      }
      const start = performance.now()
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        setValue(end * eased)
        if (t < 1) requestAnimationFrame(tick)
        else setValue(end)
      }
      requestAnimationFrame(tick)
    }

    if (snap || !('IntersectionObserver' in window)) {
      run()
      return
    }

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.5 }
    )
    io.observe(el)
    const failsafe = window.setTimeout(run, 2500)
    return () => {
      io.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [end, duration])

  // `group: false` for values that are not quantities. A year rendered with a
  // thousands separator reads as "2,022".
  const rounded = Math.round(value)
  const display =
    decimals > 0 ? value.toFixed(decimals) : group ? rounded.toLocaleString() : String(rounded)
  return { ref, display }
}
