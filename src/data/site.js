// ============================================================================
// Aspire: single source of truth for site content.
//
// Every page, the nav, the footer, the sitemap and the prerender route list
// read from here, so a service, case or person is added in exactly one place.
//
// Facts are taken from the live Wix site (aspireagencymarketing.com, scraped
// Sept 2026) rather than from the older React build, which described Aspire as
// a solo operation. It is a four person team. Anything marked VERIFY is a
// figure worth confirming before launch.
// ============================================================================

// The one sentence the whole site has to land.
export const POSITION = {
  audience: 'B2B tech companies',
  promise: 'We find the buyers, start the conversations, and build the brand that makes them answer.',
}

// ---------------------------------------------------------------------------
// The problem, stated as the visitor already experiences it
// ---------------------------------------------------------------------------
export const PROBLEM = [
  {
    k: '01',
    h: 'The founder is still the sales team',
    p: 'Every hour spent writing outreach is an hour not spent on product. Pipeline goes quiet the week a release ships, and nobody notices until the quarter closes.',
  },
  {
    k: '02',
    h: 'Nobody has heard of you yet',
    p: 'The technology is good. The company is invisible. Buyers answer people they recognise, and your competitors have been posting every week for two years.',
  },
  {
    k: '03',
    h: 'Sales and marketing are two suppliers',
    p: 'A freelancer posts. An agency runs ads. An SDR sends email. None of them talk, so nothing compounds and no single person owns the number.',
  },
]

// ---------------------------------------------------------------------------
// Comparison. The conversion argument, made as a spec table.
// ---------------------------------------------------------------------------
export const COMPARE = {
  columns: [
    { k: 'hire', label: 'Hire in house' },
    { k: 'agency', label: 'Traditional agency' },
    { k: 'aspire', label: 'Aspire', highlight: true },
  ],
  rows: [
    {
      label: 'Time to first output',
      hire: 'Two to four months to hire and onboard',
      agency: 'Four to six weeks of onboarding',
      aspire: 'Strategy in week one, execution in week two',
    },
    {
      label: 'What it costs',
      hire: 'One salary, plus tooling, plus recruitment',
      agency: 'Monthly retainer, usually on a year contract',
      aspire: 'Scoped to the work. Pricing on request',
    },
    {
      label: 'Who does the work',
      hire: 'One person, one skill set',
      agency: 'A junior team behind an account manager',
      aspire: 'Four specialists, each in their own discipline',
    },
    {
      label: 'Scope',
      hire: 'Sales or marketing, rarely both',
      agency: 'Whatever that agency happens to sell',
      aspire: 'Sales, business development, social, content and events, run as one plan',
    },
    {
      label: 'If it is not working',
      hire: 'A difficult conversation and a notice period',
      agency: 'Locked in until the contract ends',
      aspire: 'We tell you on the monthly review and change it',
    },
  ],
}

