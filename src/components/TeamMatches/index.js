import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'
import './index.css'

const teamMatchesApiUrl = 'https://apis.ccbp.in/ipl'

class TeamMatches extends Component {
  state = {
    teamMatchData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamMatches()
  }

  getFormattedData = eachData => ({
    umpires: eachData.umpires,
    result: eachData.result,
    manOfTheMatch: eachData.man_of_the_match,
    id: eachData.id,
    date: eachData.date,
    venue: eachData.venue,
    competingTeam: eachData.competing_team,
    competingTeamLogo: eachData.competing_team_logo,
    firstInnings: eachData.first_innings,
    secondInnings: eachData.second_innings,
    matchStatus: eachData.match_status,
  })

  getTeamMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`${teamMatchesApiUrl}/${id}`)

    const fetchedData = await response.json()
    console.log(fetchedData)

    const updatedData = {
      teamBannerUrl: fetchedData.team_banner_url,
      latestMatch: this.getFormattedData(fetchedData.latest_match_details),
      recentMatches: fetchedData.recent_matches.map(eachMatch =>
        this.getFormattedData(eachMatch),
      ),
    }
    console.log(updatedData)
    this.setState({teamMatchData: updatedData, isLoading: false})
  }

  renderRecentMatchesList = () => {
    const {teamMatchData} = this.state
    const {recentMatches} = teamMatchData
    return (
      <ul className="team-match-card-container">
        {recentMatches.map(eachMatch => (
          <MatchCard matchDetails={eachMatch} key={eachMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamMatchData} = this.state
    const {teamBannerUrl, latestMatch} = teamMatchData

    return (
      <div className="responsive-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchData={latestMatch} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="Oval" color="#ffffff" height={50} />
    </div>
  )

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`
    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderTeamMatches()}
      </div>
    )
  }
}

export default TeamMatches
