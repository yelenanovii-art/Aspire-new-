import { useCountUp } from '../hooks/useCountUp'

// A stat figure that counts up once, when it first scrolls into view.
//
// Wraps the existing hook rather than replacing it, so the two guards that
// matter are kept: the prerender pass renders the final value (otherwise the
// static HTML crawlers read would be baked at "0"), and reduced motion snaps
// straight to it.
//
// Takes the rendered string — "500+", "8%", "1M+", "2022" — and animates only
// the digits, putting whatever sits either side back each frame, so symbols
// and separators survive. A year is not a quantity, so `plain` leaves it be.
export default function CountUp({ value, plain = false, className }) {
  const str = String(value)
  const m = str.match(/^([^\d]*)([\d.,]+)(.*)$/)
  const digits = m ? m[2] : '0'
  const decimals = (digits.split('.')[1] || '').length
  const { ref, display } = useCountUp(parseFloat(digits.replace(/,/g, '')) || 0, {
    decimals,
    group: digits.includes(','),
  })

  // Hooks run unconditionally above; the branch is only about what is drawn.
  if (plain || !m) return <span className={className}>{str}</span>
  return (
    <span ref={ref} className={className}>
      {m[1]}
      {display}
      {m[3]}
    </span>
  )
}
