import moment from 'moment';
import React from 'react';
import { IoCheckmark, IoCloseCircleOutline } from 'react-icons/io5';
import useAppliedJobs from '../../hooks/useAppliedJobs';

const CandidateAppliedJobs = () => {

  const {appliedJobs,isPending} = useAppliedJobs();

if(isPending){
  return <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
</div>
}

console.log(appliedJobs)

  return (
    <div className='w-full font-inter px-5 min-h-screen border-l border-[#E4E5E8]'>
              <div className='w-full flex items-center justify-between mt-10'>
          <h1 className='text-[#18191C] font-medium text-xl'>Applied Jobs ({appliedJobs.length})</h1>
        </div>
        <div className="overflow-x-auto w-full mt-10">
  <table className="table w-full">
    {/* head */}
    <thead>
      <tr className='bg-[#F1F2F4]'>
        <th>Job</th>
        <th>Applied Date</th>
        <th>Status </th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
  {
    appliedJobs.map(job => {
      const currentDate = moment();
      const jobExpirationDate = moment(job?.expiration_date);
      const status = jobExpirationDate.isAfter(currentDate);
      return (
        <tr key={job?._id} className="w-full">
          <td >
            <div className="flex items-center gap-5 w-full">
              <div className="bg-primary bg-opacity-80 h-16 w-16 rounded-md flex items-center justify-center text-white text-3xl font-bold">
                {job?.jobDetail?.job_title.slice(0,1)}
              </div>
              <div className="flex flex-col items-start gap-3">
                <div className="flex items-center gap-3">
                  <h1>{job?.jobDetail?.job_title}</h1>
                  <div className='flex items-center gap-3'>
                    <span className="bg-[#E8F1FF] px-2 py-1 rounded-full text-xs text-[#0A65CC]">{job?.jobDetail?.job_type}</span>
                    <span className="bg-[#FCEEEE] px-2 py-1 rounded-full text-xs text-[#E05151]">Featured</span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <path d="M19.25 9.16675C19.25 15.5834 11 21.0834 11 21.0834C11 21.0834 2.75 15.5834 2.75 9.16675C2.75 6.97871 3.61919 4.88029 5.16637 3.33312C6.71354 1.78594 8.81196 0.916748 11 0.916748C13.188 0.916748 15.2865 1.78594 16.8336 3.33312C18.3808 4.88029 19.25 6.97871 19.25 9.16675Z" stroke="#C5C9D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M11 11.9167C12.5188 11.9167 13.75 10.6855 13.75 9.16675C13.75 7.64797 12.5188 6.41675 11 6.41675C9.48122 6.41675 8.25 7.64797 8.25 9.16675C8.25 10.6855 9.48122 11.9167 11 11.9167Z" stroke="#C5C9D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span className="text-[#636A80] text-sm">{job?.jobDetail?.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                      <g clip-path="url(#clip0_1647_32162)">
                        <path d="M11 2.0625V19.9375" stroke="#C5C9D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M15.8125 7.5625C15.8125 7.11108 15.7236 6.66408 15.5508 6.24703C15.3781 5.82997 15.1249 5.45102 14.8057 5.13182C14.4865 4.81262 14.1075 4.55941 13.6905 4.38666C13.2734 4.21391 12.8264 4.125 12.375 4.125H9.28125C8.36957 4.125 7.49523 4.48716 6.85057 5.13182C6.20591 5.77648 5.84375 6.65082 5.84375 7.5625C5.84375 8.47418 6.20591 9.34852 6.85057 9.99318C7.49523 10.6378 8.36957 11 9.28125 11H13.0625C13.9742 11 14.8485 11.3622 15.4932 12.0068C16.1378 12.6515 16.5 13.5258 16.5 14.4375C16.5 15.3492 16.1378 16.2235 15.4932 16.8682C14.8485 17.5128 13.9742 17.875 13.0625 17.875H8.9375C8.02582 17.875 7.15148 17.5128 6.50682 16.8682C5.86216 16.2235 5.5 15.3492 5.5 14.4375" stroke="#C5C9D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_1647_32162">
                          <rect width="22" height="22" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[#636A80] text-sm">{job?.jobDetail?.job_salary_min}-{job?.jobDetail?.job_salary_max}/month</span>
                  </div>
                </div>
              </div>
            </div>
          </td>
          <td >
            {job?.applied_date}
          </td>
          <td>
            {
              status ?
              <div className='flex items-center gap-1 text-red-500'>
              <IoCloseCircleOutline/>
            <span>Expired</span>
              </div>
              :
              <div  className='flex items-center gap-1 text-[#0BA02C]'>
              <IoCheckmark/>
            <span>Active</span>
              </div>
              
              
            }

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

export default CandidateAppliedJobs