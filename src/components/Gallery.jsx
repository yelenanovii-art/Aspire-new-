import MediaSlot from './MediaSlot'

// Masonry-ish grid of media slots. Items can span two columns via `span: 2`.
export default function Gallery({ items, base = '' }) {
  return (
    <div className="gallery">
      {items.map((it, i) => (
        <div
          className="gallery__cell reveal"
          style={{ '--span': it.span || 1, '--delay': `${i * 60}ms` }}
          key={it.id}
        >
          <MediaSlot {...it} src={it.src ? base + it.src : undefined} />
        </div>
      ))}
    </div>
  )
}
