// Copy for the events pop-up, kept here so the words and the number can be
// changed without touching the component.
export const EVENTS_PROMO = {
  // Set `enabled: false` to switch the pop-up off entirely.
  enabled: true,
  // Six seconds, then whichever of the other two comes first. The timer went
  // away once because a pop-up on a clock interrupts somebody mid-sentence;
  // six is long enough to read the headline and decide to stay. Set to 0 to
  // drop it again and leave only the scroll and exit triggers.
  delayMs: 6000,
  scrollPct: 0.5,
  // Only on a real pointer: a touch screen has no cursor to leave with, and
  // the event fires spuriously there.
  exitIntent: true,
  // Days to stay away after somebody closes it. This reverses the earlier
  // "show on every load" rule: coming back after it was dismissed is the
  // single most irritating thing a pop-up can do. Set to 0 to go back.
  dismissDays: 14,
  eyebrow: 'Events and conferences',
  headline: 'Heading to a conference soon? We plug into your team and get you the meetings.',
  // The proof figure. Edit these two lines and nothing else moves.
  statValue: '80',
  statLabel: 'meetings booked per conference week',
  body:
    'Weeks of planning. Chasing replies. Running between halls, hoping the right people have time for you. We work alongside your team from first outreach to final follow-up, so you arrive with a full calendar and focus on the conversations that matter.',
  ctaLabel: "Let's plan your conference",
  // The second exit. Somebody who will not book a call today will still take
  // the guide, and it lands them on the gated block rather than a page they
  // then have to search.
  secondary: {
    to: '/services/events/#playbook',
    label: 'Not ready to talk? Take the playbook',
  },
  ctaNote: 'Free 15 minute call. No prep needed.',
  // Its own frame: the service banner and the home band use different ones.
  photo: {
    src: '/media/pages/promo-crowd.webp',
    w: 1000,
    h: 1250,
    alt: 'A packed exhibition floor at Integrated Systems Europe',
  },
}
