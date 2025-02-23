import React from 'react';
import {Outlet} from 'react-router-dom';
import NavigationBar from '../NavigationBar/NavigationBar.jsx';
import AddEvent from '../AddEvent/AddEvent.jsx';
import styles from './Home.module.css';

const Home = () => {

  return (
    <>
      <NavigationBar />
      <div className={styles.contentContainer}>
        <Outlet/>
      </div>
      <AddEvent />
    </>
  );
};

export default Home;