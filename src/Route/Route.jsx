import axios from 'axios';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import CandidateDashboard from '../layouts/CandidateDashboard/CandidateDashboard';
import CandidateOverview from '../layouts/CandidateDashboard/CandidateOverview';
import Root from '../layouts/Root';
import Auth from '../pages/Auth';
import CompanyDetails from '../pages/CompanyDetails';
import EmailVerification from '../pages/EmailVerification';
import FindCompanies from '../pages/FindCompanies';
import FindJob from '../pages/FindJob';
import ForgetPassword from '../pages/ForgetPassword';
import Home from '../pages/Home';
import JobDetails from '../pages/JobDetails';
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
        },
        {
          path: '/find_jobs',
          loader: ()=> fetch(`http://localhost:5948/jobs_count`),
          element: <FindJob/>
        },
        {
          path: '/find_companies',
          element: <FindCompanies/>
        },
        {
          path: '/job/:id',
          loader: ({params}) => axios.get(`http://localhost:5948/job/${params.id}`),
          element: <JobDetails/>
        },
        {
          path: '/company/:id',
          loader: ({params})=> axios.get(`http://localhost:5948/company/${params.id}`),
          element: <CompanyDetails/>
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
    },
    {
      path: '/dashboard/candidate',
      children: [
        {
          path: '/dashboard/candidate/overview',
          element: <CandidateOverview/>
        }
      ],
      element: <CandidateDashboard/>
    }
  ]);

export default Route