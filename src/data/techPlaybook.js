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

  cover: {
    src: '/media/pages/tech-playbook-cover.webp',
    w: 1200,
    h: 675,
    alt: 'The Trade Show Playbook: how three days turn into a quarter of pipeline, a free guide by Aspire',
  },

  unlockLabel: 'Unlock for free',
  unlockNote: 'One email. No charge, no call.',

  band: {
    headline: 'Not ready for a call? Take the playbook.',
    subline:
      'The sequence we run at Integrated Systems Europe and for clients exhibiting worldwide: the six week countdown, the qualification grades, and the follow-up template. Eleven pages, two of them printable.',
  },

  submitLabel: 'Send me the playbook',
  smallPrint: 'No spam. One email with your guide.',
  successTitle: "It's on its way. Check your inbox.",
  downloadLabel: 'Download it now',

  keySubmitted: 'aspire.techPlaybook.submitted',
}
