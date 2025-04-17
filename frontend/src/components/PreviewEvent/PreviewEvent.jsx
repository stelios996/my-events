import React, { useEffect, useState } from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {deleteEvent, getEvent, queryClient} from '../../api/api.js';
import PreviewImage from '../PreviewImage/PreviewImage.jsx';
import EventForm from '../EventForm/EventForm.jsx';
import { formatDate } from '../../util/util.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faClock, faLocationDot, faPen, faXmark, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from './PreviewEvent.module.css';

const PreviewEvent = ({eventId, onClose}) => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:5000';
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [isDeletePromptVisible, setIsDeletePromptVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

  useEffect(() => {
    setIsDeletePromptVisible(false);
    setIsUpdateFormVisible(false);
  }, [eventId]);

  const {data: selectedEvent, isLoading, isError: isFetchError, error: fetchError} = useQuery({
    queryKey: ['previewEvent', eventId],
    queryFn: ({signal}) => getEvent({id: eventId, signal}),
  });

  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: (id) => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['events']});
      queryClient.invalidateQueries({queryKey: ['eventsByMonth']});
      queryClient.invalidateQueries({queryKey: ['previewEvent']});
      setIsDeletePromptVisible(false);
      onClose();
    }
  });

  const handleDeletePrompt = () => {
    setIsDeletePromptVisible(!isDeletePromptVisible);
  };

  const handleDeleteEvent = () => {
    mutate(eventId);
  };

  const handleCloseImagePreview = (e) =>{
    if(e.target.tagName !== 'IMG')
      setIsPreviewImage(false);
  };

  if(isLoading){
    return <div className={`${styles.previewContainer} ${styles.extraHeight}`}>
      <p>Loading...</p>
    </div>;
  }

  if(isFetchError){
    return <div className={`${styles.previewContainer} ${styles.extraHeight}`}>
      <p>Error: {fetchError || 'An unknown error occurred when fetching'}</p>
    </div>;
  }

  if(!selectedEvent){
    return <div className={`${styles.previewContainer} ${styles.extraHeight}`}>
            <p>Event not found!</p>
      </div>;
  }

  return (
    <>
      <div className={styles.previewContainer}>
        {!isUpdateFormVisible ? (
          <>
            <div className={styles.imageContainer}>
              <div className={styles.imageOverlay}>
                <FontAwesomeIcon icon={faExpand} onClick={() => setIsPreviewImage(true)} />
              </div>
              <img src={`${backendBaseUrl}${selectedEvent.banner}`} alt={selectedEvent.title} />
            </div>

            <div className={styles.infoContainer}>
              <p className={styles.title}>{selectedEvent.title}</p>
              <p><FontAwesomeIcon icon={faClock} /> {formatDate(selectedEvent.date)} @ {selectedEvent.time} </p>
              <p><FontAwesomeIcon icon={faLocationDot} /> {selectedEvent.venue}</p>
            </div>

            {!isDeletePromptVisible ? (
              <div className={styles.buttonsContainer}>
                <button type='button' className={styles.editButton} onClick={() => setIsUpdateFormVisible(true)}><FontAwesomeIcon icon={faPen} /> Edit</button>
                <button type='button' className={styles.deleteButton} onClick={handleDeletePrompt}><FontAwesomeIcon icon={faXmark} /> Delete</button>
                <button type='button' className={styles.closeButton} onClick={onClose}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Close</button>
              </div>
            ) : (
              <div className={styles.deletePromptContainer}>
                {isPending && <p>Deleting, please wait...</p>}
                {!isPending && (
                  <>
                    <p>Are you sure you want to delete this event?</p>
                    <div className={styles.buttonsDeletePromptContainer}>
                      <button className={styles.deleteButton} type='button' onClick={handleDeleteEvent}> Yes</button>
                      <button className={styles.closeButton} type='button' onClick={handleDeletePrompt}> No</button>
                    </div>
                  </>
                )}
              </div>
            )}
            {isError && <p>Error: {error || 'An unknown error occurred when deleting'}</p>}
          </>
        ) :
          <EventForm onClose={() => setIsUpdateFormVisible(false)} submitButton='Update' eventData={selectedEvent}/>
        }
      </div>

      {isPreviewImage &&
        <PreviewImage imageSrc={`${backendBaseUrl}${selectedEvent.banner}`} onClose={handleCloseImagePreview}/>
      }
    </>
  );
}

export default PreviewEvent;