import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './css/index.css';

import Apps from './components/Apps';
import Games from './components/Games';
import NotFound404 from './components/NotFound404';
import MainPage from './components/MainPage';

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <NotFound404 />,
    children: [
      {
        path: '/',
        element: <MainPage />
      },
      {
        path: '/apps',
        element: <Apps />
      },
      {
        path: '/games',
        element: <Games />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
