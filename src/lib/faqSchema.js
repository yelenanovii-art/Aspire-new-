// FAQPage markup from a page's own FAQ items.
//
// The accordions were on the page long before this was: the answers rendered,
// but nothing told a crawler they were questions. FAQPage is what earns the
// People Also Ask slot and, increasingly, the citation when an assistant
// answers one of these questions on someone's behalf — which for a four person
// agency is the cheapest visibility there is.
//
// Google only honours the markup when the same text is visible on the page, so
// this must always be built from the rendered items rather than written twice.
// `max` mirrors the display cap in Faq.jsx. Google only honours this markup
// when the same text is visible, so a page showing four must not claim six.
export function faqSchema(items, max = 4) {
  if (!items || !items.length) return null
  items = items.slice(0, max)
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
