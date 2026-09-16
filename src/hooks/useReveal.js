import { useEffect } from 'react'

// Adds .is-visible to every .reveal element as it scrolls into view.
// Re-runs whenever `dep` changes (route change) so newly mounted pages get
// observed too, and watches the DOM for sections that mount later.
//
// Touch devices have no hover, so the desktop primary-CTA shine sweep
// (.btn-accent:hover::after) never fires. We re-map it to a one-shot sweep the
// first time each primary button scrolls into view — adding .is-swept, which
// the stylesheet animates (coarse pointers only).
export function useReveal(dep) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      document
        .querySelectorAll('.reveal:not(.is-visible)')
        .forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      // rootMargin extends the root 12% below the fold, so content is never
      // caught blank during a quick scroll on a long page.
      { threshold: 0.01, rootMargin: '0px 0px 12% 0px' }
    )

    let sweepIO
    const coarse = window.matchMedia('(hover: none) and (pointer: coarse)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (coarse && !reduce) {
      sweepIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-swept')
              sweepIO.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.5 }
      )
    }

    // Failsafe: content must NEVER be left permanently invisible. If the
    // observer hasn't revealed an element shortly after reveal content first
    // appears — a fast scroll or an observer miss — reveal everything pending.
    let failsafe
    const revealPending = () =>
      document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => el.classList.add('is-visible'))

    const sweep = () => {
      const reveals = document.querySelectorAll('.reveal:not(.is-visible)')
      reveals.forEach((el) => io.observe(el))
      sweepIO && document.querySelectorAll('.btn-accent:not(.is-swept)').forEach((b) => sweepIO.observe(b))
      if (reveals.length && !failsafe) failsafe = window.setTimeout(revealPending, 1600)
    }
    sweep()

    // childList + subtree only: class changes must not retrigger this, or the
    // observer would feed itself.
    const mo = new MutationObserver(sweep)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      io.disconnect()
      sweepIO?.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [dep])
}
