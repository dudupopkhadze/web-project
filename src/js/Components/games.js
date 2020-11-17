import React from 'react'
import local from '../Helpers/local'

const Games = (props) => {
  const { games, reduce } = props
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

  const renderInfo = () => {
    const main = (
      <React.Fragment>
        {' '}
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
      </React.Fragment>
    )

    if (game.status === 'Final') {
      return (
        <a href={`/game.html?id=${game.id}`} className='Games-game-info'>
          {main}
        </a>
      )
    }

    return <div className='Games-game-info'>{main}</div>
  }

  return (
    <div className='Games-game' id={game.id}>
      <img
        onClick={onClick}
        className='Games-game-star'
        src={`./static/star${isStared ? '-out' : ''}.png`}
      />
      {renderInfo()}
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
