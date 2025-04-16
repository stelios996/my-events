import React, {useEffect, useState} from 'react';
import styles from './DrawerEventList.module.css';
import EventListItem from '../EventListItem/EventListItem.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';

const DrawerEventList = ({events, onClose}) => {
  //TODO: preview the selected event upon click on a specific event from the list
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return (
    <>
      <div className={styles.backdrop} onClick={onClose}></div>
      <div className={`${styles.drawerContainer} ${isOpen ? styles.open : ''}`}>
        <button
          type='button'
          className={styles.closeButton}
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {events?.map(event =>
          <EventListItem
            key={event._id}
            event={event}
            onClick={() => {}}
          />
        )}
      </div>
    </>
  );
}

export default DrawerEventList