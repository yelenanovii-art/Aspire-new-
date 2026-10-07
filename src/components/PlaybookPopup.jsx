import { useEffect, useRef, useState } from 'react'
import PlaybookForm from './PlaybookForm'
import PlaybookCover from './PlaybookCover'
import { PLAYBOOK as P } from '../data/playbook'

const get = (k) => { try { return window.localStorage.getItem(k) } catch { return null } }
const set = (k, v) => { try { window.localStorage.setItem(k, v) } catch { /* private window */ } }

// The playbook pop-up, mounted only by /real-estate.
//
// Three ways in — a timer, half the page scrolled, and leaving the window on a
// real pointer — whichever happens first. Two ways it stays away: dismissed
// suppresses it for a fortnight, submitted suppresses it for good.
// forceOpen is the locked cover on the page asking for it. A deliberate
// click must open it even when the automatic triggers are suppressed:
// somebody who dismissed the pop-up last week and has now clicked Unlock has
// plainly changed their mind.
export default function PlaybookPopup({ forceOpen = false, onClose }) {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  const box = useRef(null)
  const last = useRef(null)
  const armed = useRef(false)

  useEffect(() => {
    if (get(P.keySubmitted)) return undefined
    const until = Number(get(P.keyDismissed) || 0)
    if (until && Date.now() < until) return undefined

    const show = () => {
      if (armed.current) return
      armed.current = true
      last.current = document.activeElement
      setOpen(true)
    }

    const timer = window.setTimeout(show, P.delayMs)

    const onScroll = () => {
      const h = document.documentElement
      const max = h.scrollHeight - h.clientHeight
      if (max > 0 && h.scrollTop / max >= P.scrollPct) show()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // Exit intent: the pointer leaving through the top of the window. Guarded
    // to fine pointers — a touch screen has no cursor to leave with, and the
    // event fires spuriously there.
    let onLeave
    const fine = window.matchMedia('(pointer: fine)').matches
    if (P.exitIntent && fine) {
      onLeave = (e) => { if (e.clientY <= 0) show() }
      document.addEventListener('mouseout', onLeave)
    }

    return () => {
      window.clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
      if (onLeave) document.removeEventListener('mouseout', onLeave)
    }
  }, [])

  const close = () => {
    setOpen(false)
    if (onClose) onClose()
    // Submitting writes its own permanent key; only a dismissal starts the
    // fortnight.
    if (!done) set(P.keyDismissed, String(Date.now() + P.dismissDays * 86400000))
    if (last.current && last.current.focus) last.current.focus()
  }

  const shown = open || forceOpen

  useEffect(() => {
    if (!shown) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); close() }
      if (e.key === 'Tab' && box.current) {
        const f = box.current.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled])'
        )
        if (!f.length) return
        const first = f[0]; const lastEl = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); lastEl.focus() }
        else if (!e.shiftKey && document.activeElement === lastEl) { e.preventDefault(); first.focus() }
      }
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const t = window.setTimeout(() => box.current?.querySelector('.pbp__close')?.focus(), 60)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
      window.clearTimeout(t)
    }
  }, [shown, done])

  if (!shown) return null

  return (
    <div className="pbp" role="presentation" onMouseDown={(e) => { if (e.target === e.currentTarget) close() }}>
      <div className="pbp__box" role="dialog" aria-modal="true" aria-labelledby="pbp-title" ref={box}>
        <button type="button" className="pbp__close" onClick={close} aria-label="Close">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        <div className="pbp__media"><PlaybookCover /></div>

        <div className="pbp__body">
          <p className="pbp__eyebrow">Free guide</p>
          <h2 className="pbp__title" id="pbp-title">{P.popup.headline}</h2>
          <p className="pbp__sub">{P.popup.subline}</p>
          <PlaybookForm placement="popup" onSubmitted={() => setDone(true)} />
        </div>
      </div>
    </div>
  )
}
