import { useMutation } from '@tanstack/react-query'
import { Modal } from 'antd'
import moment from 'moment'
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { IoAddCircleOutline, IoCheckmark, IoCloseCircleOutline, IoEyeOutline } from 'react-icons/io5'
import useAxiosCommon from '../../hooks/useAxiosCommon'
import useOpenJobs from '../../hooks/useOpenJobs'
import useUserInfo from '../../hooks/useUserInfo'

const CompanyMyJobs = () => {
  const featuredRef = useRef(null);
  const highlightRef = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [expandedJobId, setExpandedJobId] = useState(null);
  
  const axiosCommon = useAxiosCommon();
  const { userInfo } = useUserInfo();
  const { openJobs, openJobsPending, openJobsRefetch } = useOpenJobs(userInfo?.name);
  
  const { mutateAsync:handleExpire } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosCommon.patch(`/job/${id}`, { status: false })
      if (!data.success) {
        toast.error('Something Went Wrong...')
      }
      return data
    },
    onSuccess: () => {
      toast.success('Successfully Updated...')
      openJobsRefetch()
    }
  })

  const { mutateAsync:handlePromote } = useMutation({
    mutationFn: async ({id,promote}) => {
      const { data } = await axiosCommon.patch(`/job/${id}`, { [promote]: true })
      if (!data.success) {
        toast.error('Something Went Wrong...')
      }
      return data
    },
    onSuccess: () => {
      toast.success('Successfully Updated...')
      openJobsRefetch();
      setIsModalOpen(false);
    }
  })

  const handlePromoteJob = async (e,id) => {
    e.preventDefault()
    try{
    const promote = e.target.radio.value;
     await handlePromote({id,promote})
    }
    catch(error){
      toast.error('Something Went Wrong...')
    }
    
  }

  const handleMakeExpire = async (id) => {
    try {
      await handleExpire(id)
    } catch (error) {
      toast.error('Something Went Wrong...')
    }
  }

  const handlePromoteJobModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };


  if (openJobsPending) {
    return (
      <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
      </div>
    );
  }

  return (
    <div className='w-full px-5 py-5 font-inter border-l border-[#E4E5E8] min-h-screen'>
      <div className='w-full flex items-center justify-between'>
        <h1 className='text-[#18191C] font-medium text-xl'>My Jobs ({openJobs.length})</h1>
        <div className='flex items-center'>
          <h1 className='w-full text-sm'>Job Status</h1>
          <div className="flex items-start gap-2 px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8]">
            <select required name="salary_type" className="focus:outline-none w-full">
              <option value="select" selected disabled>
                All Jobs
              </option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 7.5L10 12.5L15 7.5" stroke="#5E6670" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>
      <div className="overflow-auto w-full mt-10 min-h-screen">
        <table className="table w-full">
          <thead>
            <tr className='bg-[#F1F2F4] uppercase'>
              <th>Job</th>
              <th>Status</th>
              <th>APPLICATIONS</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {openJobs && openJobs.map(job => {
              const currentDate = moment().format("MMMM D, YYYY")
              const expiryDate = moment(job?.expiration_date);
              const remainingDays = expiryDate.diff(currentDate, 'days');
              const isExpanded = expandedJobId === job._id;

              return (
                <tr key={job._id} className="w-full">
                  <td>
                    <div className="flex items-center gap-5 w-full">
                      <div className="flex flex-col items-start gap-3">
                        <div className="flex items-center gap-3">
                          <h1 className='text-lg font-medium'>{job?.job_title}</h1>
                        </div>
                        <div className='flex items-center gap-3 text-[#767F8C]'>
                          <span>{job?.job_type}</span>
                          <span>•</span>
                          <span>{remainingDays < 0 ? job?.expiration_date : `${remainingDays} Days Remaining`}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    {job?.status ? (
                      <div className='flex items-center gap-1 text-[#0BA02C]'>
                        <IoCheckmark className='text-xl' />
                        <span>Active</span>
                      </div>
                    ) : (
                      <div className='flex items-center gap-1 text-red-500'>
                        <IoCloseCircleOutline className='text-xl' />
                        <span>Expired</span>
                      </div>
                    )}
                  </td>
                  <td>
                    <div className='flex items-center gap-3'>
                      <img src="https://gist.githubusercontent.com/ShejanMahamud/040da8f1501b5097f337fe5800d2e25f/raw/c188df416d8fc24bd99a33ff391888238039cfc5/people.svg" alt="people.svg" />
                      <span>{job?.applications} Applications</span>
                    </div>
                  </td>
                  <td>
                    <div className='flex items-center gap-5 w-full'>
                      <button className="bg-primary px-2 py-2 rounded-sm text-white font-medium flex items-center gap-3 text-base">
                        <span>View Details</span>
                      </button>
                      <button onClick={() => setExpandedJobId(isExpanded ? null : job._id)} className='px-5 py-3 rounded-lg focus:bg-[#F1F2F4] bg-transparent relative'>
                        <img src="https://gist.github.com/ShejanMahamud/c1041c2cbbe1bc18af5c541ab9a43b57/raw/23c14fb6f112498a6dbba920efca9820c074ab52/threedot.svg" alt="" />
                        {isExpanded && (
                          <div className='bg-white shadow-xl border border-[#E9EAED] rounded-lg py-2 px-2 flex flex-col items-center gap-2 absolute right-0 min-w-[200px] z-50'>
                            <button onClick={() => handlePromoteJobModal(job)} className='w-full py-2 hover:bg-[#E7F0FA] hover:text-primary text-[#5E6670] flex items-center gap-2 px-2'>
                              <IoAddCircleOutline className='text-xl' />
                              <span>Promote Job</span>
                            </button>
                            <button className='w-full py-2 hover:bg-[#E7F0FA] hover:text-primary text-[#5E6670] flex items-center gap-2 px-2'>
                              <IoEyeOutline className='text-xl' />
                              <span>View Details</span>
                            </button>
                            <button onClick={() => handleMakeExpire(job?._id)} className='w-full py-2 hover:bg-[#E7F0FA] hover:text-primary text-[#5E6670] flex items-center gap-2 px-2'>
                              <IoCloseCircleOutline className='text-xl' />
                              <span>Make Expire</span>
                            </button>
                          </div>
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Modal width={600} footer={false} open={isModalOpen} onCancel={() => setIsModalOpen(false)}>
        {selectedJob && (
          <form onSubmit={(e)=>handlePromoteJob(e,selectedJob?._id)} className='w-full mb-5'>
            <h1 className='text-2xl font-medium mb-3'>Promote Job: {selectedJob.job_title}</h1>
            <p className='text-[#5E6670] mb-3'>Fusce commodo, sem non tempor convallis, sapien turpis bibendum turpis, non pharetra nisl velit pulvinar lectus. Suspendisse varius at nisl aliquam. </p>
            <div className='w-full grid grid-cols-2 row-auto items-center gap-5'>
              <div className='w-full bg-[#f1f2f480] rounded-lg px-5 py-5 hover:bg-[#E7F0FA]'>
                <div className='bg-white px-2 py-2 rounded-lg border-[#E4E5E8] border mb-5'>
                  <h1 className='font-medium text-xs mb-5'>ALWAYS ON THE TOP</h1>
                  <div className='w-full grid grid-cols-2 row-auto items-center gap-2'>
                    <img src="https://gist.github.com/ShejanMahamud/bf5c8684d52c8ede1913a60c3613e91b/raw/0f0ac37b53d0e465c7a78f00642ddba33e5bc00d/featured-1.svg" alt="" />
                    <img src="https://gist.github.com/ShejanMahamud/77a633e406245a3540026ca60be24105/raw/6b4db8004749f477f9845753e5d2fd1482953910/featured-2.svg" alt="" />
                    <img src="https://gist.github.com/ShejanMahamud/77a633e406245a3540026ca60be24105/raw/6b4db8004749f477f9845753e5d2fd1482953910/featured-2.svg" alt="" />
                    <img src="https://gist.github.com/ShejanMahamud/77a633e406245a3540026ca60be24105/raw/6b4db8004749f477f9845753e5d2fd1482953910/featured-2.svg" alt="" />
                  </div>
                </div>
                <div className="w-full rounded-lg flex items-start gap-3">
                  <input required type="radio" name="radio" value={'featured'} className="radio checked:bg-primary" />
                  <div className="flex flex-col items-start gap-2">
                    <h1 className="text-lg text-[#18191C] font-medium ">Featured Your Job</h1>
                    <p className="text-xs text-[#5E6670]">Candidate will apply job using jobpilot & all application will show on your dashboard.</p>
                  </div>
                </div>
              </div>
              <div className='w-full bg-[#f1f2f480] focus:outline-primary rounded-lg px-5 py-5 hover:bg-[#E7F0FA]'>
                <div className='bg-white px-2 py-2 rounded-lg border-[#E4E5E8] border mb-5'>
                  <h1 className='font-medium text-xs mb-5'>HIGHLIGHT JOB WITH COLOR</h1>
                  <div className='w-full grid grid-cols-2 row-auto items-center gap-2'>
                    <img src="https://gist.githubusercontent.com/ShejanMahamud/0fb468dff33f87364249ab259517a83f/raw/bf7ed68e37723a2f28968f9a1c7cf5d4025f8bec/highlight.svg" alt="" />
                    <img src="https://gist.github.com/ShejanMahamud/77a633e406245a3540026ca60be24105/raw/6b4db8004749f477f9845753e5d2fd1482953910/featured-2.svg" alt="" />
                    <img src="https://gist.github.com/ShejanMahamud/77a633e406245a3540026ca60be24105/raw/6b4db8004749f477f9845753e5d2fd1482953910/featured-2.svg" alt="" />
                    <img src="https://gist.github.com/ShejanMahamud/77a633e406245a3540026ca60be24105/raw/6b4db8004749f477f9845753e5d2fd1482953910/featured-2.svg" alt="" />
                  </div>
                </div>
                <div className="w-full rounded-lg flex items-start gap-3">
                  <input required type="radio" name="radio" value={'highlight'} className="radio checked:bg-primary" />
                  <div className="flex flex-col items-start gap-2">
                    <h1 className="text-lg text-[#18191C] font-medium ">Highlight Your Job</h1>
                    <p className="text-xs text-[#5E6670]">Candidate will apply job using jobpilot & all application will show on your dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full flex items-center justify-between mt-10'>
              <button onClick={()=>setIsModalOpen(false)} className='text-[#767F8C] font-medium text-base'>Cancel</button>
              <button disabled={selectedJob?.featured || selectedJob?.highlight} className="bg-primary px-4 py-3 rounded-md text-white flex items-center gap-3 text-base">
<span>Promote Job</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5 12H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5L19 12L12 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}

export default CompanyMyJobs;
