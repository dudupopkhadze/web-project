import React from 'react'
import PlayerStats from './PlayerStats'
import Search from './Search'

const Players = ({ playerGames, reduce }) => {
  console.log(playerGames)
  return (
    <div className='Players-container'>
      <Search reduce={reduce} teams={playerGames.teams} />
      <PlayerStats games={playerGames.data} />
    </div>
  )
}

export default Players
