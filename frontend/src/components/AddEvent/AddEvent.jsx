import React, {useState} from 'react';
import EventForm from '../EventForm/EventForm.jsx';
import styles from './AddEvent.module.css';

const AddEvent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
      <div className={styles.handler} onClick={() => setIsOpen(!isOpen)}>
        <span>{isOpen ? 'Show less' : 'Add event'}</span>
      </div>

      <div className={styles.formContainer}>
        <h4>Fill in the event details</h4>
        <EventForm
          onClose={() => setIsOpen(false)}
          submitButton='Add'
        />
      </div>
    </div>
  );
}

export default AddEvent;