import React from 'react'
import local from '../local'

const Games = (props) => {
  const { games, reduce } = props
  console.log(games)
  const triggerReduce = () => reduce()
  const renderGame = (e, i) => (
    <Game key={i} game={e} triggerReduce={triggerReduce} />
  )

  return <div>{games.map(renderGame)}</div>
}

const Game = ({ game, triggerReduce }) => {
  const isStarted = game.time !== ''
  const id = String(game.id)

  const isStared = local.isFavoriteGame(game.id)

  const onClick = () => {
    local.switchStatus(game)
    triggerReduce()
  }

  return (
    <div className='Games-game' id={game.id}>
      <img
        onClick={onClick}
        className='Games-game-star'
        src={`./static/star${isStared ? '-out' : ''}.png`}
      />
      <div className='Games-game-info'>
        <img
          className='Games-game-avatar'
          src={`./static/${game.home_team.abbreviation}.png`}
        />
        <div className='Games-game-title'>
          {game.home_team.city} - {game.visitor_team.city}
        </div>
        <img
          className='Games-game-avatar'
          src={`./static/${game.visitor_team.abbreviation}.png`}
        />
      </div>

      {isStarted && <div className='Games-game-time'>{game.time}</div>}
    </div>
  )
}

export default Games
