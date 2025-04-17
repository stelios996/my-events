import React, {useEffect, useState} from 'react';
import styles from './DrawerEventList.module.css';
import EventListItem from '../EventListItem/EventListItem.jsx';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faXmark} from '@fortawesome/free-solid-svg-icons';
import PreviewEvent from '../PreviewEvent/PreviewEvent.jsx';
import {useQuery} from '@tanstack/react-query';
import {getEventsByMonth} from '../../api/api.js';
import {format} from 'date-fns';

const DrawerEventList = ({date, start, end, onClose}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['eventsByMonth', start, end],
    queryFn: ({signal, queryKey}) => getEventsByMonth({signal, queryKey}),
  });
  const events = data?.[format(date, 'yyyy-MM-dd')] ?? [];

  const handleDrawerClose = () => {
    setSelectedEventId(null);
    onClose();
  };

  return (
    <div className={styles.drawerWrapper}>
      <div className={styles.backdrop} onClick={handleDrawerClose}></div>
      <div className={`${styles.drawerContainer} ${isOpen ? styles.open : ''}`}>
        <button
          type='button'
          className={styles.closeButton}
          onClick={handleDrawerClose}
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        {isLoading && <p>Loading...</p>}
        {isError && <p className={styles.error}>{error}</p>}

        <h1 className={styles.dayTitle}>{format(date, 'EEEE dd MMMM yyyy')}</h1>

        {events?.map(event =>
          <EventListItem
            key={event._id}
            event={event}
            onClick={() => setSelectedEventId(event._id)}
          />
        )}
      </div>

      {selectedEventId && (
        <div className={styles.previewEventContainer}>
          <PreviewEvent
            eventId={selectedEventId}
            onClose={() => setSelectedEventId(null)}
          />
        </div>
      )}
    </div>
  );
}

export default DrawerEventList