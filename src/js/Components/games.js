import React from 'react'
import local from '../Helpers/local'

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
        <div className='Games-game-teamInfo'>
          <img
            className='Games-game-avatar'
            src={`./static/${game.home_team.abbreviation}.png`}
          />
          <div className='Games-game-title'>{game.home_team.city}</div>
          <div className='Games-game-score'>{game.home_team_score}</div>
        </div>
        <div className='Games-game-teamInfo'>
          <img
            className='Games-game-avatar'
            src={`./static/${game.visitor_team.abbreviation}.png`}
          />
          <div className='Games-game-title'>{game.visitor_team.city}</div>
          <div className='Games-game-score'>{game.visitor_team_score}</div>
        </div>
      </div>

      <div className='Games-game-statusContainer'>
        {game.time ? (
          <div>{game.status + ' ' + game.time} </div>
        ) : (
          <div>{game.status}</div>
        )}
      </div>
    </div>
  )
}

export default Games
