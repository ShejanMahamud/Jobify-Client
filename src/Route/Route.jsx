import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root';
import EmailVerification from '../pages/EmailVerification';
import ForgetPassword from '../pages/ForgetPassword';
import Home from '../pages/Home';
import ResetPassword from '../pages/ResetPassword';
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
      path: '/email',
      element: <EmailVerification/>
    },
    {
      path: '/forget_password',
      element: <ForgetPassword/>
    },
    {
      path: 'reset_password',
      element: <ResetPassword/>
    }
  ]);

export default Route