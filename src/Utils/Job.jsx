import moment from 'moment';
import React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useUserInfo from '../hooks/useUserInfo';

const Job = ({job}) => {
const axiosSecure = useAxiosSecure()
const {user} = useUserInfo();
const {job_type,job_title,company_name,location,job_salary_min,job_salary_max,expiration_date,_id:jobId,featured,company_logo} = job;

const navigate = useNavigate();

  const currentDate = moment().format("MMMM D, YYYY")
  const expiryDate = moment(expiration_date);
  const remainingDays = expiryDate.diff(currentDate, 'days');


const handleBookmarkJob = async () => {

  const bookmarkJob = {job_type:job_type,job_title:job_title,company_name:company_name,location:location,job_salary_min:job_salary_min,job_salary_max:job_salary_max,expiration_date:expiration_date,jobId: jobId,candidate_email:user?.email}
  
  const {data} = await axiosSecure.post(`/bookmark_jobs`,bookmarkJob)
  if(!data.success){
    toast.error('Bookmark Already Saved!')
  }
  if(data.result.insertedId && data.success){
    toast.success('Bookmark Saved!')
  }
}

  return (
    <div className={`w-full flex lg:flex-row flex-col items-center justify-between px-5 py-3 rounded-lg border border-[#EDEFF5] gap-3 lg:gap-0 p-5 ${featured && 'bg-gradient'}`}>
    <div className="flex items-center lg:gap-5">
    <img src={company_logo || 'https://i.ibb.co/jMNrMnz/enterprise.png'} alt="" className='h-16 w-16 rounded-lg object-cover p-3 bg-white shadow-lg'/>
      <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
              <h1>{job_title}</h1>
              <div className='flex items-center gap-3'>
              <span className="bg-[#E8F1FF] px-2 py-1 rounded-full text-xs text-[#0A65CC]">
                  {job_type}
              </span>
              {
                featured && <span className="bg-[#FCEEEE] px-2 py-1 rounded-full text-xs text-[#E05151]">
                Featured
            </span>
              }
              </div>
          </div>
          <div className="flex items-center lg:gap-5 gap-2">
              <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
<path d="M19.25 9.16675C19.25 15.5834 11 21.0834 11 21.0834C11 21.0834 2.75 15.5834 2.75 9.16675C2.75 6.97871 3.61919 4.88029 5.16637 3.33312C6.71354 1.78594 8.81196 0.916748 11 0.916748C13.188 0.916748 15.2865 1.78594 16.8336 3.33312C18.3808 4.88029 19.25 6.97871 19.25 9.16675Z" stroke="#C5C9D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 11.9167C12.5188 11.9167 13.75 10.6855 13.75 9.16675C13.75 7.64797 12.5188 6.41675 11 6.41675C9.48122 6.41675 8.25 7.64797 8.25 9.16675C8.25 10.6855 9.48122 11.9167 11 11.9167Z" stroke="#C5C9D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<span className="text-[#636A80] lg:text-sm text-xs">{location}</span>
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
<span className="text-[#636A80] lg:text-sm text-xs">${job_salary_min}-${job_salary_max}</span>
              </div>

              <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
<g clip-path="url(#clip0_1647_32168)">
<path d="M17.875 3.4375H4.125C3.7453 3.4375 3.4375 3.7453 3.4375 4.125V17.875C3.4375 18.2547 3.7453 18.5625 4.125 18.5625H17.875C18.2547 18.5625 18.5625 18.2547 18.5625 17.875V4.125C18.5625 3.7453 18.2547 3.4375 17.875 3.4375Z" stroke="#C5C9D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M15.125 2.0625V4.8125" stroke="#C5C9D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M6.875 2.0625V4.8125" stroke="#C5C9D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M3.4375 7.5625H18.5625" stroke="#C5C9D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_1647_32168">
<rect width="22" height="22" fill="white"/>
</clipPath>
</defs>
</svg>
<span className="text-[#636A80] lg:text-sm text-xs">
  {currentDate === moment(expiration_date).format("MMMM D, YYYY")
     ? 'Today Last Date'
     : remainingDays < 0
     ? 'Expired Date'
     : `${remainingDays} Days Remaining`}
</span>

              </div>
          </div>
      </div>
    </div>
    <div className="flex items-center lg:gap-5 gap-2">
      <button onClick={handleBookmarkJob} className="bg-[#E8F1FF] px-3 py-3 rounded-md flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z" stroke="#0A65CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

      </button>
      <button onClick={()=>navigate(`/job/${jobId}`)} className="bg-primary lg:px-4 px-2 lg:py-3 py-2 lg:text-base text-sm rounded-md text-white font-medium flex items-center gap-3">
<span>Apply Now</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5 12H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5L19 12L12 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
    </div>
  </div>
  )
}

export default Job