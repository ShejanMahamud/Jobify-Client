import axios from "axios";
import React, { useState } from "react";
import { IoIosCloseCircle } from "react-icons/io";

const Banner = () => {
  const [jobs, setJobs] = useState([]);
  const [jobsDialog, setJobsDialog] = useState(false);

  const handleSearch = (e) => {
    setJobsDialog(true);
    e.preventDefault();
    const title = e.target.title.value;
    axios.get(`http://localhost:5948/search?title=${title}`).then((res) => {
      setJobs(res.data);
      console.log(res);
    });
  };

  return (
    <div className="bg-[#f1f2f499] w-full grid grid-cols-2 row-auto items-center gap-20 font-inter py-28 px-10">
      <div className="w-full">
        <div className="flex flex-col items-start gap-5 w-full">
          <h1 className="text-[56px] font-medium leading-[64px]">
            Find a job that suits your interest & skills.
          </h1>
          <p className="text-[#5E6670] text-base leading-[28px]">
            Aliquam vitae turpis in diam convallis finibus in at risus. Nullam
            in scelerisque leo, eget sollicitudin velit bestibulum.
          </p>
          <form
            onSubmit={handleSearch}
            className="bg-white rounded-lg flex items-center gap-5 px-5 py-5 w-full relative"
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
            {/* <div className="h-[40px] w-[2px] border border-[#E4E5E8] rounded-full"></div>
            <div className="flex items-center gap-2 w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z"
                  stroke="#0066FF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                  stroke="#0066FF"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                type="text"
                placeholder="Your Location"
                required
                className="bg-transparent focus:outline-none px-2 py-2 w-full"
              />
            </div> */}
            <button className="bg-primary text-white px-5 py-3 rounded-lg font-semibold">
              Search
            </button>
            {jobsDialog && (
              <div className="bg-white absolute px-5 py-5 rounded-lg h-[100px] w-full -bottom-28 right-0 duration-500">
                <button onClick={()=>setJobsDialog(false)} className="text-red-500 absolute -right-2 text-3xl -top-3">
                  <IoIosCloseCircle />
                </button>
                {jobs && jobs.length !== 0 ? 
                  jobs.map(job => (
                    <div key={job?._id} className="w-full flex items-center justify-between bg-gray-50 rounded-lg px-2 py-2 font-medium">
                      <span>{job?.title}</span>
                      <span>{job?.company}</span>
                  </div>
                  ))
                 : (
                  <span className="text-center font-medium">
                    No Jobs Found!
                  </span>
                )}
              </div>
            )}
          </form>
          <p className="text-[#9199A3] text-sm">
            Suggestion:
            <span className="text-[#474C54]">
              Designer, Programing,
              <span className="text-primary"> Digital Marketing,</span> Video,
              Animation
            </span>
          </p>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/DwJPJ31/Illustration.png" alt="hero.png" />
      </div>
      <div className="w-full grid grid-cols-4 row-auto items-center gap-20 col-span-2">
        <div className="bg-white px-5 py-5 rounded-lg flex items-center gap-5 w-full group">
          <div className="bg-[#E7F0FA] px-5 py-5 rounded-lg group-hover:bg-primary duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="group-hover:fill-white"
            >
              <g clip-path="url(#clip0_2202_14101)">
                <path
                  opacity="0.2"
                  d="M20.0001 23.75C14.7341 23.7583 9.55961 22.3739 5.00128 19.7373V32.5C5.00128 32.6642 5.03361 32.8267 5.09643 32.9784C5.15925 33.1301 5.25132 33.2679 5.3674 33.3839C5.48347 33.5 5.62127 33.5921 5.77293 33.6549C5.92458 33.7177 6.08713 33.75 6.25128 33.75H33.7513C33.9154 33.75 34.078 33.7177 34.2296 33.6549C34.3813 33.5921 34.5191 33.5 34.6352 33.3839C34.7512 33.2679 34.8433 33.1301 34.9061 32.9784C34.969 32.8267 35.0013 32.6642 35.0013 32.5V19.7358C30.4424 22.3734 25.267 23.7583 20.0001 23.75Z"
                  fill="#0A65CC"
                />
                <path
                  d="M33.7513 11.25H6.25128C5.56093 11.25 5.00128 11.8096 5.00128 12.5V32.5C5.00128 33.1904 5.56093 33.75 6.25128 33.75H33.7513C34.4416 33.75 35.0013 33.1904 35.0013 32.5V12.5C35.0013 11.8096 34.4416 11.25 33.7513 11.25Z"
                  stroke="#0A65CC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M26.25 11.25V8.75C26.25 8.08696 25.9866 7.45107 25.5178 6.98223C25.0489 6.51339 24.413 6.25 23.75 6.25H16.25C15.587 6.25 14.9511 6.51339 14.4822 6.98223C14.0134 7.45107 13.75 8.08696 13.75 8.75V11.25"
                  stroke="#0A65CC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M35.0013 19.7358C30.4424 22.3734 25.2669 23.7583 20 23.75C14.734 23.7583 9.55941 22.3739 5.00104 19.7372"
                  stroke="#0A65CC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.125 18.75H21.875"
                  stroke="#0A65CC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2202_14101">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-medium text-[#18191C] text-xl">1,75,324</h1>
            <p className="text-[#767F8C]">Live Job</p>
          </div>
        </div>
        <div className="bg-white px-5 py-5 rounded-lg flex items-center gap-5 w-full group">
          <div className=" px-5 py-5 rounded-lg bg-primary duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
            >
              <g clip-path="url(#clip0_2202_14113)">
                <path
                  opacity="0.2"
                  d="M22.499 33.7473V6.24731C22.499 5.91579 22.3673 5.59785 22.1328 5.36343C21.8984 5.12901 21.5805 4.99731 21.249 4.99731H6.24896C5.91744 4.99731 5.5995 5.12901 5.36508 5.36343C5.13066 5.59785 4.99896 5.91579 4.99896 6.24731V33.7473"
                  fill="white"
                />
                <path
                  d="M2.5 33.7474H37.5"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M22.499 33.7473V6.24731C22.499 5.91579 22.3673 5.59785 22.1328 5.36343C21.8984 5.12901 21.5805 4.99731 21.249 4.99731H6.24896C5.91744 4.99731 5.5995 5.12901 5.36508 5.36343C5.13066 5.59785 4.99896 5.91579 4.99896 6.24731V33.7473"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M34.999 33.7473V16.2473C34.999 15.9158 34.8673 15.5979 34.6329 15.3634C34.3984 15.129 34.0805 14.9973 33.749 14.9973H22.499"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.99896 11.2473H14.999"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.499 21.2474H17.499"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.99896 27.4974H14.999"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M27.499 27.4974H29.999"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M27.499 21.2474H29.999"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2202_14113">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-medium text-[#18191C] text-xl">97,354</h1>
            <p className="text-[#767F8C]">Companies</p>
          </div>
        </div>
        <div className="bg-white px-5 py-5 rounded-lg flex items-center gap-5 w-full group">
          <div className="bg-[#E7F0FA] px-5 py-5 rounded-lg group-hover:bg-primary duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="group-hover:fill-white"
            >
              <g clip-path="url(#clip0_2202_14129)">
                <path
                  opacity="0.2"
                  d="M13.7501 25C18.2374 25 21.8751 21.3623 21.8751 16.875C21.8751 12.3877 18.2374 8.75 13.7501 8.75C9.26275 8.75 5.62506 12.3877 5.62506 16.875C5.62506 21.3623 9.26275 25 13.7501 25Z"
                  fill="#0A65CC"
                />
                <path
                  d="M13.7501 25C18.2374 25 21.8751 21.3623 21.8751 16.875C21.8751 12.3877 18.2374 8.75 13.7501 8.75C9.26275 8.75 5.62506 12.3877 5.62506 16.875C5.62506 21.3623 9.26275 25 13.7501 25Z"
                  stroke="#0A65CC"
                  stroke-width="2"
                  stroke-miterlimit="10"
                />
                <path
                  d="M24.2833 9.05262C25.4009 8.73776 26.5729 8.66603 27.7205 8.84227C28.8681 9.01851 29.9646 9.43862 30.9361 10.0743C31.9077 10.71 32.7317 11.5465 33.3528 12.5275C33.9738 13.5085 34.3774 14.6112 34.5364 15.7613C34.6954 16.9114 34.6061 18.0822 34.2745 19.1949C33.9429 20.3075 33.3767 21.3362 32.614 22.2117C31.8514 23.0871 30.91 23.789 29.8533 24.2699C28.7965 24.7509 27.649 24.9998 26.488 25"
                  stroke="#0A65CC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.49933 30.8432C3.76829 29.0382 5.45291 27.565 7.41097 26.548C9.36903 25.531 11.543 25.0001 13.7495 25C15.9559 24.9999 18.1299 25.5307 20.0881 26.5476C22.0462 27.5644 23.7309 29.0375 25 30.8424"
                  stroke="#0A65CC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M26.4879 25C28.6945 24.9984 30.8691 25.5285 32.8273 26.5455C34.7856 27.5625 36.4701 29.0364 37.738 30.8424"
                  stroke="#0A65CC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2202_14129">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-medium text-[#18191C] text-xl">97,354</h1>
            <p className="text-[#767F8C]">Companies</p>
          </div>
        </div>
        <div className="bg-white px-5 py-5 rounded-lg flex items-center gap-5 w-full group">
          <div className="bg-[#E7F0FA] px-5 py-5 rounded-lg group-hover:bg-primary duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              className="group-hover:fill-white"
            >
              <g clip-path="url(#clip0_2202_14141)">
                <path
                  opacity="0.2"
                  d="M20 23.75C14.7341 23.7583 9.55955 22.3739 5.00122 19.7373V32.5C5.00122 32.6642 5.03355 32.8267 5.09637 32.9784C5.15919 33.1301 5.25126 33.2679 5.36733 33.3839C5.48341 33.5 5.62121 33.5921 5.77286 33.6549C5.92452 33.7177 6.08707 33.75 6.25122 33.75H33.7512C33.9154 33.75 34.0779 33.7177 34.2296 33.6549C34.3812 33.5921 34.519 33.5 34.6351 33.3839C34.7512 33.2679 34.8433 33.1301 34.9061 32.9784C34.9689 32.8267 35.0012 32.6642 35.0012 32.5V19.7358C30.4423 22.3734 25.2669 23.7583 20 23.75Z"
                  fill="#0A65CC"
                />
                <path
                  d="M33.7512 11.25H6.25122C5.56086 11.25 5.00122 11.8096 5.00122 12.5V32.5C5.00122 33.1904 5.56086 33.75 6.25122 33.75H33.7512C34.4416 33.75 35.0012 33.1904 35.0012 32.5V12.5C35.0012 11.8096 34.4416 11.25 33.7512 11.25Z"
                  stroke="#0A65CC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M26.25 11.25V8.75C26.25 8.08696 25.9866 7.45107 25.5178 6.98223C25.0489 6.51339 24.413 6.25 23.75 6.25H16.25C15.587 6.25 14.9511 6.51339 14.4822 6.98223C14.0134 7.45107 13.75 8.08696 13.75 8.75V11.25"
                  stroke="#0A65CC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M35.0012 19.7358C30.4423 22.3734 25.2669 23.7583 20 23.75C14.7339 23.7583 9.55935 22.3739 5.00098 19.7372"
                  stroke="#0A65CC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.125 18.75H21.875"
                  stroke="#0A65CC"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_2202_14141">
                  <rect width="40" height="40" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="flex flex-col items-start gap-1">
            <h1 className="font-medium text-[#18191C] text-xl">119,354</h1>
            <p className="text-[#767F8C]">Posted Jobs</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
