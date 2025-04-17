import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getAllEvents} from '../../api/api.js';
import EventListItem from '../EventListItem/EventListItem.jsx';
import PreviewEvent from '../PreviewEvent/PreviewEvent.jsx';
import styles from './EventList.module.css';

const EventList = () => {
  const [isStatusFuture, setIsStatusFuture] = useState(true);
  const [isSelected, setIsSelected] = useState(null);

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['events'],
    queryFn: ({signal}) => getAllEvents({signal}),
  });

  const handleEventListStatusChange = (status) => {
    setIsStatusFuture(status);
    setIsSelected(null);
  };

  const eventsData = isStatusFuture ? data?.futureEvents : data?.pastEvents;
  const selectedEvent = eventsData?.find(event => event._id === isSelected);

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error || 'An unknown error occurred'}</p>}
      {!isLoading && !isError &&
        <div className={styles.contentContainer}>

          {isSelected &&
            <PreviewEvent
              eventId={selectedEvent._id}
              onClose={() => setIsSelected(null)}
            />
          }

          <ul className={`${styles.listContainer} ${!isSelected ? styles.wide : ''}`}>

            <div className={styles.listTitles}>
              <div className={styles.topButtonsContainer}>
                <button
                  type='button'
                  className={`${styles.topButton} ${isStatusFuture ? styles.active : ''}`}
                  onClick={() => handleEventListStatusChange(true)}
                >
                  Future Events
                </button>
                <button
                  type='button'
                  className={`${styles.topButton} ${!isStatusFuture ? styles.active : ''}`}
                  onClick={() => handleEventListStatusChange(false)}
                >
                  Past Events
                </button>
              </div>
              {!isSelected && eventsData?.length && <span>Click on an event to preview</span>}
            </div>

            {eventsData?.length ? eventsData.map(event =>
              <EventListItem
                key={event._id}
                event={event}
                onClick={() => setIsSelected(event._id)}
              />
            ) : (
              <p>No registered events...</p>
            )}
          </ul>

        </div>
      }
    </>
  );
}

export default EventList;