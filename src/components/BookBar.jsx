import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from './Icons'
import { bookHref } from '../config'

// A booking button that is always within thumb reach on a phone.
//
// The mobile header has no room for one, so until now the only way to book
// from a phone was to open the menu or scroll to the foot of the page. This
// sits at the bottom of the viewport and gets out of the way when it should:
//
//   while the menu or a pop-up is open, because it would sit on top of them
//   while a real booking CTA is on screen, because two of the same button
//     competing is worse than one
//
// Phones only. On a desktop the header button never leaves.
export default function BookBar({ path }) {
  const [show, setShow] = useState(false)
  const blocked = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    if (/HeadlessChrome|jsdom/i.test(navigator.userAgent)) return undefined
    const phone = window.matchMedia('(max-width: 860px)')
    if (!phone.matches) return undefined

    // Any booking link already on screen suppresses it.
    const ctas = [...document.querySelectorAll('a[href^="/book"]')].filter(
      (a) => !a.closest('.bookbar') && !a.closest('.nav__drawer')
    )
    let onScreen = 0
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { onScreen += e.isIntersecting ? 1 : -1 })
        onScreen = Math.max(0, onScreen)
        setShow(!blocked.current && onScreen === 0 && window.scrollY > 420)
      },
      { threshold: 0.05 }
    )
    ctas.forEach((a) => io.observe(a))

    const onScroll = () => {
      setShow(!blocked.current && onScreen === 0 && window.scrollY > 420)
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // The drawer and the pop-ups both lock body scroll; that is the one signal
    // every one of them already shares, so there is nothing to wire per modal.
    const watch = new MutationObserver(() => {
      blocked.current = document.body.style.overflow === 'hidden'
      if (blocked.current) setShow(false)
      else onScroll()
    })
    watch.observe(document.body, { attributes: true, attributeFilter: ['style', 'class'] })

    onScroll()
    return () => {
      io.disconnect()
      watch.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [path])

  return (
    <div className={`bookbar ${show ? 'is-up' : ''}`} aria-hidden={!show}>
      <a className="btn btn-accent bookbar__btn" href={bookHref} tabIndex={show ? 0 : -1}>
        Book a free 15 minute call <ArrowRight size={16} />
      </a>
    </div>
  )
}
