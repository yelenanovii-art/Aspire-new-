// Just the slugs, so the router can build its table without pulling in the
// content behind it.
//
// App.jsx used to import CASES and INSIGHTS to make its route keys, which put
// every case body and every article body in the first chunk every visitor
// downloads, whatever lazy loading was wrapped around the page components. A
// list of strings weighs nothing and the heavy modules travel with the page
// that needs them.
//
// They are checked against the real data at build time (scripts/checkSlugs.mjs,
// run before the build), so a case added without touching this file fails the
// build rather than quietly 404ing.
export const CASE_SLUGS = [
  'bunq',
  'siltest',
  'ise',
  'rck',
  'de-interim-notaris',
  'craft-cigar-club',
  'rattech',
]

export const INSIGHT_SLUGS = [
  'how-long-b2b-outbound-takes',
  'linkedin-for-technical-audiences',
  'trade-show-playbook',
  'agency-freelancer-or-hire',
  'the-crm-is-not-the-problem',
  'entering-a-new-market',
]

export const hasCasePage = (slug) => CASE_SLUGS.includes(slug)
