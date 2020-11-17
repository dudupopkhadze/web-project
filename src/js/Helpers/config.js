import Components from '../Components'
import constants from './constants'

const pathToPageMapping = {
  '/index.html': constants.PAGES.HOME,
  '/game.html': constants.PAGES.GAME,
  '/': constants.PAGES.HOME
}

const getPage = () => pathToPageMapping[window.location.pathname]

const getPageConfig = (page) => Components.componentsToPageMapping[page]

const isCurrentPage = (value) => getPage() === value

export default {
  getPage,
  getPageConfig
}