// ---------------------------------------------------------------------------
// Services. Each is a page at /services/<slug>
// ---------------------------------------------------------------------------
export const SERVICES = [
  {
    slug: 'go-to-market',
    n: '01',
    nav: 'Go-to-market strategy',
    title: 'Go-to-market strategy',
    flag: 'Full setup and prep',
    blurb:
      'The plan before the spend. Research, positioning, pricing, channels and a target list, built so the execution services have something to run.',
    h1: 'Know who buys, why, and in what order. Then launch.',
    lede:
      'A launch or a new market fails on the plan far more often than on the effort. We do the research, define who you are selling to, write the positioning, set the pricing and offer, choose the channels, and hand back a ninety day roadmap with the accounts to call and the numbers to judge it by. Then we can run it with you.',
    metaTitle: 'Go-to-Market Strategy for B2B Tech',
    metaDesc:
      'Market and competitor research, ICP and buyer mapping, positioning, pricing, channel plan, target account list and a 90 day roadmap. Built for a first launch or a new country.',
    keywords: 'go to market strategy, GTM, market entry, ICP, positioning, launch plan, B2B expansion',
    tags: ['Research', 'ICP and positioning', 'Channel plan', '90 day roadmap'],
    // No photograph for this page yet. The frame states what belongs there.
    photoTodo: { label: 'Go-to-market, photograph to follow', hint: 'TODO: image not yet supplied' },
    // Who it is for, shown above the phases.
    audience: [
      {
        h: 'First go-to-market, no sales function yet',
        p: 'The product is ready and nobody has sold it repeatably. You need to know who buys, what they need to hear, and what to do on day one rather than guessing in public.',
      },
      {
        h: 'Expansion into a new country or segment',
        p: 'It sells at home. A new market has different buyers, different channels and different objections, and the plan that worked once does not transfer unchanged.',
      },
    ],
    includes: [
      { h: 'Market and competitor research', p: 'Size, structure and who is already winning. What they charge, how they sell, and where the gap is that you can hold.' },
      { h: 'ICP and buyer mapping', p: 'Who signs, who blocks, who uses it. The real buying committee rather than a job title, and the trigger that makes this urgent now.' },
      { h: 'Positioning and messaging', p: 'One sentence for what you do and who it is for, then the proof points and objection handling underneath it.' },
      { h: 'Channel and outreach plan', p: 'Which channels this buyer actually answers on, in what order, and what gets said on each.' },
      { h: 'Pricing and offer', p: 'What it costs, how it is packaged, and the entry offer that gets a first yes without discounting the real price.' },
      { h: 'Target account list', p: 'Named accounts and named people, researched against the ICP rather than scraped, so outreach starts with a list worth working.' },
      { h: '90 day roadmap and KPIs', p: 'What happens in which week, who owns it, and the numbers that say whether it is working before the quarter ends.' },
    ],
    phases: [
      { n: '01', h: 'Foundations', p: 'Research, ICP, positioning, pricing and offer. By the end of this phase you can say who buys, why, and what you charge, and defend all three.' },
      { n: '02', h: 'First meetings', p: 'Target list built, channels chosen, messaging written and outreach live. The goal is real conversations with the right people, not volume.' },
      { n: '03', h: 'Repeatable pipeline', p: 'What produced meetings gets scaled, what did not gets cut, and the roadmap moves from a plan into a process your team can run.' },
    ],
    // Pulls the readiness quiz CTA onto the page.
    quiz: { to: '/services/go-to-market/quiz', label: 'Check your GTM readiness', note: 'Seven questions, two minutes, a score and three next steps.' },
    proof: { caseSlugs: ['rattech', 'bunq', 'siltest'] },
    faq: [
      { q: 'How long does a go-to-market plan take?', a: 'Four to six weeks for the plan itself, depending on how much research the market needs. The ninety day roadmap starts the moment it is signed off.' },
      { q: 'Do you run it as well, or only write it?', a: 'Either. Most clients have us build the plan and then run the first ninety days with the sales, content and events services. The plan is yours whether or not we execute it.' },
      { q: 'We already sell at home. Is this the same work?', a: 'The structure is, the answers are not. A new country has different buyers, channels and objections. We did exactly this for RatTech in the Netherlands and the UAE.' },
      { q: 'What do we get at the end?', a: 'A written plan covering research, ICP, positioning, pricing, channels and the target account list, plus a ninety day roadmap with KPIs. Yours to keep.' },
    ],
  },
  {
    slug: 'sales',
    photo: { src: '/media/pages/svc-sales.webp', alt: 'Two people in conversation beside a product display at a trade show' },
    n: '02',
    nav: 'Sales, in person and digital',
    title: 'Sales, in person and digital',
    blurb:
      'Lead research, outreach, follow up and CRM. At conferences and online, with a strong focus on B2B.',
    h1: 'Sales that happen in the room, not only in the inbox.',
    lede:
      'We run the full line: research the right accounts, open the conversation, follow up properly, and record every interaction in your CRM. In person at conferences and online, built around B2B buying cycles rather than consumer funnels.',
    metaTitle: 'B2B Sales: In Person and Digital',
    metaDesc:
      'Lead research, multichannel outreach, conference representation and CRM management for B2B tech companies. In the room and online, from Barcelona.',
    keywords: 'B2B sales, lead generation, conference sales, outreach, CRM, tech sales, Barcelona',
    tags: ['Lead research', 'Outreach', 'Conference sales', 'CRM'],
    includes: [
      {
        h: 'Account and lead research',
        p: 'We build the target list against your real buyer profile: sector, size, region, buying signal. Not a scraped database sent to everyone.',
      },
      {
        h: 'Outreach and strategic follow up',
        p: 'Email, LinkedIn and phone sequences written in your voice. Most deals are won in the follow up, so that is the part we do not skip.',
      },
      {
        h: 'Conference representation',
        p: 'We attend as your team. Pre booked meetings, stand cover, badge scanning, and follow up sent while the conversation is still warm.',
      },
      {
        h: 'CRM and pipeline management',
        p: 'Every contact, conversation and next step recorded in your CRM. The pipeline is yours and stays yours when the engagement ends.',
      },
    ],
    proof: { caseSlugs: ['bunq', 'siltest', 'craft-cigar-club'] },
    faq: [
      {
        q: 'Do you work in our CRM or bring your own?',
        a: 'Yours. We work inside whatever you already use, so the pipeline, history and contacts stay in your system and belong to you afterwards.',
      },
      {
        q: 'Will you actually attend conferences with us?',
        a: 'Yes. Onsite representation is core to this service. We have worked with Integrated Systems Europe for the last three years. They run one of the largest audio visual conferences in the world, held annually in Barcelona, and we help their team run the show floors and planning and executing social media support through the week and the run-up to it. For SilTest Semiconductors we attend as an external sales agency: generating leads ahead of the show, booking the meetings, taking them on the floor, and making qualified handovers afterwards to grow the pipeline.',
      },
      {
        q: 'How quickly does outreach produce meetings?',
        a: 'First sequences usually go live inside two weeks. We use the first month to test targeting and messaging, then scale what replies.',
      },
    ],
  },
  {
    slug: 'events',
    // Narrower than the other four banners, so the width rides on the data
    // rather than being hardcoded in the component.
    // A film rather than a still at the top of this page. The photo stays as
    // the poster source and the fallback where video cannot autoplay.
    film: {
      src: '/media/film/ise26-waving.mp4',
      poster: '/media/film/ise26-waving.webp',
      alt: 'Crowds waving from the show floor at Integrated Systems Europe 2026',
      ratio: '16 / 9',
    },
    photo: {
      src: '/media/pages/svc-events.webp',
      w: 1440,
      h: 540,
      alt: 'The outdoor audio demo area at Integrated Systems Europe 2026 in Barcelona',
    },
    n: '03',
    nav: 'Events and conferences',
    title: 'Events and conferences',
    // Surfaced as a chip on the home list and in the services menu. It says
    // what makes this one different from the other four — they are retainers,
    // this is scoped to a date — rather than making a claim about demand that
    // nothing on the page could support.
    flag: 'Project based, worldwide',
    blurb:
      'Extra hands for the week your pipeline is decided. Meetings booked before you land, leads captured on the floor, live marketing, and the follow-up sent while it still counts. Project based, worldwide.',
    h1: 'A conference is five days. Most of its value is lost in the sixth.',
    lede:
      'We join your team for the run-up, the show and the week after: pre-booked meetings in the diary before you arrive, lead capture and sales conversations on the floor, social and content published live, and follow-up sent while the conversation is still warm. Scoped to the event rather than a retainer, and we travel.',
    metaTitle: 'Conference and Event Marketing and Sales Support',
    metaDesc:
      'Project-based conference support for B2B tech: pre-booked meetings, onsite lead capture and sales, live social and content, and structured follow-up. Worldwide, scoped per event.',
    keywords:
      'conference marketing, trade show sales support, event lead generation, exhibition staff, onsite marketing, B2B events',
    tags: ['Pre-booked meetings', 'Onsite lead capture', 'Live content', 'Follow-up'],
    includes: [
      {
        h: 'Meetings booked before you arrive',
        p: 'Walk-up traffic is the least valuable thing a stand produces. We work the attendee and exhibitor lists in the weeks before and put real conversations in the diary, so day one starts with a schedule rather than hope.',
      },
      {
        h: 'Lead capture and sales on the floor',
        p: 'We attend as your team: stand cover, badge scanning with a note of what was actually discussed, and the sales conversations themselves. A scanned badge with no context is a name nobody remembers by the following week.',
      },
      {
        h: 'Marketing published while it is happening',
        p: 'Content shot and posted in the same hour, your channels run live through the show, and engagement mechanics that reach the people who did not travel. At ISE that meant Instagram challenges and trivia that pulled in far more than the floor could hold.',
      },
      {
        h: 'Follow-up in the week that decides it',
        p: 'Every contact and next step written into your CRM during the show, and follow-up sent while you are still fresh in mind. The stand cost is already spent by then; this is the only part still deciding whether it returns anything.',
      },
    ],
    photoLower: {
      // Its own copy rather than the one /about uses: that box is 343px and
      // was right-sized to 900w, which this 990px slot would upscale.
      src: '/media/about/the-group-wide.webp',
      w: 1440,
      h: 900,
      alt: 'A large group of delegates photographed together outdoors on a lawn',
      caption: 'The kind of room we are hired to work. Delegates at a client event.',
    },
    proof: { caseSlugs: ['ise', 'siltest'] },
    faq: [
      {
        q: 'Do you travel to the event?',
        a: 'Yes, anywhere. This is project work scoped to a specific show rather than a retainer, so the engagement is the run-up, the event itself and the follow-up week. We have worked with Integrated Systems Europe for three years, helping run the show floors and the social support at their annual Barcelona conference; with SilTest Semiconductors as an external sales agency, generating leads ahead of the show, booking and taking the meetings and handing them over qualified afterwards; and with Interactive Digital Media.',
      },
      {
        q: 'How far in advance do you need to start?',
        a: 'Four to six weeks is comfortable. The meetings that matter are booked in advance, and that outreach needs time to run. We can work a shorter window, but it moves the value towards onsite capture and follow-up and away from a full diary on day one.',
      },
      {
        q: 'Can you work alongside our own team on the stand?',
        a: 'That is usually how it goes. We add capacity rather than replace anyone: your people take the technical conversations while we keep the diary moving, capture the content and make sure nothing leaves the floor unrecorded.',
      },
      {
        q: 'What do we keep afterwards?',
        a: 'Everything. The leads, the notes, the content and the follow-up sequences all sit in your systems, recorded as they happen. If we never work another show together you still have the pipeline from this one.',
      },
    ],
  },
  {
    slug: 'business-development',
    photo: { src: '/media/pages/svc-bizdev.webp', alt: 'Two people in conversation beside an exhibition stand' },
    n: '04',
    nav: 'Business development',
    title: 'Business development',
    blurb:
      'Branding, website and partnerships. The work that makes a company recognisable before anyone is asked to buy.',
    h1: 'The growth work that makes the sales work land.',
    lede:
      'Outreach converts far better when the buyer recognises the name and finds a website that backs it up. This is the brand, the site and the partnerships that carry it. The positioning those are built on is go-to-market work, and lives there.',
    metaTitle: 'Business Development for Tech Companies',
    metaDesc:
      'Branding, website, SEO and partnerships wired directly into your sales pipeline. Long term B2B growth from Aspire in Barcelona.',
    keywords: 'business development, branding, website, SEO, partnerships, audience growth',
    tags: ['Branding', 'Website', 'SEO', 'Partnerships'],
    includes: [
      {
        h: 'Brand and visual identity',
        p: 'A coherent look that survives contact with a slide deck, a LinkedIn banner and a conference stand. Not just a logo file.',
      },
      {
        h: 'Website and SEO',
        p: 'A site built to convert and to be found. Real structure, real copy, and the SEO groundwork that gets it ranking for what buyers actually search.',
      },
      {
        h: 'Partnerships and audience',
        p: 'Finding the partners and channels that put you in front of the right buyers faster than cold outreach alone can.',
      },
    ],
    proof: { caseSlugs: ['de-interim-notaris', 'rck', 'bunq'] },
    faq: [
      {
        q: 'Is this a rebrand?',
        a: 'Only if it needs to be. Most engagements start with positioning and the website, because that is usually where the gap between what you do and what people understand is widest.',
      },
      {
        q: 'Do you build the website yourselves?',
        a: 'Yes. We have built and shipped sites for De Interim Notaris, RCK Consulting, SilTest and Coaching BV, covering structure, copy, design and SEO setup.',
      },
      {
        q: 'How does this connect to the sales work?',
        a: 'Directly. The positioning becomes the outreach messaging, and the website becomes the page prospects land on. Running them together is the entire point.',
      },
    ],
  },
  {
    slug: 'social-media',
    photo: { src: '/media/pages/svc-social.webp', alt: 'Someone filming a lit display on a phone at an exhibition' },
    n: '05',
    nav: 'Social media management',
    title: 'Social media management',
    blurb:
      'Strategy, calendar, content and analytics across LinkedIn, YouTube, TikTok and Instagram.',
    h1: 'Show up every week, or do not bother showing up.',
    lede:
      'Social only works when it is relentless. We build the content plan, run the calendar, create and post, handle the replies, and report on what actually moved. The channel compounds instead of restarting every quarter.',
    metaTitle: 'Social Media Management for B2B Tech',
    metaDesc:
      'LinkedIn, YouTube, TikTok and Instagram managed end to end: strategy, calendar, posting, community and analytics. B2B first, from Barcelona.',
    keywords: 'social media management, LinkedIn, YouTube, TikTok, Instagram, B2B social, tech',
    tags: ['LinkedIn', 'YouTube', 'TikTok', 'Instagram'],
    includes: [
      {
        h: 'Channel strategy',
        p: 'Which platforms deserve your effort, what each one is for, and the content pillars that give you something worth saying every week.',
      },
      {
        h: 'Content plan and calendar',
        p: 'Planned ahead and agreed with you, so publishing never depends on somebody finding a spare hour on a Friday.',
      },
      {
        h: 'Creation, posting and community',
        p: 'We write, design, schedule and publish, then handle the comments and messages that turn a post into a conversation.',
      },
      {
        h: 'Analytics and iteration',
        p: 'Monthly reporting on reach, engagement and what arrived as a lead, with the plan adjusted against it.',
      },
    ],
    proof: { caseSlugs: ['siltest', 'ise', 'rck'] },
    faq: [
      {
        q: 'Which platform should we be on?',
        a: 'For most B2B tech companies, LinkedIn first and everything else second. We would rather run one channel properly than four badly.',
      },
      {
        q: 'Do we have to appear on camera?',
        a: 'It helps, but no. Plenty of what we run is written, designed or filmed around the work rather than around the founder.',
      },
      {
        q: 'How long before it shows results?',
        a: 'Engagement moves within weeks. Audience and inbound take a few months of consistency. SilTest was a two year LinkedIn led engagement, and that is the timescale on which it really pays.',
      },
    ],
  },
  {
    slug: 'content-creation',
    photo: { src: '/media/pages/svc-content.webp', alt: 'A flamenco performer under stage light in front of an LED backdrop' },
    n: '06',
    nav: 'Content creation',
    title: 'Content creation',
    blurb:
      'Photo, video and branded visuals made for your identity. YouTube, LinkedIn, Shorts, Reels and live events.',
    h1: 'Content that looks like you, not like a stock library.',
    lede:
      'Good strategy dies without something worth posting. We shoot and edit the photography, video and branded visuals that fill the calendar. On location, at your events, or wherever the work actually happens.',
    metaTitle: 'Content Creation: Photo and Video',
    metaDesc:
      'Photography, video and branded visuals for YouTube, LinkedIn, Shorts and Reels, shot on location and at live events. Content creation from Aspire, Barcelona.',
    keywords: 'content creation, video production, photography, Reels, Shorts, event content',
    tags: ['Photo', 'Video', 'Reels and Shorts', 'Live events'],
    includes: [
      {
        h: 'Photography',
        p: 'Team, product and on location shoots that give you a library to draw on for months, not one usable frame.',
      },
      {
        h: 'Video',
        p: 'Long form for YouTube and short form for Reels, Shorts and TikTok, cut from the same shoot so one filming day feeds the whole calendar.',
      },
      {
        h: 'Branded visuals',
        p: 'Graphics, thumbnails and templates that hold the identity steady across every channel and every post.',
      },
      {
        h: 'Live event capture',
        p: 'Filming and publishing in real time from conferences, while the audience is still in the room.',
      },
    ],
    proof: { caseSlugs: ['ise', 'craft-cigar-club', 'siltest'] },
    faq: [
      {
        q: 'Where do you shoot?',
        a: 'Barcelona as standard, and we travel for events and on location work. Three years of live capture at ISE, in Barcelona each year, is exactly that.',
      },
      {
        q: 'Do we get the raw files?',
        a: 'Yes. Everything we shoot for you is yours, raw files included.',
      },
      {
        q: 'Can we book content without the social management?',
        a: 'You can, though most clients run the two together. The calendar is what makes the shoot worth doing.',
      },
    ],
  },
]

