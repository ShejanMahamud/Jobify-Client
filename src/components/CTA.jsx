import React from 'react'

const CTA = () => {
  return (
    <div className='w-full my-28 font-inter lg:px-20 px-10 grid lg:grid-cols-2 grid-cols-1 row-auto items-center gap-10'>
        <div className='bg-[#E4E5E8] rounded-lg lg:p-10 p-5 flex items-start flex-col gap-3'>
            <h1 className='text-lg lg:text-2xl font-medium mb-3'>Become a Candidate</h1>
            <p className='text-[#636A80] text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur.</p>
            <button className='flex items-center gap-3 text-sm lg:text-base text-primary font-medium bg-white px-4 py-2'>
                <span>Register Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5 12H19" stroke="#0A65CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 5L19 12L12 19" stroke="#0A65CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </button>
        </div>
        <div className='bg-primary rounded-lg lg:p-10 p-5 flex items-start flex-col gap-3'>
            <h1 className='text-lg lg:text-2xl font-medium mb-3 text-white'>Become a Company</h1>
            <p className='text-white opacity-80 text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras cursus a dolor convallis efficitur.</p>
            <button className='flex items-center gap-3 text-sm lg:text-base text-primary font-medium bg-white px-4 py-2'>
                <span>Register Now</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M5 12H19" stroke="#0A65CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 5L19 12L12 19" stroke="#0A65CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
            </button>
        </div>
    </div>
  )
}

export default CTA