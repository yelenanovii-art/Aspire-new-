// ── Growth fit quiz ─────────────────────────────────────────────────────────
//
// Six questions that end in a named service rather than a score. A score would
// be honest for a risk assessment; here the useful answer is "start with this
// one", because that is the actual decision a visitor is trying to make.
//
// Every option carries weights across the four disciplines. SPECIALISMS are
// decided separately: they are a different buyer, not a heavier weighting, so
// a property or yachting answer routes there outright.
import { SERVICES } from './site'
import { ESTATE, AI } from './verticals'

export const QUESTIONS = [
  {
    id: 'sector',
    q: 'What do you sell, and who buys it?',
    help: 'This decides whether a specialist practice fits better than the general offer.',
    options: [
      { v: 'b2b-tech', label: 'B2B software or hardware', w: { sales: 2, bd: 2 } },
      { v: 'property', label: 'Property, developments or yachts', w: {}, route: 'estate' },
      { v: 'services', label: 'Professional or consulting services', w: { bd: 2, social: 1 } },
      { v: 'other', label: 'Something else', w: { bd: 1 } },
    ],
  },
  {
    id: 'source',
    q: 'Where does new business come from today?',
    help: 'Be honest about the main one, not the one you wish it were.',
    options: [
      { v: 'referral', label: 'Referrals and word of mouth', w: { sales: 3, bd: 1 } },
      { v: 'outbound', label: 'Outbound we run ourselves', w: { sales: 2, content: 1 } },
      { v: 'inbound', label: 'Inbound from content or search', w: { social: 2, content: 2 } },
      { v: 'nothing', label: 'Nothing consistent', w: { sales: 3, bd: 3 } },
    ],
  },
  {
    id: 'break',
    q: 'What breaks first?',
    help: 'The bottleneck, not the symptom.',
    options: [
      { v: 'volume', label: 'Not enough qualified conversations', w: { sales: 3 } },
      { v: 'stall', label: 'Conversations start then stall', w: { sales: 2, bd: 2 } },
      { v: 'proof', label: 'Nothing good to show prospects', w: { content: 3, social: 1 } },
      { v: 'owner', label: 'Nobody owns growth full time', w: { bd: 3, sales: 1 } },
    ],
  },
  {
    id: 'live',
    q: 'Which of these are genuinely running?',
    help: 'Running and maintained, not set up once.',
    options: [
      { v: 'crm', label: 'A CRM the team actually uses', w: { bd: 1, content: 1 } },
      { v: 'channel', label: 'Regular posts on at least one channel', w: { sales: 2 } },
      { v: 'paid', label: 'Paid acquisition', w: { content: 2, sales: 1 } },
      { v: 'none', label: 'None of these yet', w: { bd: 2, social: 2 } },
    ],
  },
  {
    id: 'team',
    q: 'Who works on growth right now?',
    options: [
      { v: 'founder', label: 'The founder, between everything else', w: { bd: 3, sales: 2 } },
      { v: 'one', label: 'One generalist', w: { sales: 2, social: 1 } },
      { v: 'team', label: 'A small team', w: { content: 2, social: 1 } },
      { v: 'agency', label: 'An agency already', w: { bd: 2, content: 1 } },
    ],
  },
  {
    id: 'data',
    q: 'How much of your reporting is manual?',
    help: 'Spreadsheets rebuilt by hand every month are usually a systems problem, not a marketing one.',
    options: [
      { v: 'manual', label: 'Rebuilt by hand every month', w: {}, route: 'ai' },
      { v: 'partial', label: 'Some of it is automated', w: { bd: 1 } },
      { v: 'automated', label: 'It reports itself', w: { content: 1 } },
      { v: 'none', label: 'We do not really report on it', w: { bd: 2 } },
    ],
  },
]

// Weight keys map to real service slugs so the result can link straight through.
const SLUG = {
  sales: 'sales',
  bd: 'business-development',
  social: 'social-media',
  content: 'content-creation',
}

export function scoreQuiz(answers) {
  const totals = { sales: 0, bd: 0, social: 0, content: 0 }
  let route = null

  QUESTIONS.forEach((question) => {
    const chosen = question.options.find((o) => o.v === answers[question.id])
    if (!chosen) return
    // A specialism wins outright: those buyers are not better served by a
    // heavier weighting on one of the four, they are a different practice.
    if (chosen.route && !route) route = chosen.route
    Object.entries(chosen.w || {}).forEach(([k, n]) => {
      totals[k] += n
    })
  })

  const ranked = Object.entries(totals)
    .sort((a, b) => b[1] - a[1])
    .map(([k, n]) => ({ key: k, slug: SLUG[k], n }))

  const answered = QUESTIONS.filter((q) => answers[q.id]).length
  return {
    route,
    answered,
    complete: answered === QUESTIONS.length,
    primary: ranked[0],
    secondary: ranked[1],
    totals,
  }
}

// Resolve a result into the page it should send someone to.
export function matchFor(result) {
  if (result.route === 'estate') {
    return {
      kind: 'specialism',
      title: ESTATE.nav,
      href: `/${ESTATE.slug}`,
      line: 'Property and yachting is its own practice here: the photography, the film and the channels that carry them, rather than a general retainer with a camera attached.',
    }
  }
  if (result.route === 'ai') {
    return {
      kind: 'specialism',
      title: AI.nav,
      href: `/${AI.slug}`,
      line: 'Rebuilding the same report by hand every month is a systems problem. That is a dashboard and a few integrations, not a marketing retainer.',
    }
  }
  const svc = SERVICES.find((s) => s.slug === result.primary?.slug)
  const second = SERVICES.find((s) => s.slug === result.secondary?.slug)
  return {
    kind: 'service',
    title: svc?.title || 'Business development',
    href: `/services/${svc?.slug || 'business-development'}`,
    line: svc?.blurb || '',
    second: second ? { title: second.title, href: `/services/${second.slug}` } : null,
  }
}
