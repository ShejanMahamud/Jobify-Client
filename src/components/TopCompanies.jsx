import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAxiosCommon from '../hooks/useAxiosCommon';

const TopCompanies = () => {
const axiosCommon = useAxiosCommon()
const navigate = useNavigate()
const {data} = useQuery({
  queryKey: ['featured_companies'],
  queryFn: async () => {
    const {data} = await axiosCommon.get(`/companies?featured=true`)
    return data
  }
})

  return (
    <div className='w-full my-28 font-inter'>
        <div className="w-[90%] mx-auto flex items-center justify-between">
        <div className="flex flex-col items-start gap-2 mb-10 w-full">
          <h1 className="text-primary font-medium">Featured Companies</h1>
          <span className=" font-bold lg:text-3xl md:text-xl text-lg">
            Explore our featured companies
          </span>
          <p className="text-[#737D8C] w-[60%] text-sm">
            Find your dream company in Jobify
          </p>
        </div>
        <button onClick={()=>navigate(`/find_companies`)} className="border border-[#CEE0F5] px-4 py-2 rounded-md text-primary font-medium flex items-center gap-2 text-sm w-[10%] justify-center">
          <span>See All</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12H19"
              stroke="#0A65CC"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 5L19 12L12 19"
              stroke="#0A65CC"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className='w-[90%] my-10 grid grid-cols-4 row-auto items-center gap-8 mx-auto'>
{data && data.map(company => {

  return(
    <div key={company?._id} className='w-full border border-[#EDEFF5] rounded-lg px-5 py-5 flex flex-col items-start gap-5'>
    <div className='flex items-center gap-5'>
        <img src={company?.company_logo} alt="" className='w-12 h-12 object-cover rounded-full'/>
        <div className='flex items-start flex-col gap-3'>
            <div className='flex items-center gap-3'>
            <h1 className='text-[#191F33] text-base font-medium'>{company?.company_name}</h1>
            {
              company?.featured && <span className='text-[#E05151] bg-[#FCEEEE] px-2 py-1 rounded-full text-xs'>Featured</span>
            }
            </div>
            <div className='flex items-center gap-3'>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
<path d="M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z" stroke="#939AAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="#939AAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<span className='text-[#939AAD] text-sm'>{company?.location}</span>
            </div>
        </div>
    </div>
    <button onClick={()=>navigate(`/company/${company?._id}`)} className='w-full py-3 rounded-md hover:bg-primary duration-500 hover:text-white text-[#0A65CC] bg-[#E7F0FA] font-medium'>
        Open Position
    </button>
</div>
  )
})}
      </div>
    </div>
  )
}

export default TopCompanies