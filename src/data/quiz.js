// ── Growth fit quiz ─────────────────────────────────────────────────────────
//
// Six questions that end in a score, an archetype and a plan.
//
// The first version asked what was running: a consultant's intake form. It was
// accurate and nobody wants to fill it in, because being audited is not a
// feeling anyone seeks out. These ask how the situation FEELS — the wince when
// someone looks you up, the competitor you know is weaker winning anyway — and
// the recognition is what carries someone to question six.
//
// The payoff is layered deliberately: a score to react to, a name for the
// situation they are in, then the plan. The score and the name are the parts
// people repeat to a colleague.
//
// Every option carries weights across the five services. SPECIALISMS are
// decided separately: they are a different buyer, not a heavier weighting, so
// a property or yachting answer routes there outright.
import { SERVICES } from './site'
import { ESTATE, AI } from './verticals'

export const QUESTIONS = [
  {
    id: 'website',
    q: 'Someone hears your name and looks you up before you ever speak. What do you feel?',
    help: 'First reaction, not the considered one.',
    options: [
      { v: 'proud', label: 'Proud. It does the job', w: { sales: 3 }, pts: 20 },
      { v: 'wince', label: 'A small wince. It is out of date', w: { bd: 3, content: 1 }, pts: 7 },
      { v: 'invisible', label: 'Nothing, because almost nobody finds it', w: { bd: 2, social: 2 }, pts: 1 },
      { v: 'mismatch', label: 'It does not look like the company we have become', w: { bd: 3 }, pts: 6 },
    ],
  },
  {
    id: 'pipeline',
    q: 'It is Monday morning. Where is next quarter coming from?',
    help: 'The honest answer, not the forecast.',
    options: [
      { v: 'referral', label: 'Referrals we cannot control or repeat', w: { sales: 3, bd: 1 }, pts: 5 },
      { v: 'grind', label: 'Outbound we are grinding out ourselves', w: { sales: 2, content: 1 }, pts: 13 },
      { v: 'trickle', label: 'Inbound, but it trickles', w: { social: 2, content: 2 }, pts: 18 },
      // The events buyer identifies themselves here, and weighting cannot carry
      // it: sales accumulates across several answers, so an events-shaped
      // company still came out as sales no matter how heavy this was made.
      // It routes instead, for the same reason the specialisms do — project
      // work around a show is a different shape from a retainer, not a
      // heavier lean. A specialism still wins over it, see matchFor.
      { v: 'shows', label: 'The conferences we attend, and little else', w: { events: 3, sales: 1 }, pts: 10, routeService: 'events' },
      { v: 'unknown', label: 'Genuinely, I do not know', w: { sales: 3, bd: 3 }, pts: 0 },
    ],
  },
  {
    id: 'rival',
    q: 'A competitor you know is weaker keeps showing up everywhere. That feels like?',
    options: [
      { v: 'galling', label: 'Galling. We are better and quieter', w: { social: 3, content: 2 }, pts: 9 },
      { v: 'fair', label: 'Fair enough. They market, we do not', w: { bd: 2, social: 2 }, pts: 11 },
      { v: 'unnoticed', label: 'I have not been watching', w: { bd: 2 }, pts: 5 },
      { v: 'why', label: 'Exactly why I am filling this in', w: { sales: 2, social: 2 }, pts: 4 },
    ],
  },
  {
    id: 'stuck',
    q: 'Growth has not been fixed yet. What is the real reason?',
    help: 'Everyone has one. Most people know what it is.',
    options: [
      { v: 'time', label: 'No time. We are delivering', w: { bd: 2, content: 2 }, pts: 14 },
      { v: 'owner', label: 'Nobody actually owns it', w: { bd: 3, sales: 1 }, pts: 3 },
      { v: 'burned', label: 'We tried an agency and got juniors', w: { sales: 2, bd: 2 }, pts: 9 },
      { v: 'start', label: 'I do not know where to start', w: { bd: 3, social: 1 }, pts: 2 },
    ],
  },
  {
    id: 'win',
    q: 'One thing lands in ninety days. Which would change how you feel most?',
    options: [
      { v: 'conversations', label: 'A calendar with real conversations in it', w: { sales: 3, events: 1 }, pts: 8 },
      { v: 'brand', label: 'A brand that finally matches the product', w: { bd: 3 }, pts: 8 },
      { v: 'proof', label: 'Work we are not embarrassed to show', w: { content: 3, social: 1 }, pts: 8 },
      { v: 'clarity', label: 'Numbers I can see without asking anyone', w: { bd: 1 }, pts: 8, route: 'ai' },
    ],
  },
  {
    id: 'sector',
    q: 'Last one. Who is actually buying?',
    help: 'This decides whether a specialist practice fits better than the general offer.',
    options: [
      { v: 'b2b-tech', label: 'B2B software or hardware buyers', w: { sales: 2, bd: 2 }, pts: 5 },
      { v: 'property', label: 'Property, development or yachting buyers', w: {}, pts: 5, route: 'estate' },
      { v: 'services', label: 'Businesses buying expertise', w: { bd: 2, social: 1 }, pts: 5 },
      { v: 'other', label: 'Something else entirely', w: { bd: 1 }, pts: 5 },
    ],
  },
]

// Weight keys map to real service slugs so the result can link straight through.
const SLUG = {
  sales: 'sales',
  bd: 'business-development',
  social: 'social-media',
  content: 'content-creation',
  events: 'events',
}

