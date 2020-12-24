import constants from '../../Helpers/constants'

const teamStatsColumnHeaders = [
  {
    value: 'name',
    name: 'PLAYER',
    className: 'player'
  },
  {
    value: 'position',
    name: 'POS'
  },
  ...constants.commonColumnHeaders
]

export default {
  teamStatsColumnHeaders
}