export const serviceBySlug = (slug) => SERVICES.find((s) => s.slug === slug)

// ---------------------------------------------------------------------------
// Client cases
// ---------------------------------------------------------------------------
export const CASES = [
  {
    slug: 'bunq',
    client: 'BUNQ',
    sector: 'Fintech',
    title: 'Partnership coordinator for BUNQ entering the Spanish market.',
    result: 'A local partner network built from nothing',
    metric: '300',
    metricSuffix: '+',
    metricLabel: 'new users in the first 2.5 months',
    body:
      'Aspire acts as partnership coordinator for BUNQ in Spain, driving strategic collaborations and user acquisition. We secured the key meetings, identified the partners worth having, and onboarded over 300 new users inside the first two and a half months. The focus is B2B partnerships that accelerate growth rather than one off campaigns.',
    services: ['sales', 'business-development'],
  },
  {
    slug: 'siltest',
    client: 'SilTest Semiconductors',
    sector: 'Semiconductors',
    title: 'Two years growing LinkedIn, business development and onsite sales.',
    result: 'A technical B2B audience that actually engages',
    metric: '2',
    metricSuffix: ' years',
    metricLabel: 'and still running',
    body:
      'We started with LinkedIn. As the partnership grew we added business development, built their website, represented them at major conferences and drove onsite sales. Two years in we still run their social growth. For a technical audience this is the only thing that works: consistent presence, maintained long enough to compound.',
    services: ['events', 'social-media', 'business-development', 'sales'],
  },
  {
    slug: 'ise',
    client: 'Integrated Systems Europe',
    sector: 'Live events',
    title: 'Three years running the show floors and social for one of the largest AV shows in the world.',
    result: 'Instagram challenges and trivia that pulled the floor in',
    metric: '3',
    metricSuffix: ' years',
    metricLabel: 'running the show floors and social',
    body:
      'Integrated Systems Europe runs one of the largest audio visual conferences in the world, held each year in Barcelona. We have worked with their team for three years, helping run the show floors and planning and executing the social media support through the week and the run-up to it. A strategic plan agreed upfront, then executed live: content captured in real time, the accounts run through the show, and engagement tactics including Instagram challenges and trivia games to widen reach well beyond the people physically present.',
    services: ['events', 'content-creation', 'social-media', 'sales'],
  },
  {
    slug: 'rck',
    client: 'RCK Consulting',
    sector: 'Tech consulting',
    title: 'Website, lead generation, CRM and conference representation.',
    result: 'Four workstreams run as one strategy',
    metric: '4',
    metricSuffix: '',
    metricLabel: 'workstreams, one plan',
    body:
      'A tech consulting firm that partnered with Aspire for growth and digital presence. We handle website development, lead generation and CRM management, and represent RCK at conferences and client meetings. Four things most companies buy from four suppliers, run here as a single strategy.',
    services: ['business-development', 'sales', 'social-media'],
  },
  {
    slug: 'de-interim-notaris',
    client: 'De Interim Notaris',
    sector: 'Legal',
    title: 'A strong online presence built on SEO and a professional website.',
    result: 'Found by the people already searching',
    metric: 'SEO',
    metricSuffix: '',
    metricLabel: 'led website build',
    body:
      'A Netherlands based practice that came to us wanting a real online presence. We designed and built a clean, user friendly website aligned to how the business actually works, then implemented the SEO strategy underneath it so potential clients could find them without paying for every click.',
    services: ['business-development'],
  },
  {
    slug: 'craft-cigar-club',
    client: 'The Craft Cigar Club',
    sector: 'Hospitality',
    title: 'Lead generation and venue sales for an exclusive members lounge.',
    result: 'Members plus corporate venue rentals',
    metric: '2',
    metricSuffix: '',
    metricLabel: 'revenue lines grown at once',
    body:
      'A private members lounge in central Barcelona, offering both a premium cigar experience and an event space. We expand the membership base and drive corporate venue rentals through lead generation, direct outreach and deal closing, working alongside their marketing team on the wider growth plan.',
    services: ['sales', 'content-creation'],
  },
  {
    slug: 'rattech',
    client: 'RatTech',
    sector: 'Clean tech',
    title: 'Go-to-market for two new countries, and a week of meetings in Dubai.',
    result: 'Sixty meetings booked in a single week',
    metric: '60',
    metricSuffix: '',
    metricLabel: 'meetings in one week, UAE',
    body:
      'RatTech makes digital, poison free rat control in Denmark. We built the go-to-market strategy for two new markets, the Netherlands and the UAE: the research, the buyer mapping, the positioning and the target account list for each. In the UAE we then worked the list and booked around sixty meetings in one week with property developers, private investors and shopping mall operators.',
    services: ['go-to-market', 'business-development', 'sales'],
  },
]

