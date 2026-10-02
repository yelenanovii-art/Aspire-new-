import { useEffect, useRef } from 'react'

// Thin accent progress bar pinned under the nav.
//
// Deliberately not React state. The previous version called setPct on every
// scroll event, so a flick on a phone meant a render per frame, and it read
// scrollHeight and clientHeight inside the handler — a forced layout on each
// one. Writing the transform straight to the node through a ref keeps the
// whole thing off the render path, and the document height is only measured
// when it can actually have changed.
export default function ScrollProgress() {
  const bar = useRef(null)

  useEffect(() => {
    let max = 0
    let queued = false

    const measure = () => {
      const h = document.documentElement
      max = h.scrollHeight - h.clientHeight
    }

    const paint = () => {
      queued = false
      const pct = max > 0 ? document.documentElement.scrollTop / max : 0
      if (bar.current) bar.current.style.transform = `scaleX(${pct})`
    }

    // Coalesce to one write per frame: scroll fires faster than the screen
    // refreshes, and only the last value of a frame is ever seen.
    const onScroll = () => {
      if (queued) return
      queued = true
      requestAnimationFrame(paint)
    }

    const onResize = () => {
      measure()
      onScroll()
    }

    measure()
    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })

    // Lazy images and late sections change the page height after load, and a
    // stale max leaves the bar short of full at the bottom.
    const ro = new ResizeObserver(onResize)
    ro.observe(document.documentElement)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      ro.disconnect()
    }
  }, [])

  return (
    <div className="scroll-progress" aria-hidden="true">
      <span ref={bar} style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
