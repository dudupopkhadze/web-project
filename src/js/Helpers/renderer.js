import React from 'react'
import ReactDOM from 'react-dom'
import Components from '../Components'
import constants from './constants'

const mapIdToComponent = {
  [constants.COMPONENT_IDS.NAV]: Components.Navigation,
  [constants.COMPONENT_IDS.GAMES]: Components.Games,
  [constants.COMPONENT_IDS.CALENDAR]: Components.Calendar,
  [constants.COMPONENT_IDS.GAME]: Components.Game,
  [constants.COMPONENT_IDS.PLAYERS]: Components.Players
}

const byId = (id, props) => {
  const Component = mapIdToComponent[id]
  render(<Component {...props} />, id)
}

const render = (component, divId) =>
  ReactDOM.render(component, document.getElementById(divId))

const renderFactory = (getPropsFn, reduceFn) => (id) =>
  byId(id, { ...getPropsFn(id), reduce: reduceFn(id) })

const unmount = (id) =>
  ReactDOM.unmountComponentAtNode(document.getElementById(id))

export default { render, byId, renderFactory, unmount }
