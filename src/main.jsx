import axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider
} from "react-router-dom";
import Route from './Route/Route.jsx';
import './index.css';
import AuthProvider from './providers/AuthProvider.jsx';
axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={Route} />
    </AuthProvider>
  </React.StrictMode>
);
