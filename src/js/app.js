import api from './Helpers/api'
import constants from './Helpers/constants'
import local from './Helpers/local'
import render from './Helpers/renderer'
import state from './Helpers/state'

if (module.hot) {
  module.hot.accept()
}

local.initIfNotPresent()
const { current, reduce, getPropsForId } = state

const renderFn = render.renderFactory(getPropsForId, reduce)

const renderAsync = async () => {
  const games = await api.getGames()
  current.games = games.data

  renderFn(constants.COMPONENT_IDS.GAMES)
  renderFn(constants.COMPONENT_IDS.NAV)
  renderFn(constants.COMPONENT_IDS.CALENDAR)
}

renderAsync()
