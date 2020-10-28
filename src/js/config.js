import constants from './constants'

const pathToPageMapping = {
  '/page.html': 'Page',
  '/index.html': constants.PAGES.HOME,
  '/': constants.PAGES.HOME
}

const getPage = () => pathToPageMapping[window.location.pathname]

const isCurrentPage = (value) => getPage() === value

export default {
  getPage,
  isCurrentPage
}
