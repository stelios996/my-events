import React from 'react';
import {NavLink} from 'react-router-dom';

const NavigationBar = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <NavLink to='/' end>List</NavLink>
          </li>
          <li>
            <NavLink to='/calendar'>Calendar</NavLink>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default NavigationBar