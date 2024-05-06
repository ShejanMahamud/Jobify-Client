import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Utils/Logo';

const EmailVerification = () => {

const navigate = useNavigate();

  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-start gap-40'>
        <Logo/>
        <div className='flex flex-col items-center gap-5'>
            <h1 className='text-3xl font-medium'>Email Verification</h1>
            <p className='text-[#767F8C] w-1/2'>We've sent an verification to your email. Verify your email address and activate your account.</p>
            {/* <p className='text-[#767F8C]'>Didn’t receive any email! <span className='text-primary font-medium'>Resend</span></p> */}
            <button onClick={()=>navigate('/')} className='bg-primary text-white font-medium uppercase px-4 py-2 rounded-lg'>Back To Home</button>
        </div>
    </div>
  )
}

export default EmailVerification