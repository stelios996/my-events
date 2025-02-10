import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import EventList from './components/EventList.jsx';
import Calendar from './components/Calendar.jsx';
import Home from './components/Home.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {path: '', element: <EventList />},
      {path: 'calendar', element: <Calendar />}
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App
