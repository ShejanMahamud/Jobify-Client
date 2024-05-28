import React from 'react'
import Job from '../../Utils/Job'
import useJobAlert from '../../hooks/useJobAlert'

const CandidateJobAlert = () => {
const {jobAlert, jobAlertCount,jobAlertPending} = useJobAlert()

if(jobAlertPending){
  return <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
  <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
</div>
}

  return (
    <div className='w-full min-h-screen px-5 py-5 border-l border-[#E4E5E8]'>
      <h1 className='text-[#18191C] font-medium text-xl'>Job Alert ({jobAlertCount})</h1>
      <div className='w-full grid grid-cols-1 row-auto items-center gap-5 mt-10'>
        {
          jobAlert && jobAlert.map(job => <Job key={job?._id} job={job}/>)
        }
      </div>
    </div>
  )
}

export default CandidateJobAlert