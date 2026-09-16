import { useGlow } from '../hooks/useInteractions'

// Wraps a section so a soft accent glow tracks the cursor across it.
//
// The layer is a sibling of the content rather than a background on the section
// itself, so it can sit above the section's own gradient and grain but below
// everything readable.
export default function Glow({ as: Tag = 'section', className = '', children, ...rest }) {
  const ref = useGlow()
  return (
    <Tag ref={ref} className={`has-glow ${className}`} {...rest}>
      <span className="glow-layer" aria-hidden="true" />
      {children}
    </Tag>
  )
}