export const caseBySlug = (slug) => CASES.find((c) => c.slug === slug)

export const CLIENTS = [
  { name: 'Integrated Systems Europe', logo: '/brand/clients/ise.webp' },
  { name: 'SilTest Semiconductors', logo: '/brand/clients/siltest.webp' },
  { name: 'BUNQ', logo: '/brand/clients/bunq.webp' },
  { name: 'De Interim Notaris', logo: '/brand/clients/de-interim-notaris.webp' },
  { name: 'The Craft Cigar Club', logo: '/brand/clients/craft-cigar-club.webp' },
  { name: 'RCK Consulting', logo: '/brand/clients/rck.webp' },
  { name: 'Interactive Digital Media', logo: '/brand/clients/idm.webp' },
  { name: 'AnyMessage', logo: '/brand/clients/anymessage.webp' },
  { name: 'RatTech', logo: '/brand/clients/rattech.webp' },
  { name: 'ABC Kloak', logo: '/brand/clients/abc-kloak.webp' },
  // No image mark for these two, so they run as set wordmarks. Veerpoint's
  // own brand is typographic (type plus a coloured stop), so a wordmark is
  // faithful rather than a fallback.
  { name: 'Veerpoint' },
  { name: 'Coaching BV' },
]

// Resolve a client's logo by the name used in CASES and TESTIMONIALS, so both
// read from the same CLIENTS list rather than repeating paths.
const LOGO_BY_NAME = Object.fromEntries(
  CLIENTS.filter((c) => c.logo).map((c) => [c.name.toLowerCase(), c.logo])
)
export const logoFor = (name) => (name ? LOGO_BY_NAME[name.toLowerCase()] : undefined)

