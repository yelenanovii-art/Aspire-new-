// The "Aspire." wordmark, using the supplied brand artwork.
//
// Two files, because the mark is not a single colour that can be recoloured in
// CSS: the word inverts between dark and light grounds while the period stays
// brand teal. Swapping the file is the only way to keep that relationship.
//
//   aspire-logo.png        ink wordmark, teal period   (light backgrounds)
//   aspire-logo-light.png  white wordmark, teal period (dark backgrounds)
//
// Both are 840x359 with the same crop, so they are interchangeable at any size
// without the layout shifting.
const SIZES = { sm: 104, md: 124, lg: 150 }

export default function Logo({ onDark = false, size = 'md', href = '/' }) {
  const w = SIZES[size] || SIZES.md
  const mark = (
    <img
      className={`logo logo--${size}`}
      src={onDark ? '/brand/aspire-logo-light.webp' : '/brand/aspire-logo.webp'}
      alt="Aspire"
      width={w}
      height={Math.round((w * 359) / 840)}
      decoding="async"
    />
  )
  if (!href) return mark
  return (
    <a className="logo-link" href={href} aria-label="Aspire, home">
      {mark}
    </a>
  )
}
