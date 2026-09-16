// Inline area chart. No charting library: it is a dozen points, and an SVG we
// generate ourselves stays sharp at any size and costs nothing to load.
//
// `points` are plain numbers on any scale; they are normalised to the viewbox.
import { useDrawOnce } from '../hooks/useInteractions'

export default function Sparkline({ points, w = 300, h = 78, id = 'spark' }) {
  const ref = useDrawOnce()
  const max = Math.max(...points)
  const min = Math.min(...points)
  const span = max - min || 1
  const step = w / (points.length - 1)

  const xy = points.map((p, i) => [i * step, h - ((p - min) / span) * (h - 8) - 4])
  // Catmull-Rom style smoothing, so the curve reads as growth rather than a
  // jagged polyline.
  const d = xy.reduce((acc, [x, y], i, a) => {
    if (i === 0) return `M ${x} ${y}`
    const [px, py] = a[i - 1]
    const cx = px + (x - px) / 2
    return `${acc} C ${cx} ${py}, ${cx} ${y}, ${x} ${y}`
  }, '')
  const area = `${d} L ${w} ${h} L 0 ${h} Z`
  const [lx, ly] = xy[xy.length - 1]

  return (
    <svg ref={ref} className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.34" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path className="spark__area" d={area} fill={`url(#${id}-fill)`} />
      <path className="spark__line" d={d} fill="none" stroke="var(--accent)" strokeWidth="1.75"
            strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" pathLength="1" />
      <circle className="spark__dot" cx={lx} cy={ly} r="3.2" fill="var(--accent)" />
      <circle className="spark__halo" cx={lx} cy={ly} r="7" fill="var(--accent)" opacity="0.22" />
    </svg>
  )
}
