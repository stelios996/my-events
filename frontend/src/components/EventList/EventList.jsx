import React, {useState} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getAllEvents} from '../../api/api.js';
import EventListItem from '../EventListItem/EventListItem.jsx';
import PreviewEvent from '../PreviewEvent/PreviewEvent.jsx';
import styles from './EventList.module.css';

const EventList = () => {
  const [isSelected, setIsSelected] = useState(null);

  const handleSelected = (id) => {
    setIsSelected(id);
  }

  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['events'],
    queryFn: ({signal}) => getAllEvents({signal}),
  });

  const selectedEvent = data?.find(event => event._id === isSelected);
  const hasData = Array.isArray(data) && data.length > 0;

  return (
    <>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error || 'An unknown error occurred'}</p>}
      {!isLoading && !isError &&
        <>
          {hasData ? (
              <div className={`${styles.contentContainer} ${!isSelected ? styles.wide : ''}`}>
                {isSelected &&
                  <PreviewEvent
                    selectedEvent={selectedEvent}
                    onClose={() => setIsSelected(null)}
                  />
                }
                <ul className={styles.listContainer}>
                  <div className={styles.listTitles}>
                    <h1>Your event list</h1>
                    {!isSelected && <span>Click on an event to preview</span>}
                  </div>

                  {data.map(event =>
                    <EventListItem
                      key={event._id}
                      event={event}
                      onClick={() => handleSelected(event._id)}
                    />
                  )}
                </ul>
              </div>
            ) :
            <p>No data available...</p>
          }
        </>
      }
    </>
  );
}

export default EventList;