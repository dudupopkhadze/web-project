import React from 'react'
import local from '../../Helpers/local'

const Header = ({ visitorTeam, homeTeam, game, rerender }) => {
  const isStared = local.isFavoriteGame(game.id)
  const goToHome = () =>
    (window.location.href = window.location.href.substr(
      0,
      window.location.href.indexOf('game.html')
    ))

  const onStartClick = () => {
    local.switchStatus(game)
    rerender()
  }

  return (
    <div className='Game-Header'>
      <div className='Game-Header-backContainer'>
        <img
          onClick={goToHome}
          src='./static/left-arrow.png'
          className='Game-Header-backContainer-icon'
        />
        <div onClick={goToHome} className='Game-Header-backContainer-text'>
          Back To Home
        </div>
      </div>
      <div className='Game-Header-avatarsContainer'>
        <img
          className='Game-Header-avatarsContainer-avatar'
          src={homeTeam.avatar}
        />
        <div className='Game-Header-avatarsContainer-scoreContainer'>
          <span>{game.home_team_score} </span>
          <span className='Game-Header-avatarsContainer-scoreContainer-divider'>
            -
          </span>
          <span>{game.visitor_team_score}</span>
        </div>
        <img
          className='Game-Header-avatarsContainer-avatar'
          src={visitorTeam.avatar}
        />
      </div>
      <img
        onClick={onStartClick}
        className='Game-Header-star'
        src={`./static/star${isStared ? '-out' : ''}.png`}
      />
    </div>
  )
}

export default Header
