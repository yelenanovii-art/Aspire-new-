// The three go-to-market phases, drawn.
//
// These replace the photographs that were reserved for this row. A photograph
// of a strategy phase is always a stock-looking picture of people at a table,
// which says nothing; a diagram can say the actual thing. Each one carries the
// claim its paragraph makes:
//
//   01  a market narrowing to the handful of accounts worth working
//   02  outreach where most of it goes nowhere and a few become conversations
//   03  twelve weeks where what worked grows and what did not is cut, repeating
//
// Drawn in the section's own language: hairlines for structure, white for the
// inert, the accent tint for what is live. Decorative by declaration, since
// the heading and the paragraph beside them already carry the meaning, so a
// screen reader is not made to sit through a description of a drawing.
const LINE = 'rgba(255, 255, 255, 0.16)'
const DIM = 'rgba(255, 255, 255, 0.24)'
const MID = 'rgba(255, 255, 255, 0.42)'
const LABEL = 'rgba(255, 255, 255, 0.46)'
const LIVE = '#8fc9d4'

const Label = ({ x, children, anchor = 'middle' }) => (
  <text
    x={x}
    y={99}
    textAnchor={anchor}
    fill={LABEL}
    fontSize="6.4"
    letterSpacing="1.1"
    fontFamily="var(--mono)"
  >
    {children}
  </text>
)

// Deterministic scatter: a Math.random() here would reshuffle the drawing on
// every render and differ between the prerendered HTML and the hydrated page.
const scatter = (n, x0, x1, y0, y1, seed) => {
  const out = []
  let s = seed
  for (let i = 0; i < n; i += 1) {
    s = (s * 1103515245 + 12345) % 2147483648
    const a = s / 2147483648
    s = (s * 1103515245 + 12345) % 2147483648
    const b = s / 2147483648
    out.push([x0 + a * (x1 - x0), y0 + b * (y1 - y0)])
  }
  return out
}

function Foundations() {
  return (
    <>
      <line x1="10" y1="86" x2="230" y2="86" stroke={LINE} strokeWidth="1" />
      <line x1="88" y1="14" x2="88" y2="86" stroke={LINE} strokeWidth="1" strokeDasharray="2 4" />
      <line x1="158" y1="14" x2="158" y2="86" stroke={LINE} strokeWidth="1" strokeDasharray="2 4" />

      {scatter(30, 15, 78, 20, 78, 7).map(([x, y]) => (
        <circle key={`a${x}${y}`} cx={x} cy={y} r="1.5" fill={DIM} />
      ))}
      {scatter(7, 100, 146, 30, 70, 31).map(([x, y]) => (
        <circle key={`b${x}${y}`} cx={x} cy={y} r="2.6" fill={MID} />
      ))}

      {/* The one that is actually being aimed at. */}
      <circle cx="196" cy="50" r="15" stroke={LIVE} strokeWidth="1" fill="none" opacity="0.35" />
      <circle cx="196" cy="50" r="8.5" stroke={LIVE} strokeWidth="1.2" fill="none" opacity="0.7" />
      <circle cx="196" cy="50" r="3.4" fill={LIVE} />


      <Label x="48">MARKET</Label>
      <Label x="123">SEGMENT</Label>
      <Label x="196">ICP</Label>
    </>
  )
}

function FirstMeetings() {
  const rows = [14, 28, 42, 56, 70, 80]
  // Which rows reach a meeting, and where they land. The three that do are
  // pulled into the middle third; the other three stop short, which is the
  // point of the panel.
  const lands = { 14: 38, 42: 52, 80: 66 }
  return (
    <>
      {rows.map((y) => (
        <rect key={y} x="14" y={y - 2} width="28" height="4" rx="2" fill={lands[y] ? LIVE : DIM} opacity={lands[y] ? 0.85 : 1} />
      ))}

      {rows.map((y) => {
        const to = lands[y]
        return to ? (
          <path
            key={`p${y}`}
            d={`M44 ${y} C 110 ${y}, 140 ${to}, 192 ${to}`}
            stroke={LIVE}
            strokeWidth="1.1"
            fill="none"
            opacity="0.75"
          />
        ) : (
          <path
            key={`p${y}`}
            d={`M44 ${y} C 78 ${y}, 96 ${y}, 118 ${y}`}
            stroke={LINE}
            strokeWidth="1"
            fill="none"
            strokeDasharray="2 3"
          />
        )
      })}

      {/* Where the ones that go nowhere stop. */}
      {rows.filter((y) => !lands[y]).map((y) => (
        <circle key={`x${y}`} cx="122" cy={y} r="2" stroke={LINE} strokeWidth="1" fill="none" />
      ))}

      {Object.values(lands).map((to) => (
        <g key={to}>
          <circle cx="198" cy={to} r="6.5" stroke={LIVE} strokeWidth="1" fill="none" opacity="0.4" />
          <circle cx="198" cy={to} r="3.2" fill={LIVE} />
        </g>
      ))}

      <line x1="10" y1="86" x2="230" y2="86" stroke={LINE} strokeWidth="1" />
      <Label x="28">ACCOUNTS</Label>
      <Label x="198">MEETINGS</Label>
    </>
  )
}

function RepeatablePipeline() {
  // Twelve weeks. Two are cut; the rest compound.
  const heights = [10, 14, 13, 20, 26, 24, 33, 40, 44, 52, 58, 66]
  const cut = new Set([2, 6])
  const x0 = 16
  const step = 17.5
  return (
    <>
      <line x1="10" y1="86" x2="230" y2="86" stroke={LINE} strokeWidth="1" />
      {heights.map((h, i) => {
        const x = x0 + i * step
        if (cut.has(i)) {
          return (
            <rect key={i} x={x} y={86 - h} width="11" height={h} rx="1.5"
              stroke={LINE} strokeWidth="1" strokeDasharray="2 2" fill="none" />
          )
        }
        return (
          <rect key={i} x={x} y={86 - h} width="11" height={h} rx="1.5"
            fill={LIVE} opacity={0.25 + (i / heights.length) * 0.6} />
        )
      })}

      {/* It does not stop at week twelve: it starts again on what worked. */}
      <path d="M224 16 C 224 6, 206 4, 150 4 L 30 4 C 20 4, 18 8, 18 14"
        stroke={LIVE} strokeWidth="1" fill="none" opacity="0.5" strokeDasharray="3 3" />
      <path d="M14.4 10.6 L18 14.6 L21.6 10.6" stroke={LIVE} strokeWidth="1.1"
        fill="none" opacity="0.6" strokeLinecap="round" strokeLinejoin="round" />

      <Label x="21" anchor="start">WEEK 1</Label>
      <Label x="229" anchor="end">WEEK 12</Label>
    </>
  )
}

const ART = { '01': Foundations, '02': FirstMeetings, '03': RepeatablePipeline }

export default function PhaseArt({ n }) {
  const Art = ART[n]
  if (!Art) return null
  return (
    <span className="phaseart" aria-hidden="true">
      <svg viewBox="0 0 240 104" role="presentation" focusable="false">
        <Art />
      </svg>
    </span>
  )
}
