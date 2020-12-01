import React from 'react'
import TeamSwitcher from './TeamSwitcher'

const BoxScore = ({ stats, ...props }) => {
  return (
    <div className='Game-BoxScore'>
      <h1 className='Game-BoxScore-title'>Box Score</h1>
      <TeamSwitcher {...props} />
    </div>
  )
}

export default BoxScore