export function scoreQuiz(answers) {
  const totals = { sales: 0, bd: 0, social: 0, content: 0, events: 0 }
  let route = null
  let routeService = null

  QUESTIONS.forEach((question) => {
    const chosen = question.options.find((o) => o.v === answers[question.id])
    if (!chosen) return
    // A specialism wins outright: those buyers are not better served by a
    // heavier weighting on one of the five, they are a different practice.
    if (chosen.route && !route) route = chosen.route
    if (chosen.routeService && !routeService) routeService = chosen.routeService
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
    routeService,
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
  // Checked after the two specialisms on purpose: a property or yachting
  // buyer who also exhibits is still better served by that practice.
  if (result.routeService === 'events') {
    const ev = SERVICES.find((s) => s.slug === 'events')
    if (ev) {
      return {
        kind: 'service',
        title: ev.title,
        href: `/services/${ev.slug}`,
        line: ev.blurb,
        second: { title: 'Sales, in person and digital', href: '/services/sales' },
      }
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
  events: {
    first: 'Pick the one show that matters most this year and work backwards from it. Pull the attendee and exhibitor lists, mark who is genuinely worth a meeting, and start the outreach four to six weeks out. A full diary on day one is decided now, not on the floor.',
    then: 'Run the show itself as three jobs rather than one: keep the diary moving, capture and publish while it is happening, and record every conversation with the detail that makes follow-up possible. Then send that follow-up within days, not weeks.',
    park: 'Do not redesign the stand this cycle. A better-looking stand with an empty diary still produces an empty pipeline.',
    expect: 'A calendar of booked meetings before you travel, a recorded lead list instead of a pile of scans, and follow-up out while they still remember the conversation.',
  },
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
  time: 'You said there is no time because you are delivering. That is the healthiest reason on this list and the easiest to leave unfixed for a year, so the plan below is deliberately one thing at a time.',
  owner: 'You said nobody owns growth. Decide who does before anything else here, even if that person is you for one day a week. Nothing below survives without it.',
  burned: 'You said an agency gave you juniors. Judge the first month on who is actually in the room, not on the plan they present.',
  start: 'You said you do not know where to start. That is what the first line below is for; ignore the rest until it is done.',
}

// Pick the plan for a result, plus the one line keyed to why they are here.
export function planFor(result, answers) {
  const key = result.route || result.primary?.slug
  const plan = PLANS[key] || PLANS['business-development']
  return { ...plan, note: BOTTLENECK_NOTE[answers?.stuck] || null }
}

// ── Score and archetype ─────────────────────────────────────────────────────
//
// The score exists to be reacted to. It is deliberately not a grade out of ten
// dressed up: it reads as a position on a scale people can imagine moving
// along, which is the feeling the whole page is selling.
//
// The archetype is the line someone repeats to a colleague. Each one is
// flattering about the company and unflattering about the situation, because
// that is the combination people recognise themselves in rather than resist.
// True ceiling: 20 + 18 + 11 + 14 + 8 + 6. Reaching it means almost nothing
// is wrong, which should be rare on a page people visit because something is.
export const MAX_SCORE = 76

export const ARCHETYPES = {
  secret: {
    name: 'The Best Kept Secret',
    line: 'The product is good and almost nobody knows. Everything you need already exists except the part that tells people about it, which is the cheapest gap on this list to close.',
  },
  bottleneck: {
    name: 'The Founder Bottleneck',
    line: 'Growth runs through one person who is also doing everything else. It works until it does not, and it never compounds, because the only thing holding it together is one calendar.',
  },
  scattered: {
    name: 'Everywhere and Nowhere',
    line: 'There is activity on several fronts and none of it is compounding. Four half-run channels lose to one that is run properly, and you almost certainly already know which one it should be.',
  },
  coasting: {
    name: 'Running on Referrals',
    line: 'The work is good enough that it sells itself, which is why nothing has been built. That is a strong position and a fragile one: referrals cannot be turned up when you need them.',
  },
  blind: {
    name: 'Flying on Instruments You Cannot Read',
    line: 'Decisions are being made on numbers nobody fully trusts, rebuilt by hand. The marketing question underneath it cannot be answered honestly until that is fixed.',
  },
}

export function scoreOf(answers) {
  let pts = 0
  QUESTIONS.forEach((q) => {
    const chosen = q.options.find((o) => o.v === answers[q.id])
    if (chosen) pts += chosen.pts || 0
  })
  const pct = Math.max(0, Math.min(100, Math.round((pts / MAX_SCORE) * 100)))
  const band = pct >= 72 ? 'Strong footing' : pct >= 45 ? 'Workable' : 'Plenty to build'
  return { pts, pct, band }
}

export function archetypeOf(answers, result) {
  // Most specific signal first. "No time" is the most common answer anyone
  // gives, so testing it early swallowed everything else and three different
  // companies came out as the same archetype.
  if (result.route === 'ai' || answers.win === 'clarity') return ARCHETYPES.blind
  if (answers.pipeline === 'referral') return ARCHETYPES.coasting
  if (answers.stuck === 'owner') return ARCHETYPES.bottleneck
  if (answers.rival === 'galling' || answers.website === 'invisible') return ARCHETYPES.secret
  if (answers.pipeline === 'trickle' || answers.rival === 'fair') return ARCHETYPES.scattered
  if (answers.stuck === 'time') return ARCHETYPES.bottleneck
  return ARCHETYPES.secret
}
