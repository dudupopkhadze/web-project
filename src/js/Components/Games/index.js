import React from 'react'
import SingleGame from './SingleGame'

const Games = (props) => {
  const { games, reduce } = props
  const triggerReduce = () => reduce()
  const renderGame = (e, i) => (
    <SingleGame key={i} game={e} triggerReduce={triggerReduce} />
  )

  return games.length === 0 ? (
    <h1 className='Games-empty'>No Games Here</h1>
  ) : (
    games.map(renderGame)
  )
}

export default Games
