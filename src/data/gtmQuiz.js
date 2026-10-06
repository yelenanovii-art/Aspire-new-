// Go-to-market readiness check.
//
// Seven questions, a score out of ten, a stage on the way from an idea to a
// repeatable pipeline, and three next steps written for that stage. Separate
// from the /fit quiz on purpose: that one asks which service to start with,
// this one asks whether the plan underneath any of them exists yet.
//
// Each option carries pts out of a possible 10 across the set. The weights are
// deliberately uneven: knowing who buys is worth more than having a deadline.
export const GTM_QUESTIONS = [
  {
    id: 'stage',
    q: 'Where is the business today?',
    options: [
      { v: 'idea', label: 'Product is still being built', pts: 0.2 },
      { v: 'ready', label: 'Product is ready, nobody has sold it yet', pts: 0.6 },
      { v: 'some', label: 'A handful of customers, mostly through contacts', pts: 1.1 },
      { v: 'proven', label: 'Selling steadily in one market', pts: 1.6 },
    ],
  },
  {
    id: 'market',
    q: 'How clearly can you name the market you are going after next?',
    options: [
      { v: 'vague', label: 'A country or a sector, no further than that', pts: 0.2 },
      { v: 'segment', label: 'A segment inside it, roughly sized', pts: 0.8 },
      { v: 'sized', label: 'Segment, size and the competitors already in it', pts: 1.4 },
      { v: 'tested', label: 'All of that, and we have tested demand in it', pts: 1.6 },
    ],
  },
  {
    id: 'icp',
    q: 'Who signs the contract?',
    options: [
      { v: 'unknown', label: 'We would be guessing', pts: 0.1 },
      { v: 'title', label: 'We know the job title', pts: 0.6 },
      { v: 'committee', label: 'We know the title, the blocker and the user', pts: 1.3 },
      { v: 'trigger', label: 'All of that, plus what makes it urgent for them', pts: 1.8 },
    ],
  },
  {
    id: 'positioning',
    q: 'If a buyer asks what you do, how close are two people on your team to the same answer?',
    options: [
      { v: 'different', label: 'They would say different things', pts: 0.1 },
      { v: 'similar', label: 'Similar, in their own words', pts: 0.7 },
      { v: 'written', label: 'There is a written line and most people use it', pts: 1.3 },
      { v: 'tested', label: 'Written, used, and tested on buyers outside the building', pts: 1.6 },
    ],
  },
  {
    id: 'pipeline',
    q: 'Where does next quarter come from in the new market?',
    options: [
      { v: 'nothing', label: 'Nothing yet', pts: 0.1 },
      { v: 'intros', label: 'A few warm introductions', pts: 0.6 },
      { v: 'list', label: 'A target list we have started working', pts: 1.2 },
      { v: 'flow', label: 'Meetings arriving at a rate we can roughly predict', pts: 1.6 },
    ],
  },
  {
    id: 'capacity',
    q: 'Who will actually run the outreach?',
    options: [
      { v: 'nobody', label: 'Nobody has the time', pts: 0.1 },
      { v: 'founder', label: 'The founder, between everything else', pts: 0.5 },
      { v: 'part', label: 'Someone part time, or an agency on one channel', pts: 1.0 },
      { v: 'team', label: 'A dedicated person or team', pts: 1.4 },
    ],
  },
  {
    id: 'timeline',
    q: 'When do you need the first real meetings?',
    options: [
      { v: 'now', label: 'Yesterday', pts: 0.4 },
      { v: 'quarter', label: 'Inside a quarter', pts: 0.4 },
      { v: 'half', label: 'Within six months', pts: 0.3 },
      { v: 'open', label: 'No fixed date', pts: 0.2 },
    ],
  },
]

export const GTM_MAX = 10

// Five stages along the curve from an idea to a pipeline that repeats.
export const GTM_STAGES = [
  {
    key: 'validation', name: 'Validation', max: 3.4,
    line: 'The product is ahead of the plan. Nothing should be spent on outreach until you can say who buys and why, because right now any result is unreadable.',
    steps: [
      'Pick one segment and size it properly, including who already serves it.',
      'Interview eight to ten buyers in that segment before writing any messaging.',
      'Write one positioning line and test it on people outside the company.',
    ],
  },
  {
    key: 'foundations', name: 'Foundations', max: 5.4,
    line: 'You have a view of the market but it is not yet sharp enough to aim with. The gap is usually the buying committee and the trigger rather than the segment.',
    steps: [
      'Map the full buying committee: who signs, who blocks, who uses it.',
      'Name the trigger that makes this urgent, and write the messaging to it.',
      'Set pricing and the entry offer so a first yes does not cost you the real price.',
    ],
  },
  {
    key: 'first-meetings', name: 'First meetings', max: 7.2,
    line: 'The plan is solid enough to act on. What is missing is a list worth working and the discipline to follow up past the second touch.',
    steps: [
      'Build a named target account list against the profile, not a scraped one.',
      'Choose two channels and run them properly rather than five occasionally.',
      'Put every conversation and next step in the CRM the day it happens.',
    ],
  },
  {
    key: 'repeatable', name: 'Repeatable', max: 8.8,
    line: 'Meetings are arriving. The work now is telling which part of the system produced them, so you can spend more on that and stop paying for the rest.',
    steps: [
      'Separate the channels in reporting so you can see which list converts.',
      'Cut what has not produced a meeting in six weeks and move the effort.',
      'Write the playbook so the next hire runs it without relearning it.',
    ],
  },
  {
    key: 'scale', name: 'Scale', max: 10,
    line: 'The plan works and the pipeline repeats. The risk from here is the second market, where the instinct is to copy what worked rather than redo the research.',
    steps: [
      'Redo the buyer map for the new market rather than translating the old one.',
      'Decide what transfers and what has to be rebuilt before committing spend.',
      'Set the KPIs for the new market separately so it is judged on its own.',
    ],
  },
]

export function scoreGtm(answers) {
  let pts = 0
  let answered = 0
  GTM_QUESTIONS.forEach((q) => {
    const chosen = q.options.find((o) => o.v === answers[q.id])
    if (!chosen) return
    answered += 1
    pts += chosen.pts
  })
  const score = Math.round(Math.min(GTM_MAX, pts) * 10) / 10
  const stage = GTM_STAGES.find((st) => score <= st.max) || GTM_STAGES[GTM_STAGES.length - 1]
  return { score, stage, answered, complete: answered === GTM_QUESTIONS.length }
}
