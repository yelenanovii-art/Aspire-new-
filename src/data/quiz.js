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

// ── The plan ────────────────────────────────────────────────────────────────
//
// Written here rather than promised by email, so the thing someone hands over
// an address for arrives while they are still on the page. Each plan is built
// from what that discipline actually includes on its own service page, so the
// quiz cannot promise work the site does not describe.
//
// `first` is the thirty day move, `then` the rest of the quarter, `park` the
// thing most people do too early, and `expect` what it should produce. The
// bottleneck answer adds one line on top, because two companies matched to the
// same discipline for different reasons should not read the same plan.
export const PLANS = {
  sales: {
    first: 'Define the buyer properly, then build one list against it. Not a sector and a job title: the trigger that makes someone need this now. Most outreach fails on the list, not the message.',
    then: 'Run one channel properly rather than four badly. Sequence it, follow up past the second touch, and put every interaction in the CRM the day it happens, so the pipeline is a record rather than a memory.',
    park: 'Leave rebranding alone this quarter. A new logo moves nothing while nobody senior is having conversations.',
    expect: 'Qualified conversations inside six weeks, and a pipeline you can forecast from by the end of the quarter.',
  },
  'business-development': {
    first: 'Fix the positioning before anything is spent amplifying it. One sentence on who this is for and what changes for them, tested on people who were not in the room when it was written.',
    then: 'Put that sentence through the website, the deck and the outreach so all three say the same thing, then open two or three partnerships where someone else already has the audience.',
    park: 'Leave paid acquisition alone until the positioning is settled. Paying to send traffic at an unclear promise is how budgets disappear.',
    expect: 'A clearer answer to "what do you do", a site that converts the traffic it already gets, and one or two partnerships worth more than a month of cold outreach.',
  },
  'social-media': {
    first: 'Pick one channel where your buyers already are and commit to it for a quarter. Four half-run channels lose to one that posts consistently.',
    then: 'Build a calendar from the questions your sales conversations keep answering, so the content feeds the pipeline rather than running beside it. Then community: reply to everything for ninety days.',
    park: 'Leave follower count alone as a measure. Reach without conversations is a vanity line on a report.',
    expect: 'A channel that produces inbound conversations rather than impressions, and a library of content the sales side can send directly.',
  },
  'content-creation': {
    first: 'One shoot, planned around a quarter of output rather than a single post. Photography, long form and vertical cut from the same day is the difference between a content budget and a content problem.',
    then: 'Build the templates and the branded visuals so the look holds when someone else posts, and put live capture on the next event you attend, which is the cheapest content you will ever make.',
    park: 'Leave a studio set up alone for now. Location work at a real event beats a clean background nobody recognises.',
    expect: 'Enough material to post consistently for a quarter, and something to show prospects that is not a slide.',
  },
  estate: {
    first: 'Shoot one property properly and set the grade and framing rules on it. Consistency across a portfolio is what makes a brokerage feed read as expensive; one beautiful listing next to six phone photos does not.',
    then: 'Cut every shoot long for the listing page and vertical for Reels on the same day, then run the channel the content lands on so the enquiries have somewhere to arrive.',
    park: 'Leave drone permissions and exotic locations alone until the base look is consistent. The gap is rarely ambition.',
    expect: 'A portfolio that looks like one brand, and listings that hold attention long enough to generate an enquiry.',
  },
  ai: {
    first: 'Write down the report that gets rebuilt by hand every month and where each number comes from. That document is most of the build, and it usually shows two sources nobody trusts.',
    then: 'Connect those sources into one dashboard that updates itself, then automate the step after the report: the alert, the handoff, the thing someone currently remembers to do.',
    park: 'Leave anything described as an AI agent alone until the data is in one place and trusted. Automation on top of bad inputs produces confident nonsense faster.',
    expect: 'The monthly rebuild gone, one place to look, and the hours it was eating back.',
  },
}

// One line keyed to the bottleneck, so the plan speaks to why they are here.
export const BOTTLENECK_NOTE = {
  volume: 'You said the problem is not enough qualified conversations, so judge the first month on conversations started, not on anything that happens after them.',
  stall: 'You said conversations stall. That is usually a follow up problem rather than a pitch problem: the fix is a sequence someone owns, not a better deck.',
  proof: 'You said there is nothing good to show prospects. Treat that as the first deliverable, because every other channel is waiting on it.',
  owner: 'You said nobody owns growth full time. Decide who owns it before anything else on this list, even if that person is you for one day a week.',
}

// Pick the plan for a result, plus the one line keyed to why they are here.
export function planFor(result, answers) {
  const key = result.route || result.primary?.slug
  const plan = PLANS[key] || PLANS['business-development']
  return { ...plan, note: BOTTLENECK_NOTE[answers?.break] || null }
}
