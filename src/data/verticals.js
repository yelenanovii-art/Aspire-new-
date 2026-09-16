// ============================================================================
// Vertical pages: Real Estate & Yachting, and AI Systems.
//
// These sit alongside the four core services rather than inside them. One is a
// market Aspire shoots for (property and marine), the other is a capability
// (custom software). Both get a top level nav slot.
// ============================================================================

// ---------------------------------------------------------------------------
// Real estate and yachting
// ---------------------------------------------------------------------------
export const ESTATE = {
  slug: 'real-estate',
  nav: 'Real Estate',
  navDesc: 'Property and yachting content',
  metaTitle: 'Real Estate and Yachting Content',
  metaDesc:
    'Cinematic property films, listing photography, drone and yacht work, plus the social management that puts them in front of buyers. Barcelona.',
  keywords:
    'real estate photography, property video, yacht marketing, listing content, drone, Barcelona, Mediterranean',

  h1: 'Property and yachts sell on the way they are shown.',
  lede:
    'A listing is a first impression rendered in pixels. We shoot the photography and film, cut it for every channel, and run the accounts that put it in front of the people actually buying. Across residential, commercial and marine, from Barcelona along the Mediterranean coast.',

  // The two markets, stated separately because the buyers differ.
  markets: [
    {
      k: 'Property',
      h: 'Residential and commercial real estate',
      p: 'Listing shoots, cinematic walkthroughs, drone exteriors and neighbourhood films for agencies, developers and private sellers. Plus the agent branding that wins the instruction in the first place.',
      points: ['Listing photography', 'Cinematic walkthroughs', 'Drone and exterior', 'Agent personal branding'],
    },
    {
      k: 'Marine',
      h: 'Yachting and charter',
      p: 'Onboard and on water filming for brokerages, charter operators and shipyards. Interiors that read as space rather than clutter, and sea footage that sells the feeling of being aboard.',
      points: ['Onboard interiors', 'On water filming', 'Charter campaign assets', 'Boat show content'],
    },
  ],

  // What an engagement actually contains.
  includes: [
    {
      h: 'Photography',
      p: 'Interiors, exteriors, detail and lifestyle, shot and graded to one consistent look across an entire portfolio rather than listing by listing.',
    },
    {
      h: 'Film and drone',
      p: 'Cinematic walkthroughs and aerial work, cut long for the listing page and short for Reels, Shorts and paid placements from the same shoot day.',
    },
    {
      h: 'Channel management',
      p: 'We run the accounts the content lands on. Calendar, publishing, community and the enquiries that arrive through the inbox.',
    },
    {
      h: 'Listing launch campaigns',
      p: 'A coordinated push when a property or vessel comes to market: content, paid, outreach to the buyer list, and a report on what the launch produced.',
    },
  ],

  // Media placeholders. Drop files into public/media/estate/ and set `src`.
  // Real work from three shoots: a Tuscan villa (Italy, drone and terrace), a
  // mountain lodge (North Carolina, interiors) and a yacht charter (BVI).
  // Seven items with the first spanning two columns fills the four column grid
  // in exactly two rows. A slot without `src` renders the placeholder instead,
  // so the grid never breaks while new work is being shot.
  gallery: [
    { id: 'lodge-living', src: '/media/estate/lodge-living.webp', label: 'Living room', ratio: '5 / 3', span: 2,
      alt: 'Vaulted timber living room with a lit stone fireplace and mountain views' },
    { id: 'villa-pool', src: '/media/estate/villa-pool.webp', label: 'Villa and pool', ratio: '4 / 5',
      alt: 'Aerial view of a Tuscan villa with a pool and cypress lined drive' },
    { id: 'lodge-exterior', src: '/media/estate/lodge-exterior.webp', label: 'Exterior', ratio: '4 / 5',
      alt: 'Timber mountain lodge exterior surrounded by trees' },
    { id: 'yacht-aerial', src: '/media/estate/yacht-aerial.webp', label: 'Aerial, at anchor', ratio: '3 / 2',
      alt: 'Aerial view of a motor yacht at anchor in clear turquoise water' },
    { id: 'lodge-kitchen', src: '/media/estate/lodge-kitchen.webp', label: 'Kitchen', ratio: '3 / 2',
      alt: 'Open kitchen with a stone island under a vaulted timber ceiling' },
    { id: 'villa-terrace', src: '/media/estate/villa-terrace.webp', label: 'Terrace', ratio: '3 / 2',
      alt: 'Stone villa terrace set for dining beneath a cypress tree' },
    { id: 'detail-deck', src: '/media/estate/detail-deck.webp', label: 'On board', ratio: '3 / 2',
      alt: 'Champagne poured on the deck of a yacht' },
  ],
  // Alternates already processed and sitting in public/media/estate/, ready to
  // swap into the gallery: lodge-deck, villa-overhead, villa-coast,
  // yacht-moored, on-deck.
  film: {
    id: 'villa-aerial',
    src: '/media/estate/villa-aerial.webp',
    label: 'Tuscany, aerial',
    alt: 'Aerial panorama of a villa estate in the Tuscan hills at dusk',
    ratio: '16 / 9',
  },

  faq: [
    {
      q: 'Do you travel for shoots?',
      a: 'Yes. Barcelona is the base, and we work along the Spanish coast and across the Mediterranean for marine work. Travel is quoted with the shoot.',
    },
    {
      q: 'Do we own the footage?',
      a: 'Yes. Everything we shoot for you is yours, raw files included, with no per listing licence to renew.',
    },
    {
      q: 'Can you shoot a whole portfolio to one look?',
      a: 'That is the point of working with one team. We set the grade and the framing rules once, then every property and vessel matches, which is what makes a brokerage feed look expensive.',
    },
    {
      q: 'Do you handle drone permissions?',
      a: 'We fly within the rules for the location and arrange permissions where they are needed. If a site cannot be flown we will say so before the shoot rather than after.',
    },
  ],
}

