// A client mark's displayed width, from its real aspect ratio.
//
// The marks are no longer exported at one shared height, so the width has to
// come from each file's own ratio rather than a single divisor. Reserving it
// stops a card or a hero reflowing as each file lands, which was most of the
// layout shift left on these pages.
//
// Ratios are width over height, read off the files. If a mark is re-exported
// at a different crop, update its number here.
const RATIO = {
  'abc kloak': 0.925,
  anymessage: 1.638,
  bunq: 2.414,
  'the craft cigar club': 1,
  'de interim notaris': 1,
  idm: 2.297,
  'interactive digital media': 2.297,
  'integrated systems europe': 2.852,
  rattech: 3.725,
  rck: 2.425,
  'rck consulting': 2.425,
  'siltest semiconductors': 1.523,
}

// Falls back to a middling landscape ratio, which is closer than guessing a
// square for a wordmark and never produces a wildly wrong reservation.
export const logoWidth = (name, height = 32) =>
  Math.round((RATIO[(name || '').toLowerCase()] || 2.4) * height)
