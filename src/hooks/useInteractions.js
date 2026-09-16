import { useEffect, useRef } from 'react'

// Pointer-driven effects: an ambient glow that follows the cursor across dark
// sections, a spotlight that lights the card under the pointer, and a magnetic
// pull on primary buttons.
//
// Three rules apply to everything here:
//   1. Nothing runs under prefers-reduced-motion.
//   2. Nothing runs on a coarse pointer. A hover glow on a touchscreen is dead
//      weight: it costs listeners and can never fire.
//   3. Every pointermove writes through a single requestAnimationFrame, so a
//      fast cursor cannot queue more style writes than the browser can paint.
const fine = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
  !window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Ambient glow. Sets --mx/--my on the element so CSS can place a radial
// gradient under the cursor, and --glow-o to fade it in and out.
export function useGlow() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !fine()) return

    let raf = 0
    let px = 0
    let py = 0

    const write = () => {
      raf = 0
      el.style.setProperty('--mx', `${px}px`)
      el.style.setProperty('--my', `${py}px`)
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      px = e.clientX - r.left
      py = e.clientY - r.top
      if (!raf) raf = requestAnimationFrame(write)
    }
    const onEnter = () => el.style.setProperty('--glow-o', '1')
    const onLeave = () => el.style.setProperty('--glow-o', '0')

    el.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  return ref
}

// Spotlight for a grid of cards. One listener on the container rather than one
// per card, resolving the card under the cursor by closest(). A grid of twelve
// cards would otherwise mean twelve pointermove listeners.
export function useSpotlight(selector = '[data-spot]') {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root || !fine()) return

    let raf = 0
    let target = null
    let px = 0
    let py = 0

    const write = () => {
      raf = 0
      if (target) {
        target.style.setProperty('--mx', `${px}px`)
        target.style.setProperty('--my', `${py}px`)
      }
    }
    const onMove = (e) => {
      const card = e.target.closest?.(selector)
      if (card !== target) {
        target?.style.setProperty('--glow-o', '0')
        target = card
        target?.style.setProperty('--glow-o', '1')
      }
      if (!target) return
      const r = target.getBoundingClientRect()
      px = e.clientX - r.left
      py = e.clientY - r.top
      if (!raf) raf = requestAnimationFrame(write)
    }
    const onLeave = () => {
      target?.style.setProperty('--glow-o', '0')
      target = null
    }

    root.addEventListener('pointermove', onMove, { passive: true })
    root.addEventListener('pointerleave', onLeave)
    return () => {
      root.removeEventListener('pointermove', onMove)
      root.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [selector])

  return ref
}

// Magnetic pull. The element leans a few pixels toward the cursor while it is
// nearby, then springs back. `strength` is the fraction of the offset applied.
export function useMagnetic(strength = 0.28, radius = 70) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || !fine()) return

    let raf = 0
    let tx = 0
    let ty = 0

    const write = () => {
      raf = 0
      el.style.transform = `translate3d(${tx}px, ${ty}px, 0)`
    }
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      // Only pull once the cursor is within `radius` of the button's box.
      if (Math.abs(dx) > r.width / 2 + radius || Math.abs(dy) > r.height / 2 + radius) {
        tx = 0
        ty = 0
      } else {
        tx = dx * strength
        ty = dy * strength
      }
      if (!raf) raf = requestAnimationFrame(write)
    }
    const reset = () => {
      tx = 0
      ty = 0
      if (!raf) raf = requestAnimationFrame(write)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    el.addEventListener('pointerleave', reset)
    return () => {
      window.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', reset)
      cancelAnimationFrame(raf)
      el.style.transform = ''
    }
  }, [strength, radius])

  return ref
}

// Adds `is-drawn` the first time the element scrolls into view, so a CSS
// animation can run once rather than every time it re-enters.
export function useDrawOnce(threshold = 0.35) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      el.classList.add('is-drawn')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-drawn')
            io.unobserve(e.target)
          }
        })
      },
      { threshold }
    )
    io.observe(el)
    // Same failsafe as the scroll reveal: an element must never be left in its
    // pre-animation state because an observer callback was missed.
    const t = window.setTimeout(() => el.classList.add('is-drawn'), 2500)
    return () => {
      io.disconnect()
      window.clearTimeout(t)
    }
  }, [threshold])

  return ref
}
