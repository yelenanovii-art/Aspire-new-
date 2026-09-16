import { useMagnetic } from '../hooks/useInteractions'

// Leans its child a few pixels toward the cursor when the pointer is close.
//
// The pull lives on this wrapper, not on the button, so the button keeps its own
// hover lift and active press. Putting both transforms on one element means the
// inline one silently wins and the press stops responding.
export default function Magnetic({ children, strength }) {
  const ref = useMagnetic(strength)
  return (
    <span className="magnetic" ref={ref}>
      {children}
    </span>
  )
}
