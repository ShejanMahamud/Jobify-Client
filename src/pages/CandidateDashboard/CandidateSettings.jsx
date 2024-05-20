import React from 'react';
import { AiOutlineUser } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { IoIosGlobe } from "react-icons/io";
import { LuSettings } from "react-icons/lu";
import { NavLink, Outlet } from 'react-router-dom';

const CandidateSettings = () => {
  return (
    <div className='  font-inter px-5 border-l border-[#e4e5e8] min-h-screen py-5'>
      <h1 className='text-xl text-[#18191C] font-medium'>Settings</h1>
      <div className='  flex flex-row items-center gap-10 my-10'>

      <NavLink
        end
            className={({ isActive }) =>
              isActive
                ? " underline decoration-primary decoration-2 underline-offset-8 text-primary flex items-center gap-1"
                : "  flex items-center gap-1 text-[#767F8C]"
            }
            to={"/dashboard/candidate/settings"}
          >
            <AiOutlineUser className='text-xl'/>
          <span className='text-base'>Personal</span>
          </NavLink>

        <NavLink
        
            className={({ isActive }) =>
              isActive
                ? "underline decoration-primary decoration-2 underline-offset-8 text-primary flex items-center gap-1"
                : "  flex items-center gap-1 text-[#767F8C]"
            }
            to={"/dashboard/candidate/settings/profile"}
          >
            <FaRegCircleUser className='text-xl'/>
          <span className='text-base'>Profile</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline decoration-primary decoration-2 underline-offset-8 text-primary flex items-center gap-1"
                : "  flex items-center gap-1 text-[#767F8C]"
            }
            to={"/dashboard/candidate/settings/social"}
          >
            <IoIosGlobe className='text-xl'/>
          <span className='text-base'>Social Links</span>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline decoration-primary decoration-2 underline-offset-8 text-primary flex items-center gap-1"
                : "  flex items-center gap-1 text-[#767F8C]"
            }
            to={"/dashboard/candidate/settings/setting"}
          >
            <LuSettings className='text-xl'/>
          <span className='text-base'>Setting</span>
          </NavLink>

      </div>
      <Outlet/>
    </div>
  )
}

export default CandidateSettings