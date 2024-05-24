import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import Job from "../Utils/Job";
import useAxiosCommon from "../hooks/useAxiosCommon";

const FeaturedJobs = () => {
const axiosCommon = useAxiosCommon()
const navigate = useNavigate()
const {data} = useQuery({
  queryKey: ['featured_jobs'],
  queryFn: async () => {
    const {data} = await axiosCommon.get('/jobs?featured=true')
    return data
  }
})


  return (
    <div className="w-full font-inter my-28">
      <div className="w-[90%] mx-auto flex items-center justify-between">
        <div className="flex flex-col items-start gap-2 mb-10 w-full">
          <h1 className="text-primary font-medium">Featured Jobs</h1>
          <span className=" font-bold lg:text-3xl md:text-xl text-lg">
            Explore our featured jobs
          </span>
          <p className="text-[#737D8C] w-[60%] text-sm">
            Find your dream job in Jobify
          </p>
        </div>
        <button onClick={()=>navigate('/find_jobs')} className="border border-[#CEE0F5] px-4 py-2 rounded-md text-primary font-medium flex items-center gap-2 text-sm w-[15%] justify-center">
          <span>See All Jobs</span>
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
      <div className="w-[90%] mx-auto my-10 grid grid-cols-1 row-auto items-center gap-5">
{data && data.map(job => <Job key={job?.job_id} job={job}/>)}
      </div>
    </div>
  );
};

export default FeaturedJobs;
