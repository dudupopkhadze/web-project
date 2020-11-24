import React from 'react'
import BoxScore from './BoxScore'
import Header from './Header'

const Game = (props) => {
  console.log(props)
  const {
    stats: {
      homeTeamStats,
      visitorTeamStats,
      visitorTeam,
      homeTeam,
      game,
      currentTeam
    },
    reduce
  } = props

  const allTeams = [homeTeam, visitorTeam]
  const isHomeTeamSelected = currentTeam === homeTeam.id
  const statsForBoxScore = isHomeTeamSelected ? homeTeamStats : visitorTeamStats

  const reduceCurrentTeam = (id) => {
    reduce({ stats: { ...props.stats, currentTeam: id } })
  }

  return (
    <div>
      <Header game={game} homeTeam={homeTeam} visitorTeam={visitorTeam} />
      <BoxScore
        currentTeam={currentTeam}
        allTeams={allTeams}
        stats={statsForBoxScore}
        reduceCurrentTeam={reduceCurrentTeam}
      />
    </div>
  )
}

export default Game
