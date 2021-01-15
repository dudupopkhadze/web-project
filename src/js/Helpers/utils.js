const shouldRenderColumn = ({ dontRender }) => {
  const width = document.getElementsByTagName('body')[0].clientWidth
  if (!dontRender) return true
  return !(width >= dontRender.low && width <= dontRender.high)
}

export default {
  shouldRenderColumn
}