// ---------------------------------------------------------------------------
// AI systems
// ---------------------------------------------------------------------------
export const AI = {
  slug: 'ai-systems',
  nav: 'AI Systems',
  navDesc: 'Custom dashboards and integrations',
  metaTitle: 'Custom AI Dashboards and Integrations',
  metaDesc:
    'Custom AI dashboards, internal systems and integrations: lead scoring, CRM enrichment, reporting automation and assistants trained on your data.',
  keywords:
    'custom AI dashboard, AI integration, lead scoring, CRM automation, internal tools, RAG assistant, workflow automation',

  h1: 'The dashboard your team keeps rebuilding in a spreadsheet.',
  lede:
    'Most companies already have the data. It is spread across a CRM, an inbox, an ad account and three spreadsheets nobody trusts. We build the systems that pull it together, score it, and put it somewhere a person can act on it.',

  // What we build. The concrete list matters more than the word "AI".
  builds: [
    {
      k: '01',
      h: 'Custom dashboards',
      p: 'One screen that answers the question you actually open five tabs to answer. Pipeline, campaign performance, content output and revenue in the same view, refreshed automatically.',
      tags: ['Live data', 'Role based views', 'Scheduled reports'],
    },
    {
      k: '02',
      h: 'Lead scoring and enrichment',
      p: 'Inbound leads scored against the profiles that actually close, enriched with firmographic data, and routed to the right person before they go cold.',
      tags: ['Scoring models', 'Enrichment', 'Routing'],
    },
    {
      k: '03',
      h: 'Assistants trained on your data',
      p: 'A retrieval assistant that answers from your documentation, past proposals and product notes, so the answer is yours rather than a generic one.',
      tags: ['Retrieval', 'Citations', 'Access control'],
    },
    {
      k: '04',
      h: 'Workflow automation',
      p: 'The repetitive chain between tools: enrich, summarise, draft, file, notify. Built so a person approves the output rather than being replaced by it.',
      tags: ['Integrations', 'Approvals', 'Audit trail'],
    },
  ],

  // How an engagement runs, kept deliberately short.
  process: [
    { n: '01', h: 'Map the workflow', p: 'Two sessions to find where time actually goes and which decision is being made without data.', meta: 'Week 1' },
    { n: '02', h: 'Prototype', p: 'A working prototype on your real data, not a mockup. You use it before we build the rest.', meta: 'Weeks 2 to 3' },
    { n: '03', h: 'Build and integrate', p: 'Wired into the tools you already run, with your access rules and your data staying in your accounts.', meta: 'Weeks 4 to 6' },
    { n: '04', h: 'Hand over', p: 'Documentation, training and the source. You can run it, change it, or take it elsewhere.', meta: 'Ongoing' },
  ],

  // Principles. This is the trust section for anything touching company data.
  principles: [
    { h: 'Your data stays yours', p: 'Systems run in your accounts and your cloud. We do not train anything on your data or move it somewhere you cannot reach.' },
    { h: 'A person stays in the loop', p: 'We automate the work around a decision, not the decision. Anything customer facing is drafted for approval, never sent blind.' },
    { h: 'You get the source', p: 'No black box and no licence trap. The code, the prompts and the documentation are handed over at the end.' },
  ],

  // Illustrative dashboard readout for the page hero.
  demo: {
    title: 'Pipeline health',
    updated: 'Synced 2 min ago',
    metrics: [
      { k: 'Qualified leads', v: '128', delta: '+18%' },
      { k: 'Avg. response time', v: '3.4h', delta: '-42%' },
      { k: 'Score accuracy', v: '91%', delta: '+6pt' },
    ],
    series: [22, 28, 26, 35, 41, 39, 52, 58, 64, 71, 82, 96],
    rows: [
      { a: 'Enrich new inbound', b: 'Automated', ok: true },
      { a: 'Score against ICP', b: 'Automated', ok: true },
      { a: 'Route to owner', b: 'Automated', ok: true },
      { a: 'Draft first reply', b: 'Needs approval', ok: false },
    ],
  },

  faq: [
    {
      q: 'Do we need to be technical to work with you?',
      a: 'No. We map the workflow with the people who do the job, then handle the build. You need somebody who can tell us how the work actually happens, not somebody who can read code.',
    },
    {
      q: 'Where does our data live?',
      a: 'In your accounts. We build inside your cloud and your tools, with your access rules. Nothing is copied to us and nothing is used to train a model.',
    },
    {
      q: 'What if we want to take it in house later?',
      a: 'Then you take it. The source, the prompts and the documentation are yours at handover, which is written into the engagement rather than negotiated afterwards.',
    },
    {
      q: 'How much does a system cost?',
      a: 'It depends on how many tools it has to touch. The prototype stage is deliberately small so you can see it working before committing to the full build. Pricing on request.',
    },
    {
      q: 'Is this just a wrapper around a chatbot?',
      a: 'No. Most of what we build is data plumbing and interface: getting the right numbers into one place and making them actionable. A model is used where it earns its place, not as the product.',
    },
  ],
}
