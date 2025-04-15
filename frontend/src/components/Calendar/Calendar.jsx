import React, {useMemo, useState} from 'react';
import styles from './Calendar.module.css';
import { addMonths, eachDayOfInterval, endOfMonth, endOfWeek, format, getDay, startOfMonth, startOfWeek, subMonths} from 'date-fns';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCaretLeft, faCaretRight} from "@fortawesome/free-solid-svg-icons";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const dayNames = useMemo(() => {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 });
    const weekEnd = endOfWeek(new Date(), { weekStartsOn: 0 });
    const week = eachDayOfInterval({start: weekStart, end: weekEnd});

    return week.map(day=>format(day, 'iii'));
  }, []);

  const month = useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({start, end});

    return [
      ...new Array(getDay(start)).fill(null),
      ...days,
      ...new Array(6 - getDay(end)).fill(null)
    ];
  }, [currentDate]);

  return (
    <>
      <div className={styles.backgroundCalendar}></div>
      <div className={styles.calendarContainer}>

        <div className={styles.calendarTopContainer}>
          <button className={styles.navButton} onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
            <FontAwesomeIcon icon={faCaretLeft} />
            {`${format(subMonths(currentDate, 1), "MMM")}`}
          </button>
          <h2>{format(currentDate, "MMMM yyyy")}</h2>
          <button className={styles.navButton} onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
            {`${format(addMonths(currentDate, 1), "MMM")}`}
            <FontAwesomeIcon icon={faCaretRight} />
          </button>
        </div>

        <ul className={styles.calendarGrid}>
          {dayNames.map(weekday => {
            return <li key={weekday} className={styles.weekday}>{weekday}</li>;
          })}
          {month.map((day, index) => {
            const isToday = day && format(day, 'MM-dd-yyyy') === format(new Date(), 'MM-dd-yyyy');

            return <li key={day?.toISOString() ?? index} className={`${styles.day} ${isToday ? styles.today : ''}`}>
                      {day ? format(day, 'dd') : ''}
                  </li>;
          })}
        </ul>

      </div>
    </>
  );
}

export default Calendar