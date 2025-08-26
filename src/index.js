import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import './css/index.css';

import Apps from './components/Apps';
import Games from './components/Games';
import NotFound404 from './components/NotFound404';
import MainPage from './components/MainPage';

const router = createHashRouter([
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

(function(url){
  const img = new Image();

  img.onload = async function() {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const buffer = await response.arrayBuffer();
      const base64String = btoa(
        new Uint8Array(buffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      console.log(
        '%c ', [
          'overflow: visible',
          'font-size: 1px;',
          'padding: 0px 119px;',
          'line-height: 200px;',
          'background-size: contain;',
          `background: url(data:image/gif;base64,${base64String});`
        ].join(' ')
      );
    } catch (error) {
      console.error("Error converting remote GIF:", error);
    }
  };
  img.crossOrigin='anonymous';
  img.src = url;
})('https://i.giphy.com/Mykt45IfyC6qc.webp');
