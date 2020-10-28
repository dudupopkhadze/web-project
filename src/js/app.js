import api from './api'
import constants from './constants'
import local from './local'
import render from './renderer'

if (module.hot) {
  module.hot.accept()
}

local.initIfNotPresent()

const state = {
  navState: constants.NAV_STATE.CURRENT,
  games: []
}

const stateToIDs = {
  [constants.COMPONENT_IDS.NAV]: ['navState'],
  [constants.COMPONENT_IDS.GAMES]: ['games']
}

const reduce = (id) => (props) => {
  if (!props) {
    reRender()
    return
  }
  stateToIDs[id].forEach((key) => (state[key] = props[key]))
  reRender()
}

const getPropsForId = (id) =>
  stateToIDs[id].reduce((p, c) => {
    p[c] = state[c]
    return p
  }, {})

const reRender = () =>
  Object.keys(stateToIDs).forEach((id) => {
    console.log('state', state)
    if (id === constants.COMPONENT_IDS.GAMES) {
      render.byId(id, {
        reduce: reduce(id),
        ...(state.navState === constants.NAV_STATE.CURRENT
          ? getPropsForId(id)
          : { games: local.getFavoriteGames() })
      })
      return
    }
    render.byId(id, { ...getPropsForId(id), reduce: reduce(id) })
  })

const renderAsync = async () => {
  const games = await api.getGames()
  state.games = games.data
  render.byId(constants.COMPONENT_IDS.GAMES, {
    ...getPropsForId(constants.COMPONENT_IDS.GAMES),
    reduce: reduce(constants.COMPONENT_IDS.GAMES)
  })

  render.byId(constants.COMPONENT_IDS.NAV, {
    ...getPropsForId(constants.COMPONENT_IDS.NAV),
    reduce: reduce(constants.COMPONENT_IDS.NAV)
  })
}

renderAsync()
