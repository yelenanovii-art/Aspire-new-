// Copy for the property pop-up on the content creation page.
//
// Two of the films on that page are property work, and somebody who has just
// watched a villa walkthrough has already asked the question this answers. It
// is the only pop-up on the site keyed to a place on the page rather than to a
// clock: it waits until the films are behind them, so it interrupts after the
// thing that prompted it rather than before.
//
// No form. The real estate page carries one, and that form routes to two
// people — duplicating it here would mean two places to keep in step.
export const ESTATE_PROMO = {
  // Set `enabled: false` to switch it off entirely.
  enabled: true,
  // Which page it runs on, by service slug.
  slug: 'content-creation',
  dismissDays: 30,

  eyebrow: 'Property and yachting',
  headline: 'Two of those films were listings.',
  body:
    'Property and charter are a separate practice, with their own crew, their own licences and their own turnaround. Listing shoots, cinematic walkthroughs, drone exteriors and the vertical cuts that go out the same week, for agencies, developers, brokers and private sellers.',
  statValue: '48h',
  statLabel: 'from shoot to the first cut on the listing',
  cta: { to: '/real-estate/', label: 'See the property work' },
  photo: {
    src: '/media/estate/villa-pool.webp',
    w: 900,
    h: 1125,
    alt: '',
  },
  note: 'Separate team, separate rate card. No call needed to look.',
}
