import React from 'react'
import api from '../../Helpers/api'
import helper from './helper'

const Search = ({ reduce, teams }) => {
  const handleSearch = () => {
    const name = document.getElementById('input').value
    if (!name) return
    let fetchInProgress = false
    api.searchPlayer(name).then((playerGames) => {
      if (playerGames.data.length === 0) {
        reduce({ playerGames: { data: [] } })
        return
      }
      const player = playerGames.data[0]
      api
        .getPlayerStats(player.id)
        .then((res) =>
          reduce({
            playerGames: {
              data: helper.formatPlayerStats({ rawData: res.data, teams }),
              teams
            }
          })
        )
    })
  }

  return (
    <div className='Players-Search'>
      <input id='input' className='Players-Search-input' value='lebron' />
      <div onClick={handleSearch} className='Players-Search-button'>
        Search
      </div>
    </div>
  )
}

export default Search
