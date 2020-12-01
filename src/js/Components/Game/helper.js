const statTransformer = (stat) => {
  const copy = { ...stat }
  const player = { ...copy.player }
  delete copy.game
  delete copy.team
  delete copy.player
  const name = player.first_name + ' ' + player.last_name

  return {
    name,
    ...player,
    ...copy
  }
}

const filterFn = (id) => (stat) => id === stat.team.id
const sortFn = (a, b) => b.pts - a.pts

const transformStats = (data, filter) =>
  data.filter(filter).map(statTransformer).sort(sortFn)

const transformGameStats = (rawStatsData) => {
  const { data } = rawStatsData
  const game = { ...data[0].game }
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
  const currentTeam = homeTeam.id
  const visitorTeam = teamsData.find(
    (team) => team.id === data[0].game.visitor_team_id
  )
  visitorTeam.avatar = `./static/${visitorTeam.abbreviation}.png`

  const homeTeamStats = transformStats(data, filterFn(homeTeam.id))
  const visitorTeamStats = transformStats(data, filterFn(visitorTeam.id))

  return {
    homeTeamStats,
    visitorTeamStats,
    visitorTeam,
    homeTeam,
    game,
    currentTeam
  }
}

export default transformGameStats
