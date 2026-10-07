import { useRef } from 'react'

// Horizontal swipe on a touch screen.
//
// The carousels had dots and arrows and nothing else, so on a phone the only
// way to move them was to hit a 10px target. A swipe is what everybody tries
// first. Returns handlers to spread onto the element.
//
// Deliberately passive: the page must still scroll vertically through the
// element, so nothing is prevented and a mostly-vertical gesture is ignored.
export function useSwipe(onLeft, onRight, threshold = 44) {
  const start = useRef(null)
  return {
    onTouchStart: (e) => {
      const t = e.changedTouches[0]
      start.current = { x: t.clientX, y: t.clientY }
    },
    onTouchEnd: (e) => {
      const s = start.current
      if (!s) return
      start.current = null
      const t = e.changedTouches[0]
      const dx = t.clientX - s.x
      const dy = t.clientY - s.y
      // Ignore anything that is really a scroll.
      if (Math.abs(dx) < threshold || Math.abs(dx) < Math.abs(dy) * 1.4) return
      if (dx < 0) onLeft()
      else onRight()
    },
  }
}
