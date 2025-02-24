import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getAllEvents} from '../../api/api.js';
import EventListItem from '../EventListItem/EventListItem.jsx';
import PreviewEvent from '../PreviewEvent/PreviewEvent.jsx';
import styles from './EventList.module.css';

const EventList = () => {
  const [isFutureEventStatus, setIsFutureEventStatus] = useState(true);
  const [isSelected, setIsSelected] = useState(null);

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['events'],
    queryFn: ({signal}) => getAllEvents({signal}),
  });

  const handleEventListStatusChange = (status) => {
    setIsFutureEventStatus(status);
    setIsSelected(null);
  };

  const eventsData = isFutureEventStatus ? data?.futureEvents : data?.pastEvents;
  const selectedEvent = eventsData?.find(event => event._id === isSelected);
  const hasData = Array.isArray(eventsData) && eventsData?.length > 0;

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error || 'An unknown error occurred'}</p>}
      {!isLoading && !isError &&
        <div className={styles.contentContainer}>

          {isSelected &&
            <PreviewEvent
              selectedEvent={selectedEvent}
              onClose={() => setIsSelected(null)}
            />
          }

          <ul className={`${styles.listContainer} ${!isSelected ? styles.wide : ''}`}>
            <div className={styles.listTitles}>
              <div className={styles.topButtonsContainer}>
                <button type='button' className={`${styles.topButton} ${isFutureEventStatus ? styles.active : ''}`} onClick={() => handleEventListStatusChange(true)}>Future Events</button>
                <button type='button' className={`${styles.topButton} ${!isFutureEventStatus ? styles.active : ''}`} onClick={() => handleEventListStatusChange(false)}>Past Events</button>
              </div>
              {!isSelected && hasData && <span>Click on an event to preview</span>}
            </div>

            {hasData && eventsData.map(event =>
                <EventListItem
                  key={event._id}
                  event={event}
                  onClick={() => setIsSelected(event._id)}
                />
            )}
            {!hasData && <p>No registered events...</p>}
          </ul>

        </div>
      }
    </>
  );
}

export default EventList;