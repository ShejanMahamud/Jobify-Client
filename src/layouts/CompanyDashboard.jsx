import React, { useState } from 'react';
import { FiPlusCircle } from "react-icons/fi";
import { IoBookmarkOutline, IoBriefcaseOutline, IoCloseOutline, IoMenuOutline, IoSettingsOutline } from "react-icons/io5";
import { LiaWalletSolid } from "react-icons/lia";
import { LuUserCircle2 } from "react-icons/lu";
import { PiUsers } from "react-icons/pi";
import { RiStackFill } from "react-icons/ri";
import { NavLink, Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import useUserInfo from '../hooks/useUserInfo';

const CompanyDashboard = () => {
  const { loading } = useUserInfo();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  if (loading) {
    return (
      <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="w-full h-screen md:grid md:grid-cols-[20%_80%] border-t border-[#E4E5E8]">
        <button
          className="md:hidden fixed top-2 z-50 bg-primary text-white p-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <IoCloseOutline /> : <IoMenuOutline />}
        </button>

        <div className={`fixed md:static top-0 left-0 w-full h-full bg-white py-10 px-5 md:px-3 lg:px-5 transform transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 z-20`}>
          <h1 className="font-medium text-[#9199A3] text-sm uppercase mb-5">Company Dashboard</h1>
          <div className="w-full flex flex-col items-start">
            <NavLink
              end
              className={({ isActive }) =>
                isActive
                  ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                  : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
              }
              to={"/dashboard/company"}
            >
              <RiStackFill className="text-xl" />
              <span className="text-base">Overview</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                  : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
              }
              to={"/dashboard/company/profile"}
            >
              <LuUserCircle2 className="text-xl" />
              <span className="text-base">Company Profile</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                  : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
              }
              to={"/dashboard/company/post_job"}
            >
              <FiPlusCircle className="text-xl" />
              <span className="text-base">Post A Job</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                  : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
              }
              to={"/dashboard/company/jobs"}
            >
              <IoBriefcaseOutline className="text-xl" />
              <span className="text-base">My Jobs</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                  : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
              }
              to={"/dashboard/company/saved_candidates"}
            >
              <IoBookmarkOutline className="text-xl" />
              <span className="text-base">Saved Candidate</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                  : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
              }
              to={"/dashboard/company/team"}
            >
              <PiUsers className="text-xl" />
              <span className="text-base">Team</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                  : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
              }
              to={"/dashboard/company/billing"}
            >
              <LiaWalletSolid className="text-xl" />
              <span className="text-base">Plan & Billings</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "bg-[#E7F0FA] text-primary w-full flex items-center gap-3 py-3 px-3"
                  : "w-full flex items-center gap-3 py-3 px-3 text-[#767F8C]"
              }
              to={"/dashboard/company/settings"}
            >
              <IoSettingsOutline className="text-xl" />
              <span className="text-base">Settings</span>
            </NavLink>
          </div>
        </div>

        <div className="col-start-2 col-span-1 h-full z-10 overflow-y-auto" style={{scrollbarWidth: "none"}}>
          <Outlet />
          <div className="w-full border-t border-[#E4E5E8] flex items-center justify-center py-5">
            <p className="text-[#767F8C] text-sm">@ {currentYear} Jobify - Job Portal. All rights Reserved</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyDashboard;
