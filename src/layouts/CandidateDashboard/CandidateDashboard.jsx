import React from 'react';
import { IoBookmarkOutline, IoBriefcaseOutline, IoSettingsOutline } from "react-icons/io5";
import { LuBellRing } from "react-icons/lu";
import { RiStackFill } from "react-icons/ri";
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../../components/Navbar';
const CandidateDashboard = () => {

  const currentYear = new Date().getFullYear();

  return (
    <>
    <Navbar/>
    <div className='w-full px-10 border-t border-[#E4E5E8] grid grid-cols-[20%_80%] row-auto items-start'>
    <div className='w-full py-5'>
      <h1 className='font-medium text-[#9199A3] text-sm uppercase mb-5'>Candidate Dashboard</h1>
      <div className='w-full flex flex-col items-start'>

        <NavLink
        end
            className={({ isActive }) =>
              isActive
                ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
            }
            to={"/dashboard/candidate"}
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
            to={"/dashboard/candidate/applied_jobs"}
          >
            <IoBriefcaseOutline className='text-xl'/>
          <span className='text-base'>Applied Jobs</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
            }
            to={"/dashboard/candidate/bookmark_jobs"}
          >
            <IoBookmarkOutline className='text-xl'/>
          <span className='text-base'>Bookmark Jobs</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
            }
            to={"/dashboard/candidate/job_alert"}
          >
            <LuBellRing className='text-xl'/>
          <span className='text-base'>Job Alert</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
            }
            to={"/dashboard/candidate/settings"}
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

export default CandidateDashboard