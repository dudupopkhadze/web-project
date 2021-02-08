import React from 'react'
import api from '../../Helpers/api'
import transformer from './transformer'

const RENDER_OPTIONS = {
  NONE: 'NONE',
  VALUE: 'VALUE',
  DOT: 'DOT'
}

const Pagination = ({ playerId, info, teams, reduce }) => {
  if (!info) {
    return null
  }
  const { current_page, total_pages } = info

  const handleNavigate = (page) => {
    if (page === current_page) {
      return
    }
    api.getPlayerStats(playerId, page).then((res) => {
      reduce({
        playerGames: {
          data: transformer({ rawData: res.data, teams }),
          meta: res.meta,
          teams
        }
      })
    })
  }
  let dotRendered = 0

  const whatToRender = (page) => {
    if (total_pages <= 6) {
      return RENDER_OPTIONS.VALUE
    }
    const renderAlways = [1, current_page, total_pages, total_pages - 1]
    const renderConditions =
      current_page === 1
        ? [2, 3, ...renderAlways]
        : [current_page - 1, current_page + 1, ...renderAlways]
    if (renderConditions.includes(page)) {
      return RENDER_OPTIONS.VALUE
    }
    if (dotRendered < 3) {
      dotRendered++
      return RENDER_OPTIONS.DOT
    }
    return RENDER_OPTIONS.NONE
  }

  const arr = Array(total_pages).fill(0)
  return (
    <div className='Players-Pagination'>
      {arr.map((e, i) => {
        const page = i + 1
        const rendering = whatToRender(page)

        switch (rendering) {
          case RENDER_OPTIONS.VALUE:
            return (
              <div
                onClick={() => handleNavigate(page)}
                key={i}
                className={`Players-Pagination-item${
                  page === current_page
                    ? ' Players-Pagination-item--current'
                    : ''
                }`}
              >
                {page}
              </div>
            )

          case RENDER_OPTIONS.DOT:
            return <div className='Players-Pagination-dot'>.</div>

          case RENDER_OPTIONS.NONE:
          default:
            return null
        }
      })}
    </div>
  )
}

export default Pagination
