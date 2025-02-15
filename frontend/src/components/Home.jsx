import React from 'react';
import {Outlet} from 'react-router-dom';
import useFetch from '../hooks/useFetch.jsx';
import NavigationBar from './NavigationBar/NavigationBar.jsx';
import AddEvent from './AddEvent/AddEvent.jsx';

const Home = () => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const [data, loading, error] = useFetch(`${backendBaseUrl}events`);

  if(loading)
    return <p>Loading...</p>;

  if(error)
    return <p>Error: {error}</p>;

  return (
    <>
      <NavigationBar />
      <Outlet/>
      {data && data.length === 0 && <p>No data available</p>}
      {data && data.length > 0 &&
        <ul>
          {data.map(event =>
            <li key={event._id}> Title: {event.title} - Date: {event.date} - Time: {event.time} - Venue: {event.venue} - Banner: {event.banner}</li>
          )}
        </ul>
      }
      <AddEvent />
    </>
  );
};

export default Home