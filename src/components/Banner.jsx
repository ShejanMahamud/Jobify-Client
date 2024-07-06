import axios from "axios";
import React, { useState } from "react";
import { toast } from 'react-hot-toast';
import { BsBuildings } from "react-icons/bs";
import { GoPeople } from "react-icons/go";
import { IoIosCloseCircle } from "react-icons/io";
import { IoBriefcaseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsDialog, setJobsDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    setJobsDialog(true);
    setLoading(true);
    e.preventDefault();
    const title = e.target.title.value;
    try{
      const {data} = await axios.get(`http://localhost:5948/search?title=${title}`)
      setJobs(data);
      e.target.reset();
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    catch(error){
      toast.error('Something Went Wrong!')
    }
  };

  return (
    <div className="bg-[#f1f2f499] w-full grid lg:grid-cols-2 grid-cols-1 row-auto items-center gap-20 font-inter lg:py-28 py-20 px-10">
      <div className="w-full lg:col-span-1 col-span-2">
        <div className="flex flex-col items-start gap-5 w-full">
          <h1 className="lg:text-[56px] text-4xl font-medium lg:leading-[64px] leading-[40px]">
            Find a job that suits your interest & skills.
          </h1>
          <p className="text-[#5E6670] text-base leading-[28px]">
            Aliquam vitae turpis in diam convallis finibus in at risus. Nullam
            in scelerisque leo, eget sollicitudin velit bestibulum.
          </p>
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-lg flex items-center gap-5 lg:px-5 px-3 lg:py-5 py-3 w-full relative"
          >
            <div className="flex items-center gap-2 w-full px-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke="#0066FF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M21 21L16.65 16.65"
                  stroke="#0066FF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Job Title, Keyword..."
                required
                name="title"
                className="bg-transparent focus:outline-none px-2 py-2 w-full"
              />
            </div>

            <button className="bg-primary text-white px-5 py-3 rounded-lg font-semibold">
              Search
            </button>
            {jobsDialog && (
              <div className="bg-white absolute px-5 py-5 rounded-lg h-[100px] w-full -bottom-28 right-0 duration-500 flex items-center justify-center">
                <button
                  onClick={() => setJobsDialog(false)}
                  className="text-red-500 absolute -right-2 text-3xl -top-3"
                >
                  <IoIosCloseCircle />
                </button>

                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
                  </div>
                ) : jobs && jobs.length !== 0 ? (
                  jobs.map((job) => (
                    <div
                      key={job?._id}
                      onClick={()=>navigate(`/job/${job?._id}`)}
                      className="w-full bg-[#E7F0FA] bg-opacity-50 rounded-lg px-2 py-2 font-medium flex item-center justify-between cursor-pointer"
                    >
                      <span>{job?.job_title}</span>
                      <span>{job?.company_name}</span>
                    </div>
                  ))
                ) : (
                  <span className="text-center font-medium">
                    No Jobs Found!
                  </span>
                )}
              </div>
            )}
          </form>
          <p className="text-[#9199A3] text-sm">
            Suggestion: {" "}
            <span className="text-[#474C54]">
               Designer, Programing,
              <span className="text-primary"> Digital Marketing,</span> Video,
              Animation
            </span>
          </p>
        </div>
      </div>
      <div className="w-full lg:col-span-1 col-span-2">
        <img src="https://i.ibb.co/DwJPJ31/Illustration.png" alt="hero.png" />
      </div>
      <div className="w-full grid lg:grid-cols-4 grid-cols-1 row-auto items-center lg:gap-16 gap-8 col-span-2">
        <div className="bg-white px-5 py-5 rounded-lg flex items-center gap-5 w-full group hover:shadow-lg shadow-sm">
          <div className="bg-[#E7F0FA] px-5 py-5 rounded-lg group-hover:bg-primary duration-500 text-primary group-hover:text-white">
          <IoBriefcaseOutline className="text-4xl"/>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-medium text-[#18191C] text-xl">1,75,324</h1>
            <p className="text-[#767F8C]">Live Job</p>
          </div>
        </div>
        <div className="bg-white px-5 py-5 rounded-lg flex items-center gap-5 w-full group hover:shadow-lg shadow-sm">
          <div className="bg-[#E7F0FA] px-5 py-5 rounded-lg group-hover:bg-primary duration-500 text-primary group-hover:text-white">
          <BsBuildings className="text-4xl"/>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-medium text-[#18191C] text-xl">1,246</h1>
            <p className="text-[#767F8C]">Companies</p>
          </div>
        </div>
        <div className="bg-white px-5 py-5 rounded-lg flex items-center gap-5 w-full group hover:shadow-lg shadow-sm">
          <div className="bg-[#E7F0FA] px-5 py-5 rounded-lg group-hover:bg-primary duration-500 text-primary group-hover:text-white">
          <GoPeople className="text-4xl"/>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-medium text-[#18191C] text-xl">2,246</h1>
            <p className="text-[#767F8C]">Candidates</p>
          </div>
        </div>

        <div className="bg-white px-5 py-5 rounded-lg flex items-center gap-5 w-full group hover:shadow-lg shadow-sm">
          <div className="bg-[#E7F0FA] px-5 py-5 rounded-lg group-hover:bg-primary duration-500 text-primary group-hover:text-white">
          <IoBriefcaseOutline className="text-4xl"/>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-medium text-[#18191C] text-xl">75,324</h1>
            <p className="text-[#767F8C]">Posted Job</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
