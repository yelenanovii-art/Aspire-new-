// A frame that holds a photo or a video once one exists, and an intentional
// placeholder until then.
//
// The placeholder is part of the design rather than a broken image: it states
// what belongs there and the crop to shoot for, so the page can be shown to a
// client before the shoot has happened. Set `src` in the data file and the
// frame fills; video is detected from the file extension.
const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src || '')

export default function MediaSlot({ src, poster, label, hint, ratio = '3 / 2', span = 1, alt }) {
  const style = { aspectRatio: ratio, '--span': span }

  if (src && isVideo(src)) {
    return (
      <figure className="slot slot--filled" style={style}>
        <video
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-label={alt || label}
        />
      </figure>
    )
  }

  if (src) {
    return (
      <figure className="slot slot--filled" style={style}>
        <img src={src} alt={alt || label} loading="lazy" />
      </figure>
    )
  }

  return (
    <figure className="slot slot--empty" style={style} aria-label={`${label}, image to follow`}>
      <span className="slot__mark" aria-hidden="true">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="4.5" width="18" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.4" />
          <path d="M4 17l4.8-4.6 3.2 3 3-2.6L20 17" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      </span>
      <figcaption className="slot__cap">
        <span className="slot__label">{label}</span>
        {hint && <span className="slot__hint">{hint}</span>}
      </figcaption>
    </figure>
  )
}
