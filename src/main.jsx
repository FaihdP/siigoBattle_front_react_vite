import React from 'react';
import ReactDOM from 'react-dom/client';
import './public/index.css';
import { ContextProvider } from "./context/Context";
import { RouterProvider } from 'react-router-dom';
import router from './routes/routes'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router}/>
    </ContextProvider>
  </React.StrictMode>
);
