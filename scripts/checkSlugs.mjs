// The route table is built from src/data/slugs.js so the content modules stay
// out of the first chunk. That only holds if the list stays true, so the build
// fails rather than shipping a route that 404s or a case nobody can reach.
import { CASES } from '../src/data/site.js'
import { INSIGHTS } from '../src/data/insights.js'
import { CASE_SLUGS, INSIGHT_SLUGS } from '../src/data/slugs.js'

const cmp = (name, real, listed) => {
  const missing = real.filter((s) => !listed.includes(s))
  const extra = listed.filter((s) => !real.includes(s))
  if (!missing.length && !extra.length) return null
  return [
    `${name} in src/data/slugs.js is out of date.`,
    missing.length ? `  missing: ${missing.join(', ')}` : '',
    extra.length ? `  listed but gone: ${extra.join(', ')}` : '',
  ].filter(Boolean).join('\n')
}

const problems = [
  cmp('CASE_SLUGS', CASES.map((c) => c.slug), CASE_SLUGS),
  cmp('INSIGHT_SLUGS', INSIGHTS.map((a) => a.slug), INSIGHT_SLUGS),
].filter(Boolean)

if (problems.length) {
  console.error('\n' + problems.join('\n') + '\n')
  process.exit(1)
}
console.log(`slugs ok (${CASE_SLUGS.length} cases, ${INSIGHT_SLUGS.length} insights)`)
