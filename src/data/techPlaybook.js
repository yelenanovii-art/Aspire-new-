// The B2B tech lead magnet: the trade show guide, gated behind an email.
//
// Deliberately a sibling of src/data/playbook.js rather than a shared shape.
// The two magnets answer different pages, different audiences and different
// forms, and the one thing they must not share is the Netlify form: the
// property and charter notification routes to Jackson, and a tech enquiry
// landing there would put him on leads that are not his.
export const TECH_PLAYBOOK = {
  enabled: true,

  title: 'The Trade Show Playbook',
  subtitle: 'How three days turn into a quarter of pipeline',
  authors: 'Aspire Agency',

  // Served from this domain rather than a third party link, so it keeps
  // working if anything is ever reorganised elsewhere.
  assetUrl: '/guides/aspire-trade-show-playbook.pdf',
  assetIsExternal: false,

  // The cover, then four interior pages. Hovering the locked cover riffles
  // through them, which is the only honest way to answer "what is actually in
  // it" without ungating the thing. Chosen to show the working pages rather
  // than the prose: the outreach sequence, the sign-off list, the
  // qualification grades and the printable countdown.
  pages: [
    { src: '/media/pages/tech-playbook-0.webp',
      alt: 'The Trade Show Playbook: how three days turn into a quarter of pipeline, a free guide by Aspire' },
    { src: '/media/pages/tech-playbook-1.webp', alt: 'A page of the guide: the four touch outreach sequence' },
    { src: '/media/pages/tech-playbook-2.webp', alt: 'A page of the guide: the nine things to sign off the week before' },
    { src: '/media/pages/tech-playbook-3.webp', alt: 'A page of the guide: the qualification questions and grades' },
    { src: '/media/pages/tech-playbook-4.webp', alt: 'A page of the guide: the printable six week countdown' },
  ],
  cover: {
    src: '/media/pages/tech-playbook-0.webp',
    w: 900,
    h: 1273,
    alt: 'The Trade Show Playbook: how three days turn into a quarter of pipeline, a free guide by Aspire',
  },

  unlockLabel: 'Unlock for free',
  unlockNote: 'One email. No charge, no call.',

  band: {
    headline: 'Not ready for a call? Take the playbook.',
    subline:
      'The sequence we run at Integrated Systems Europe and for clients exhibiting worldwide: the six week countdown, the qualification grades, and the follow-up template. Twelve pages, two of them printable.',
  },

  submitLabel: 'Send me the playbook',
  smallPrint: 'No spam. One email with your guide.',
  successTitle: "It's on its way. Check your inbox.",
  downloadLabel: 'Download it now',

  keySubmitted: 'aspire.techPlaybook.submitted',
}
