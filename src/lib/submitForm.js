import { FORM_ENDPOINT, FORM_EXTRA } from '../config'

// Posts a form submission and returns { ok, configured }.
//
// Two delivery paths, picked automatically:
//
//   1. FORM_ENDPOINT set → POST there (Formspree, Web3Forms, any JSON endpoint).
//   2. Otherwise         → Netlify Forms: POST back to the site itself with a
//                          `form-name` matching the static declaration in
//                          index.html. Netlify intercepts it at the edge.
//
// Netlify Forms only exists on a deployed Netlify site — the plain Vite dev
// server has nothing to intercept the POST — so in dev we skip the request and
// report configured:false rather than a failure that is not real. Use
// `netlify dev` or a deploy preview to exercise the real path locally.
export async function submitForm(data, { formName = 'aspire-lead' } = {}) {
  if (FORM_ENDPOINT) {
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...FORM_EXTRA, ...data }),
      })
      return { ok: res.ok, configured: true }
    } catch {
      return { ok: false, configured: true }
    }
  }

  if (import.meta.env.DEV) {
    console.warn(
      `[submitForm] Netlify Forms cannot run on the Vite dev server — "${formName}" ` +
        'was NOT sent. Use `netlify dev` or a deploy preview to test delivery.'
    )
    return { ok: true, configured: false }
  }

  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': formName, ...FORM_EXTRA, ...data }).toString(),
    })
    return { ok: res.ok, configured: true }
  } catch {
    return { ok: false, configured: true }
  }
}
