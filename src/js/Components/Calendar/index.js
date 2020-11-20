import { add, format, sub } from 'date-fns'
import React from 'react'

const Calendar = ({ curDate, reduce }) => {
  const dates = [
    { date: sub(curDate, { days: 2 }) },
    { date: sub(curDate, { days: 1 }) },
    { date: curDate, isCurrent: true },
    { date: add(curDate, { days: 1 }) },
    { date: add(curDate, { days: 2 }) }
  ]

  const handleArrowClick = (direction) => () => {
    const index = direction === 'left' ? 1 : 3
    reduce({ curDate: dates[index].date })
    return
  }

  const handleDateClick = (date) => {
    reduce({ curDate: date })
    return
  }

  return (
    <div className='Calendar-container'>
      {dates.map((d, i) => (
        <Day
          key={i}
          handleClick={handleDateClick}
          handleArrowClick={handleArrowClick}
          {...d}
        />
      ))}
    </div>
  )
}

const Day = ({ date, isCurrent, handleArrowClick, handleClick }) => {
  const handleDateClick = () => handleClick(date)

  if (isCurrent) {
    return (
      <div className='Calendar-favoriteContainer'>
        <img
          className='Calendar-arrow'
          src='./static/left-arrow.png'
          onClick={handleArrowClick('left')}
        />
        <div className='Calendar-item Calendar-item--selected'>
          {format(date, 'PP').toUpperCase()}
        </div>
        <img
          className='Calendar-arrow'
          src='./static/right-arrow.png'
          onClick={handleArrowClick('right')}
        />
      </div>
    )
  }

  return (
    <div onClick={handleDateClick} className='Calendar-item'>
      {format(date, 'PP').toUpperCase()}
    </div>
  )
}

export default Calendar
