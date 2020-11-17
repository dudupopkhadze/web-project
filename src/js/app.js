import api from './Helpers/api'
import config from './Helpers/config'
import constants from './Helpers/constants'
import local from './Helpers/local'
import render from './Helpers/renderer'
import state from './Helpers/state'

if (module.hot) {
  module.hot.accept()
}
local.initIfNotPresent()

const page = config.getPage()
const { current, reduce, getPropsForId } = state(page)
const renderFn = render.renderFactory(getPropsForId, reduce)

const renderAsync = async () => {
  const params = new URLSearchParams(window.location.search)
  const pageConfig = config.getPageConfig(page)
  const paramObject = pageConfig.params.reduce((p, c) => {
    p[c] = params.get(c)
    return p
  }, {})

  const promises = []
  pageConfig.actions.forEach((fn) =>
    promises.push(fn({ current, ...paramObject }))
  )
  await Promise.all(promises)

  pageConfig.components.map(renderFn)
}

renderAsync()
