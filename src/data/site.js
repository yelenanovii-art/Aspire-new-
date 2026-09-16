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
      aspire: 'Sales, business development, social and content, run as one plan',
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
    slug: 'sales',
    n: '01',
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
        a: 'Yes. Onsite representation is core to this service. We spent a full year onsite with Integrated Systems Europe and represent RCK Consulting at their industry events.',
      },
      {
        q: 'How quickly does outreach produce meetings?',
        a: 'First sequences usually go live inside two weeks. We use the first month to test targeting and messaging, then scale what replies.',
      },
    ],
  },
  {
    slug: 'business-development',
    n: '02',
    nav: 'Business development',
    title: 'Business development',
    blurb:
      'Branding, website, positioning and audience. The work that links marketing to sales instead of running beside it.',
    h1: 'The growth work that makes the sales work land.',
    lede:
      'Outreach converts far better when the buyer recognises the name, understands the offer in ten seconds, and finds a website that backs it up. This is where we build all three and connect them to the pipeline rather than running them as separate projects.',
    metaTitle: 'Business Development for Tech Companies',
    metaDesc:
      'Positioning, branding, website and audience growth wired directly into your sales pipeline. Long term B2B growth from Aspire in Barcelona.',
    keywords: 'business development, B2B positioning, branding, website, SEO, audience growth',
    tags: ['Positioning', 'Branding', 'Website', 'Partnerships'],
    includes: [
      {
        h: 'Positioning and messaging',
        p: 'One clear sentence for what you do and who it is for, then applied consistently across the site, the deck, the outreach and the feed.',
      },
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
    n: '03',
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
    n: '04',
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
        a: 'Barcelona as standard, and we travel for events and on location work. A full year of live capture for ISE was exactly that.',
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
    metric: '1,000',
    metricSuffix: '+',
    metricLabel: 'new users in the first 2.5 months',
    body:
      'Aspire acts as partnership coordinator for BUNQ in Spain, driving strategic collaborations and user acquisition. We secured the key meetings, identified the partners worth having, and onboarded over a thousand new users inside the first two and a half months. The focus is B2B partnerships that accelerate growth rather than one off campaigns.',
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
    services: ['social-media', 'business-development', 'sales'],
  },
  {
    slug: 'ise',
    client: 'Integrated Systems Europe',
    sector: 'Live events',
    title: 'Live onsite marketing and real time content for the largest AV show in the world.',
    result: 'Instagram challenges and trivia that pulled the floor in',
    metric: '1',
    metricSuffix: ' year',
    metricLabel: 'as onsite marketing partner',
    body:
      'A strategic marketing plan agreed upfront, then executed live across the event. We captured high quality content in real time, ran the social accounts through the show, and introduced engagement tactics including Instagram challenges and trivia games to lift interaction and widen reach well beyond the people physically present.',
    services: ['content-creation', 'social-media', 'sales'],
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
]

export const caseBySlug = (slug) => CASES.find((c) => c.slug === slug)

export const CLIENTS = [
  { name: 'Integrated Systems Europe', logo: '/brand/clients/ise.webp' },
  { name: 'SilTest Semiconductors', logo: '/brand/clients/siltest.webp' },
  { name: 'BUNQ', logo: '/brand/clients/bunq.webp' },
  { name: 'De Interim Notaris', logo: '/brand/clients/de-interim-notaris.webp' },
  { name: 'The Craft Cigar Club', logo: '/brand/clients/craft-cigar-club.webp' },
  { name: 'RCK Consulting', logo: '/brand/clients/rck.webp' },
  // No mark in the media library for these two, so they run as set wordmarks.
  { name: 'Shoreline 7' },
  { name: 'Coaching BV' },
]

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
    role: 'Ads specialist',
    discipline: 'Paid and performance',
    bio: 'Digital marketing degree in London, then a specialism in paid acquisition. Runs anything with a budget attached to it.',
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
export const ONSITE = [
  { src: '/media/events/filming-stand.webp', caption: 'Filming a demo on the stand',
    alt: 'Two people filming a product demonstration on a phone at an exhibition stand' },
  { src: '/media/events/on-the-floor.webp', caption: 'Working the floor',
    alt: 'Two of the team reviewing something on a phone at a conference' },
  { src: '/media/events/on-the-mic.webp', caption: 'Presenting',
    alt: 'Speaking into a microphone at an event' },
  { src: '/media/events/capturing-talk.webp', caption: 'Capturing a talk',
    alt: 'A camera on a tripod filming a speaker on stage' },
  { src: '/media/events/studio-setup.webp', caption: 'Lighting a set',
    alt: 'Studio lighting and a camera tripod set up for an interview' },
  { src: '/media/events/stand-team.webp', caption: 'On the stand',
    alt: 'The team with clients at an exhibition stand' },
  { src: '/media/events/on-stage.webp', caption: 'On stage',
    alt: 'Two people shaking hands on a stage at an event' },
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
  { id: 'reel-villa', src: '/media/film/reel-villa.mp4', poster: '/media/film/reel-villa.webp',
    label: 'Vertical reel', note: 'Tuscany, for Reels and Shorts', ratio: '9 / 16', span: 1 },
  { id: 'villa', src: '/media/film/villa.mp4', poster: '/media/film/villa.webp',
    label: 'Property film', note: 'Tuscany, horizontal cut', ratio: '16 / 9', span: 1 },
  { id: 'lodge', src: '/media/film/lodge.mp4', poster: '/media/film/lodge.webp',
    label: 'Listing walkthrough', note: 'North Carolina', ratio: '16 / 9', span: 1 },
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
    body: 'Sales, business development, social and content, run by the four specialists who do that work. You always know who is doing what.',
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
    body: 'Four people, four disciplines. The person shooting your video is not the person managing your pipeline, and neither of them is learning on your account.',
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
      'I was struggling with the direction of my marketing strategy, so I worked with Aspire to create one that was fully personalised. I was extremely happy with the results. Elena built a clear step by step strategy that was easy to implement, and we have seen a lot of growth in our social accounts, especially LinkedIn.',
    short: 'Elena built a clear step by step strategy that was easy to implement. We have seen a lot of growth, especially on LinkedIn.',
    name: 'RCK Consulting',
    role: 'Tech consulting',
    initials: 'RC',
  },
  {
    quote:
      'I was very impressed by the results. There was very clear and constant communication, and she gave a lot of personal, in depth attention. I highly recommend Aspire for Elena’s creativity and passion for outstanding service.',
    short: 'Very clear and constant communication, and a lot of personal, in depth attention.',
    name: 'Shoreline 7',
    role: 'Sports',
    initials: 'S7',
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
    q: 'Do we have to buy all four services?',
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
