// Long form content for the case study pages, keyed by the slug in CASES.
//
// Kept beside CASES rather than inside it because the card and the page want
// different things: a card needs one line and one number, a page needs the
// problem, the sequence and what it produced. Merging them would make every
// card import six paragraphs it never renders.
//
// Nothing here claims a result that is not already evidenced in CASES. Where
// the outcome is a number we have, it is used; where it is not, the page
// describes the work rather than inventing a figure, because a case study
// that overstates is worse than no case study to the kind of buyer these
// pages are written for.
export const CASE_DETAIL = {
  bunq: {
    metaTitle: 'BUNQ Spain: Partnership-Led Market Entry',
    metaDesc:
      'How Aspire built a Spanish partner network from nothing for BUNQ and onboarded over 300 users in the first two and a half months.',
    summary:
      'A neobank with no local presence, entering a market where recognition does not travel. Partnerships were the route in.',
    challenge:
      'BUNQ arrived in Spain with a product people liked elsewhere and almost no local footprint. Recognition built in the Netherlands does not cross a border on its own, and paid acquisition into a market you do not yet understand is an expensive way to learn. What the launch needed was other organisations already trusted by the people BUNQ wanted, and a reason for those organisations to care.',
    approach: [
      {
        h: 'Map who actually has the audience',
        p: 'We built the partner landscape against overlap with BUNQ users rather than name recognition. A smaller organisation whose members are exactly the target is worth more than a large one whose audience merely includes them.',
      },
      {
        h: 'Open the conversations in person',
        p: 'A foreign bank asking for a partnership is a cold email most people delete. We secured the meetings directly and had them face to face, which is also how you find out quickly which partners were never going to move.',
      },
      {
        h: 'Run the partnership after the handshake',
        p: 'Signing is the start. We handled onboarding, the co-marketing that followed, and tracked which partners produced real users rather than announcements.',
      },
    ],
    outcome: [
      'Over 300 new users onboarded in the first two and a half months.',
      'A local partner network built from nothing, structured around acquisition rather than press.',
      'A clear read on which partner types convert in this market, and which do not.',
    ],
  },

  rattech: {
    // No photography from either market yet.
    photoTodo: { label: 'RatTech, Netherlands and UAE, photograph to follow', hint: 'TODO: image not yet supplied' },
    metaTitle: 'RatTech: Go-to-Market for the Netherlands and the UAE',
    metaDesc:
      'How Aspire built RatTech go-to-market strategies for two new markets and booked around 60 meetings in one week in the UAE.',
    summary:
      'A Danish product with a proven home market, and two new countries that buy nothing the same way.',
    challenge:
      'RatTech sells digital, poison free rat control, and it works in Denmark. Neither the Netherlands nor the UAE buys it the way Denmark does. The buyers are different, the channels are different, and in the UAE the decision sits with property developers, private investors and mall operators rather than municipalities. Taking the Danish plan abroad unchanged would have tested the wrong message on the wrong people and called the result a market problem.',
    approach: [
      {
        h: 'Two plans, not one translated',
        p: 'Market and competitor research for each country, then the buyer map that goes with it. Who signs in the Netherlands is not who signs in the UAE, so the positioning, the pricing conversation and the proof points were written twice.',
      },
      {
        h: 'A named list, not a scraped one',
        p: 'Target accounts researched against the profile rather than filtered from a database: developers with portfolios where the problem is expensive, investors with exposure to it, and operators who feel it daily.',
      },
      {
        h: 'Worked the list in person',
        p: 'In the UAE we ran the outreach and then the week itself, booking into a calendar rather than collecting interest. Around sixty meetings inside one week, with the people who can actually sign.',
      },
    ],
    outcome: [
      'Around 60 meetings booked in one week in the UAE, with property developers, private investors and shopping mall operators.',
      'Follow up rate after the week: [FOLLOW_UP_RATE]',
      'Qualified opportunities from those meetings: [QUALIFIED_OPPORTUNITIES]',
      'Deals or pilots agreed: [DEALS_OR_PILOTS]',
      'Netherlands result: [NL_RESULT]',
      'Measured over: [TIMEFRAME]',
    ],
  },

  siltest: {
    metaTitle: 'SilTest Semiconductors: Two Years of Compounding B2B Growth',
    metaDesc:
      'How Aspire grew a technical semiconductor audience on LinkedIn, then added business development, a website, conferences and onsite sales over two years.',
    summary:
      'A technical audience that ignores consumer tactics, and a buying cycle too long for a campaign to prove anything.',
    challenge:
      'Semiconductor buyers are engineers and procurement specialists. They do not respond to urgency, they are unmoved by branding, and they are perfectly happy to ignore a company for a year before they need it. That makes the usual proof points useless: a three month campaign ends before this audience has finished deciding. The only thing that works is being consistently present until the moment they are ready.',
    approach: [
      {
        h: 'Start with one channel, done properly',
        p: 'LinkedIn first, and only LinkedIn. One channel maintained consistently beats four maintained occasionally, and it gave us a read on what this audience actually engages with before we spent anywhere else.',
      },
      {
        h: 'Add scope as the audience earned it',
        p: 'Business development came once there was an audience worth converting. We built the website so inbound interest had somewhere to land instead of leaking.',
      },
      {
        h: 'Meet them where they already are',
        p: 'We attend major conferences as their external sales agency: generating qualified leads ahead of the show, booking the meetings, taking them on the floor, and making qualified handovers to their team afterwards. For a technical sector the show floor is still where the real conversations happen.',
      },
    ],
    outcome: [
      'Two years in and still running, which for this buying cycle is the result.',
      'A technical B2B audience that engages rather than scrolls past.',
      'Four services added in sequence, each justified by the one before it.',
    ],
  },

  ise: {
    metaTitle: 'Integrated Systems Europe: Three Years on the Show Floor',
    metaDesc:
      'How Aspire has run show floor support, live social and real-time content capture for Integrated Systems Europe in Barcelona across three years.',
    summary:
      'One of the largest audio visual conferences in the world, held in Barcelona each year, where the audience that matters is mostly the one not in the room.',
    challenge:
      'A show of this size generates more happening at once than any team can cover, and the window is days rather than months. Content captured and published next week has missed the point entirely. The harder problem is that most of the people you want to reach are not at the show at all, so the job is not documenting the event, it is making the event legible to everyone following from elsewhere.',
    approach: [
      {
        h: 'Plan in the run-up, not on the floor',
        p: 'The work starts well before the doors do: a strategic plan signed off upfront and the social support built out in the weeks leading in, so every decision during the show is about execution rather than direction. There is no time to agree a strategy mid-floor.',
      },
      {
        h: 'Run the floors and publish in the same hour',
        p: 'We help their team run the show floors while capturing in real time and running the accounts live through the show, so what people saw online matched what was happening on the floor.',
      },
      {
        h: 'Give the audience something to do',
        p: 'Instagram challenges and trivia games turned passive viewers into participants, which is what lifted interaction and pushed reach past the people physically present.',
      },
    ],
    outcome: [
      'Three years working the show, and still going.',
      'Engagement mechanics that widened reach well beyond attendees.',
      'Content live during the event rather than after it.',
    ],
    quoteName: 'Cécile Laurent',
  },

  rck: {
    metaTitle: 'RCK Consulting: Four Workstreams Run as One Strategy',
    metaDesc:
      'How Aspire runs website, lead generation, CRM and conference representation for RCK Consulting as a single growth strategy rather than four suppliers.',
    summary:
      'Four things most companies buy from four suppliers, none of whom talk to each other.',
    challenge:
      'RCK needed a website, lead generation, a CRM that reflected reality, and someone to represent them at conferences. Bought separately, those become four relationships with four opinions: the site says one thing, outreach says another, the CRM records neither, and nobody owns the conference follow-up. The cost is not the invoices, it is that no single person can tell you what is working.',
    approach: [
      {
        h: 'One strategy, then four workstreams',
        p: 'The plan came first and the workstreams were derived from it, so the website, the outreach and the conference presence argue the same case in the same voice.',
      },
      {
        h: 'A CRM that matches what happened',
        p: 'Every conversation recorded, so the pipeline is a record rather than an estimate, and it stays RCK’s when the engagement ends.',
      },
      {
        h: 'Represented in the room',
        p: 'We attend conferences and client meetings as part of their team, with follow-up sent while the conversation is still warm.',
      },
    ],
    outcome: [
      'Four workstreams running against one plan rather than four briefs.',
      'A pipeline the client owns and can read.',
      'Growth in the social accounts, LinkedIn especially.',
    ],
    quoteName: 'RCK Consulting',
  },

  'de-interim-notaris': {
    metaTitle: 'De Interim Notaris: An SEO-Led Website Build',
    metaDesc:
      'How Aspire designed and built a website for a Netherlands notarial practice with the SEO strategy underneath it, so clients searching could find them.',
    summary:
      'A practice whose clients were already searching for exactly this service, and not finding them.',
    challenge:
      'Legal services are one of the clearest cases of intent-led search: nobody looks for a notary casually. The demand already existed and was being answered by someone else. A brochure site would not have changed that: being online and being findable are different problems, and only the second one produces clients.',
    approach: [
      {
        h: 'Design around how the practice works',
        p: 'A clean, user-friendly site structured to match the services the practice actually offers, so a visitor can tell within seconds whether they are in the right place.',
      },
      {
        h: 'Build the SEO in, not on',
        p: 'The search strategy shaped the structure rather than being retrofitted afterwards. The pages exist because people search for those things.',
      },
    ],
    outcome: [
      'A professional presence that reflects the practice.',
      'Found through search by people already looking, without paying for every click.',
    ],
  },

  'craft-cigar-club': {
    metaTitle: 'The Craft Cigar Club: Two Revenue Lines at Once',
    metaDesc:
      'How Aspire grows membership and corporate venue rentals for an exclusive members lounge in central Barcelona through lead generation and direct outreach.',
    summary:
      'A private members lounge selling two different things to two different buyers.',
    challenge:
      'The Craft Cigar Club is both a premium members experience and an event space. Those are not the same sale: an individual choosing a membership and a company booking a venue respond to different things, on different timelines, through different channels. Treating them as one audience is the quickest way to do neither well.',
    approach: [
      {
        h: 'Separate the two sales',
        p: 'Membership and corporate venue hire run as distinct lines with their own targeting and outreach, rather than one message hoping to land with both.',
      },
      {
        h: 'Outreach and closing, not just qualified leads',
        p: 'We generate the qualified leads and close them. Handing over a list and calling it lead generation leaves the hardest part with the client.',
      },
      {
        h: 'Alongside the in-house team',
        p: 'We work with their marketing team on the wider growth plan rather than around it, so the outreach and the brand stay recognisably the same business.',
      },
    ],
    outcome: [
      'Two revenue lines grown in parallel.',
      'Membership base expanded through direct outreach.',
      'Corporate venue rentals driven alongside it.',
    ],
  },
}

export const caseDetailFor = (slug) => CASE_DETAIL[slug]
