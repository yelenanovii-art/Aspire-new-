import { PARTNER_QUOTE as Q } from '../data/partnerQuote'

// A quote from the partnership contact, sitting with the BUNQ figure it
// belongs to. Hidden entirely while disabled, and visibly marked while the
// text is still a placeholder so it cannot be mistaken for a real testimonial
// if it ships before the words arrive.
export default function PartnerQuote() {
  if (!Q.enabled) return null
  return (
    <figure className={`pq reveal ${Q.placeholder ? 'pq--placeholder' : ''}`}>
      {Q.placeholder && <span className="pq__flag">Placeholder</span>}
      <blockquote>{Q.quote}</blockquote>
      <figcaption>
        <strong>{Q.name}</strong>
        <span>{Q.role}{Q.company ? `, ${Q.company}` : ''}</span>
      </figcaption>
    </figure>
  )
}
