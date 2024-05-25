import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentSuccess = () => {
    const navigate = useNavigate()
  return (
    <div className='w-full min-h-screen flex items-center justify-center flex-col'>
<img src="https://i.ibb.co/n8C94D1/Status-update-bro-1.png" alt="" />
<h1 className='text-2xl mt-5 font-medium'>Your Payment Successfully Recieved!</h1>
<button onClick={()=>navigate('/dashboard/company/billing')} className='bg-primary text-white font-medium px-4 py-2 rounded-md mt-5'>Go To Billing</button>
    </div>
  )
}

export default PaymentSuccess