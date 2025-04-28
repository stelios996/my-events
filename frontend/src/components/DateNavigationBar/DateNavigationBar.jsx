import React, {useEffect} from 'react';
import styles from './DateNavigationBar.module.css';
import {format} from 'date-fns';
import {useForm} from 'react-hook-form';

const months = [...Array(12).keys()].map(i => ({
  value: i+1,
  label: format(new Date(0, i), 'MMMM')
}));

const currentYear = new Date().getFullYear();

const DateNavigationBar = ({onToday, onNavigate}) => {

  const {register, watch, reset} = useForm({
    defaultValues: {
      month: '',
      year: ''
    }
  });

  const month = watch('month');
  const year = watch('year');

  useEffect(() => {
    let delay = null;
    if(month && Number(year)>1900 && Number(year)<2300) {
      delay = setTimeout(() => {
        onNavigate(new Date(`${year}-${month}-01`));
        reset();
      }, 250);
    }

    return () => clearTimeout(delay);
  }, [month, year]);

  return (
    <div className={styles.dateNavigationContainer}>
      <button className={styles.navButton} onClick={onToday}> Today </button>

      <select className={styles.input} {...register('month')}>
        <option value=''>Select Month</option>
        {months.map(month => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>

      <input
        className={styles.input}
        type='number'
        min='1900'
        max='2300'
        placeholder={`ex. ${currentYear.toString()}`}
        {...register('year')}
      />
    </div>
  );
}

export default DateNavigationBar