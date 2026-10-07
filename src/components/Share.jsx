import { useState } from 'react'

// Share controls, drawn here rather than loaded.
//
// The usual share widget is a third party script that tracks every reader of
// the page whether or not they ever click it. These are three links and one
// clipboard call, so the page stays private and nothing is requested.
export default function Share({ url, title }) {
  const [copied, setCopied] = useState(false)
  const u = encodeURIComponent(url)
  const t = encodeURIComponent(title)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard access is denied in some contexts. The address bar still has
      // the URL, so there is nothing useful to say and nothing to break.
    }
  }

  return (
    <div className="share">
      <span className="share__label">Share this</span>
      <div className="share__row">
        <a
          className="share__btn"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${u}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share ${title} on LinkedIn`}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.5 9.5h5v12h-5v-12Zm7 0h4.8v1.64h.07c.67-1.2 2.3-2.46 4.73-2.46 5.06 0 6 3.2 6 7.36v7.96h-5v-7.06c0-1.68-.03-3.85-2.4-3.85-2.4 0-2.77 1.83-2.77 3.73v7.18h-5v-12Z" />
          </svg>
          LinkedIn
        </a>
        <a
          className="share__btn"
          href={`https://wa.me/?text=${t}%20${u}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share ${title} on WhatsApp`}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2Zm0 1.8a8.1 8.1 0 1 1-4.1 15.08l-.3-.17-3.1.88.9-3.02-.2-.31A8.1 8.1 0 0 1 12.04 3.8Zm-3.2 4.1c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.68 2.68 4.16 3.65 2.06.8 2.48.64 2.93.6.45-.04 1.45-.59 1.65-1.17.2-.57.2-1.06.14-1.17-.06-.1-.22-.16-.46-.28-.24-.12-1.45-.72-1.67-.8-.22-.08-.39-.12-.55.12s-.63.8-.77.96c-.14.16-.28.18-.52.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.35-1.69-.14-.24-.02-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.33-.75-1.82-.18-.44-.37-.4-.52-.4h-.04Z" />
          </svg>
          WhatsApp
        </a>
        <button type="button" className="share__btn" onClick={copy} aria-live="polite">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor"
               strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7" />
            <path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7" />
          </svg>
          {copied ? 'Link copied' : 'Copy link'}
        </button>
      </div>
    </div>
  )
}
