const formatPlayerStats = ({ rawData, teams }) =>
  rawData.map((data) => {
    const otherTeamId = [
      data.game.home_team_id,
      data.game.visitor_team_id
    ].find((e) => e !== data.player.team_id)

    const otherTeam = teams.find((t) => t.id === otherTeamId)
    data.vs = otherTeam.full_name
    return data
  })

export default {
  formatPlayerStats
}
