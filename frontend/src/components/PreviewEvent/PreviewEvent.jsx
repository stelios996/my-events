import React, { useEffect, useState } from 'react';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { deleteEvent } from '../../api/api.js';
import PreviewImage from '../PreviewImage/PreviewImage.jsx';
import EventForm from '../EventForm/EventForm.jsx';
import { formatDate } from '../../util/util.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faClock, faLocationDot, faPen, faXmark, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from './PreviewEvent.module.css';

const PreviewEvent = ({selectedEvent, onClose}) => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:5000';
  const queryClient = useQueryClient();
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [isDeletePromptVisible, setIsDeletePromptVisible] = useState(false);
  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);

  useEffect(() => {
    setIsDeletePromptVisible(false);
    setIsUpdateFormVisible(false);
  }, [selectedEvent]);

  const handleCloseImagePreview = (e) =>{
    if(e.target.tagName !== 'IMG')
      setIsPreviewImage(false);
  };

  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: (id) => deleteEvent(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      setIsDeletePromptVisible(false);
      onClose();
    }
  });

  const handleDeletePrompt = () => {
    setIsDeletePromptVisible(!isDeletePromptVisible);
  };

  const handleDeleteEvent = () => {
    mutate(selectedEvent._id);
  };

  return (
    <div className={styles.previewContainer}>
      {selectedEvent && !isUpdateFormVisible && (
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
          {!isDeletePromptVisible && (
            <div className={styles.buttonsContainer}>
              <button className={styles.editButton} type='button' onClick={() => setIsUpdateFormVisible(true)}><FontAwesomeIcon icon={faPen} /> Edit</button>
              <button className={styles.deleteButton} type='button' onClick={handleDeletePrompt}><FontAwesomeIcon icon={faXmark} /> Delete</button>
              <button className={styles.closeButton} type='button' onClick={onClose}><FontAwesomeIcon icon={faArrowRightFromBracket} /> Close</button>
            </div>
          )}
          {isDeletePromptVisible && (
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
          {isPreviewImage && <PreviewImage imageSrc={`${backendBaseUrl}${selectedEvent.banner}`} onClose={handleCloseImagePreview}/>}
        </>
      )}
      {selectedEvent && isUpdateFormVisible && (
        <div className={styles.updateFormContainer}>
          <h4>Edit the fields you want to update</h4>
          <EventForm onClose={() => setIsUpdateFormVisible(false)} submitButton='Update' eventData={selectedEvent}/>
        </div>
      )}
    </div>
  );
}

export default PreviewEvent;