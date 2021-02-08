import React from 'react'
import api from '../../Helpers/api'
import transformer from './transformer'

const Search = ({ reduce, teams }) => {
  const handleSearch = () => {
    let fetchInProgress = false
    return () => {
      if (fetchInProgress) return
      fetchInProgress = true
      const name = document.getElementById('input').value

      if (!name) return
      api.searchPlayer(name).then((playerGames) => {
        if (playerGames.data.length === 0) {
          reduce({ playerGames: { data: [] } })
          return
        }
        const player = playerGames.data[0]
        api.getPlayerStats(player.id).then((res) => {
          fetchInProgress = false
          reduce({
            playerGames: {
              data: transformer({ rawData: res.data, teams }),
              meta: res.meta,
              teams
            }
          })
        })
      })
    }
  }

  return (
    <div className='Players-Search'>
      <h1 className='Players-Search-title'>
        Let's See How Is Your Player Doing This Season
      </h1>
      <div className='Players-Search-wrapper'>
        <input
          id='input'
          className='Players-Search-input'
          placeholder='e.g Lebron James'
          value='Lebron'
        />
        <div onClick={handleSearch()} className='Players-Search-button'>
          Search
        </div>
      </div>
    </div>
  )
}

export default Search
