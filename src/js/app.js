import config from './Helpers/config'
import local from './Helpers/local'
import render from './Helpers/renderer'
import state from './Helpers/state'

if (module.hot) {
  module.hot.accept()
}
local.initIfNotPresent(true)

const page = config.getPage()
const { current, reduce, getPropsForId } = state(page)
const renderFn = render.renderFactory(getPropsForId, reduce)

const registerListeners = (renderAll) => {
  const handler = () => {
    renderAll()
  }
  window.onresize = handler
  window.onunload = () => (window.onresize = null)
}

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
  const renderAll = () => pageConfig.components.map(renderFn)
  renderAll()
  registerListeners(renderAll)
}

renderAsync()
