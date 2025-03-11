import React, {useMemo, useState} from 'react';
import styles from './Calendar.module.css';
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, startOfMonth, startOfWeek, subMonths} from 'date-fns';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const dayNames = useMemo(() =>{
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });
    const week = eachDayOfInterval({start: weekStart, end: weekEnd});

    return week.map(day=>format(day, 'iii'));
  }, []);

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const days = eachDayOfInterval({start, end});

  const month = [
    ...new Array(getDay(start)).fill(null),
    ...days,
    ...new Array(6 - getDay(end)).fill(null)
  ];

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.calendarTopContainer}>
        <button className={styles.navButton} onClick={() => setCurrentDate(subMonths(currentDate, 1))}>{`< ${format(subMonths(currentDate, 1), "MMM")}`}</button>
        <h2>{format(currentDate, "MMMM yyyy")}</h2>
        <button className={styles.navButton} onClick={() => setCurrentDate(addMonths(currentDate, 1))}>{`${format(addMonths(currentDate, 1), "MMM")} >`}</button>
      </div>

      <div className={styles.calendarGrid}>
        {dayNames.map(weekday => {
          return <div key={weekday} className={styles.weekday}>{weekday}</div>;
        })}
        {month.map( (day, index) => {
          return day ? <div key={day} className={styles.day}>{format(day, 'dd')}</div> : <div key={index} className={styles.day}></div>;
        })}
      </div>

    </div>
  );
}

export default Calendar