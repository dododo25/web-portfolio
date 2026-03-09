import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import NotFound404 from './NotFound404';
import WebPortfolio from './apps/web-portfolio/components/WebPortfolio';
import Apps from './apps/web-portfolio/components/Apps';
import Games from './apps/web-portfolio/components/Games';

const router = createHashRouter([
  {
    path: '/',
    errorElement: <NotFound404 />,
    children: [
      {
        path: '/',
        element: <WebPortfolio />,
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
          'padding: 100px 120px',
          `background: url(data:image/gif;base64,${base64String})`,
          'background-size: cover'
        ].join(';')
      );
    } catch (error) {
      console.error("Error converting remote GIF:", error);
    }
  };
  img.crossOrigin='anonymous';
  img.src = url;
})('https://i.giphy.com/Mykt45IfyC6qc.webp');
