import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root';
import Auth from '../pages/Auth';
import EmailVerification from '../pages/EmailVerification';
import ForgetPassword from '../pages/ForgetPassword';
import Home from '../pages/Home';
import Login from './../pages/Login';
import Register from './../pages/Register';

const Route = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: '/',
          element: <Home/>
        }
      ]
    },
    {
      path: '/login',
      element: <Login/>
    },
    {
      path: '/register',
      element: <Register/>
    },
    {
      path: '/email_verification',
      element: <EmailVerification/>
    },
    {
      path: '/forget_password',
      element: <ForgetPassword/>
    },
    {
      path: '/auth/__/auth/action',
      element: <Auth/>
    }
  ]);

export default Route