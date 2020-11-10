import api from './api'
import constants from './constants'
import local from './local'
import render from './renderer'

const state = {
  navState: constants.NAV_STATE.CURRENT,
  games: [],
  curDate: new Date()
}

const dateOnChange = async ({ curDate }) => {
  const games = await api.getGames(curDate)
  state.games = games.data
}

const dateValidator = () => state.navState === constants.NAV_STATE.CURRENT

const stateToComponents = {
  [constants.COMPONENT_IDS.NAV]: { key: 'navState' },
  [constants.COMPONENT_IDS.GAMES]: {
    key: 'games'
  },
  [constants.COMPONENT_IDS.CALENDAR]: {
    key: 'curDate',
    onChanges: [dateOnChange],
    validators: [dateValidator]
  }
}

const reduce = (id) => async (props) => {
  if (!props) {
    reRender()
    return
  }
  const { key, onChanges } = stateToComponents[id]
  state[key] = props[key]
  if (onChanges) {
    await Promise.all(onChanges.map((fn) => fn(props)))
  }
  reRender()
}

const getPropsForId = (id) => ({
  [stateToComponents[id].key]: state[stateToComponents[id].key]
})

const renderFn = render.renderFactory(getPropsForId, reduce)

const reRender = () =>
  Object.keys(stateToComponents).forEach((id) => {
    const { onChanges, validators } = stateToComponents[id]
    if (id === constants.COMPONENT_IDS.GAMES) {
      render.byId(id, {
        reduce: reduce(id),
        ...(state.navState === constants.NAV_STATE.CURRENT
          ? getPropsForId(id)
          : { games: local.getFavoriteGames() })
      })
      return
    }

    if (validators) {
      const res = validators.map((fn) => fn())

      if (res.indexOf(false) !== -1) {
        render.unmount(id)
        return
      }
    }
    renderFn(id)
  })

export default {
  current: state,
  reduce,
  getPropsForId
}
