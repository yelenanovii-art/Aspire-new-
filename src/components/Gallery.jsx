import MediaSlot from './MediaSlot'

// An even grid, not a masonry.
//
// Every item used to carry its own aspect ratio, from 4/5 portraits to a 16/9
// aerial, inside a four column grid. A grid row is as tall as its tallest
// item, so each row sized itself to whichever photograph happened to be the
// deepest and every shorter one in that row sat above a band of white. The
// gaps were not a spacing bug, they were eleven different shapes being asked
// to tile.
//
// Now the cell decides the shape and the photograph fills it. Single cells are
// 4:3 and that sets the row height. A wide cell is not given a ratio at all,
// because two columns plus the gap between them is wider than two single
// cells, so any fixed ratio makes it the taller item and every neighbour in
// that row ends up with a strip of white beneath it. It stretches to the row
// instead. The ratios in the data are ignored here on purpose.
export default function Gallery({ items, base = '' }) {
  return (
    <div className="gallery">
      {items.map((it, i) => {
        const span = it.span || 1
        return (
          <div
            className={`gallery__cell reveal ${span > 1 ? 'gallery__cell--wide' : ''}`}
            style={{ '--span': span, '--delay': `${i * 60}ms` }}
            key={it.id}
          >
            <MediaSlot
              {...it}
              ratio={span > 1 ? undefined : '4 / 3'}
              src={it.src ? base + it.src : undefined}
            />
          </div>
        )
      })}
    </div>
  )
}