// ---------------------------------------------------------------------------
// The team. Four specialists, one discipline each.
// VERIFY: the live Wix site claims "a combined six languages". That count was
// written for the previous line-up, so it is not asserted anywhere on the site
// until it is confirmed for the current four.
// ---------------------------------------------------------------------------
export const TEAM = [
  {
    name: 'Elena Novikova',
    photo: '/photos/team/elena-novikova.webp',
    initials: 'EN',
    role: 'Founder',
    discipline: 'Sales and business development',
    bio: 'Founded Aspire in 2022 during her business studies in Barcelona. Runs strategy, sales and business development.',
  },
  {
    name: 'Jackson Hunter',
    photo: '/photos/team/jackson-hunter.webp',
    initials: 'JH',
    role: 'Content and video',
    discipline: 'Photo and film',
    bio: 'Photographer and videographer across real estate, sport and tech. Shoots and edits everything that appears on camera.',
  },
  {
    name: 'Nika Spir',
    photo: '/photos/team/nika-spir.webp',
    initials: 'NS',
    role: 'Marketing consultant',
    discipline: 'Strategy and campaigns',
    bio: 'Digital marketing degree in London, then a specialism in paid acquisition. Runs anything with a budget attached to it.',
  },
  {
    name: 'Selin Sehin',
    photo: '/photos/team/selin-sehin.webp',
    initials: 'SS',
    role: 'Ads specialist',
    discipline: 'Paid and performance',
    // Bio still to come; the card renders without it.
  },
  {
    name: 'Mattis Maerz',
    initials: 'MM',
    role: 'AI systems',
    discipline: 'Custom dashboards and integrations',
    bio: 'Builds the dashboards, integrations and internal tools behind the AI systems work. Makes scattered data usable.',
  },
]

