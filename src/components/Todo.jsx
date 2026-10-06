// Renders [PLACEHOLDER_TOKENS] inside a string as visible, unmistakable gaps.
//
// A figure nobody has supplied must never read as a figure. Left as plain text
// a token looks like a typo; styled like this it looks like what it is, and
// searching the built site for "todo-token" finds every one still outstanding.
const TOKEN = /(\[[A-Z0-9_]+\])/g

export default function Todo({ text }) {
  const parts = String(text).split(TOKEN)
  return (
    <>
      {parts.map((part, i) =>
        TOKEN.test(part) ? (
          <span className="todo-token" key={i} title="Placeholder, awaiting a real figure">
            {part}
          </span>
        ) : (
          part
        )
      )}
    </>
  )
}
