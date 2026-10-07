// The Real Estate and Yachting lead magnet.
//
// Everything the two placements share lives here so the copy, the timings and
// the asset can be changed without touching components.
export const PLAYBOOK = {
  title: 'The Listing Content Playbook',
  authors: 'Elena Novikova and Jackson Hunter',

  // The real cover artwork. 16:9 rather than a book-shaped portrait, because
  // that is what was supplied: a title slide, not a jacket.
  cover: {
    src: '/media/pages/playbook-cover.webp',
    w: 1200,
    h: 675,
    alt: 'The Listing Content Playbook: how property and yachts get enquiries, a free guide by Aspire',
  },
  // The locked state on /real-estate. Clicking it opens the form.
  unlockLabel: 'Unlock for free',
  unlockNote: 'One email. No charge, no call.',

  // Where the guide actually lives. No PDF has been supplied, so this is the
  // Canva link Elena gave; swapping in a hosted file later is this one line
  // plus dropping the file into /public.
  assetUrl: 'https://canva.link/5i3z3f10hzqsw2w',
  assetIsExternal: true,

  // Pop-up triggers. Whichever fires first wins.
  delayMs: 25000,
  scrollPct: 0.5,
  // Only on a real pointer: there is no exit intent on a touch screen.
  exitIntent: true,

  // Suppression. Dismissed is temporary, submitted is permanent.
  dismissDays: 14,
  keyDismissed: 'aspire.playbook.dismissedUntil',
  keySubmitted: 'aspire.playbook.submitted',

  popup: {
    headline: 'Your listing has 8 seconds. Is it using them?',
    subline:
      'Get the free playbook we use to shoot property and yachts that get enquiries: the shot list, the 8-second audit, and a 30-day content plan from one shoot.',
  },
  band: {
    headline: 'Not ready for a call? Take the playbook.',
    subline:
      'The exact shot list and content plan we use on every property and yacht. Free, and yours to keep.',
  },

  submitLabel: 'Send me the playbook',
  smallPrint: 'No spam. One email with your guide.',
  successTitle: "It's on its way. Check your inbox.",
  downloadLabel: 'Download now',
  secondaryCta: 'Want us to look at your listing? Book a free call',

  markets: [
    ['property', 'Property'],
    ['yachting', 'Yachting and charter'],
    ['both', 'Both'],
  ],
}
