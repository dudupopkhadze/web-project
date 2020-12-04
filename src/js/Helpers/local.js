import api from './api'
import constants from './constants'

const sortGames = (a, b) => new Date(b.date) - new Date(a.date)

const initIfNotPresent = (sync = false) => {
  if (!localStorage.getItem(constants.LOCAL_STORAGE_FAV_KEY)) {
    localStorage.setItem(constants.LOCAL_STORAGE_FAV_KEY, JSON.stringify([]))
    return
  }

  if (sync) {
    const games = getFavoriteGames()
    const upToDateGames = games.filter((game) => game.status === 'Final')
    const gamesNeedingUpdate = games
      .filter((game) => game.status !== 'Final')
      .map((game) => game.id)

    if (gamesNeedingUpdate.length === 0) {
      return
    }

    api
      .getGamesByIDs(gamesNeedingUpdate)
      .then((res) => save([...upToDateGames, ...res].sort(sortGames)))
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
