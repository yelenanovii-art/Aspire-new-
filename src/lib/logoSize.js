// Every client mark is exported 128px tall, so its displayed width follows
// from the intrinsic ratio. Reserving it stops a card or a hero reflowing as
// each file lands, which is most of the layout shift left on these pages.
const W = {
  bunq: 53, 'integrated systems europe': 63, 'siltest semiconductors': 34,
  rck: 53, 'rck consulting': 53, rattech: 82, 'de interim notaris': 22,
  'the craft cigar club': 22, idm: 51, 'interactive digital media': 51,
  'abc kloak': 20, anymessage: 36,
}

// Scaled to whatever height the element actually renders at.
export const logoWidth = (name, height = 128) =>
  Math.round(((W[(name || '').toLowerCase()] || 60) / 128) * height)
