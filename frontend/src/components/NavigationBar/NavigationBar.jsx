import React from 'react';
import styles from './NavigationBar.module.css';
import {NavLink} from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src='/logo.png' alt='App Logo' />
      </div>

      <ul className={styles.navLinks}>
        <li>
          <NavLink to='/' end className={ ({isActive}) => isActive ? styles.active : '' }>List</NavLink>
        </li>
        <li>
          <NavLink to='/calendar' className={ ({isActive}) => isActive ? styles.active : '' }>Calendar</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default NavigationBar