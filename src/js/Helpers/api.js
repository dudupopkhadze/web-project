import axios from 'axios'
import config from './config'

const options = {
  method: 'GET',
  url: 'https://www.balldontlie.io/api/v1/'
}

const request = ({ path = '', params }) =>
  axios
    .request({ ...options, url: options.url + path, params })
    .then((res) => res.data)
    .catch((err) => {
      error: err
    })

const getGamesByIDs = async (ids) => {
  const res = []
  const promises = []
  ids.forEach((id) => {
    const as = async () => {
      const response = await request({ path: 'games/' + id })
      res.push(response)
    }
    promises.push(as())
  })
  await Promise.all(promises)
  return res
}

const getGames = (date) => {
  const dateFin = date ? new Date(date) : new Date()
  const asString = dateFin.toISOString().substr(0, 10)

  return request({ path: 'games', params: { dates: [asString] } })
}

const getGameStats = (id) =>
  request({ params: { game_ids: [id], per_page: 100 }, path: 'stats' })

export default { request, getGames, getGameStats, getGamesByIDs }
