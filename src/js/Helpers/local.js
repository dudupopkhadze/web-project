import constants from './constants'

const initIfNotPresent = () => {
  if (!localStorage.getItem(constants.LOCAL_STORAGE_FAV_KEY)) {
    localStorage.setItem(constants.LOCAL_STORAGE_FAV_KEY, JSON.stringify([]))
  }
}

const getFavoriteGames = () =>
  JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_FAV_KEY))

const save = (arr) =>
  localStorage.setItem(constants.LOCAL_STORAGE_FAV_KEY, JSON.stringify(arr))

const isFavoriteGame = (id) => !!getFavoriteGames().find((e) => e.id === id)

const favoritizeGame = (game) => {
  const arr = getFavoriteGames()
  arr.push(game)
  save(arr)
}

const removeFromFavorite = (id) =>
  save(getFavoriteGames().filter((e) => e.id !== id))

const switchStatus = (game) => {
  if (isFavoriteGame(game.id)) {
    removeFromFavorite(game.id)
    return
  }
  favoritizeGame(game)
  return
}

export default {
  isFavoriteGame,
  favoritizeGame,
  getFavoriteGames,
  initIfNotPresent,
  removeFromFavorite,
  switchStatus
}
