import React from 'react';
import {Outlet} from 'react-router-dom';
import NavigationBar from './NavigationBar/NavigationBar.jsx';
import AddEvent from './AddEvent/AddEvent.jsx';

const Home = () => {

  return (
    <>
      <NavigationBar />
      <Outlet/>
      <AddEvent />
    </>
  );
};

export default Home;