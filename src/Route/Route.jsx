import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import useAxiosCommon from '../hooks/useAxiosCommon';
import CandidateDashboard from '../layouts/CandidateDashboard';
import CompanyDashboard from '../layouts/CompanyDashboard';
import Root from '../layouts/Root';
import Auth from '../pages/Auth';
import CandidateAppliedJobs from '../pages/CandidateDashboard/CandidateAppliedJobs';
import CandidateBookmarkJobs from '../pages/CandidateDashboard/CandidateBookmarkJobs';
import CandidateJobAlert from '../pages/CandidateDashboard/CandidateJobAlert';
import CandidateOverview from '../pages/CandidateDashboard/CandidateOverview';
import CandidatePublicProfile from '../pages/CandidateDashboard/CandidatePublicProfile';
import CandidateSettingPersonal from '../pages/CandidateDashboard/CandidateSettingPersonal';
import CandidateSettings from '../pages/CandidateDashboard/CandidateSettings';
import Billing from '../pages/CompanyDashboard/Billing';
import Candidates from '../pages/CompanyDashboard/Candidates';
import CompanyMyJobs from '../pages/CompanyDashboard/CompanyMyJobs';
import CompanyOverview from '../pages/CompanyDashboard/CompanyOverview';
import CompanyPostJob from '../pages/CompanyDashboard/CompanyPostJob';
import CompanyProfile from '../pages/CompanyDashboard/CompanyProfile';
import CompanyTeam from '../pages/CompanyDashboard/CompanyTeam';
import CompanyFundingInfo from '../pages/CompanyDashboard/Settings/CompanyFundingInfo';
import CompanySettings from '../pages/CompanyDashboard/Settings/CompanySettings';
import CompanyDetails from '../pages/CompanyDetails';
import EmailVerification from '../pages/EmailVerification';
import FindCompanies from '../pages/FindCompanies';
import FindJob from '../pages/FindJob';
import ForgetPassword from '../pages/ForgetPassword';
import Home from '../pages/Home';
import JobDetails from '../pages/JobDetails';
import PaymentSuccess from '../pages/PaymentSuccess';
import AccountSettings from '../pages/shared/AccountSettings';
import SocialSettings from '../pages/shared/SocialSettings';
import CandidateSettingProfile from './../pages/CandidateDashboard/CandidateSettingProfile';
import CompanyInfo from './../pages/CompanyDashboard/Settings/CompanyInfo';
import Login from './../pages/Login';
import Register from './../pages/Register';
const axiosCommon = useAxiosCommon()

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
          element: <FindJob/>
        },
        {
          path: '/find_companies',
          element: <FindCompanies/>
        },
        {
          path: '/job/:id',
          // loader: () => axios.get(`http://localhost:5948/job/${params.id}`),
          element: <JobDetails/>
        },
        {
          path: '/company/:id',
          // loader: ({params})=> axiosCommon.get(`/companies?id=${params.id}`),
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
          path: '',
          element: <CandidateOverview/>
        },
        {
          path: 'applied_jobs',
          element: <CandidateAppliedJobs/>
        },
        {
          path: 'bookmark_jobs',
          element: <CandidateBookmarkJobs/>
        },
        {
          path: 'job_alert',
          element: <CandidateJobAlert/>
        },
        {
          path: 'public_profile',
          element: <CandidatePublicProfile/>
        },
        {
          path: 'settings',
          children: [
            {
              path: '',
              element: <CandidateSettingPersonal/>
            },
            {
              path: 'profile',
              element: <CandidateSettingProfile/>
            },
            {
              path: 'social',
              element: <SocialSettings/>
            },
            {
              path: 'setting',
              element: <AccountSettings/>
            },
          ],
          element: <CandidateSettings/>
        }
      ],
      element: <CandidateDashboard/>
    },
    {
      path: '/dashboard/company',
      element: <CompanyDashboard/>,
      children: [
        {
          path: '',
          element: <CompanyOverview/>
        },
        {
          path: 'post_job',
          element: <CompanyPostJob/>
        },
        {
          path: 'jobs',
          element: <CompanyMyJobs/>
        },
        {
          path: 'billing',
          element: <Billing/>
        },
        {
          path: 'team',
          element: <CompanyTeam/>
        },
        {
          path: 'settings',
          element: <CompanySettings/>,
          children: [
            {
              path: '',
              element: <CompanyInfo/>
            },
            {
              path: 'funding_info',
              element: <CompanyFundingInfo/>
            },
            {
              path: 'social',
              element: <SocialSettings/>
            },
            {
              path: 'setting',
              element: <AccountSettings/>
            },
          ]
        },
        {
          path: 'profile',
          element: <CompanyProfile/>
        },
        {
          path: 'candidates/:id',
          element: <Candidates/>
        }
      ],
    },
    {
      path: 'payment/success',
      element: <PaymentSuccess/>
    }
  ]);

export default Route