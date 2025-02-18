import React from 'react';
import {formatDate} from '../../util/util.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faClock, faLocationDot, faPen, faXmark, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from './PreviewEvent.module.css';

const PreviewEvent = ({selectedEvent, onClose}) => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:5000';

  return (
    <div className={styles.previewContainer}>
      {!selectedEvent && <p>Click on an event to view the details</p>}
      {selectedEvent && (
        <>
          <div className={styles.imageContainer}>
            <div className={styles.imageOverlay}><FontAwesomeIcon icon={faExpand}/></div>
            <img src={`${backendBaseUrl}${selectedEvent.banner}`} alt={selectedEvent.title}/>
          </div>
          <div className={styles.infoContainer}>
            <p className={styles.title}>{selectedEvent.title}</p>
            <p><FontAwesomeIcon icon={faClock}/> {formatDate(selectedEvent.date)} @ {selectedEvent.time} </p>
            <p><FontAwesomeIcon icon={faLocationDot}/> {selectedEvent.venue}</p>
          </div>
          <div className={styles.buttonsContainer}>
            <button className={styles.editButton} type='button'><FontAwesomeIcon icon={faPen}/> Edit</button>
            <button className={styles.deleteButton} type='button'><FontAwesomeIcon icon={faXmark}/> Delete</button>
            <button className={styles.closeButton} type='button' onClick={onClose}><FontAwesomeIcon icon={faArrowRightFromBracket}/> Close</button>
          </div>
        </>
      )}

    </div>
  );
}

export default PreviewEvent;