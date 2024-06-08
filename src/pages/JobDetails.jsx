import { useQuery } from "@tanstack/react-query";
import { Modal } from "antd";
import JoditEditor from "jodit-react";
import moment from "moment";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { SlGraduation } from "react-icons/sl";
import { useParams } from "react-router-dom";
import CardJob from "../Utils/CardJob";
import Parser from "../Utils/Parser";
import useAxiosCommon from "../hooks/useAxiosCommon";
import useAxiosSecure from '../hooks/useAxiosSecure';
import useJoditConfigs from "../hooks/useJoditConfigs";
import useUserInfo from "../hooks/useUserInfo";

const JobDetails = () => {
  const axiosSecure = useAxiosSecure()
  const axiosCommon = useAxiosCommon();
  const { user,userInfo } = useUserInfo();
  const resumeRef = useRef(null);
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { id } = useParams();
  const {editor,config} = useJoditConfigs()

  const {data,isLoading} = useQuery({
    queryKey: ['job_details',id],
    queryFn: async () => {
      const {data} = await axiosCommon(`/job_details/${id}`)
      return data
    }
  })

  const handleOk = async () => {
    if (!user) {
      return toast.error("Please Login First!");
    }
    if (!user?.emailVerified) {
      return toast.error("Verify Your Email First!");
    }
    setConfirmLoading(true);
    if (
      !(userInfo && userInfo.name && userInfo.email && userInfo.photo && userInfo.education &&
        userInfo.experience && userInfo.resume && userInfo.title && userInfo.biodata && userInfo.location && userInfo.number)
    ) {
      setOpen(false);
      setConfirmLoading(false);
      return toast.error('Please Complete Your Profile First');
    }
    const jobInfo = {
      jobId: data && data?.job?._id,
      companyId: data && data?.company?._id,
      candidate_email: user?.email,
      cover_letter: content,
      resume: resumeRef.current.value,
      applied_date: moment().format("MMMM D, YYYY"),
      status: 'applied'
    };
    try {
      const { data: responseData } = await axiosSecure.post("/apply", jobInfo);
      if (responseData.message) {
        resumeRef.current.value = "";
        setContent("");
        setOpen(false);
        setConfirmLoading(false);
        return toast.error(responseData.message);
      }
      if (responseData.insertedId) {
        setTimeout(() => {
          resumeRef.current.value = "";
          toast.success("Applied Successfully!");
          setOpen(false);
          setContent("");
          setConfirmLoading(false);
        }, 2000);
      } else {
        toast.error("Something Went Wrong!");
      }
    } catch (error) {
      toast.error("An error occurred while applying.");
      setConfirmLoading(false);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const showModal = () => {
    setOpen(true);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        </div>
      ) : (
        <div className="w-full font-inter pb-10">
          <div className="flex items-center justify-between w-full bg-[#F1F2F4] py-5 px-20">
            <h1 className="text-[#18191C] text-lg font-medium">Job Details</h1>
            <ul className="flex items-center gap-1 text-[#18191C] text-xs">
              <li>Home</li>
              <li>/</li>
              <li>Find Jobs</li>
              <li>/</li>
              <li>{data?.job_title}</li>
            </ul>
          </div>
          <div className="flex items-center justify-between w-full px-20 py-10">
            <div className="flex items-center gap-5">
              <img src={data?.company?.company_logo} alt="" className="w-20 h-20 object-cover rounded-full"/>
              <div className="flex items-start flex-col gap-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-[#18191C] text-2xl font-medium">
                    {data?.job_title}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#E8F1FF] px-2 py-1 rounded-full text-xs text-[#0A65CC]">
                      {data?.job_type}
                    </span>
                    {
                      data?.featured && <span className="bg-[#FCEEEE] px-2 py-1 rounded-full text-xs text-[#E05151]">
                      Featured
                    </span>
                    }
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://gist.github.com/ShejanMahamud/205056e614f77ef4352546109a1ab4b1/raw/6d2e51907f77bd30c5150401fbe601dd99af44ae/website.svg"
                      alt=""
                    />
                    <span className="text-[#474C54]">{data?.company?.website}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://gist.github.com/ShejanMahamud/ed4015cd6afcad4d397392d5869e1be8/raw/97ed63b0b533c03f1c7326c0db1f1388ffc53778/phone.svg"
                      alt=""
                    />
                    <span className="text-[#474C54]">{data?.company?.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src="https://gist.github.com/ShejanMahamud/4b5564a901828f1bc610653ac8cdeca4/raw/e8be40062e5ca3460b4dbae3dff928bf385f685c/email.svg"
                      alt=""
                    />
                    <span className="text-[#474C54]">{data?.company?.email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end flex-col gap-2">
              <div className="flex items-center gap-5">
                <div className="bg-[#E8F1FF] px-3 py-3 rounded-md flex items-center justify-center">
                  <img
                    src="https://gist.githubusercontent.com/ShejanMahamud/df47decab64e9be48282c2329e938a76/raw/c8ef385f46684265fb4489c61b111873c4af6e21/bookmark.svg"
                    alt=""
                  />
                </div>
{
  data?.platform === 'jobify' && <button
  disabled={!data?.status}
  onClick={showModal}
  className="bg-primary px-4 py-3 rounded-md text-white font-medium flex items-center gap-3"
>
  <span>Apply Now</span>
  <img
    src="https://gist.github.com/ShejanMahamud/3e1531c623443a8f5df5f64e60328b72/raw/406db90cd80314df603b5da7cbe504acfb194eaf/arrow.svg"
    alt=""
  />
</button>
}
{
  data?.platform === 'email' && <button
  disabled={!data?.status}
  className="bg-primary px-4 py-3 rounded-md text-white font-medium flex items-center gap-3"
>
  <a href={`mailto:${data?.company_email}`}>Email Us</a>
  <img
    src="https://gist.github.com/ShejanMahamud/3e1531c623443a8f5df5f64e60328b72/raw/406db90cd80314df603b5da7cbe504acfb194eaf/arrow.svg"
    alt=""
  />
</button>
}
{
  data?.platform === 'external' && <button
  disabled={!data.status}
  className="bg-primary px-4 py-3 rounded-md text-white font-medium flex items-center gap-3"
>
  <a href={data?.company?.website}>Our Website</a>
  <img
    src="https://gist.github.com/ShejanMahamud/3e1531c623443a8f5df5f64e60328b72/raw/406db90cd80314df603b5da7cbe504acfb194eaf/arrow.svg"
    alt=""
  />
</button>
}
                <Modal
                  open={open}
                  width={800}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <h1 className="mb-5 text-xl font-medium text-[#18191C]">{`Apply Job: ${data?.job_title}`}</h1>
                  <div className="mb-10">
                    <label
                      for="resume"
                      class="block text-sm text-gray-800 font-medium mb-5"
                    >
                      Resume Link
                    </label>
                    <input
                      ref={resumeRef}
                      type="text"
                      required
                      name="resume"
                      class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      placeholder="PDF Link of Resume"
                    />
                  </div>
                  <h1 className="mb-5 text-sm font-medium text-[#18191C]">
                    Cover Letter
                  </h1>
                  <JoditEditor
                    ref={editor}
                    value={content}
                    config={config}
                    onChange={(newContent) => setContent(newContent)}
                  />
                </Modal>
              </div>
              <p className="text-[#767F8C] text-sm">
                Job expire in:{" "}
                <span className="text-[#E05151] font-medium">
                  {data?.expiration_date}
                </span>
              </p>
            </div>
          </div>
          <div className="w-full px-20 py-5 grid grid-cols-2 row-auto items-start gap-20">
            <div className="flex flex-col items-start gap-10">
              <div className="flex flex-col items-start gap-2">
                <h1 className="text-black text-lg font-medium mb-3">
                  Job Description
                </h1>
                <Parser text={data?.description}/>
              </div>

              <div className="flex flex-col items-start gap-2">
                <h1 className="text-black text-lg font-medium mb-3">
                  Responsibilities
                </h1>
                <Parser text={data?.responsibilities}/>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#191F33]">Share this job:</span>
                <button className="border border-[#CEE0F5] px-3 py-2 rounded-lg text-[#0A65CC] flex items-center gap-2">
                  <img
                    src="https://gist.githubusercontent.com/ShejanMahamud/257bddb4ed895b9bf91c7979890f8c3d/raw/8f912afec40244266651bc332c398e565d0088bf/facebook.svg"
                    alt=""
                  />
                  <span>Facebook</span>
                </button>

                <button className="border border-[#CEE0F5] px-3 py-2 rounded-lg text-[#1DA1F2] flex items-center gap-2">
                  <img
                    src="https://gist.githubusercontent.com/ShejanMahamud/6588958734fce721b08e8936e9cd024f/raw/cbb92eeefd308ddcb56a8d948f33d2a7146d6d33/twitter.svg"
                    alt=""
                  />
                  <span>Twitter</span>
                </button>
                <button className="border border-[#CEE0F5] px-3 py-2 rounded-lg text-[#CA2127] flex items-center gap-2">
                  <img
                    src="https://gist.githubusercontent.com/ShejanMahamud/2230dc6f21daabb3c38b3b0d08db87c6/raw/639d9bf41e97abe14113637423c3f4238c40bf4c/pinterest.svg"
                    alt=""
                  />
                  <span>Pinterest</span>
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-10">
              <div className="border border-[#E7F0FA] px-10 py-5 w-full rounded-lg">
                <h1 className="text-xl font-medium mb-5">Job Overview</h1>
                <div className="w-full grid grid-cols-3 row-auto items-center gap-x-5 gap-y-12">
                  <div className="flex flex-col items-start gap-1">
                    <img
                      src="https://gist.github.com/ShejanMahamud/af12ad7c38c5005bfd0e2aaa43f4e3d3/raw/1beba8809f390da85300860b6cd14449b8e499c1/calender.svg"
                      alt=""
                    />
                    <span className="text-[#767F8C] text-xs uppercase">
                      Job Posted:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      {data?.posted_date}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <img
                      src="https://gist.github.com/ShejanMahamud/8d852d8a4f2309d81abc342e56a5bb00/raw/e1fba23aaebb9f591f8c7ae797406a714dfabf38/time.svg"
                      alt=""
                    />
                    <span className="text-[#767F8C] text-xs uppercase">
                      Job expire in:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      {data?.expiration_date}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <img
                      src="https://gist.github.com/ShejanMahamud/e16dec7165622ccc296af02a9eec2074/raw/4c9780faa5be1fda432532fd337bca33aa4b29f5/salary.svg"
                      alt=""
                    />
                    <span className="text-[#767F8C] text-xs uppercase">
                      Salaray:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      ${data?.job_salary_min}-{data?.job_salary_max}/month
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <img
                      src="https://gist.github.com/ShejanMahamud/b5c2b5eca7f8bb6fffa6ce3ae9cb9eae/raw/d0bd31fb04d51f0a153d6d6d8f7959d6128acc7d/location.svg"
                      alt=""
                    />
                    <span className="text-[#767F8C] text-xs uppercase">
                      Location:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      {data?.location}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <img
                      src="https://gist.github.com/ShejanMahamud/f1925206163b04c776d705b33754f791/raw/942a7d4a1363b350997f116e5b95d69c50fc8e5b/brifcase.svg"
                      alt=""
                    />
                    <span className="text-[#767F8C] text-xs uppercase">
                      Job type:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      {data?.job_type}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <img
                      src="https://gist.github.com/ShejanMahamud/f1925206163b04c776d705b33754f791/raw/942a7d4a1363b350997f116e5b95d69c50fc8e5b/brifcase.svg"
                      alt=""
                    />
                    <span className="text-[#767F8C] text-xs uppercase">
                      Experience:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      {data?.experience}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                  <SlGraduation className='text-[#0A65CC] text-3xl'/>
                    <span className="text-[#767F8C] text-xs uppercase">
                      Education:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                    {data?.education}
                    </span>
                  </div>
                </div>
              </div>
              <div className="border border-[#E7F0FA] px-10 py-5 w-full rounded-lg">
                <div className="flex items-center gap-5 mb-10">
                <img src={data?.company?.company_logo} alt="" className="w-20 h-20 object-cover rounded-full"/>
                  <div className="flex flex-col items-start gap-2">
                    <h1 className="text-[#18191C] text-lg font-medium">
                      {data?.company?.company_name}
                    </h1>
                    <p className="text-[#767F8C] text-sm">
                      {data?.company?.company_category}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-5 mb-10">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Founded in:</span>
                    <span className="text-[#18191C]">
                      {data?.company?.founded_in}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Organization type:</span>
                    <span className="text-[#18191C] uppercase">
                      {data?.company?.organization_type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Company size:</span>
                    <span className="text-[#18191C]">
                      {data?.company?.company_size}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Phone:</span>
                    <span className="text-[#18191C]">{data?.company?.phone}</span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Email:</span>
                    <span className="text-[#18191C]">{data?.company?.email}</span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Website:</span>
                    <span className="text-[#18191C]">{data?.company?.website}</span>
                  </div>
                </div>
                <div className="flex items-center gap-5 ">
                  <button className="bg-[#E7F0FA] h-12 w-12 rounded-lg flex items-center justify-center">
                    <img
                      src="https://gist.github.com/ShejanMahamud/4b71f185e68ecc18c20deb49ae19f87a/raw/7cb72f1a68b26fbfbc52a60a465b00f6bcc9a5a3/facebook.svg"
                      alt=""
                    />
                  </button>

                  <button className="bg-primary h-12 w-12 rounded-lg flex items-center justify-center">
                    <img
                      src="https://gist.github.com/ShejanMahamud/a12960b1dad8f42ac2319a49ea15db23/raw/d24690f074547e5399b358985590b148b2e565a9/twitter.svg"
                      alt=""
                    />
                  </button>

                  <button className="bg-[#E7F0FA] h-12 w-12 rounded-lg flex items-center justify-center">
                    <img
                      src="https://gist.github.com/ShejanMahamud/10ac6f72beaffbb3579928817f5bb9f7/raw/862566ddabfbe9607d60e3fef7e09ec73a0944c1/instagram.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
{ data?.related_jobs && data?.related_jobs.length > 0 && 
         <div className="my-10 py-10 border border-[#E4E5E8] px-20 w-full">
            <h1 className="text-[#18191C] text-[40px] font-medium">
              Related Jobs ({data?.related_jobs && data?.related_jobs.length})
            </h1>
            <div className="w-full grid grid-cols-3 row-auto items-center gap-10 my-10">
              {data?.related_jobs &&
                data?.related_jobs.map((job) => <CardJob job={job} key={job._id} />)}
            </div>
          </div>}
        </div>
      )}
    </>
  );
};

export default JobDetails;
