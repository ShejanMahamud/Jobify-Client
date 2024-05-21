import moment from 'moment'
import React from 'react'
import { IoCheckmark, IoCloseCircleOutline } from 'react-icons/io5'
import useOpenJobs from '../../hooks/useOpenJobs'
import useUserInfo from '../../hooks/useUserInfo'

const CompanyMyJobs = () => {

  const {userInfo} = useUserInfo()

  const {openJobs,openJobsPending} = useOpenJobs(userInfo?.name)

  
  if(openJobsPending){
    return <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
  </div>
  }

  return (
    // Todo fix loading
    <div className='w-full px-5 py-5 font-inter border-l border-[#E4E5E8] min-h-screen'>
      <div className='w-full flex items-center justify-between'>
      <h1 className='text-[#18191C] font-medium text-xl'>My Jobs ({openJobs.length})</h1>
      <div className='flex items-center'>
        <h1 className='w-full text-sm'>Job Status</h1>
        <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] ">
          <select
          required
            name="salary_type"
            className="focus:outline-none w-full"
          >
            <option value="select" selected disabled>
              All Jobs
            </option>
            <option value="Active">Active</option>
            <option value="Expired">Expired</option>
 
          </select>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path d="M5 7.5L10 12.5L15 7.5" stroke="#5E6670" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
        </div>
      </div>
      </div>
      <div className="overflow-x-auto w-full">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr className='bg-[#F1F2F4]'>
        <th>Job</th>
        <th>Status</th>
        <th>Status </th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
  {
  openJobs && openJobs.map(job => {
    const currentDate = moment().format("MMMM D, YYYY")
    const expiryDate = moment(job?.expiration_date);
    const remainingDays = expiryDate.diff(currentDate, 'days');
    return (
      <tr key={job?._id} className="w-full">
        <td >
          <div className="flex items-center gap-5 w-full">
            <div className="flex flex-col items-start gap-3">
              <div className="flex items-center gap-3">
                <h1 className='text-lg font-medium'>{job?.job_title}</h1>
              </div>
              <div className='flex items-center gap-3 text-[#767F8C]'>
                  <span>{job?.job_type}</span>
                  <span>•</span>
                  <span>
  {remainingDays < 0 ? job?.expiration_date : `${remainingDays} Days Remaining`}
</span>

                </div>

            </div>
          </div>
        </td>

        <td>
{job?.status ? (
        
                <div className='flex items-center gap-1 text-[#0BA02C]'>
                <IoCheckmark className='text-xl'/>
                <span>Active</span>
              </div>
      ) : (
<div className='flex items-center gap-1 text-red-500'>
          <IoCloseCircleOutline className='text-xl'/>
          <span>Expired</span>
        </div>
      )}

   </td>

        <th>
          <button className="bg-primary px-2 py-2 rounded-sm text-white font-medium flex items-center gap-3 text-base">
            <span>View Details</span>
          </button>
        </th>
      </tr>
    )
  })
  }
</tbody>

    
  </table>
</div>
    </div>
  )
}

export default CompanyMyJobs