// ---------------------------------------------------------------------------
// Onsite. The team working at conferences and shoots.
//
// Captions describe what is happening rather than naming the event: the source
// photographs carry no event metadata, and a wrong show name on a client's
// stand is worse than no name. Add the real ones when you know them.
// ---------------------------------------------------------------------------
// Single frames used to stop the thinner pages reading as pure text. Same
// shoot as WORK_BAND, so the site does not start mixing sources.
export const PAGE_MEDIA = {
  services: [
    { src: '/media/pages/svc-floor.webp',
      alt: 'Crowded exhibition floor at a trade show, seen from above' },
  ],
}

// Frames from the Integrated Systems Europe engagement, which is one of the
// six cases below rather than stock event photography. Shot by Jackson at the
// show in Barcelona.
export const WORK_BAND = [
  { src: '/media/work/ise-team.webp',
    alt: 'A presenter interviewing four people on the Pitching Stage at Integrated Systems Europe 2026' },
  { src: '/media/work/ise-floor.webp',
    alt: 'A large group photographed on the Pitching Stage at Integrated Systems Europe 2026' },
  { src: '/media/work/ise-installation.webp',
    alt: 'Visitors among the loudspeaker arrays in the outdoor audio demo area' },
]

// Three wide frames for the About page, cut from the same event masters as
// the carousel but landscape, since they run three-up rather than as a strip.
export const ABOUT_BAND = [
  { src: '/media/about/in-barcelona.webp',
    alt: 'A conference group photographed in front of Casa Batlló in Barcelona' },
  { src: '/media/about/the-group.webp',
    alt: 'A large group of delegates photographed together outdoors on a lawn' },
  { src: '/media/about/awards.webp',
    alt: 'Four people holding awards on a red carpet beside a sponsor banner' },
]

