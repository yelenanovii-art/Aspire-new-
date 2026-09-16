import { useCountUp } from '../hooks/useCountUp'

// Animated statistic. `value` is the number to count to; `prefix`/`suffix`
// wrap it. Pass `staticText` when the figure is not a clean single number.
export default function Stat({ value, prefix = '', suffix = '', decimals = 0, plain = false, staticText, label, note, dark = false }) {
  const num = Number(value)
  const hasValue = value != null && !Number.isNaN(num) && num !== 0
  const { ref, display } = useCountUp(hasValue ? num : 0, { decimals, group: !plain })
  // A numeric stat with no usable value must not render as a formatted "0",
  // which reads like a real figure. Show a dash and warn in dev instead.
  const broken = staticText == null && !hasValue
  if (broken && import.meta.env?.DEV) {
    console.warn(`[Stat] missing/zero value for "${label}", rendering "N/A" instead of a formatted zero.`)
  }
  return (
    <div className={`stat ${dark ? 'stat--dark' : ''}`} ref={ref}>
      <div className="stat__value">
        {staticText != null ? staticText : broken ? 'N/A' : (
          <>
            {prefix}
            {display}
            {suffix}
          </>
        )}
      </div>
      <div className="stat__label">{label}</div>
      {note && <div className="stat__note">{note}</div>}
    </div>
  )
}
