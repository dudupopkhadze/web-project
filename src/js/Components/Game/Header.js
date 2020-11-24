import React from 'react'

const Header = ({ visitorTeam, homeTeam, game }) => {
  return (
    <div className='Game-Header'>
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
    </div>
  )
}

export default Header
