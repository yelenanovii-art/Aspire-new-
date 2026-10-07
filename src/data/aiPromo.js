// Copy for the AI systems pop-up, kept here so the words, the pages it runs
// on and the CTA can be changed without touching the component.
export const AI_PROMO = {
  // Set `enabled: false` to switch it off entirely.
  enabled: true,
  delayMs: 9000,

  // WHICH PAGES IT RUNS ON. One line to edit.
  //
  // Deliberately not '/': the home page already carries the events pop-up and
  // two in a session is one too many. Deliberately not '/ai-systems' either,
  // since a pop-up selling the page you are already reading is noise. These
  // are the pages where somebody is thinking about pipeline, reporting and
  // tooling, which is the moment the question below lands.
  pages: ['/tech', '/services/sales', '/services/social-media', '/services/go-to-market'],

  eyebrow: 'AI systems',
  // The question. It is the hook, so it is the headline.
  headline: 'Have you tried putting your CRM, inbox and ad accounts on one screen?',
  body:
    'Most teams already have the data. It sits in four tools nobody joins up, so the monthly report gets rebuilt by hand and the answer arrives a week after it was useful. We build the dashboard, the lead scoring and the automation that close that gap, in your accounts, with your data staying yours.',
  statValue: '6',
  statLabel: 'weeks from first session to a system your team runs',
  ctaLabel: 'Book a free systems call',
  // Where the pop-up hands off if they would rather read first.
  secondary: { to: '/ai-systems', label: 'See what we build' },
  ctaNote: 'Fifteen minutes. Bring the report you rebuild every month.',
}