export const ONSITE = [
  { src: '/media/events/on-stage.webp', caption: 'On stage',
    alt: 'Two people shaking hands on a stage at an event' },
  { src: '/media/events/idm-stand.webp', caption: 'On the stand for Interactive Digital Media',
    alt: 'An exhibition stand branded for Interactive Digital Media, with a presenter beside the display' },
  { src: '/media/events/awards-night.webp', caption: 'On the red carpet',
    alt: 'Four people holding awards on a red carpet beside a sponsor banner' },
  { src: '/media/events/filming-stand.webp', caption: 'Filming a demo on the stand',
    alt: 'Two people filming a product demonstration on a phone at an exhibition stand' },
  { src: '/media/events/barcelona-group.webp', caption: 'Delegates in Barcelona',
    alt: 'A large group photographed in front of Casa Batlló in Barcelona' },
  { src: '/media/events/on-the-mic.webp', caption: 'Presenting',
    alt: 'Speaking into a microphone at an event' },
  { src: '/media/events/nrw-stand.webp', caption: 'On the stand in North Rhine Westphalia',
    alt: 'Two people talking at a trade stand with product screens behind them' },
  { src: '/media/events/capturing-talk.webp', caption: 'Capturing a talk',
    alt: 'A camera on a tripod filming a speaker on stage' },
  { src: '/media/events/awards-stage.webp', caption: 'Awards night',
    alt: 'A line of award winners holding trophies on a lit stage' },
  { src: '/media/events/on-the-floor.webp', caption: 'Working the floor',
    alt: 'Two of the team reviewing something on a phone at a conference' },
  { src: '/media/events/push-beyond.webp', caption: 'Push Beyond',
    alt: 'Attendees gathered beside a large letter sculpture under a Push Beyond banner' },
  { src: '/media/events/studio-setup.webp', caption: 'Lighting a set',
    alt: 'Studio lighting and a camera tripod set up for an interview' },
  { src: '/media/events/team-offsite.webp', caption: 'The whole group, outdoors',
    alt: 'A large conference group photographed together on a lawn' },
  { src: '/media/events/stand-team.webp', caption: 'On the stand',
    alt: 'The team with clients at an exhibition stand' },
  { src: '/media/events/show-floor.webp', caption: 'Show floor, after dark',
    alt: 'A lit installation on an exhibition show floor' },
]

// ---------------------------------------------------------------------------
// Film. Shown on the content creation service page.
//
// Posters are full quality; the clips are deliberately small and only load when
// somebody asks for motion. Swap in higher bitrate exports and nothing else has
// to change.
// ---------------------------------------------------------------------------
export const FILM = [
  // No duplicates. villa.mp4 is the film plate on /real-estate, so showing it
  // here too made the same Tuscany aerial appear twice on the site. One trivia
  // clip, not three: they are the same series, same format, same set — three
  // of them read as one video pasted in repeatedly rather than a range of work.
  { id: 'lodge', src: '/media/film/lodge.mp4', poster: '/media/film/lodge.webp',
    label: 'Listing walkthrough', note: 'North Carolina, horizontal', ratio: '16 / 9', span: 1 },
  { id: 'reel-villa', src: '/media/film/reel-villa.mp4', poster: '/media/film/reel-villa.webp',
    label: 'Vertical reel', note: 'Tuscany, for Reels and Shorts', ratio: '9 / 16', span: 1 },
  { id: 'yacht-sail', src: '/media/film/yacht-sail.mp4', poster: '/media/film/yacht-sail.webp',
    label: 'On the water', note: 'Charter catamaran under sail, vertical', ratio: '9 / 16', span: 1 },
  { id: 'ise-trivia-halls', src: '/media/film/ise-trivia-halls.mp4', poster: '/media/film/ise-trivia-halls.webp',
    label: 'Event series', note: 'Integrated Systems Europe, trivia cut for Reels', ratio: '9 / 16', span: 1 },
  // Narrated rather than b-roll, and the only one here with burned-in
  // subtitles — which is the point, since the grid plays muted.
  { id: 'ise26-showfloor', src: '/media/film/ise26-showfloor.mp4', poster: '/media/film/ise26-showfloor.webp',
    label: 'Show floor walkthrough', note: 'Integrated Systems Europe 2026, captioned for social', ratio: '9 / 16', span: 1 },
]

// ---------------------------------------------------------------------------
// Numbers
// ---------------------------------------------------------------------------
export const STATS = [
  { value: 35, suffix: '+', label: 'Projects and clients delivered' },
  { value: 1, suffix: 'M+', label: 'Audience reached' },
  { value: 15, label: 'Global projects' },
  { value: 2022, label: 'Founded in Barcelona', plain: true },
]

