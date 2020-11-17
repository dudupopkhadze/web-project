import api from './api'
import constants from './constants'
import local from './local'
import render from './renderer'

const STATE_TEMPLATES = {
  [constants.PAGES.HOME]: {
    navState: constants.NAV_STATE.CURRENT,
    games: [],
    curDate: new Date()
  },
  [constants.PAGES.GAME]: {
    id: '',
    stats: {}
  }
}

const dateOnChange = async ({ curDate, current }) => {
  const games = await api.getGames(curDate)
  current.games = games.data
}

const dateValidator = (current) =>
  current.navState === constants.NAV_STATE.CURRENT

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

export default function (page) {
  const current = STATE_TEMPLATES[page]
  const reduce = (id) => async (props) => {
    if (!props) {
      reRender()
      return
    }
    const { key, onChanges } = stateToComponents[id]
    current[key] = props[key]
    if (onChanges) {
      await Promise.all(onChanges.map((fn) => fn({ ...props, current })))
    }
    reRender()
  }

  const getPropsForId = (id) => ({
    [stateToComponents[id].key]: current[stateToComponents[id].key]
  })

  const renderFn = render.renderFactory(getPropsForId, reduce)

  const reRender = () =>
    Object.keys(stateToComponents).forEach((id) => {
      const { validators } = stateToComponents[id]
      if (id === constants.COMPONENT_IDS.GAMES) {
        render.byId(id, {
          reduce: reduce(id),
          ...(current.navState === constants.NAV_STATE.CURRENT
            ? getPropsForId(id)
            : { games: local.getFavoriteGames() })
        })
        return
      }

      if (validators) {
        const res = validators.map((fn) => fn(current))

        if (res.indexOf(false) !== -1) {
          render.unmount(id)
          return
        }
      }
      renderFn(id)
    })
  return { current: current, reduce, getPropsForId }
}
