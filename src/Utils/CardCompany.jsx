import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardCompany = ({company}) => {
    const navigate = useNavigate();

  return (
    <div className={`w-full border border-[#EDEFF5] rounded-lg px-5 py-5 flex flex-col items-start gap-8 ${company?.featured && 'bg-gradient'}`}>
    <div className='flex items-center gap-5'>
        <img src={company?.company_logo || 'https://i.ibb.co/jMNrMnz/enterprise.png'} alt="" className='h-16 w-16 rounded-lg object-cover p-2 bg-white shadow-lg'/>
        <div className='flex items-start flex-col gap-3'>
            <div className='flex items-center gap-3'>
            <h1 className='text-[#191F33] text-lg font-medium'>{company?.company_name}</h1>
            <div className='flex items-center gap-3'>

            {
                company?.featured && <span className="bg-[#FCEEEE] px-2 py-1 rounded-full text-xs text-[#E05151]">
                Featured
            </span>
              }
              </div>
            </div>
            <div className='flex items-center gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z" stroke="#939AAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="#939AAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<span className='text-[#939AAD] text-sm'>{company?.location}</span>
            </div>
<span className="text-[#636A80] text-sm">{company?.open_jobs} - Open Job</span>
        </div>
    </div>
    <button onClick={()=>navigate(`/company/${company?._id}`)} className='w-full py-3 rounded-md text-[#0A65CC] border border-primary font-medium'>
        Open Jobs
    </button>
</div>
  )
}

export default CardCompany