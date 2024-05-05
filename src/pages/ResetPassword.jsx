import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Utils/Logo'

const ResetPassword = () => {
  return (
    <div className='w-full min-h-screen flex flex-col items-center gap-5 justify-center font-inter'>
    <Logo/>
    <div className='flex flex-col items-center w-full gap-5'>
        <h1 className='text-3xl font-medium text-[#18191C]'>Reset Password</h1>
        <p className='text-[#767F8C] w-[30%] text-center mb-3'>Duis luctus interdum metus, ut consectetur ante consectetur sed. Suspendisse euismod viverra massa sit amet mollis.</p>
        <form className='w-[30%] flex flex-col gap-5'>
        <input type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  dark:text-gray-300  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 placeholder:text-sm" placeholder='New Password'/>
    <input type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  dark:text-gray-300  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 placeholder:text-sm" placeholder='Confirm Password'/>
    <button className='bg-primary text-white font-medium uppercase px-4 py-2 rounded-lg w-full flex items-center justify-center gap-5'>
        <span className='text-sm'>Reset Password</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5 12H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5L19 12L12 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
    </button>
        </form>
        <p class=" text-sm font-light text-center text-[#767F8C]">Go back to <Link to="/login" class="font-medium text-primary hover:underline"> Login</Link></p>
    </div>
</div>
  )
}

export default ResetPassword