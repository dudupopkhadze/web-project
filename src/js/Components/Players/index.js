import { pl } from 'date-fns/locale'
import React from 'react'
import Pagination from './Pagination'
import PlayerStats from './PlayerStats'
import Search from './Search'

const Players = ({ playerGames, reduce }) => {
  console.log(playerGames)
  return (
    <div className='Players-container'>
      <Search reduce={reduce} teams={playerGames.teams} />
      <PlayerStats games={playerGames.data} />
      <Pagination
        playerId={
          playerGames.data
            ? playerGames.data[0]
              ? playerGames.data[0].player.id
              : null
            : null
        }
        teams={playerGames.teams}
        info={playerGames.meta}
        reduce={reduce}
      />
    </div>
  )
}

export default Players
