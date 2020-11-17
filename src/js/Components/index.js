import Navigation from './nav'
import Games from './games'
import Calendar from './calendar'
import constants from '../Helpers/constants'
import api from '../Helpers/api'

const loadTodaysGames = async ({ current }) => {
  const games = await api.getGames()
  current.games = games.data
}

const loadGame = async ({ current, id }) => {
  const stats = await api.getGameStats(id)
  current.stats = stats.data
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
    components: []
  }
}

export default { Navigation, Games, Calendar, componentsToPageMapping }
