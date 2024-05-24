import React from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { IoBookmarkOutline, IoBriefcaseOutline, IoSettingsOutline } from "react-icons/io5";
import { LiaWalletSolid } from "react-icons/lia";
import { LuUser2, LuUserCircle2 } from "react-icons/lu";
import { RiStackFill } from "react-icons/ri";
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useAuth from '../hooks/useAuth';

const CompanyDashboard = () => {
  const {loading} = useAuth()
  const currentYear = new Date().getFullYear();


  if(loading){
    return <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
  </div>
  }

  return (
    <>
    <Navbar/>
    <div className='w-full px-10 border-t border-[#E4E5E8] grid grid-cols-[20%_80%] row-auto items-start'>
    <div className='w-full py-5'>
      <h1 className='font-medium text-[#9199A3] text-sm uppercase mb-5'>Company Dashboard</h1>
      <div className='w-full flex flex-col items-start'>

        <NavLink
        end
            className={({ isActive }) =>
              isActive
                ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
            }
            to={"/dashboard/company"}
          >
            <RiStackFill className='text-xl'/>
          <span className='text-base'>Overview</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
            }
            to={"/dashboard/company/profile"}
          >
            <LuUserCircle2 className='text-xl'/>
          <span className='text-base'>Company Profile</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
            }
            to={"/dashboard/company/post_job"}
          >
            <FiPlusCircle className='text-xl'/>
          <span className='text-base'>Post A Job</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
            }
            to={"/dashboard/company/jobs"}
          >
            <IoBriefcaseOutline className='text-xl'/>
          <span className='text-base'>My Jobs</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
            }
            to={"/dashboard/company/saved_candidates"}
          >
            <IoBookmarkOutline className='text-xl'/>
          <span className='text-base'>Saved Candidate</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
            }
            to={"/dashboard/company/candidates"}
          >
            <LuUser2 className='text-xl'/>
          <span className='text-base'>Candidates</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
            }
            to={"/dashboard/company/billing"}
          >
            <LiaWalletSolid className='text-xl'/>
          <span className='text-base'>Plan & Billings</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
            }
            to={"/dashboard/company/settings"}
          >
            <IoSettingsOutline className='text-xl'/>
          <span className='text-base'>Settings</span>
          </NavLink>
      </div>
    </div>
    <Outlet/>
    </div>
    <div className='w-full border-t border-[#E4E5E8] flex items-center justify-center py-5'>
            <p className='text-[#767F8C] text-sm'>@ {currentYear} Jobify - Job Portal. All rights Reserved</p>
    </div>
    </>
  )
}

export default CompanyDashboard