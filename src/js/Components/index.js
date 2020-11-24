import Navigation from './Navigation'
import Games from './Games'
import Calendar from './Calendar'
import Game from './Game'
import constants from '../Helpers/constants'
import api from '../Helpers/api'
import transformGameStats from './Game/helper'

const loadTodaysGames = async ({ current }) => {
  const games = await api.getGames()
  current.games = games.data
}

const loadGame = async ({ current, id }) => {
  const stats = await api.getGameStats(id)
  current.stats = transformGameStats(stats)
}

const componentsToPageMapping = {
  [constants.PAGES.HOME]: {
    params: [],
    actions: [loadTodaysGames],
    components: [
      constants.COMPONENT_IDS.GAMES,
      constants.COMPONENT_IDS.NAV,
      constants.COMPONENT_IDS.CALENDAR
    ]
  },
  [constants.PAGES.GAME]: {
    params: ['id'],
    actions: [loadGame],
    components: [constants.COMPONENT_IDS.GAME]
  }
}

export default { Navigation, Games, Calendar, componentsToPageMapping, Game }
