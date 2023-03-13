import {Link} from 'react-router-dom'
import './index.css'

const TeamCard = props => {
  const {teamDetails} = props
  const {id, name, teamImageUrl} = teamDetails
  return (
    <li key={id} className="list-container">
      <Link to={`/team-matches/${id}`} className="link-container">
        <img src={teamImageUrl} alt={name} className="team-image" />
        <p className="title">{name}</p>
      </Link>
    </li>
  )
}
export default TeamCard
