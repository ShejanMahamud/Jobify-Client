import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { MdCancel, MdDoneAll, MdEvent, MdExitToApp, MdLocalOffer, MdPersonAdd, MdSend, MdVisibility } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { axiosSecure } from '../../hooks/useAxiosSecure';
import useJobAlert from '../../hooks/useJobAlert';

const CandidateOverview = () => {
  const navigate = useNavigate()
  const {user} = useAuth()
  const {jobAlertCount,jobAlertPending} = useJobAlert()

  const {data:stats,isPending:statsPending} = useQuery({
    queryKey: ['candidate_stats',user?.email],
    queryFn: async () => {
      const {data} = await axiosSecure.get(`/candidate_stats/${user?.email}`)
      return data
    }
  })

if(statsPending || jobAlertPending){
  return <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
</div>
}

  return (
    <div className='w-full h-full border-l border-[#e4e5e8] min-h-screen py-10 px-10'>
      <div className='flex flex-col items-start gap-2'>
        <h1 className='text-[#18191C] text-lg font-medium'>Hello, {user?.displayName}</h1>
        <p className='text-[#767F8C] text-sm'>Here is your daily activities and job alerts</p>
        <div className='w-full grid grid-cols-3 row-auto items-center justify-center gap-5 mt-10'>
          <div className='w-full px-5 py-5 flex items-center justify-between rounded-lg bg-[#E7F0FA]'>
            <div className='flex flex-col items-start gap-1'>
              <h1 className='text-[#18191C] text-2xl font-medium'>{stats?.applied_jobs}</h1>
              <p className='text-[#18191C] text-sm'>Applied jobs</p>
            </div>
            <div className='bg-white h-16 w-16 flex items-center justify-center rounded-lg'>
              <img src="https://gist.github.com/ShejanMahamud/ad4ed54d0b760a23267a6350460d544e/raw/dcfefa6f824bf51e1cd89ca223d5667a8db18ee9/brifcase.svg" alt="" />
            </div>
          </div>

          <div className='w-full px-5 py-5 flex items-center justify-between rounded-lg bg-[#FFF6E6]'>
            <div className='flex flex-col items-start gap-1'>
              <h1 className='text-[#18191C] text-2xl font-medium'>{stats?.bookmark_jobs}</h1>
              <p className='text-[#18191C] text-sm'>Favorite jobs</p>
            </div>
            <div className='bg-white h-16 w-16 flex items-center justify-center rounded-lg'>
              <img src="https://gist.github.com/ShejanMahamud/626e0ea200b61fbf105e343d8a0e3b6d/raw/51ba921312fd65559c411b045a72cf034a8d3617/bookmark.svg" alt="" />
            </div>
          </div>

          <div className='w-full px-5 py-5 flex items-center justify-between rounded-lg bg-[#E7F6EA]'>
            <div className='flex flex-col items-start gap-1'>
              <h1 className='text-[#18191C] text-2xl font-medium'>{jobAlertCount}</h1>
              <p className='text-[#18191C] text-sm'>Job Alert</p>
            </div>
            <div className='bg-white h-16 w-16 flex items-center justify-center rounded-lg'>
              <img src="https://gist.github.com/ShejanMahamud/c8440b212d765d9a54f95e221e53f030/raw/418a09e6c4b2e38f08dd0bf274fbd72ad1fd1dd2/bell.svg" alt="" />
            </div>
          </div>
        </div>
{
  !(
    userInfo &&
    userInfo.name &&
    userInfo.email &&
    userInfo.photo &&
    userInfo.education &&
    userInfo.experience &&
    userInfo.resume &&
    userInfo.title &&
    userInfo.biodata &&
    userInfo.location &&
    userInfo.number
  ) && <div className='w-full bg-[#E05151] px-5 py-5 rounded-lg flex items-center justify-between mt-10'>
  <div className='flex items-center gap-3'>
    <img src={user?.photoURL} alt="user.png" className='w-14 h-14 rounded-full'/>
    <div className='flex flex-col items-start gap-1'>
      <h1 className='text-lg font-medium text-white'>Your profile editing is not completed.</h1>
      <h1 className='text-xs text-white'>Complete your profile editing & build your custom Resume</h1>
    </div>
  </div>
    <button onClick={()=>navigate('/dashboard/candidate/settings')} className='px-3 py-2 rounded-sm text-[#E05151] bg-white font-medium flex items-center gap-1'>
      <span>Edit Profile</span>
    <img src="https://gist.github.com/ShejanMahamud/75c0ff3a427e791882df08982b477d2e/raw/41df9e052f5e5c4f7465fd8f4bcce8e0e717ec61/arrow.svg" alt="" />
    </button>
</div>
}
        <div className='w-full flex items-center justify-between mt-10'>
          <h1 className='text-[#18191C] font-medium'>Recently Applied</h1>
          <button onClick={()=>navigate('/dashboard/candidate/applied_jobs')} className='px-3 py-2 rounded-sm text-[#767F8C] bg-white font-medium flex items-center text-base gap-1'>
              <span>View All</span>
            <img src="https://gist.github.com/ShejanMahamud/1399583e909469763ef617ecfacbda0a/raw/64c4e6b2aac0185c3dfd4d8831585d40b6ea923a/arrow.svg" alt="" />
            </button>
        </div>
        <div className="overflow-x-auto w-full">
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
    appliedJobs.map(job => (
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
           job?.status === 'applied' && <div  className='flex items-center gap-1 text-blue-500'>
            <MdSend  className='text-lg'/>
          <span>Applied</span>
            </div>
          }
          {
           job?.status === 'in-review' && <div  className='flex items-center gap-1 text-orange-500'>
            <MdVisibility className='text-lg'/>
          <span>In Review</span>
            </div>
          }
          {
           job?.status === 'scheduled' && <div  className='w-full flex items-center gap-1 text-cyan-500'>
            <MdEvent className='text-lg'/>
          <span className='w-full'>Interview Scheduled</span>
            </div>
          }
          {
           job?.status === 'interviewed' && <div  className='flex items-center gap-1 text-green-500'>
            <MdDoneAll className='text-lg'/>
          <span>Interviewed</span>
            </div>
          }
          {
           job?.status === 'offered' && <div  className='flex items-center gap-1 text-[#daa520]'>
            <MdLocalOffer className='text-lg'/>
          <span>Offered</span>
            </div>
          }
          {
           job?.status === 'hired' && <div  className='flex items-center gap-1 text-[#008080]'>
            <MdPersonAdd className='text-lg'/>
          <span>Hired</span>
            </div>
          }
          {
           job?.status === 'rejected' && <div  className='flex items-center gap-1 text-red-500'>
            <MdCancel className='text-lg'/>
          <span>Rejected</span>
            </div>
          }
          {
           job?.status === 'withdrawn' && <div  className='flex items-center gap-1 text-gray-500'>
            <MdExitToApp className='text-lg'/>
          <span>Withdrawn</span>
            </div>
          }
        </td>
        <th>
          <button className="bg-primary px-2 py-2 rounded-sm text-white font-medium flex items-center gap-3 text-base">
            <span>View Details</span>
          </button>
        </th>
      </tr>
    ))
  }
</tbody>

    
  </table>
</div>
      </div>
    </div>
  )
}

export default CandidateOverview