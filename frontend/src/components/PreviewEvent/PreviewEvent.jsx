import React from 'react';
import styles from './PreviewEvent.module.css';
import {formatDate} from "../../util/util.js";

const PreviewEvent = ({selectedEvent, onClose}) => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:5000';

  return (
    <div className={styles.previewContainer}>
      {!selectedEvent && <p>Click on an event to view the details</p>}
      {selectedEvent && (
        <>
          <div className={styles.imageContainer}>
            <img src={`${backendBaseUrl}${selectedEvent.banner}`} alt={selectedEvent.title} />
          </div>
          <p className={styles.title}>{selectedEvent.title}</p>
          <p>{formatDate(selectedEvent.date)} @ {selectedEvent.time} </p>
          <p>{selectedEvent.venue}</p>
        </>
      )}
      <button type='button' onClick={onClose}>Close Preview</button>
    </div>
  );
}

export default PreviewEvent;