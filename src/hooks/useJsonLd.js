import { useEffect } from 'react'

// Injects a page-scoped JSON-LD block into <head> and removes it on unmount.
//
// useSeo owns the site-wide graph; this is for schema a single page owns (the
// FAQPage on the home page, the Person on /about). Because the SPA shell is
// served for any not-yet-prerendered URL, a stale copy could otherwise ride
// along on the wrong page — so the id is registered in useSeo's
// PAGE_SCHEMA_OWNERS and stripped wherever it does not belong.
export function useJsonLd(id, data) {
  useEffect(() => {
    // A null id lets a caller keep the hook unconditional and opt out.
    if (!id || !data) return
    let el = document.getElementById(id)
    if (!el) {
      el = document.createElement('script')
      el.type = 'application/ld+json'
      el.id = id
      document.head.appendChild(el)
    }
    el.textContent = JSON.stringify(data)
    return () => {
      document.getElementById(id)?.remove()
    }
    // Serialise for the dep so a structurally identical object does not
    // retrigger the effect on every render.
  }, [id, JSON.stringify(data)])
}
