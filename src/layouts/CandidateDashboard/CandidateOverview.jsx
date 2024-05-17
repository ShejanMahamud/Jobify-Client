import React from 'react'
import useAuth from '../../hooks/useAuth'

const CandidateOverview = () => {

const {user} = useAuth()

  return (
    <div className='w-full h-full border-l border-[#e4e5e8] py-10 px-10'>
      <div className='flex flex-col items-start gap-2'>
        <h1 className='text-[#18191C] text-lg font-medium'>Hello, {user?.displayName}</h1>
        <p className='text-[#767F8C] text-sm'>Here is your daily activities and job alerts</p>
        <div className='w-full grid grid-cols-3 row-auto items-center justify-center gap-5 mt-10'>
          <div className='w-full px-5 py-5 flex items-center justify-between rounded-lg bg-[#E7F0FA]'>
            <div className='flex flex-col items-start gap-1'>
              <h1 className='text-[#18191C] text-2xl font-medium'>589</h1>
              <p className='text-[#18191C] text-sm'>Applied jobs</p>
            </div>
            <div className='bg-white h-16 w-16 flex items-center justify-center rounded-lg'>
              <img src="https://gist.github.com/ShejanMahamud/ad4ed54d0b760a23267a6350460d544e/raw/dcfefa6f824bf51e1cd89ca223d5667a8db18ee9/brifcase.svg" alt="" />
            </div>
          </div>

          <div className='w-full px-5 py-5 flex items-center justify-between rounded-lg bg-[#FFF6E6]'>
            <div className='flex flex-col items-start gap-1'>
              <h1 className='text-[#18191C] text-2xl font-medium'>223</h1>
              <p className='text-[#18191C] text-sm'>Favorite jobs</p>
            </div>
            <div className='bg-white h-16 w-16 flex items-center justify-center rounded-lg'>
              <img src="https://gist.github.com/ShejanMahamud/626e0ea200b61fbf105e343d8a0e3b6d/raw/51ba921312fd65559c411b045a72cf034a8d3617/bookmark.svg" alt="" />
            </div>
          </div>

          <div className='w-full px-5 py-5 flex items-center justify-between rounded-lg bg-[#E7F6EA]'>
            <div className='flex flex-col items-start gap-1'>
              <h1 className='text-[#18191C] text-2xl font-medium'>123</h1>
              <p className='text-[#18191C] text-sm'>Job Alert</p>
            </div>
            <div className='bg-white h-16 w-16 flex items-center justify-center rounded-lg'>
              <img src="https://gist.github.com/ShejanMahamud/c8440b212d765d9a54f95e221e53f030/raw/418a09e6c4b2e38f08dd0bf274fbd72ad1fd1dd2/bell.svg" alt="" />
            </div>
          </div>
        </div>
        <div className='w-full bg-[#E05151] px-5 py-5 rounded-lg flex items-center justify-between mt-10'>
          <div className='flex items-center gap-3'>
            <img src={user?.photoURL} alt="user.png" className='w-14 h-14 rounded-full'/>
            <div className='flex flex-col items-start gap-1'>
              <h1 className='text-lg font-medium text-white'>Your profile editing is not completed.</h1>
              <h1 className='text-xs text-white'>Complete your profile editing & build your custom Resume</h1>
            </div>
          </div>
            <button className='px-3 py-2 rounded-sm text-[#E05151] bg-white font-medium flex items-center gap-1'>
              <span>Edit Profile</span>
            <img src="https://gist.github.com/ShejanMahamud/75c0ff3a427e791882df08982b477d2e/raw/41df9e052f5e5c4f7465fd8f4bcce8e0e717ec61/arrow.svg" alt="" />
            </button>
        </div>
        <div className='w-full flex items-center justify-between mt-10'>
          <h1 className='text-[#18191C] font-medium'>Recently Applied</h1>
          <button className='px-3 py-2 rounded-sm text-[#767F8C] bg-white font-medium flex items-center text-base gap-1'>
              <span>View All</span>
            <img src="https://gist.github.com/ShejanMahamud/1399583e909469763ef617ecfacbda0a/raw/64c4e6b2aac0185c3dfd4d8831585d40b6ea923a/arrow.svg" alt="" />
            </button>
        </div>
      </div>
    </div>
  )
}

export default CandidateOverview