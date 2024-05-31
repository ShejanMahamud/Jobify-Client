import { useMutation } from "@tanstack/react-query";
import { DatePicker } from "antd";
import JoditEditor from "jodit-react";
import moment from "moment";
import React, { useState } from "react";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCompanyInfo from "../../hooks/useCompanyInfo";
import useUserInfo from "../../hooks/useUserInfo";
import useJoditConfigs from './../../hooks/useJoditConfigs';
import Subscription from "./Subscription";
const { RangePicker } = DatePicker;
//Will use multi step post job form later
const CompanyPostJob = () => {
    const {userInfo} = useUserInfo()
    const {editor,config} = useJoditConfigs()
    const [description, setDescription] = useState("");
    const [responsibility, setResponsibility] = useState('')
    const axiosSecure = useAxiosSecure();
    const {companyInfo} = useCompanyInfo();
    const [jobType,setJobType] = useState(null)
    const [internDate,setInternDate] = useState([])


  const {mutateAsync} = useMutation({
      mutationFn: async jobInfo => {
        const {data} = await axiosSecure.post(`/jobs`,jobInfo);
        if(data.message){
          return toast.error(data.message)
        }
        return data
      },
      onSuccess: () => {
        toast.success('Job Added Successfully!')
      }
    })

    const handleAddJob = async (e) => {
      e.preventDefault();
      
      try{
        const form = e.target;
      const job_title = form.title.value;
      const tags = form.tags.value.toLowerCase();
      const job_tags = tags.split(',');
      const job_role = form.role.value;
      const job_salary_min = parseInt(form.min_salary.value);
      const job_salary_max = parseInt(form.max_salary.value);
      const job_salary_type = form.salary_type.value;
      const education = form.education.value;
      const experience = form.experience.value;
      const job_nature = form.job_nature.value;
      const job_type = form.job_type.value;
      const vacancies = form.vacancies.value;
      const expiration_date = moment(form.date.value).format('MMMM D, YYYY')
      const location = form.location.value;
      const job_level = form.job_level.value;
      const category = form.category.value;
      const responsibilities = responsibility;
      const platform = form.radio.value;
      const posted_date = moment().format('LL');
      const company_name = userInfo.name;
      const company_email = userInfo.email;
      const featured = false;
      const internship_period_start = internDate[0]
      const internship_period_end = internDate[1]
  

      const jobInfo = {job_title,job_tags,job_role,job_salary_min,job_salary_max,job_salary_type,education,experience,job_nature,job_type,vacancies,expiration_date,location,job_level,category,description,responsibilities,platform,posted_date,company_name,company_email,featured, ...(jobType === 'Internship' && internship_period_start && {internship_period_start}),...(jobType === 'Internship' && internship_period_end && {internship_period_end})}
      await mutateAsync(jobInfo)
      }
      catch(error){
        console.log(error)
        toast.error('Something Went Wrong!')
      }

    }
//Todo: candidate work
  return (
<div className="border-l border-[#e4e5e8] w-full min-h-screen px-10 py-10 font-inter">
{
  companyInfo?.job_limit !== 0 ? 
  <div className="w-full">
  <h1 className="text-xl text-[#18191C] font-medium mb-10">Post A Job</h1>
  <form onSubmit={handleAddJob} className="w-full grid grid-cols-3 row-auto items-center gap-x-5 gap-y-5">
    <div className="flex flex-col items-start gap-2 col-span-3">
      <h1 className="text-sm text-[#18191C] mb-2">Job Title</h1>
      <input
        type="text"
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
        name="title"
        required
        placeholder="Job Title"
      />
    </div>
    <div className="flex flex-col items-start gap-2 col-span-2">
      <h1 className="text-sm text-[#18191C] mb-2">Tags</h1>
      <input
        type="text"
        required
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
        name="tags"
        placeholder="Job keyword, tags etc..."
      />
    </div>
    <div className="flex flex-col items-start gap-2 col-span-1">
      <h1 className="text-sm text-[#18191C] mb-2">Job Role</h1>
      <input
      required
        type="text"
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
        name="role"
        placeholder="Job Role"
      />
    </div>
    <h1 className="text-lg text-[#18191C] font-medium my-5 col-span-3">
      Salary
    </h1>
    <div className="flex flex-col items-start gap-2 ">
      <h1 className="text-sm text-[#18191C] mb-2">Min Salary</h1>
      <input
      required
        type="number"
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
        name="min_salary"
        placeholder="Min Salary"
      />
    </div>
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-sm text-[#18191C] mb-2">Max Salary</h1>
      <input
        type="number"
        required
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
        name="max_salary"
        placeholder="Max Salary"
      />
    </div>
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-sm text-[#18191C] mb-2">Salary Type</h1>
      <select
      required
        name="salary_type"
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
      >
        <option value="select" selected disabled>
          Select
        </option>
        <option value="Yearly">Yearly</option>
        <option value="Monthly">Monthly</option>
        <option value="Half-Yearly">Half-Yearly</option>
      </select>
    </div>
    <h1 className="text-lg text-[#18191C] font-medium my-5 col-span-3">
      Advance Information
    </h1>
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-sm text-[#18191C] mb-2">Education</h1>
      <input
        type="text"
        required
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
        name="education"
        placeholder="Education"
      />
    </div>
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-sm text-[#18191C] mb-2">Experience</h1>
      <select
      required
        name="experience"
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
      >
        <option value="select" selected disabled>
          Select
        </option>
        <option value="Fresher">Fresher</option>
        <option value="1 Year">1 Year</option>
        <option value="2 Year">2 Year</option>
        <option value="3 Year">3 Year</option>
        <option value="4 Year">4 Year</option>
        <option value="5 Year">5 Year</option>
        <option value="5+ Year">5+ Year</option>
      </select>
    </div>
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-sm text-[#18191C] mb-2">Job Nature</h1>
      <select
      required
        name="job_nature"
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
      >
        <option value="select" selected disabled>
          Select
        </option>
        <option value="Remote">Remote</option>
        <option value="On Site">On Site</option>
        <option value="Hybrid">Hybrid</option>
      </select>
    </div>
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-sm text-[#18191C] mb-2">Job Type</h1>
      <select
      required
        name="job_type"
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
        onChange={(e)=>setJobType(e.target.value)}
      >
        <option value="select" selected disabled>
          Select
        </option>
        <option value="Full-Time">Full-Time</option>
        <option value="Part-Time">Part-Time</option>
        <option value="Internship">Internship</option>
        <option value="Contractual">Contractual</option>
      </select>
    </div>
    {
      jobType === 'Internship' && <div className="flex flex-col items-start gap-2">
      <h1 className="text-sm text-[#18191C] mb-2">Internship Period</h1>
      
      <RangePicker
      required
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
        onChange={(values) => {
          setInternDate(values.map(date => new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })));
        }}
      />
    </div>
    }
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-sm text-[#18191C] mb-2">Vacancies</h1>
      <select
      required
        name="vacancies"
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
      >
        <option value="select" selected disabled>
          Select
        </option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="5-10">5-10</option>
        <option value="10-20">10-20</option>
        <option value="20-30">20-30</option>
      </select>
    </div>
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-sm text-[#18191C] mb-2">Expiration Date</h1>
      {/* Implement date range, image preview on upload image, */}
      <DatePicker
      required
        name="date"
        format="YYYY-MM-DD"
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
        placeholder="Expiration Date"
      />
    </div>
    <div className="flex flex-col items-start gap-2">
      <h1 className="text-sm text-[#18191C] mb-2">Location</h1>
      <input
      required
        type="text"
        className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
        name="location"
        placeholder="Location"
      />
    </div>
    <div className='flex flex-col items-start gap-2'>
  <h1 className='text-sm text-[#18191C] mb-2'>Job Level</h1>
  <select required name="job_level" className='px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none'>
    <option value="select" selected disabled>Select</option>
    <option value="Entry-Level">Entry-Level</option>
    <option value="Mid-Level">Mid-Level</option>
    <option value="Senior-Level">Senior-Level</option>
  </select>
  </div>
  <div className='flex flex-col items-start gap-2'>
  <h1 className='text-sm text-[#18191C] mb-2'>Job Category</h1>
  <select required name="category" className='px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none'>
  <option value="select" disabled selected>Select</option>
  <option value="Code & Programing">Code & Programing</option>
  <option value="Digital Marketing">Digital Marketing</option>
  <option value="Video & Animation">Video & Animation</option>
  <option value="Graphics Design">Graphics Design</option>
  <option value="Music & Audio">Music & Audio</option>
  <option value="Account & Finance">Account & Finance</option>
  <option value="Health & Care">Health & Care</option>
  <option value="Data & Science">Data & Science</option>
</select>

  </div>
  <div className="w-full col-span-3 bg-[#F1F2F4] rounded-lg px-5 py-5 grid grid-cols-3 row-auto items-stretch gap-5">
  <h1 className="text-lg text-[#18191C] font-medium my-5 col-span-3">
      Apply Job On:
    </h1>
    <div className="w-full bg-white rounded-lg px-5 py-5 flex items-center gap-3">
    <input required type="radio" name="radio" value={'jobify'} className="radio checked:bg-primary" />
    <div className="flex flex-col items-start gap-2">
    <h1 className="text-lg text-[#18191C] font-medium ">
    On Jobify
    </h1>
    <p className="text-xs text-[#5E6670]">Candidate will apply job using jobpilot & all application will show on your dashboard.</p>
    </div>
    </div>
    <div className="w-full bg-white rounded-lg px-5 py-5 flex items-center gap-3">
    <input required type="radio" name="radio" value={'email'} className="radio checked:bg-primary" />
    <div className="flex flex-col items-start gap-2">
    <h1 className="text-lg text-[#18191C] font-medium ">
    On Your Email
    </h1>
    <p className="text-xs text-[#5E6670]">Candidate apply job on your email address, and all application in your email.</p>
    </div>
    </div>
    <div className="w-full bg-white rounded-lg px-5 py-5 flex items-center gap-3">
    <input required type="radio" name="radio" value={'external'} className="radio checked:bg-primary" />
    <div className="flex flex-col items-start gap-2">
    <h1 className="text-lg text-[#18191C] font-medium ">
    External Platform
    </h1>
    <p className="text-xs text-[#5E6670]">Candidate apply job on your website, all application on your own website.</p>
    </div>
    </div>
  </div>
  <h1 className="text-lg text-[#18191C] font-medium my-5 col-span-3">
  Description & Responsibility
    </h1>
    <div className='flex flex-col items-start gap-2 col-span-3 w-full'>
  <h1 className='text-sm text-[#18191C]'>Description</h1>
  <JoditEditor
                ref={editor}
                config={config}
                onChange={(newContent) => setDescription(newContent)}
                
              />
  </div>
    <div className='flex flex-col items-start gap-2 col-span-3 w-full'>
  <h1 className='text-sm text-[#18191C]'>Responsibilities</h1>
  <JoditEditor
                ref={editor}
                config={config}
                onChange={(newContent) => setResponsibility(newContent)}
                
              />
  </div>
  <button disabled={companyInfo?.job_limit === 0} className="bg-primary px-4 py-3 rounded-md text-white font-medium flex items-center gap-3 w-[50%]">
<span>Apply Now</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5 12H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5L19 12L12 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
  </form>
</div>
: 
<Subscription/>
}
</div>
  );
};

export default CompanyPostJob;
