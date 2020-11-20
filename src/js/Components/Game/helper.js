const statTransformer = (stat) => {
  const copy = { ...stat }
  const player = copy.player
  delete copy.game
  delete copy.team

  return {
    ...player,
    ...copy
  }
}

const filterFn = (id) => (stat) => id === stat.team.id

const transformGameStats = (rawStatsData) => {
  const { data } = rawStatsData
  const teamsObj = {}
  const teamsData = []

  data.forEach((stat) => {
    const teamId = stat.team.id
    if (!teamsObj[teamId]) {
      teamsObj[teamId] = true
      teamsData.push(stat.team)
    }
  })

  const homeTeam = teamsData.find(
    (team) => team.id === data[0].game.home_team_id
  )
  homeTeam.avatar = `./static/${homeTeam.abbreviation}.png`
  const visitorTeam = teamsData.find(
    (team) => team.id === data[0].game.visitor_team_id
  )
  visitorTeam.avatar = `./static/${visitorTeam.abbreviation}.png`

  const homeTeamStats = data.filter(filterFn(homeTeam.id)).map(statTransformer)
  const visitorTeamStats = data
    .filter(filterFn(visitorTeam.id))
    .map(statTransformer)

  return {
    homeTeamStats,
    visitorTeamStats,
    visitorTeam,
    homeTeam
  }
}

export default transformGameStats
