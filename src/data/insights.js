// Written pieces for /insights.
//
// Each one answers a question a prospect actually asks, in the words they ask
// it in, and answers it in the first paragraph before explaining. That shape
// is what an assistant can quote and what a skim-reader can use, which happen
// to be the same requirement.
//
// The constraint that has not changed: nothing here cites a figure we cannot
// stand behind. The six originals quote our own engagements, named and linked
// to their case studies. The rest are built on method rather than numbers,
// because inventing results to fill a page is the one thing that would cost
// more credibility than writing nothing.
// Who wrote these. A named author with a real role is what separates an
// article from anonymous content marketing, for a reader and for the Article
// schema, which has nowhere sensible to put an organisation as the author.
export const AUTHOR = {
  name: 'Elena Novikova',
  role: 'Founder, Aspire Agency',
  bio: 'Elena founded Aspire in Barcelona in 2022 and runs the sales and go-to-market side of the work. Everything here comes out of engagements the team has actually run.',
  url: '/about/',
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

  {
    slug: 'what-a-go-to-market-strategy-includes',
    title: 'What does a go-to-market strategy actually include?',
    dek: 'Most documents called a GTM strategy are a positioning deck with a channel list stapled to the back. Here is what has to be in one before anybody can run it.',
    date: '2026-08-05',
    minutes: 7,
    tags: ['Go-to-market', 'Strategy'],
    metaTitle: 'What a Go-to-Market Strategy Actually Includes',
    metaDesc:
      'The six parts a B2B go-to-market strategy needs before it can be executed: buyer definition, positioning, pricing logic, channel choice, a target list and a measurement plan.',
    keywords: 'go to market strategy, what is a GTM plan, B2B go to market, GTM strategy components',
    intro:
      'A go-to-market strategy is a plan for who you sell to, what you say to them, where you reach them and how you will know it is working. If a document does not answer all four, it is a positioning exercise rather than a plan, and the first week of execution will expose that.',
    sections: [
      {
        h: 'A buyer definition specific enough to build a list from',
        p: [
          'The test is simple: can somebody who has never met you build a list of five hundred companies from this definition without asking a question? "Mid-market SaaS companies" fails that test. Sector, headcount band, region, the technology they already run and a trigger that makes now the moment passes it.',
          'The trigger is the part most strategies omit and the part that does most of the work. A company that has just opened an office, taken funding, lost a vendor or hired for a role is a different prospect from the same company six months either side of that.',
        ],
      },
      {
        h: 'Positioning written as a sentence somebody would repeat',
        p: [
          'Positioning is not a paragraph about values. It is the sentence a buyer uses when they explain you to a colleague who was not in the room, and if you have not written it they will write it for you, usually less favourably.',
          'It has to name the alternative. Every purchase is a comparison, and a positioning line that does not say what you are instead of leaves the buyer to supply that themselves. Being chosen over doing nothing is a different argument from being chosen over a competitor.',
        ],
      },
      {
        h: 'Pricing logic, not a price list',
        p: [
          'A plan does not need a published price, but it does need the logic: what the price is anchored to, what changes it, and what the floor is. Without that, every deal is negotiated from scratch and the first large prospect sets a precedent nobody agreed to.',
          'Scoped work in particular needs a stated basis. If the answer to "what does this cost" is always "it depends", the thing it depends on should be written down and the same every time.',
        ],
      },
      {
        h: 'Channels chosen against the buyer, not against fashion',
        p: [
          'Channel choice follows from where the buyer already is and how they prefer to be approached, which is often not where the marketing team is most comfortable. Technical buyers who ignore LinkedIn posts will read a detailed email. Procurement teams who ignore email answer a phone call from a name they recognise.',
          'Two channels run properly beat five run thinly. The common failure is not picking the wrong channel, it is picking four and giving none of them enough attention to produce a readable result.',
        ],
      },
      {
        h: 'A target list and a measurement plan, both written before launch',
        p: [
          'The list is the strategy made concrete. Companies, named contacts, tier, and why each tier matters. A plan without a list is a point of view.',
          'Measurement has to be agreed before anything goes live, because afterwards every number becomes an argument. Decide now what counts as a qualified lead, who grades it, and what you will do if the first month underperforms. That last question is the one that separates a plan from a hope.',
        ],
      },
    ],
    takeaway:
      'A go-to-market strategy is finished when somebody who did not write it could execute it on Monday without asking you a question.',
    related: { services: ['go-to-market', 'sales'], cases: ['bunq', 'siltest'] },
  },

  {
    slug: 'what-counts-as-a-qualified-lead',
    title: 'What counts as a qualified lead, and who decides?',
    dek: 'Most arguments between sales and marketing are a definition problem wearing a performance problem as a costume. Here is a definition that survives contact with both.',
    date: '2026-08-19',
    minutes: 6,
    tags: ['Sales', 'Process'],
    metaTitle: 'What Counts as a Qualified Lead in B2B',
    metaDesc:
      'A practical definition of a qualified lead, the four questions every conversation must answer, and why the grade has to be agreed before a campaign starts rather than after.',
    keywords: 'what is a qualified lead, MQL vs SQL, lead qualification criteria, B2B lead definition',
    intro:
      'A qualified lead is a named person at a company that fits your buyer profile, who has a problem you solve, a reason to solve it now, and either the authority to decide or direct access to whoever has it. Anything missing one of those is a contact, and calling it a lead is how reporting stops meaning anything.',
    sections: [
      {
        h: 'The four questions',
        p: [
          'Every conversation should answer four things. What are they trying to fix, in their own words. Is there a project, a budget cycle or a deadline. Do they decide, influence or research. What was agreed, by whom, and by when.',
          'Those are deliberately not scored out of ten. A grade somebody has to calculate will not be filled in on a show floor or at the end of a long call. Four plain answers written in a sentence each is a thing a tired person will actually record.',
        ],
      },
      {
        h: 'Grade it, do not score it',
        p: [
          'A is a real problem, a timeframe, access to the decision and an agreed next step with a date. B is a right fit and a real problem, but no timing or no access to the decision yet. C is neither, or nothing beyond a scan of a badge.',
          'Only A and B count. C is a contact, and recording it as a lead is what produces a pipeline nobody trusts and a forecast that falls apart in the second quarter.',
        ],
      },
      {
        h: 'Who decides is the part that causes the argument',
        p: [
          'If marketing grades its own output, the grade inflates. If sales grades it alone, the grade deflates whenever the team is busy. The workable answer is that the definition is agreed jointly before the campaign starts, and the person who had the conversation records the four answers rather than the grade.',
          'The grade then follows from the answers mechanically, which takes the judgement out of the number and the politics out of the meeting.',
        ],
      },
      {
        h: 'Why the definition has to come first',
        p: [
          'Agreed afterwards, the definition becomes a negotiation about whose quarter it was. Agreed beforehand, it is a shared instrument, and an underperforming month becomes a diagnosis rather than a dispute.',
          'It also changes behaviour upstream. A team that knows a lead needs a next step with a date will ask for the date in the meeting, which is the single cheapest improvement available to most pipelines.',
        ],
      },
    ],
    takeaway:
      'Write the four questions and the three grades down before the first campaign goes live, and have the person in the conversation record answers rather than opinions.',
    related: { services: ['sales', 'events'], cases: ['siltest'] },
  },

  {
    slug: 'how-many-touches-b2b-outreach-needs',
    title: 'How many touches does B2B outreach actually need?',
    dek: 'One message is a coin toss. The useful question is not how many touches, but what each one is allowed to add.',
    date: '2026-09-02',
    minutes: 5,
    tags: ['Sales', 'Outbound'],
    metaTitle: 'How Many Touches B2B Outreach Needs',
    metaDesc:
      'Why single-touch outreach fails, what a four to six touch sequence should contain, and the rule that stops a follow-up reading as nagging.',
    keywords: 'how many touches B2B sales, outreach sequence length, follow up cadence, cold email sequence',
    intro:
      'Four to six touches over three to four weeks is the shape that works for most B2B tech, and the number matters far less than the rule governing it: every touch has to add something new. A sequence that repeats itself is not persistence, it is noise with a schedule.',
    sections: [
      {
        h: 'Why one touch fails',
        p: [
          'A single message has to arrive on the day somebody has the problem, the budget and ten free minutes. Most do not, and the silence that follows says nothing about whether you were relevant. It says you arrived on a Tuesday.',
          'The majority of replies to a well-built sequence arrive after the first message. Teams that stop at one are not testing their message, they are testing their timing.',
        ],
      },
      {
        h: 'Each touch adds one thing',
        p: [
          'Touch one is the problem in their words and a specific ask. Touch two is a different channel and a reason to believe, usually a comparable situation rather than a case study link. Touch three adds one piece of substance they can use whether or not they reply. Touch four offers a smaller commitment than the first ask.',
          'What is not allowed is "just following up" and "bumping this to the top of your inbox". Those add nothing, and they tell the reader the sender has run out of reasons to be in touch, which is information they will act on.',
        ],
      },
      {
        h: 'The close that is not a close',
        p: [
          'The last touch should make it easy to say no. A line that says the diary closes on Friday and the week after is just as good converts better than a final chase, because it removes the pressure that was stopping a reply.',
          'It also turns a dead lead into a dated one. "Not now, ask me in Q3" is a result. An unanswered sequence is not.',
        ],
      },
      {
        h: 'When to stop',
        p: [
          'Stop at six, and put the contact on a long cycle rather than deleting them. Markets move, people change roles, and the company that was wrong in March is sometimes right in November.',
          'Continuing past six does not produce meetings. It produces the reputation that makes the November message fail too.',
        ],
      },
    ],
    takeaway:
      'Run four to six touches over three to four weeks, make every one add something new, and finish by making no an easy and dated answer.',
    related: { services: ['sales', 'business-development'], cases: ['siltest'] },
  },

  {
    slug: 'how-to-build-an-icp',
    title: 'How do you build an ideal customer profile that is actually usable?',
    dek: 'Most ICP documents describe a company nobody can find. A usable one is a filter somebody can apply to a database on the first morning.',
    date: '2026-09-16',
    minutes: 6,
    tags: ['Go-to-market', 'Strategy'],
    metaTitle: 'How to Build a Usable Ideal Customer Profile',
    metaDesc:
      'How to build a B2B ideal customer profile from existing accounts, which attributes are worth including, and the test that tells you whether yours is specific enough to act on.',
    keywords: 'ideal customer profile, how to build an ICP, B2B ICP template, target account criteria',
    intro:
      'An ideal customer profile is a filter, not a portrait. It earns its place only if somebody can take it to a database or a conference attendee list and produce a list of real companies without coming back with questions.',
    sections: [
      {
        h: 'Start from the accounts you already have',
        p: [
          'Take your best ten customers, by retention and margin rather than by logo. Then take the five that went badly. The profile lives in the difference between those two groups, and it is usually not the attribute everybody assumed.',
          'Look at the shape of the company rather than the industry label: who owned the budget, how many people had to agree, what they were using before, and what had just changed when they bought. Industry is a weak predictor. Buying structure is a strong one.',
        ],
      },
      {
        h: 'Attributes that are worth having',
        p: [
          'Firmographics narrow the field: sector, headcount, revenue band, region, and the technology already in place. Those are the ones a list builder can filter on, which is why they come first.',
          'Then the structural ones: who decides, how long the cycle runs, whether procurement is involved, and what the alternative to buying is. Those will not appear in a database, but they tell the sales team what they are walking into and what the message has to pre-empt.',
        ],
      },
      {
        h: 'The anti-profile is as useful as the profile',
        p: [
          'Write down what disqualifies a company as explicitly as what qualifies it. Below a certain size there is no budget. Above a certain size there is a procurement process your cycle cannot absorb. In some regions you cannot support them properly.',
          'Teams underuse this because saying no to a segment feels like leaving money on the table. In practice an unqualified pipeline costs more than an empty one, because it consumes the time that would have filled a real one.',
        ],
      },
      {
        h: 'The test',
        p: [
          'Hand the profile to somebody who has never worked on your product and ask for two hundred companies. If they can do it, you have an ICP. If they come back with questions, you have a point of view that still needs finishing.',
          'Then revisit it after the first ninety days against who actually replied. The first version is a hypothesis. The second one, written from reply data, is the one worth keeping.',
        ],
      },
    ],
    takeaway:
      'An ICP is finished when a stranger can build a target list from it unaided, and it is right once reply data has rewritten the first draft.',
    related: { services: ['go-to-market', 'sales'], cases: ['siltest', 'bunq'] },
  },

  {
    slug: 'why-b2b-websites-do-not-convert',
    title: 'Why do B2B websites get traffic and no enquiries?',
    dek: 'Usually the site is answering a question nobody asked, and asking for a commitment nobody is ready to make.',
    date: '2026-09-30',
    minutes: 6,
    tags: ['Content', 'Conversion'],
    metaTitle: 'Why B2B Websites Get Traffic But No Enquiries',
    metaDesc:
      'The four reasons B2B sites fail to convert: no named buyer, no proof, a single oversized call to action, and copy written about the company rather than the problem.',
    keywords: 'B2B website not converting, website traffic no leads, B2B conversion rate, website enquiries',
    intro:
      'Traffic without enquiries is rarely a design problem. It is almost always one of four things: the page does not name who it is for, it offers nothing to believe, it asks for too large a commitment as the only option, or it is written about the company rather than about the problem the reader arrived with.',
    sections: [
      {
        h: 'The page does not name its buyer',
        p: [
          'A visitor decides in a few seconds whether a page is addressed to them. Copy written to avoid excluding anybody excludes everybody, because nobody recognises themselves in it.',
          'Naming a sector, a company size or a situation costs you the visitors who were never going to buy and converts the ones who were. That trade is almost always worth making.',
        ],
      },
      {
        h: 'There is nothing to believe',
        p: [
          'Claims without evidence are read as advertising and discounted automatically. Named clients, a number somebody can check, a description of how the work is actually run: those move a reader. Adjectives do not.',
          'If the proof is weak, say less rather than louder. A modest claim that can be substantiated outperforms an ambitious one that cannot, because the second one makes the reader doubt everything else on the page.',
        ],
      },
      {
        h: 'One call to action, and it is the largest one',
        p: [
          'Most B2B sites offer exactly one thing to do, and it is to book a call. That suits the small group who are ready and ignores the much larger group who are interested but not yet willing to put a stranger in their calendar.',
          'A second, smaller action captures that group: a guide, a short diagnostic, a question answered without a meeting. It converts a visitor who would otherwise leave as anonymous traffic.',
        ],
      },
      {
        h: 'The copy is about the company',
        p: [
          'Pages that open with founding dates and values are describing the seller to a reader who arrived with a problem. The reader is not yet interested in you, and the page has to earn that.',
          'Open with the problem in the reader’s language, state what you do about it, then show that you have done it before. The company story belongs on the about page, where somebody who already cares will go looking for it.',
        ],
      },
    ],
    takeaway:
      'Name the buyer, give them something to believe, offer a small action as well as a large one, and lead with their problem rather than your history.',
    related: { services: ['content-creation', 'business-development'], cases: ['rck'] },
  },

  {
    slug: 'how-to-qualify-a-lead-at-a-trade-show',
    title: 'How do you qualify a lead on a trade show floor?',
    dek: 'You have four minutes, a queue behind them and no desk. The qualification has to be four questions somebody can ask standing up.',
    date: '2026-08-12',
    minutes: 5,
    tags: ['Events', 'Sales'],
    metaTitle: 'How to Qualify a Lead at a Trade Show',
    metaDesc:
      'The four questions that qualify a conversation on a busy stand, how to grade it in seconds, and why badge scans are not leads.',
    keywords: 'trade show lead qualification, qualify leads at events, exhibition leads, badge scanning',
    intro:
      'Stand qualification fails for a practical reason rather than a strategic one: the process designed for a desk does not survive a show floor. Four questions, asked conversationally and written down within a minute of the person walking away, is the version that actually gets used.',
    sections: [
      {
        h: 'The four questions, asked as conversation',
        p: [
          'What are you trying to fix. Is there a project, a budget cycle or a deadline. Do you decide this, influence it, or are you researching for somebody. What should happen next, and by when.',
          'None of those sound like a form, which matters, because a visitor who feels processed stops answering. They are the same four used everywhere else in the business, so the records are comparable with every other channel rather than being a separate pile nobody reconciles.',
        ],
      },
      {
        h: 'Write it down before the next conversation',
        p: [
          'By seven in the evening the eleventh conversation of the day has merged with the other ten. The record has to be written within a minute or two of the person leaving, on whatever tool the stand is using, against the contact rather than in a notebook.',
          'Pick one capture method before the show and test it on every phone on the team. A badge scanner, a CRM app or a form: one of them, not three. Three is how a show produces three incompatible lists and a fortnight of cleanup.',
        ],
      },
      {
        h: 'A badge scan is not a lead',
        p: [
          'A scan proves somebody stood near your stand. It carries no problem, no timing and no next step, and reporting it as a lead is how a show appears to have performed well and produces nothing in the quarter that follows.',
          'Scans are worth keeping as a separate list for a different purpose, which is a low-pressure follow-up sequence rather than a sales call. Mixing them into the pipeline is what makes the pipeline unreadable.',
        ],
      },
      {
        h: 'Grade on the spot',
        p: [
          'A has a real problem, a timeframe, access to the decision and a next step with a date. B has fit and a problem but no timing or no access yet. C is anything else.',
          'Grading at the stand rather than afterwards is the difference between a judgement made with the conversation still fresh and one made from a name on a list. It takes five seconds and it is the most valuable five seconds of the exchange.',
        ],
      },
    ],
    takeaway:
      'Four questions asked standing up, a record written within two minutes, one capture tool, and a grade applied on the spot.',
    related: { services: ['events', 'sales'], cases: ['ise', 'siltest'] },
  },

  {
    slug: 'how-to-measure-trade-show-roi',
    title: 'How do you measure the return on a trade show?',
    dek: 'Footfall, scans and impressions describe activity. One number describes whether it worked.',
    date: '2026-08-26',
    minutes: 6,
    tags: ['Events', 'Measurement'],
    metaTitle: 'How to Measure Trade Show ROI',
    metaDesc:
      'Why footfall and badge scans do not measure a trade show, the single number that does, and the ninety day window in which it has to be read.',
    keywords: 'trade show ROI, measure event ROI, exhibition return on investment, event marketing metrics',
    intro:
      'The number that matters is total show cost divided by qualified opportunities at day ninety. Everything else describes activity. If you track one figure, track that one, and compare it against every other channel you run rather than against last year’s show.',
    sections: [
      {
        h: 'Why the usual metrics mislead',
        p: [
          'Footfall measures the hall, not the stand. Scans measure proximity. Impressions measure the organiser’s marketing. All three go up when the show is busier and tell you nothing about whether your week worked.',
          'They persist because they are available on the Monday and the real number is not. That is a reporting convenience, not a measurement.',
        ],
      },
      {
        h: 'Count the full cost',
        p: [
          'Stand, build, travel, accommodation, shipping, the sponsorship line, and the days your team was not doing their other work. The last one is the one that gets left out, and it is often the largest.',
          'Without it, a show that looked expensive and a show that looked cheap are not comparable, and neither is comparable with a quarter of outbound.',
        ],
      },
      {
        h: 'A worked example',
        p: [
          'Suppose a stand costs 18,000, the build and shipping 9,000, travel and accommodation for four people 6,000, and the four of them spend six working days each on the show and its follow-up. At a loaded day rate of 400 that is another 9,600, which brings the real cost to 42,600 rather than the 27,000 that appears on the invoice.',
          'If the week produces fourteen qualified opportunities that still exist at day ninety, the show cost roughly 3,000 per opportunity. Whether that is good depends entirely on what the same money produces through your other channels, which is why the number is useless in isolation and decisive next to a comparison.',
          'The figures above are illustrative. The point is the two lines teams leave out: the team days, and the ninety day survival of the opportunities.',
        ],
      },
      {
        h: 'Read it at ninety days, not at the close',
        p: [
          'The Monday after a show tells you how the week felt. The quarter after tells you whether it produced anything, because that is the window in which a conversation becomes an opportunity or quietly does not.',
          'Set a target before you go and a review date in the diary, then look again at day thirty and day ninety. A show reviewed once, immediately, is reviewed at the only moment when nothing can be known.',
        ],
      },
      {
        h: 'What to do with the answer',
        p: [
          'A cost per qualified opportunity that beats your other channels justifies going again and probably going bigger. One that loses to them is not automatically a reason to stop, but it is a reason to change what you do there, usually by booking more of the week before arriving.',
          'Most shows that underperform do so because the meetings were not booked in advance, not because the audience was wrong. That is a fixable problem, and it is cheaper to fix than the stand.',
        ],
      },
    ],
    takeaway:
      'Divide total show cost by qualified opportunities at day ninety, include your team’s time in the cost, and compare the result against your other channels.',
    related: { services: ['events', 'go-to-market'], cases: ['ise'] },
  },

  {
    slug: 'how-to-choose-which-conferences-to-attend',
    title: 'How do you choose which conferences are worth attending?',
    dek: 'The attendee list decides it, and you can usually get enough of one before you commit.',
    date: '2026-09-09',
    minutes: 5,
    tags: ['Events', 'Strategy'],
    metaTitle: 'How to Choose Which Conferences to Attend',
    metaDesc:
      'How to judge a conference before booking: reading the attendee and exhibitor lists, checking buyer seniority, and the test of whether you could book meetings in advance.',
    keywords: 'which trade shows to attend, choosing conferences B2B, event selection, exhibition planning',
    intro:
      'A show is worth attending if the people who can buy from you will be in the building and you can get in front of enough of them. Everything else, including the size of the event and how good the stand looks, is secondary to that and frequently misleading.',
    sections: [
      {
        h: 'Read the exhibitor list before the attendee list',
        p: [
          'The exhibitor list is published early and is a reliable proxy. If your competitors and the companies your buyers already work with are exhibiting, the buyers follow. If the list is full of adjacent industries, the audience is adjacent too.',
          'It also tells you what the show costs to compete in. A hall of large custom builds means a modest stand will be invisible, which may be a reason to attend without exhibiting at all.',
        ],
      },
      {
        h: 'Ask the organiser the uncomfortable question',
        p: [
          'Ask for the seniority breakdown and the job title split, not the headline attendance figure. Twelve thousand attendees of whom most are vendors selling to each other is a different event from three thousand of whom a third hold a budget.',
          'An organiser who will not answer that has told you something useful. The ones running a strong event are usually pleased to be asked.',
        ],
      },
      {
        h: 'The booking test',
        p: [
          'Six weeks out, try to book ten meetings with named companies on the attendee list. If you can get to ten, the audience is right and the show will work. If you cannot get to three, the stand will not rescue it.',
          'This is also the cheapest possible pilot. Attending without exhibiting, with a diary of booked meetings, costs a fraction of a stand and answers the question for next year properly.',
        ],
      },
      {
        h: 'One show properly beats three thinly',
        p: [
          'Most teams exhibiting at several shows a year are under-resourcing all of them. The week before, the week itself and the fortnight after each need real attention, and three shows in a quarter means none of them get it.',
          'Pick the one where the booking test succeeded, spend the budget of the other two on doing it properly, and judge it at ninety days.',
        ],
      },
    ],
    takeaway:
      'Read the exhibitor list, ask for the seniority split, and try to book ten meetings six weeks out. If the meetings come, go.',
    related: { services: ['events', 'go-to-market'], cases: ['ise'] },
  },

  {
    slug: 'what-to-send-after-a-conference',
    title: 'What should you send after a conference, and when?',
    dek: 'The window is shorter than most teams think, and the first message decides whether the week produced anything.',
    date: '2026-09-23',
    minutes: 5,
    tags: ['Events', 'Sales'],
    metaTitle: 'What to Send After a Conference',
    metaDesc:
      'The post-event follow-up sequence that works: a same-day message, a twenty-four hour personal email, and a day three next step, with what each one should contain.',
    keywords: 'trade show follow up, post event email, conference follow up template, after event sales',
    intro:
      'A visitor remembers you for about a day. Most teams send a single generic email a week later, by which point the conversation has merged with every other conversation that person had and the message reads as a mailshot, which it is.',
    sections: [
      {
        h: 'Same day, from the person they met',
        p: [
          'A short message that evening, from the individual who had the conversation, naming the thing they talked about. Two sentences is enough. It is not a sales email, it is a bookmark, and its job is to make sure your name is attached to a real exchange rather than to a stand.',
          'This is the message that decides whether the next one gets opened. Sent from a shared marketing address with a logo header, it does the opposite.',
        ],
      },
      {
        h: 'Within twenty-four hours, the personal one',
        p: [
          'The second message carries what you agreed to send. The specific thing, not a brochure: the comparable situation, the answer to the question they asked, the document they wanted. If you promised nothing, send the one thing that would have been useful to them given the problem they described.',
          'It should end with the next step and a date, phrased as a question with two options. Open-ended availability questions produce silence, because answering them is work.',
        ],
      },
      {
        h: 'Day three, the decision point',
        p: [
          'If there is no reply by day three, send the short one that makes no easy: the diary is filling, the month after is just as good, which suits. That converts a dead thread into a dated one more often than another chase does.',
          'After that, the contact moves to a normal sequence rather than an event one. Continuing to reference the show after the first week is a reminder that they have not replied, which is not the reminder you want.',
        ],
      },
      {
        h: 'Grade A and B differently',
        p: [
          'A grades get the three messages above, individually written. B grades get the same first message and then a lighter sequence, because the thing missing was timing and the job is to be present when the timing arrives rather than to push now.',
          'C grades get a newsletter or nothing. Treating a badge scan to a personal follow-up wastes the time that should have gone on the A list, and it is usually why the A list gets followed up late.',
        ],
      },
    ],
    takeaway:
      'Send a two sentence note the same evening from the person they met, the thing you promised within a day, and an easy no on day three.',
    related: { services: ['events', 'sales'], cases: ['ise', 'siltest'] },
  },

  {
    slug: 'when-is-it-too-early-for-paid-ads',
    title: 'When is it too early to spend money on paid advertising?',
    dek: 'Paid traffic multiplies whatever the site already does. If that is nothing, it multiplies nothing, expensively.',
    date: '2026-10-07',
    minutes: 6,
    tags: ['Go-to-market', 'Paid'],
    metaTitle: 'When Is It Too Early for Paid Advertising',
    metaDesc:
      'The three conditions a B2B company should meet before buying traffic: a converting page, a known buyer, and a sales process that can absorb the leads.',
    keywords: 'when to start paid ads B2B, paid advertising too early, B2B ad spend, performance marketing readiness',
    intro:
      'Paid advertising is an amplifier, not a starting pistol. It takes whatever your site, your offer and your follow-up already do and does more of it. Three things need to be true before that is worth paying for, and most companies that report disappointing ad performance were missing at least one.',
    sections: [
      {
        h: 'A page that converts something already',
        p: [
          'If organic and referral traffic arrive and leave without enquiring, paid traffic will do the same at a higher cost per visitor. Fix the page first, with the traffic you are already getting for free.',
          'The threshold is not a specific rate, it is evidence. You should be able to point at enquiries that came from people who found the page on their own. Until that exists, buying more visitors is buying more evidence of the same problem.',
        ],
      },
      {
        h: 'A buyer you can describe to a targeting interface',
        p: [
          'Ad platforms are targeting tools, and vague targeting is expensive in a way that vague outbound is not: you pay for every impression served to the wrong person. A profile that is still a hypothesis will burn the test budget before it produces a readable result.',
          'This is the argument for running outbound first even when paid is the eventual plan. Outbound tells you which segment replies and which message works, for the price of time rather than media.',
        ],
      },
      {
        h: 'A process that can absorb the leads',
        p: [
          'Leads that are followed up late convert at a fraction of the rate, and paid campaigns deliver unevenly. If nobody owns the inbox on a Friday afternoon, the campaign is manufacturing a cost without a corresponding chance of revenue.',
          'Decide who responds, in what time, and what they say, before anything goes live. This is unglamorous and it is more often the limiting factor than the creative.',
        ],
      },
      {
        h: 'What to do instead, meanwhile',
        p: [
          'Borrow an audience rather than buying one. Partnerships, the events your buyers already attend, and direct outreach to a named list all produce the same thing paid produces, more slowly and with a reusable by-product: a read on which message works.',
          'When you do turn paid on afterwards, you are buying scale for something you already know converts, which is the only circumstance in which it reliably pays.',
        ],
      },
    ],
    takeaway:
      'Buy traffic once the page converts people who arrived free, the buyer is defined well enough to target, and somebody owns the reply.',
    related: { services: ['go-to-market', 'business-development'], cases: ['bunq'] },
  },

  {
    slug: 'cost-per-qualified-lead-b2b-tech',
    title: 'What is a reasonable cost per qualified lead in B2B tech?',
    dek: 'There is no benchmark worth quoting. There is a calculation, and it is the one your own numbers produce.',
    date: '2026-08-02',
    minutes: 6,
    tags: ['Sales', 'Measurement'],
    metaTitle: 'Cost Per Qualified Lead in B2B Tech',
    metaDesc:
      'Why published cost per lead benchmarks are useless, how to calculate the figure your own deal size and win rate justify, and what to compare it against.',
    keywords: 'cost per qualified lead, B2B lead cost, CPL benchmark, lead generation cost',
    intro:
      'Published benchmarks for cost per lead are close to meaningless, because they average across deal sizes that differ by two orders of magnitude and definitions of "lead" that differ by more. The number you need comes from your own deal value, win rate and margin, and it takes about ten minutes to work out.',
    sections: [
      {
        h: 'Work backwards from a deal',
        p: [
          'Take your average contract value and the margin on it. Decide what proportion of that margin you are willing to spend to acquire one. Then divide by the rate at which qualified leads become customers.',
          'If a qualified lead converts at one in five and you will spend a fifth of the first year margin to win one, the ceiling on a qualified lead is that margin divided by twenty-five. That is your number. It is not anybody else’s.',
        ],
      },
      {
        h: 'A worked example',
        p: [
          'Take a company with a 40,000 average first year contract and a 60 per cent gross margin, so 24,000 of margin per customer. They are willing to spend a quarter of that to win one, which is 6,000 of acquisition budget per closed deal.',
          'Qualified leads convert at one in five, so five leads are needed per customer. Six thousand divided by five puts the ceiling at 1,200 per qualified lead. If outbound is producing them at 700 the channel has room to scale; at 1,800 it is losing money on every one and the problem is either the conversion rate or the definition of qualified, not the campaign.',
          'Those figures are illustrative. Substitute your own contract value, margin and win rate and the arithmetic is the same: margin, times the share you will spend, divided by the number of qualified leads it takes to close one.',
        ],
      },
      {
        h: 'Two definitions have to be stable',
        p: [
          'The figure is only comparable if "qualified" means the same thing this quarter as last, and if the same person applies it. Most apparent swings in cost per lead are definition drift rather than performance change.',
          'Agree the grade, write it down, and keep it fixed for at least two quarters. A metric that moves because its denominator moved is not telling you anything about the campaign.',
        ],
      },
      {
        h: 'Compare across channels, not against the industry',
        p: [
          'The useful comparison is between your own channels over the same period: outbound against events against paid against partnerships. That tells you where the next pound goes.',
          'A channel that produces expensive leads may still be worth running if those leads close faster or at higher value, which is why cost per qualified lead should never be read without the win rate beside it.',
        ],
      },
      {
        h: 'When the number is high and that is fine',
        p: [
          'Long cycle, high value sales produce expensive leads and should. A six figure contract with an eighteen month cycle can justify a cost per lead that would be absurd for a self-serve product.',
          'The failure mode is not a high number. It is a number nobody has calculated, which means every channel discussion is conducted on instinct and the loudest channel wins.',
        ],
      },
    ],
    takeaway:
      'Calculate the ceiling from your own margin and win rate, hold the definition of qualified still, and compare your channels against each other rather than against a published average.',
    related: { services: ['sales', 'go-to-market'], cases: ['siltest'] },
  },

  {
    slug: 'what-belongs-in-a-b2b-content-calendar',
    title: 'What actually belongs in a B2B content calendar?',
    dek: 'Most calendars are a list of dates with topics attached. A useful one is organised around what the buyer is deciding.',
    date: '2026-08-16',
    minutes: 6,
    tags: ['Content', 'Social'],
    metaTitle: 'What Belongs in a B2B Content Calendar',
    metaDesc:
      'How to build a B2B content calendar around buyer questions rather than posting frequency, the four types of post worth making, and how much is enough.',
    keywords: 'B2B content calendar, content planning B2B, LinkedIn content plan, content strategy technical audience',
    intro:
      'A content calendar built around frequency produces volume. One built around the questions a buyer asks on the way to a decision produces conversations. The difference shows up about three months in, when the first version has run out of things to say.',
    sections: [
      {
        h: 'Start from the questions, not the dates',
        p: [
          'List the questions a prospect asks between first hearing about you and signing. There are usually between ten and twenty, and your sales team can produce them in an hour because they answer them every week.',
          'Each question is a piece. That alone fills a quarter, and every piece has a job beyond impressions: it is something a salesperson can send, which is the test of whether it was worth making.',
        ],
      },
      {
        h: 'Four kinds of post worth the effort',
        p: [
          'The answer to a question you are asked repeatedly. The thing you believe that your market mostly does not. A piece of work shown rather than described. And the plain announcement, used sparingly, where you have earned attention.',
          'What is not on that list is commentary on industry news, which almost nobody in B2B reads and which requires the most upkeep for the least return.',
        ],
      },
      {
        h: 'Frequency follows capacity',
        p: [
          'Twice a week, sustained for a year, beats daily for six weeks followed by silence. The audience you are building is small and specific, and it notices consistency more than volume.',
          'Set the cadence at the level the team can hold in a busy month, not a quiet one. A calendar that only works when nothing else is happening is a calendar that stops in the first good quarter.',
        ],
      },
      {
        h: 'Decide who writes before you decide what',
        p: [
          'Technical audiences detect ghostwriting quickly, and a credible account is one where the named person recognisably wrote it. That constrains the format: an engineer who will record a five minute voice note is more useful than one who has agreed in principle to write articles.',
          'Build the calendar around what the named people will actually do. A plan that assumes an hour of writing a week from somebody who has never produced one is not a plan.',
        ],
      },
    ],
    takeaway:
      'Build the calendar from the questions buyers ask, set the cadence at what a busy month allows, and plan around what the named author will genuinely produce.',
    related: { services: ['social-media', 'content-creation'], cases: ['rck'] },
  },

  {
    slug: 'who-should-own-marketing-in-a-small-tech-company',
    title: 'Who should own marketing in a twenty person tech company?',
    dek: 'The usual answer is a junior marketer reporting to a founder who has no time. Here is why that fails and what works instead.',
    date: '2026-08-30',
    minutes: 6,
    tags: ['Strategy', 'Buying'],
    metaTitle: 'Who Should Own Marketing in a Small Tech Company',
    metaDesc:
      'Why a first junior marketing hire usually fails in a twenty person company, what the role actually requires, and the structures that work at that size.',
    keywords: 'first marketing hire, who owns marketing startup, B2B marketing team structure, marketing leadership small company',
    intro:
      'At twenty people the job is deciding what not to do, and that is a senior judgement being asked of whoever is hired. The common structure, a first marketing hire two years out of university reporting to a founder with no time to direct them, sets that person an impossible task and then concludes that marketing does not work.',
    sections: [
      {
        h: 'What the role actually requires',
        p: [
          'Someone has to choose the segment, write the positioning, pick two channels and refuse the other six. That is strategic work, and it has to happen before any execution is worth doing.',
          'A junior hire can execute a plan extremely well. They cannot be expected to produce the plan, and asking them to is the most common way a first marketing hire ends badly for everybody involved.',
        ],
      },
      {
        h: 'The founder cannot keep it',
        p: [
          'Founders usually hold it too long, because they hold the positioning in their heads and have never had to write it down. It works until it is competing with fundraising, product and hiring, at which point marketing becomes whatever is left on a Friday.',
          'The signal that it has to move is not headcount, it is that the founder can no longer tell you what went out last month.',
        ],
      },
      {
        h: 'Structures that work at this size',
        p: [
          'Senior direction plus junior or outsourced execution is the pattern that holds. That can be a fractional head of marketing, an agency carrying the strategy, or a founder who genuinely protects a day a week for it. What does not work is execution with nobody owning the decisions.',
          'Whichever shape you pick, one person has to be accountable for the number. Split across a founder, an agency and a coordinator with nobody named, it is nobody’s.',
        ],
      },
      {
        h: 'What to ask before hiring',
        p: [
          'Ask what the first ninety days would be, and listen for whether the answer starts with research and a decision or with a channel. Candidates who open with "I would start posting on LinkedIn" are describing execution of a plan nobody has written.',
          'Ask what they would refuse to do. A marketer at this stage who will not name things they would stop has not understood the constraint, which is time rather than ideas.',
        ],
      },
    ],
    takeaway:
      'Buy senior judgement and junior or outsourced execution, name one person accountable for the number, and hire against the ability to refuse things.',
    related: { services: ['go-to-market', 'business-development'], cases: ['rck'] },
  },

  {
    slug: 'what-ai-can-actually-automate-in-sales',
    title: 'What can AI actually automate in a B2B sales team?',
    dek: 'Less than the vendors claim and more than most teams use. The dividing line is whether the task has a checkable output.',
    date: '2026-10-01',
    minutes: 7,
    tags: ['AI systems', 'Sales'],
    metaTitle: 'What AI Can Actually Automate in B2B Sales',
    metaDesc:
      'Which sales tasks AI genuinely handles, which it should not touch, and the rule that separates the two: whether a human can check the output in seconds.',
    keywords: 'AI in B2B sales, sales automation AI, AI lead scoring, automate sales tasks',
    intro:
      'The useful test is not whether a model can do a task, it is whether somebody can verify the output in seconds. Where verification is fast, automation pays immediately. Where verification takes as long as doing the work, it costs more than it saves and introduces errors nobody catches.',
    sections: [
      {
        h: 'Research and enrichment, which is the clearest win',
        p: [
          'Finding which companies match a profile, what they recently announced, who holds a relevant role and what they use already is slow manual work with a checkable answer. A wrong result is obvious in a second.',
          'This is where most of the realised value sits today, and it is unglamorous: the reason a team gets through four hundred accounts instead of eighty is not a cleverer email, it is that the list was built in an afternoon.',
        ],
      },
      {
        h: 'Summarising and recording, which nobody wants to do',
        p: [
          'Call notes, meeting summaries and CRM updates are the tasks that do not get done, and their absence is the reason most pipelines are untrustworthy. Automating the record is more valuable than automating the outreach, because it fixes the data everything else depends on.',
          'The check is fast: the person who was on the call reads four lines and corrects one. That is a workable loop.',
        ],
      },
      {
        h: 'Reporting, once the definitions are fixed',
        p: [
          'Pulling the same numbers from four systems into one view every month is mechanical, and the monthly rebuild by hand is why the answer always arrives a week after it was useful.',
          'The prerequisite is that the definitions are stable. Automating a report built on a metric that three people define differently produces a confident wrong answer faster, which is worse than the slow version.',
        ],
      },
      {
        h: 'Where it should not go yet',
        p: [
          'Fully automated outreach written and sent without a human reading it is the clearest mistake. The failure is not grammatical, it is that the message is plausible and wrong about the company, and the recipient cannot tell the difference between that and contempt.',
          'The same applies to anything that makes a judgement with a slow check: forecasting, deal scoring that nobody can interrogate, pricing. Use it to prepare the judgement, not to make it.',
        ],
      },
      {
        h: 'Where to start',
        p: [
          'Pick the task your team complains about most that has an obviously right answer, and automate that one. In most B2B teams it is list building or the CRM record, not the writing.',
          'Then measure the time it gave back rather than the technology. If nobody can name what they now do with the hour, the automation has not landed, whatever it is producing.',
        ],
      },
    ],
    takeaway:
      'Automate the tasks whose output can be checked in seconds, starting with research and record keeping, and keep judgement with a person.',
    related: { services: ['sales', 'business-development'], cases: ['siltest'] },
  },
]

export const insightBySlug = (slug) => INSIGHTS.find((a) => a.slug === slug)

// Newest first for the index.
export const INSIGHTS_BY_DATE = [...INSIGHTS].sort((a, b) => b.date.localeCompare(a.date))