// Live performance figures, shown in the hero panel. VERIFY before launch:
// these are averages across client accounts and move over time.
export const PERFORMANCE = {
  leads: { value: '500+', label: 'Leads captured', note: 'Last 30 days' },
  engagement: { value: '8%', label: 'Avg. engagement rate', note: 'Above industry average' },
  conversion: { value: '12%', label: 'Avg. sales conversion', note: 'Across managed accounts' },
  // Shape of the BUNQ onboarding curve, used by the hero sparkline.
  curve: [4, 9, 14, 26, 38, 47, 61, 74, 83, 94, 100],
}

// ---------------------------------------------------------------------------
// Process
// ---------------------------------------------------------------------------
export const STEPS = [
  {
    n: '01',
    title: 'A free 15 minute call',
    body: 'We learn the business, what you sell, and where growth is actually stuck. No deck and no obligation.',
    meta: 'Week 0',
  },
  {
    n: '02',
    title: 'A strategy built on your numbers',
    body: 'A step by step plan shaped around your market, your pipeline and your budget. If we are not the right fit we say so here, and the plan is still yours.',
    meta: 'Week 1',
  },
  {
    n: '03',
    title: 'We execute',
    body: 'Sales, business development, social, content and events, run by the specialists who do that work. You always know who is doing what.',
    meta: 'Week 2 onward',
  },
  {
    n: '04',
    title: 'We report and adjust',
    body: 'Monthly analytics on what moved and what did not, with the plan changed against real results rather than left to run.',
    meta: 'Monthly',
  },
]

// ---------------------------------------------------------------------------
// Why clients stay
// ---------------------------------------------------------------------------
export const VALUES = [
  {
    title: 'Specialists, not generalists',
    body: 'Four people, each with their own discipline. The person shooting your video is not the person managing your pipeline, and neither of them is learning on your account.',
  },
  {
    title: 'Strategies built on your data',
    body: 'Plans shaped by your market, your pipeline and your numbers. Everything we run is measured, reported and adjusted.',
  },
  {
    title: 'Judged on what it produced',
    body: 'New clients, real audience growth, a name buyers recognise. We report on outcomes, not on activity.',
  },
]

// ---------------------------------------------------------------------------
// Testimonials, from the live site.
// `short` is a faithful trim used where the quote is set at display size;
// `quote` is the full text, used wherever it is set at reading size.
// ---------------------------------------------------------------------------
export const TESTIMONIALS = [
  {
    quote:
      'I was struggling with the direction of my marketing strategy, so I worked with Aspire to create one that was fully personalised. Elena built a clear step by step strategy that was easy to implement, and we have seen a lot of growth, especially on LinkedIn.',
    short: 'Elena built a clear step by step strategy that was easy to implement. We have seen a lot of growth, especially on LinkedIn.',
    name: 'RCK Consulting',
    role: 'Tech consulting',
    company: 'RCK Consulting',
    initials: 'RC',
  },
  {
    // LinkedIn recommendation, 17 February 2025. Cécile managed Elena directly
    // across two ISE shows. Shown as a contiguous excerpt of three of her own
    // sentences — the full text ran two and a half times the length of the
    // other two, which made the slider resize on every turn. Nothing inside
    // the excerpt is reworded; the full version is in the commit history.
    quote:
      'Elena executed her work perfectly and beyond expectations. She is a very proactive person with creative and engaging ideas, which makes a difference and is really welcome in marketing. She has a strong ability to work under pressure.',
    short: 'Elena executed her work perfectly and beyond expectations, with creative and engaging ideas and a strong ability to work under pressure.',
    name: 'Cécile Laurent',
    role: 'Social Media Manager, Integrated Systems Europe',
    company: 'Integrated Systems Europe',
    initials: 'CL',
  },
  {
    quote:
      'Elena is very professional, very experienced and the best in her field. With her creative ideas and expertise she will help you achieve your results. She created my website and helped with everything that comes with it. I could not be happier.',
    short: 'Very professional, very experienced, and the best in her field.',
    name: 'Coaching BV',
    role: 'Coaching',
    initials: 'CB',
  },
]

// ---------------------------------------------------------------------------
// FAQ, also emitted as FAQPage structured data
// ---------------------------------------------------------------------------
export const FAQ = [
  {
    q: 'What does an engagement cost?',
    a: 'It depends on scope, and we would rather scope it properly than quote blind. Pricing is on request and the free 15 minute call exists to work out what you actually need first.',
  },
  {
    q: 'Do we have to buy all six services?',
    a: 'No, and most clients start with one. They tend to expand once it is producing. RCK Consulting began with a website and now runs four workstreams with us.',
  },
  {
    q: 'Do you only work with tech companies?',
    a: 'Tech is where we are strongest and where most of our work sits, from semiconductors to fintech. We also work with legal, hospitality and sports clients where the growth problem is the same.',
  },
  {
    q: 'Are you only in Barcelona?',
    a: 'Barcelona is the base. The team works across Europe and beyond, and 15 of the projects so far have been international.',
  },
  {
    q: 'How fast can you start?',
    a: 'Strategy in week one and execution in week two, once we have agreed scope. Compare that to two to four months to hire somebody in house.',
  },
  {
    q: 'What happens after the discovery call?',
    a: 'You get a written strategy with a step by step plan and a clear scope. If you want to run it with us, we start. If you do not, the plan is still yours to keep.',
  },
]
