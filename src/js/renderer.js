import React from 'react'
import ReactDOM from 'react-dom'
import Components from './Components'
import constants from './constants'

const mapIdToComponent = {
  [constants.COMPONENT_IDS.NAV]: Components.Navigation,
  [constants.COMPONENT_IDS.GAMES]: Components.Games
}

const byId = (id, props) => {
  const Component = mapIdToComponent[id]
  render(<Component {...props} />, id)
}

const render = (component, divId) =>
  ReactDOM.render(component, document.getElementById(divId))

export default { render, byId }
