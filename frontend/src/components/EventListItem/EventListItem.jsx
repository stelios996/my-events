import React from 'react';
import {formatDate} from "../../util/util.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import styles from './EventListItem.module.css';

const EventListItem = ({event, onClick}) => {

  return (
    <li className={styles.itemContainer} onClick={onClick}>
      <p className={styles.title}>{event.title}</p>
      <p><FontAwesomeIcon icon={faClock} /> {formatDate(event.date)} @ {event.time} </p>
      <p><FontAwesomeIcon icon={faLocationDot} /> {event.venue}</p>
    </li>
  );
}

export default EventListItem;