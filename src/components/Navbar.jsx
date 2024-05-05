import React from 'react';
import { MdOutlineWifiCalling3 } from "react-icons/md";
import { NavLink } from 'react-router-dom';

const Navbar = () => {


  return (
    <nav className='bg-[#F1F2F4] flex flex-col items-center w-full font-inter'>
<div className='w-full flex items-center justify-between px-10 py-3'>
<ul className='flex items-center gap-10'>
<NavLink
            className={({ isActive }) =>
              isActive
                ? "underline decoration-primary decoration-2 underline-offset-8 text-primary"
                : "no-underline text-[#5E6670]"
            }
            to={"/"}
          >
            <li className=" font-medium text-sm cursor-pointer">
             Home
            </li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline decoration-primary decoration-2 underline-offset-8 text-primary"
                : "no-underline text-[#5E6670]"
            }
            to={"/find_jobs"}
          >
            <li className=" font-medium text-sm cursor-pointer">
             Find Jobs
            </li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline decoration-primary decoration-2 underline-offset-8 text-primary"
                : "no-underline text-[#5E6670]"
            }
            to={"/employers"}
          >
            <li className=" font-medium text-sm cursor-pointer">
             Employers
            </li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline decoration-primary decoration-2 underline-offset-8 text-primary"
                : "no-underline text-[#5E6670]"
            }
            to={"/candidates"}
          >
            <li className=" font-medium text-sm cursor-pointer">
            Candidates
            </li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline decoration-primary decoration-2 underline-offset-8 text-primary"
                : "no-underline text-[#5E6670]"
            }
            to={"/plans"}
          >
            <li className=" font-medium text-sm cursor-pointer">
             Pricing Plans
            </li>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "underline decoration-primary decoration-2 underline-offset-8 text-primary"
                : "no-underline text-[#5E6670]"
            }
            to={"/customer"}
          >
            <li className=" font-medium text-sm cursor-pointer">
            Customer Supports
            </li>
          </NavLink>
</ul>
<div className='flex items-center gap-8'>
  <div className='flex items-center gap-2 text-[#18191C]'>
  <MdOutlineWifiCalling3 className='text-lg'/>
  <span className='text-sm'>+880171247834</span>
  </div>
  <div className='flex items-center gap-2 text-[#5E6670]'>
  <img src="https://i.ibb.co/vJ8M2YP/43d255771eddeabef4fc0f2b7665e469.png" alt="" className='w-7'/>
  <span className='text-sm'>English</span>
  </div>
</div>
</div>
<div className='w-full bg-white px-20 flex items-center justify-between py-4'>
  <div className='flex items-center gap-10'>
    <div className='flex items-center gap-2'>
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <g clip-path="url(#clip0_2202_13434)">
    <path d="M33.751 11.25H6.25098C5.56062 11.25 5.00098 11.8097 5.00098 12.5V32.5C5.00098 33.1904 5.56062 33.75 6.25098 33.75H33.751C34.4413 33.75 35.001 33.1904 35.001 32.5V12.5C35.001 11.8097 34.4413 11.25 33.751 11.25Z" stroke="#0A65CC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M26.25 11.25V8.75C26.25 8.08696 25.9866 7.45107 25.5178 6.98223C25.0489 6.51339 24.413 6.25 23.75 6.25H16.25C15.587 6.25 14.9511 6.51339 14.4822 6.98223C14.0134 7.45107 13.75 8.08696 13.75 8.75V11.25" stroke="#0A65CC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M35.0012 19.7358C30.4423 22.3734 25.2669 23.7583 20 23.75C14.7339 23.7583 9.55935 22.3739 5.00098 19.7371" stroke="#0A65CC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.125 18.75H21.875" stroke="#0A65CC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_2202_13434">
      <rect width="40" height="40" fill="white"/>
    </clipPath>
  </defs>
</svg>
<span className="text-xl font-medium">Jobify</span>
    </div>
    <form className='border border-[#E4E5E8] px-5 py-2 rounded-md flex items-center gap-3 w-full'>
      <div className='inline-flex items-center gap-3'>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<input type="text" className='bg-transparent focus:outline-none placeholder:text-sm' required placeholder='Country'/>
      </div>
      <div className='w-[2px] h-[20px] bg-[#E4E5E8]'>

      </div>
      <div className='flex items-center gap-3'>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 21L16.65 16.65" stroke="#0066FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<input type="text" className='bg-transparent focus:outline-none placeholder:text-sm' required placeholder='Job Title, Role'/>
      </div>
      <button className='bg-primary px-4 py-2 rounded-md text-white font-medium'>Find</button>
    </form>
  </div>
  <div className='flex items-center gap-5'>
    <button className='border border-[#CEE0F5] px-4 py-2 font-medium rounded-md text-primary'>Sign In</button>
    <button className='bg-primary text-white px-4 py-2 rounded-md font-medium'>Post A Job</button>
  </div>
</div>
    </nav>
  );
}

export default Navbar;
