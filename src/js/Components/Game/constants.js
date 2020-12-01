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
  {
    value: 'min',
    name: 'MIN'
  },
  {
    value: 'pts',
    name: 'PTS'
  },

  {
    value: 'ast',
    name: 'AST'
  },
  {
    value: 'reb',
    name: 'REB'
  },
  {
    value: 'oreb',
    name: 'O-REB',
    dontRender: { low: 800, high: 1200 }
  },

  {
    value: 'dreb',
    name: 'D-REB',
    dontRender: { low: 800, high: 1200 }
  },
  {
    value: 'fg3_pct',
    name: '3PT-%'
  },
  {
    value: 'fg3a',
    name: '3PT-A',
    dontRender: { low: 800, high: 1200 }
  },
  {
    value: 'fg3m',
    name: '3PT-M',
    dontRender: { low: 800, high: 1200 }
  },
  {
    value: 'fg_pct',
    name: 'FG-%'
  },
  {
    value: 'fga',
    name: 'FG-A',
    dontRender: { low: 800, high: 1050 }
  },
  {
    value: 'fgm',
    name: 'FG-M',
    dontRender: { low: 800, high: 1050 }
  },
  {
    value: 'ft_pct',
    name: 'FT-%'
  },
  {
    value: 'fta',
    name: 'FT-A',
    dontRender: { low: 800, high: 1050 }
  },
  {
    value: 'ftm',
    name: 'FT-M',
    dontRender: { low: 800, high: 1050 }
  },

  {
    value: 'pf',
    name: 'PF'
  },
  {
    value: 'blk',
    name: 'BLK'
  },

  {
    value: 'stl',
    name: 'STL'
  },
  {
    value: 'turnover',
    name: 'TRN'
  }
]

export default {
  teamStatsColumnHeaders
}
