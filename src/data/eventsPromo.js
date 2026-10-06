// Copy for the events pop-up, kept here so the words and the number can be
// changed without touching the component.
export const EVENTS_PROMO = {
  // Set `enabled: false` to switch the pop-up off entirely.
  enabled: true,
  delayMs: 6000,
  eyebrow: 'Events and conferences',
  headline: 'Heading to a conference soon? We plug into your team and get you the meetings.',
  // The proof figure. Edit these two lines and nothing else moves.
  statValue: '80',
  statLabel: 'meetings booked per conference week',
  body:
    'Weeks of planning. Chasing replies. Running between halls, hoping the right people have time for you. We work alongside your team from first outreach to final follow-up, so you arrive with a full calendar and focus on the conversations that matter.',
  ctaLabel: "Let's plan your conference",
  ctaNote: 'Free 20-minute call. No prep needed.',
  // Its own frame: the service banner and the home band use different ones.
  photo: {
    src: '/media/pages/promo-crowd.webp',
    w: 1000,
    h: 1250,
    alt: 'A packed exhibition floor at Integrated Systems Europe',
  },
}
