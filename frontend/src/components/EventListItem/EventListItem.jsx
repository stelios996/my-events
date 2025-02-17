import React from 'react';
import {formatDate} from "../../util/util.js";
import styles from './EventListItem.module.css';

const EventListItem = ({event, onClick}) => {

  return (
    <li className={styles.itemContainer} onClick={onClick}>
      <p className={styles.title}>{event.title}</p>
      <p>{formatDate(event.date)} @ {event.time} </p>
      <p>{event.venue}</p>
    </li>
  );
}

export default EventListItem;