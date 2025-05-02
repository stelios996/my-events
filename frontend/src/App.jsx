import './App.css'
import {lazy, Suspense} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './components/Home/Home.jsx';

const EventList = lazy(() => import('./components/EventList/EventList.jsx'));
const Calendar = lazy(() => import('./components/Calendar/Calendar.jsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <EventList />
          </Suspense>
        )
      },
      {
        path: 'calendar',
        element: (
          <Suspense fallback={<p>Loading...</p>}>
            <Calendar />
          </Suspense>
        )
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router} />;
}

export default App
