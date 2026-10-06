// Copy for the events pop-up, kept here so the number and the words can be
// changed without touching the component.
export const EVENTS_PROMO = {
  // Set `enabled: false` to switch the pop-up off entirely.
  enabled: true,
  delayMs: 7000,
  // How long a dismissal is respected, in days.
  dismissDays: 7,
  eyebrow: 'Events and conferences',
  headline: 'Turn your next conference into a booked calendar.',
  // The proof figure. Edit these two lines and nothing else moves.
  statValue: '80',
  statLabel: 'meetings booked per conference week',
  body:
    'We work the run-up, the floor and the follow-up with your team, so the week produces a pipeline instead of a badge scan pile.',
  ctaLabel: 'Book your event strategy call',
  photo: {
    src: '/media/pages/svc-events.webp',
    w: 1440,
    h: 540,
    alt: 'Crowded aisle between exhibition stands at a technology conference',
  },
}
