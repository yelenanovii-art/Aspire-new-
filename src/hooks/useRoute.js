import { useEffect, useState } from 'react'

// Clean-URL router (History API). Real paths like "/services/social-media" so
// every page is a crawlable URL with its own prerendered HTML and meta — not a
// hash fragment.
function currentPath() {
  let p = window.location.pathname || '/'
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1) // normalise trailing slash
  return p
}

// Decide whether a clicked <a> should be handled as an in-app navigation.
function internalNav(e, a) {
  if (e.defaultPrevented) return false
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return false
  if (!a || a.target === '_blank' || a.hasAttribute('download')) return false
  if (a.origin !== window.location.origin) return false // external / mailto / tel
  const href = a.getAttribute('href') || ''
  if (href.startsWith('#')) return false // in-page anchor, handled natively
  return true
}

export function useRoute() {
  const [path, setPath] = useState(() => currentPath())

  useEffect(() => {
    const onPop = () => setPath(currentPath())

    const onClick = (e) => {
      const a = e.target.closest && e.target.closest('a')
      if (!a || !internalNav(e, a)) return
      const url = new URL(a.href)
      e.preventDefault()
      if (url.pathname !== window.location.pathname) {
        window.history.pushState({}, '', url.pathname + url.search)
        setPath(currentPath())
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    }

    window.addEventListener('popstate', onPop)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('popstate', onPop)
      document.removeEventListener('click', onClick)
    }
  }, [])

  return path
}

// Smooth-scroll to an in-page section without changing the route.
export function scrollToId(e, id) {
  if (e) e.preventDefault()
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
