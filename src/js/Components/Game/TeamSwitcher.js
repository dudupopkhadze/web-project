import React from 'react'

const TeamSwitcher = ({ currentTeam, allTeams, reduceCurrentTeam }) => {
  const reduce = (id) => () => reduceCurrentTeam(id)
  return (
    <div className='Game-BoxScore-switcherContainer'>
      {allTeams.map((team) => (
        <div
          key={team.id}
          onClick={reduce(team.id)}
          className={`Game-BoxScore-switcherContainer-item ${
            currentTeam === team.id
              ? 'Game-BoxScore-switcherContainer-item--selected'
              : ''
          }`}
        >
          {team.abbreviation}
        </div>
      ))}
    </div>
  )
}

export default TeamSwitcher
