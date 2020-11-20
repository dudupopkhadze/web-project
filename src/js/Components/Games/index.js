import React from 'react'
import SingleGame from './SingleGame'

const Games = (props) => {
  const { games, reduce } = props
  const triggerReduce = () => reduce()
  const renderGame = (e, i) => (
    <SingleGame key={i} game={e} triggerReduce={triggerReduce} />
  )

  return <div>{games.map(renderGame)}</div>
}

export default Games
