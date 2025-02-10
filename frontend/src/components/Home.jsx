import React from 'react';
import {Outlet} from 'react-router-dom';
import NavigationBar from './NavigationBar.jsx';

const Home = () => {
  return (
    <>
      <NavigationBar />
      <Outlet/>
    </>
  );
};

export default Home