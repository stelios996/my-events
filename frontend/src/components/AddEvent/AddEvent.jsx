import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import styles from './AddEvent.module.css';

const AddEvent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {register, handleSubmit, reset, formState: {errors, isValid}} = useForm({mode: 'onChange'});

  const handleFormSubmission = (data) => {
    console.log(data);
    reset();
    //setIsOpen(!isOpen);
  };

  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ''}`}>
      <div className={styles.handler} onClick={() => setIsOpen(!isOpen)}>
        <span>{isOpen ? 'Show less' : 'Add event'}</span>
      </div>

      <div className={styles.formContainer}>
        <h4>Fill in the event details</h4>
        <form onSubmit={handleSubmit(handleFormSubmission)}>
          <div className={styles.inputContainer}>
            <label htmlFor='title'>Title:</label>
            <input type='text' id='title' {...register('title', {required: 'required field'})}/>
            {errors.title && <p className={styles.inputError}>{errors.title.message}</p>}
          </div>

          <fieldset>
            <div className={styles.inputContainer}>
              <label htmlFor='date'>Date:</label>
              <input type='date' id='date' {...register('date', {required: 'required field'})}/>
              {errors.date && <p className={styles.inputError}>{errors.date.message}</p>}
            </div>

            <div className={styles.inputContainer}>
              <label htmlFor='time'>Time:</label>
              <input type='time' id='time' {...register('time', {required: 'required field'})}/>
              {errors.time && <p className={styles.inputError}>{errors.time.message}</p>}
            </div>
          </fieldset>

          <div className={styles.inputContainer}>
            <label htmlFor='venue'>Venue:</label>
            <input type='text' id='venue' {...register('venue', {required: 'required field'})}/>
            {errors.venue && <p className={styles.inputError}>{errors.venue.message}</p>}
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor='banner'>Photo:</label>
            <input type='file' id='banner' {...register('banner', {required: 'required field'})}/>
            {errors.banner && <p className={styles.inputError}>{errors.banner.message}</p>}
          </div>

          <div className={styles.formButtons}>
            <button type='submit' className={styles.submitButton} disabled={!isValid}>Add</button>
            <button type='button' className={styles.resetButton} onClick={() => reset()}>Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEvent