import { TEAM } from '../data/site'

// Four named people, each with their discipline.
//
// The portrait leads the card at full bleed rather than sitting inside it as a
// thumbnail: this section's whole argument is that you will know all four, so
// the faces have to be the first thing you see, not an icon beside a job title.
export default function Team({ compact = false, photos = true }) {
  return (
    <ul className={`team ${compact ? 'team--compact' : ''} ${photos ? '' : 'team--roster'}`}>
      {TEAM.map((m, i) => (
        <li className="team__card reveal" data-spot style={{ '--delay': `${i * 70}ms` }} key={m.name}>
          {photos && (
            <div className="team__media">
              {m.photo ? (
                <img src={m.photo} alt={m.name} width="800" height="1000" loading="lazy" />
              ) : (
                <span className="team__avatar" aria-hidden="true">{m.initials}</span>
              )}
            </div>
          )}
          <div className="team__body">
            <span className="team__role">{m.role}</span>
            <h3 className="team__name">{m.name}</h3>
            <span className="team__discipline">{m.discipline}</span>
            {!compact && <p className="team__bio">{m.bio}</p>}
          </div>
        </li>
      ))}
    </ul>
  )
}
