import React from 'react'
import utils from '../../Helpers/utils'
import constants from './constants'

const PlayerStats = ({ games }) => {
  if (games === null) {
    return null
  }

  const renderGames = () => (
    <React.Fragment>
      <div className='Players-Games-Header'>
        {constants.columnHeaders.map((e, i) =>
          utils.shouldRenderColumn(e) ? (
            <div
              className={
                e.className
                  ? 'Players-Games-Row-' + e.className
                  : 'Players-Games-Row-item'
              }
              key={i}
            >
              {e.name}
            </div>
          ) : null
        )}
      </div>
      <div className='Players-Games-Rows'>
        {games.map((game) => {
          return (
            <div className='Players-Games-Row' key={game.id}>
              {constants.columnHeaders.map((e, i) =>
                utils.shouldRenderColumn(e) ? (
                  <div
                    className={
                      e.className
                        ? 'Players-Games-Row-' + e.className
                        : 'Players-Games-Row-item'
                    }
                    key={i}
                  >
                    {game[e.value]}
                  </div>
                ) : null
              )}
            </div>
          )
        })}
      </div>
    </React.Fragment>
  )

  return (
    <div className='Players-Games'>
      {games.length === 0 ? (
        <div className='Players-Games-notFound'>
          No Player Found With Given Name.
        </div>
      ) : (
        renderGames()
      )}
    </div>
  )
}

export default PlayerStats
