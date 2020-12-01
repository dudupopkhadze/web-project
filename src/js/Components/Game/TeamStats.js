import React from 'react'
import constants from './constants'

const TeamStats = ({ stats }) => {
  const width = document.getElementsByTagName('body')[0].clientWidth
  const shouldRenderColumn = ({ dontRender }) => {
    if (!dontRender) return true
    return !(width >= dontRender.low && width <= dontRender.high)
  }

  return (
    <div className='Game-Stats'>
      <div className='Game-Stats-Header'>
        {constants.teamStatsColumnHeaders.map((e) =>
          shouldRenderColumn(e) ? (
            <div
              className={
                e.className
                  ? 'Game-Stats-Row-' + e.className
                  : 'Game-Stats-Row-item'
              }
              key={e.value}
            >
              {e.name}
            </div>
          ) : null
        )}
      </div>
      <BreakLine />
      <div className='Game-Stats-Rows'>
        {stats.map((player) => {
          return (
            <div className='Game-Stats-Row' key={player.id}>
              {constants.teamStatsColumnHeaders.map((e, i) =>
                shouldRenderColumn(e) ? (
                  <div
                    className={
                      e.className
                        ? 'Game-Stats-Row-' + e.className
                        : 'Game-Stats-Row-item'
                    }
                    key={i}
                  >
                    {player[e.value]}
                  </div>
                ) : null
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

const BreakLine = () => <div className='Game-Stats-Breakline' />

export default TeamStats
