// Written pieces for /insights.
//
// Six, not twenty. Thin articles cost credibility with exactly the technical
// buyers these pages are aimed at, and assistants increasingly ignore them, so
// the bar is that each one answers a question a real prospect has asked us.
//
// Every number quoted is one of our own engagements, named and linked to its
// case study. Nothing here cites an outside statistic, because a figure we
// cannot stand behind is worse than no figure.
// Who wrote these. A named author with a real role is what separates an
// article from anonymous content marketing, for a reader and for the Article
// schema, which has nowhere sensible to put an organisation as the author.
export const AUTHOR = {
  name: 'Elena Novikova',
  role: 'Founder, Aspire Agency',
  bio: 'Elena founded Aspire in Barcelona in 2022 and runs the sales and go-to-market side of the work. Everything here comes out of engagements the team has actually run.',
  url: '/about',
  photo: '/photos/team/elena-novikova.webp',
}

export const INSIGHTS = [
  {
    slug: 'how-long-b2b-outbound-takes',
    title: 'How long should B2B outbound take to produce meetings?',
    dek: 'The honest answer is longer than a trial period and shorter than most agencies imply. Here is what the first ninety days actually look like.',
    date: '2026-02-11',
    minutes: 6,
    tags: ['Sales', 'Outbound'],
    metaTitle: 'How Long B2B Outbound Takes to Produce Meetings',
    metaDesc:
      'What the first ninety days of B2B outbound really produce, why month one is for learning rather than booking, and how to tell early whether it is working.',
    keywords: 'B2B outbound timeline, how long does cold outreach take, lead generation results, outbound meetings',
    intro:
      'This is the first question nearly every prospect asks, and it is usually asked in a tone that expects to be disappointed. They have been promised meetings in week two before. What follows is what we actually tell people, including the parts that lose us work.',
    sections: [
      {
        h: 'Month one is not for booking meetings',
        p: [
          'The first month buys you information, not pipeline. You are testing three things at once: whether the target list is right, whether the message lands, and whether the people replying are the people who can buy, and until those are separated you cannot fix anything, because a bad week could be any of them.',
          'We put sequences live inside two weeks. The fortnight before that is spent building the list against a real buyer profile: sector, size, region, and some signal that now is a sensible time to be talking to them. A scraped database sent to everyone will produce replies. They will be the wrong replies, and you will spend month two unpicking that.',
        ],
      },
      {
        h: 'What a healthy month one looks like',
        p: [
          'Reply rate matters more than meeting count at this stage, including the negative replies. "Not now, ask me in Q3" is a useful outcome. "Who are you and why are you emailing me" means the targeting is wrong. Silence is the only genuinely bad result, because it tells you nothing.',
          'By the end of month one you should be able to name which segment replies, which message gets the reply, and which job title actually answers. If nobody can tell you that, the month was wasted regardless of how many meetings appeared.',
        ],
      },
      {
        h: 'Months two and three are where it compounds',
        p: [
          'Month two scales what replied and kills what did not. This is the first month that should produce meetings at a predictable rate, and the first point at which the cost per meeting means anything.',
          'Most deals are won in the follow-up, so that is the part not to skip. A single touch is a coin toss. The sequences that work are the ones still politely present at touch five, when the first four arrived at a bad moment.',
        ],
      },
      {
        h: 'When the cycle is longer than the engagement',
        p: [
          'Some sectors will not fit this shape at all. Semiconductor buyers are engineers and procurement specialists who are perfectly happy to ignore you for a year until they need you. A three-month campaign ends before that audience has finished deciding, which is why we started SilTest on one channel and stayed on it. Two years in, that engagement is still running.',
          'If your buying cycle is measured in quarters, judge the first ninety days on whether the right conversations started, not on whether they closed. Anyone promising closed revenue in that window is either selling to a different market than yours or not telling you the truth.',
        ],
      },
    ],
    takeaway:
      'Give outbound one month to learn, one to scale, and one to prove a rate. Judge month one on what you now know, not on what you booked.',
    related: { services: ['sales', 'business-development'], cases: ['siltest', 'bunq'] },
  },

  {
    slug: 'linkedin-for-technical-audiences',
    title: 'Why your LinkedIn works for consumers and not for engineers',
    dek: 'Technical buyers are not a harder version of a normal audience. They respond to a different thing entirely, and most B2B social is built for the wrong one.',
    date: '2026-03-04',
    minutes: 7,
    tags: ['Social', 'B2B'],
    metaTitle: 'LinkedIn for Technical B2B Audiences',
    metaDesc:
      'Why engineers and procurement specialists ignore standard B2B social content, what they do engage with, and why consistency beats campaign thinking.',
    keywords: 'LinkedIn for B2B tech, technical audience social media, semiconductor marketing, engineer marketing',
    intro:
      'A company with a genuinely good product writes a post about it, gets eleven likes, nine from their own staff, and concludes that LinkedIn does not work for their sector. It usually does. The content is just written for a reader who does not exist.',
    sections: [
      {
        h: 'Urgency does not work on people who cannot be hurried',
        p: [
          'Most B2B social borrows its mechanics from consumer marketing: scarcity, urgency, a strong claim, a call to act now. A technical buyer reads that and discounts the whole account, because they know their own timeline and it is not yours. They will need this in eight months, when a project starts, and no amount of urgency moves that date.',
          'What that audience rewards is being useful while they are not buying. The post that works is the one that answers something they were actually going to look up.',
        ],
      },
      {
        h: 'Specificity is the credibility test',
        p: [
          'Engineers assess a company by how precisely it talks about its own work. Vague competence claims read as nothing to say. A post that names the constraint, the tradeoff and the number is one they can check, and being checkable is the point.',
          'This is uncomfortable for marketing teams, because precision means committing to claims someone can argue with. That is exactly why it builds trust with this audience and why generic content does not.',
        ],
      },
      {
        h: 'One channel, maintained, beats four started',
        p: [
          'We started SilTest on LinkedIn and only LinkedIn. One channel done consistently beats four done occasionally, and it gives you a clean read on what the audience engages with before you spend anywhere else.',
          'Business development came later, once there was an audience worth converting. Then the website, so inbound had somewhere to land rather than leaking. Each addition was justified by the one before it. Two years in we still run the social, because for this audience the result is the continuity.',
        ],
      },
      {
        h: 'Measure the right thing',
        p: [
          'Engagement rate on a technical account is a bad headline metric: the audience is small by definition, and a hundred of the right engineers is worth more than ten thousand of the wrong people. Watch who engages rather than how many.',
          'If the names in your post reactions are starting to include the job titles that appear on your deals, it is working, even if the numbers look unimpressive next to a consumer account.',
        ],
      },
    ],
    takeaway:
      'Write for someone who cannot be rushed and can check your claims. Pick one channel and stay on it long enough to compound.',
    related: { services: ['social-media', 'content-creation'], cases: ['siltest'] },
  },

  {
    slug: 'trade-show-playbook',
    title: 'What to do at a trade show when you only have three days',
    dek: 'Most of the value of a conference is decided before you arrive and lost in the week after. A practical sequence from a year spent working shows.',
    date: '2026-04-22',
    minutes: 8,
    tags: ['Events', 'Sales'],
    metaTitle: 'B2B Trade Show Playbook: Before, During and After',
    metaDesc:
      'A practical sequence for B2B trade shows: what to book before you arrive, how to work the floor, and why the week after decides whether the stand paid.',
    keywords: 'trade show strategy, B2B conference sales, exhibition lead follow up, event marketing',
    intro:
      'A stand is one of the largest single line items in a B2B marketing budget and one of the least measured. We have worked Integrated Systems Europe in Barcelona for three years, one of the largest audio visual conferences in the world, and the pattern that separates a show that paid for itself from one that did not is consistent.',
    sections: [
      {
        h: 'The show is mostly won before it opens',
        p: [
          'Walk-up traffic is the least valuable thing a stand produces. The meetings that matter are the ones booked in advance with people who were coming anyway, and that outreach has to start weeks out, not days.',
          'Agree the plan before the doors open. During the show there is no time to decide direction: every decision on the floor should be about execution. We sign off the strategy upfront for exactly this reason.',
        ],
      },
      {
        h: 'Most of your audience is not in the building',
        p: [
          'A show generates more at once than any team can cover, in a window of days rather than months. Content captured and published the following week has missed the point. Worse, the people you most want to reach are usually not there at all.',
          'So the job is not documenting the event, it is making the event legible to everyone following from elsewhere. We ran the accounts live through the show and published in the same hour as capture, so what people saw online matched what was happening on the floor.',
        ],
      },
      {
        h: 'Give people something to do',
        p: [
          'Passive coverage gets passive attention. At ISE we ran Instagram challenges and trivia games, which turned viewers into participants and pushed reach well past the people physically present.',
          'This works on the floor too. A reason to stop that is not "would you like a demo" outperforms a stand that looks like every other stand.',
        ],
      },
      {
        h: 'The follow-up window is shorter than you think',
        p: [
          'Badge scans are not qualified leads. A scanned badge with no note is a name you will not remember in a fortnight, and your prospect has just had four hundred conversations too.',
          'Send follow-up while the conversation is still warm: during the show where possible, within days at the outside. Record what was actually discussed against the contact in the CRM, not just that they visited. The stand cost is already sunk; the follow-up is the only variable left that decides whether it returns anything.',
        ],
      },
    ],
    takeaway:
      'Book meetings before you arrive, publish in the same hour you capture, and follow up while they still remember the conversation.',
    related: { services: ['events', 'sales', 'content-creation'], cases: ['ise'] },
  },

  {
    slug: 'agency-freelancer-or-hire',
    title: 'Agency, freelancer or hire: what each one actually changes',
    dek: 'The comparison is usually framed as cost. The real differences are coverage, continuity and who carries the strategy when someone leaves.',
    date: '2026-05-19',
    minutes: 6,
    tags: ['Buying'],
    metaTitle: 'Agency vs Freelancer vs In-House Hire for B2B Growth',
    metaDesc:
      'An honest comparison of agency, freelancer and in-house hire for B2B growth: what each gives you, what each costs you, and when an agency is wrong.',
    keywords: 'agency vs freelancer, in-house vs agency marketing, B2B growth team, outsourced marketing',
    intro:
      'We are an agency, so treat this accordingly. But the version of this comparison that only comes down to monthly cost helps nobody, and we would rather not win work we are the wrong shape for.',
    sections: [
      {
        h: 'A freelancer is depth in one thing',
        p: [
          'If you know precisely what you need, whether that is a website, a paid account managed or a content run, a good freelancer is usually the best value available, and often better at that one thing than a generalist agency.',
          'The cost is coverage and continuity. When they are unavailable, that function stops, and the strategy lives in their head rather than anywhere you can read it.',
        ],
      },
      {
        h: 'A hire is continuity, bought in advance',
        p: [
          'An in-house hire is the right answer sooner than most agencies will tell you, particularly once there is enough work to keep someone busy and enough internal knowledge to make them effective.',
          'The risks are concentration and ramp. One person covers one discipline well and three badly, and you carry the recruitment time, the ramp-up, and the exposure if they leave in month seven.',
        ],
      },
      {
        h: 'An agency is coverage across disciplines',
        p: [
          'The case for a small agency is that growth problems rarely sit in one discipline. RCK needed a website, lead generation, a CRM that reflected reality and someone at their conferences. Bought separately, that is four relationships with four opinions: the site argues one thing, outreach argues another, the CRM records neither, and nobody owns the follow-up.',
          'The real cost there is not the invoices, it is that no single person can tell you what is working. Run as one strategy, those four become answerable.',
        ],
      },
      {
        h: 'When we are the wrong answer',
        p: [
          'If you need one deeply specialised thing and nothing else, hire the specialist. If you already have a marketing lead with a clear plan who needs execution capacity, a freelancer is cheaper and just as good. If your product has not found its market yet, no amount of outbound fixes that, and spending on it will mostly buy you confident-sounding noise.',
          'The case for an outsourced team is strongest when you need several disciplines working together, you need them now, and you are not ready to carry three salaries to get them.',
        ],
      },
    ],
    takeaway:
      'Buy a freelancer for depth, a hire for continuity, an agency for coverage. If one discipline is genuinely all you need, we are not the cheapest way to get it.',
    related: { services: ['business-development', 'sales'], cases: ['rck'] },
  },

  {
    slug: 'the-crm-is-not-the-problem',
    title: 'The CRM is not the problem',
    dek: 'Teams replace the tool roughly every two years and inherit the same mess, because the mess was never in the software.',
    date: '2026-06-17',
    minutes: 5,
    tags: ['Sales', 'Process'],
    metaTitle: 'Why Replacing Your CRM Will Not Fix Your Pipeline',
    metaDesc:
      'Pipeline problems are usually recording problems, not software problems. What to fix before migrating CRM, and what a pipeline you can actually read looks like.',
    keywords: 'CRM migration, pipeline management, sales process, CRM data quality',
    intro:
      'By the time a company asks us about CRM, the decision to migrate has usually been made. Sometimes it is right. More often the new system will be the old system with better typography, because the thing that was broken moved across with the data.',
    sections: [
      {
        h: 'A pipeline is a record or it is an estimate',
        p: [
          'The symptom is always the same: nobody trusts the forecast. Deals sit in stages they left months ago, next steps are blank, and the honest answer to "what is in play" comes from a conversation rather than the system.',
          'That is not a feature gap. It is that recording the conversation is nobody’s job, so it happens when someone has time, which is never. Every tool on the market handles this; none of them does it for you.',
        ],
      },
      {
        h: 'Record the thing that decides the next action',
        p: [
          'Most CRM hygiene advice asks for too much and therefore gets nothing. The minimum that makes a pipeline readable is small: what was discussed, what the next step is, and when it is due.',
          'Everything else, fields, scores and custom objects, is optional until those three are reliable. A pipeline with three honest fields beats one with thirty that are mostly empty.',
        ],
      },
      {
        h: 'Whoever has the conversation writes it down',
        p: [
          'When we run sales for a client, every contact, conversation and next step goes into their CRM, not ours. Partly that is hygiene. Mostly it is because the pipeline is theirs and stays theirs when the engagement ends. An agency that keeps the record has quietly made itself impossible to leave.',
          'That is the question worth asking any outsourced team: if we stopped tomorrow, what do we keep? If the answer is a report rather than the pipeline itself, that is the problem to fix before the software.',
        ],
      },
      {
        h: 'When migrating genuinely is the answer',
        p: [
          'If the tool cannot represent how you actually sell, with multiple buying committees, long cycles or partner-sourced deals, then it is the tool, and you should move.',
          'Otherwise, fix the recording habit first. Do it in the system you have. If it works there, the migration becomes a straightforward decision rather than a rescue.',
        ],
      },
    ],
    takeaway:
      'Make three fields reliable before changing software, and make sure the pipeline belongs to you whoever is filling it in.',
    related: { services: ['sales', 'business-development'], cases: ['rck'] },
  },

  {
    slug: 'entering-a-new-market',
    title: 'Entering a new market: partnerships before paid',
    dek: 'Paid acquisition into a market you do not yet understand is an expensive way to learn it. What we did instead when BUNQ came to Spain.',
    date: '2026-07-29',
    minutes: 6,
    tags: ['Market entry', 'Partnerships'],
    metaTitle: 'Market Entry Strategy: Partnerships Before Paid Acquisition',
    metaDesc:
      'Why partnerships beat paid acquisition when entering a new market, how to choose partners by audience overlap, and what the first months should produce.',
    keywords: 'market entry strategy, international expansion, B2B partnerships, launching in Spain',
    intro:
      'Recognition does not cross a border. A brand people trust in one market arrives in the next as an unfamiliar name with a foreign domain, and the instinct is to buy attention until that changes. That is usually the most expensive available option and the slowest to teach you anything.',
    sections: [
      {
        h: 'Borrow trust before you buy attention',
        p: [
          'At launch you have no audience, no local proof and no feel for which messages land. Paid spend in that state is tuition: you are paying for data you could have got another way.',
          'Partnerships invert it. Instead of persuading strangers one at a time, you borrow the trust of an organisation those people already rely on. When BUNQ entered Spain, that was the route in, and the first two and a half months produced over 300 new users.',
        ],
      },
      {
        h: 'Choose partners by overlap, not size',
        p: [
          'The common mistake is ranking partners by name recognition. A smaller organisation whose members are exactly your target is worth more than a large one whose audience merely includes them, because the second one converts at a rate that makes the deal pointless.',
          'We build the landscape against overlap first and reach second. It produces a less impressive slide and a better pipeline.',
        ],
      },
      {
        h: 'A foreign company asking for a partnership is a cold email',
        p: [
          'The outreach problem is real. An unfamiliar brand from another country asking for a favour is the email most people delete, which is why we secured these meetings directly and had them face to face.',
          'In-person has a second benefit: you find out quickly which partners were never going to move. That is worth as much as the ones who sign, because it stops you spending the next quarter on them.',
        ],
      },
      {
        h: 'Signing is the start, not the result',
        p: [
          'A signed partnership that nobody activates produces an announcement and nothing else. The work is onboarding, the co-marketing that follows, and tracking which partners produce actual users.',
          'By the end, you should be able to say which partner types convert in this market and which do not. That read is the asset. It is what makes the paid spend sensible when you eventually turn it on.',
        ],
      },
    ],
    takeaway:
      'Borrow an existing audience before buying a new one, pick partners on overlap, and treat the signature as the beginning of the work.',
    related: { services: ['business-development', 'sales'], cases: ['bunq'] },
  },
]

export const insightBySlug = (slug) => INSIGHTS.find((a) => a.slug === slug)

// Newest first for the index.
export const INSIGHTS_BY_DATE = [...INSIGHTS].sort((a, b) => b.date.localeCompare(a.date))
