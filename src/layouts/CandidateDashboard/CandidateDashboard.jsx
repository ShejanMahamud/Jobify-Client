import React from 'react'
import { Outlet } from 'react-router-dom'
import SideNav from './SideNav'

const CandidateDashboard = () => {
  return (
    <div className='w-full grid grid-cols-[20%_80%] grid-rows-1 items-start border border-red-500'>
    <SideNav/>
    <Outlet/>
    </div>
  )
}

export default CandidateDashboard