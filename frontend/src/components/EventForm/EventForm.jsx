import React, {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {useMutation} from '@tanstack/react-query';
import {addEvent, updateEvent, queryClient} from '../../api/api.js';
import styles from './EventForm.module.css';

const EventForm = ({onClose, submitButton, eventData = {}}) => {
  const isUpdateMode = !!eventData._id;
  const {register, handleSubmit, reset, formState: {errors, isValid}, setValue} = useForm({mode: 'onChange', defaultValues: eventData});

  useEffect(() => {
    if(isUpdateMode && eventData) {
      for(let key in eventData)
        setValue(key, key === 'date' ? eventData[key].split("T")[0] : eventData[key]);
    }
  }, [eventData, setValue]);

  const {mutate, isPending, isError, error} = useMutation({
    mutationFn: (data) => {
      return isUpdateMode ? updateEvent(eventData._id, data) : addEvent(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['events']});
      onClose();
    }
  });

  const handleFormSubmission = (data) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('date', data.date);
    formData.append('time', data.time);
    formData.append('venue', data.venue);

    if (data.banner && data.banner.length)
      formData.append('banner', data.banner[0]);

    mutate(formData);
    reset();
  };

  return (
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
        <input type='file' id='banner' {...register('banner', {required: isUpdateMode ? false : 'required field'})}/>
        {errors.banner && <p className={styles.inputError}>{errors.banner.message}</p>}
      </div>

      {isPending && <p>Saving...</p>}
      {!isPending && (
        <div className={styles.formButtons}>
          <button type='submit' className={styles.submitButton} disabled={!isValid}>{submitButton}</button>
          <button type='button' className={styles.resetButton} onClick={() => reset()}>Reset</button>
          {isUpdateMode && <button type='button' className={styles.cancelButton} onClick={onClose}>Cancel</button>}
        </div>
      )}
      {isError && <p>Error: {error || 'An unknown error occurred'}</p>}
    </form>
  );
}

export default EventForm;