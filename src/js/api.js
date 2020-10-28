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

const getGames = (date) => {
  const dateFin = date ? new Date(date) : new Date()
  const asString = dateFin.toISOString().substr(0, 10)

  return request({ path: 'games', params: { dates: [asString] } })
}

export default { request, getGames }
