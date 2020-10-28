import React from 'react'
import constants from '../constants'

const Navigation = ({ navState, reduce }) => {
  const handleClick = (navState) => () => {
    reduce({ navState })
  }

  return (
    <div className='Navigation-container'>
      <div
        className={`Navigation-item${
          navState === constants.NAV_STATE.CURRENT
            ? ' Navigation-item--selected'
            : ''
        }`}
        onClick={handleClick(constants.NAV_STATE.CURRENT)}
      >
        <span>CURRENT</span>
      </div>
      <div
        className={`Navigation-item${
          navState === constants.NAV_STATE.FAVORITE
            ? ' Navigation-item--selected'
            : ''
        }`}
        onClick={handleClick(constants.NAV_STATE.FAVORITE)}
      >
        <span>FAVORITES</span>
      </div>
    </div>
  )
}

export default Navigation
