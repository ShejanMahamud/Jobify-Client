import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';
import Footer from './../components/Footer';

const Root = () => {

const {loading} = useAuth();  

  return (
    <>
    {
      loading ? <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
      <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
    </div>
    : 
      <>
    <Navbar/>
    <Outlet/>
    <Footer/>
      </>
    }

    </>
  )
}

export default Root