import { TEAM } from '../data/site'

// The named team, each with their discipline.
//
// The portrait leads the card at full bleed rather than sitting inside it as a
// thumbnail: this section's whole argument is that you will know all of them, so
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
                /* Initials where there is no portrait. It used to also say
                   "Photo to follow", which told a visitor about our file
                   management rather than about the person. Set `photo` in the
                   data and the initials give way to it. */
                <span className="team__avatar" aria-hidden="true">{m.initials}</span>
              )}
            </div>
          )}
          <div className="team__body">
            {/* A card with no role would lose its top line and sit shorter than
                its neighbours, so a pending profile says so rather than
                rendering a gap. */}
            <span className="team__role">{m.role || (m.pending ? 'Profile to follow' : '')}</span>
            <h3 className="team__name">{m.name}</h3>
            {m.discipline && <span className="team__discipline">{m.discipline}</span>}
            {!compact && m.bio && <p className="team__bio">{m.bio}</p>}
          </div>
        </li>
      ))}
    </ul>
  )
}
