import { useQuery } from "@tanstack/react-query";
import { Breadcrumb, Modal } from "antd";
import axios from "axios";
import JoditEditor from "jodit-react";
import React, { useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const JobDetails = () => {
  // const userData = useUser()
  const { user } = useAuth();
  const resumeRef = useRef(null);
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { data: jobs = [] } = useLoaderData();
  
  const {
    job_title,
    company_name,
    expiration_date,
    description,
    responsibilities,
    posted_date,
    job_salary_min,
    job_salary_max,
    location,
    job_type,
    experience,
    _id: jobId,
  } = jobs;

  const { data: company = [], isPending } = useQuery({
    queryKey: ["company"],
    queryFn: async () => {
      const { data } = await axios.get(
        `http://localhost:5948/companies?name=${company_name}`
      );
      return data;
    },
  });

  const {
    _id: companyId,
    founded_in,
    organization_type,
    company_size,
    phone,
    email,
    website,
    company_logo,
    company_category,
  } = company;

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = async () => {
    if(!user){
      return toast.error('Please Login First!')
    }
    setConfirmLoading(true);
    const jobInfo = {
      jobId: jobId,
      companyId: companyId,
      candidate_email: user?.email,
      cover_letter: content,
      resume: resumeRef.current.value,
    };
    const { data } = await axios.post("http://localhost:5948/apply", jobInfo);
    if (data.duplicate) {
      resumeRef.current.value = "";
      setContent("");
      setOpen(false);
      setConfirmLoading(false);
      return toast.error("Already Applied!");
    }
    if (data.insertedId) {
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
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const options = [
    "bold",
    "italic",
    "|",
    "ul",
    "ol",
    "|",
    "font",
    "fontsize",
    "|",
    "outdent",
    "indent",
    "align",
    "|",
    "hr",
    "|",
    "fullsize",
    "brush",
    "|",
    "table",
    "link",
    "|",
    "undo",
    "redo",
  ];
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "",
      defaultActionOnPaste: "insert_as_html",
      defaultLineHeight: 1.5,
      enter: "br",
      // options that we defined in above step.
      buttons: options,
      buttonsMD: options,
      buttonsSM: options,
      buttonsXS: options,
      statusbar: false,
      sizeLG: 900,
      sizeMD: 700,
      sizeSM: 400,
      toolbarAdaptive: false,
    }),
    []
  );
// console.log( userData && userData)
  return (
    <>
      {isPending ? (
        <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
          <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
        </div>
      ) : (
        <div className="w-full font-inter pb-10">
          <div className="flex items-center justify-between w-full bg-[#F1F2F4] py-5 px-20">
            <h1 className="text-[#18191C] text-lg font-medium">Job Details</h1>
            <Breadcrumb
              separator=">"
              items={[
                {
                  title: "Home",
                },
                {
                  title: "Find Job",
                  href: "/find_jobs",
                },
                {
                  title: "Software Development",
                  href: "/category",
                },
                {
                  title: "Job Details",
                },
              ]}
            />
          </div>
          <div className="flex items-center justify-between w-full px-20 py-10">
            <div className="flex items-center gap-5">
              <div className="h-20 w-20 rounded-full bg-gray-400 text-3xl text-white flex items-center justify-center">
                {job_title[0]}
              </div>
              <div className="flex items-start flex-col gap-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-[#18191C] text-2xl font-medium">
                    {job_title}
                  </h1>
                  <div className="flex items-center gap-3">
                    <span className="bg-[#E8F1FF] px-2 py-1 rounded-full text-xs text-[#0A65CC]">
                      Full-Time
                    </span>
                    <span className="bg-[#FCEEEE] px-2 py-1 rounded-full text-xs text-[#E05151]">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="21"
                      viewBox="0 0 20 21"
                      fill="none"
                    >
                      <path
                        d="M8.3335 11.333C8.69137 11.8114 9.14796 12.2073 9.67229 12.4938C10.1966 12.7802 10.7764 12.9506 11.3724 12.9933C11.9683 13.0359 12.5665 12.95 13.1263 12.7411C13.6861 12.5323 14.1944 12.2055 14.6168 11.783L17.1168 9.28298C17.8758 8.49714 18.2958 7.44463 18.2863 6.35214C18.2768 5.25965 17.8386 4.2146 17.0661 3.44207C16.2935 2.66953 15.2485 2.23133 14.156 2.22184C13.0635 2.21234 12.011 2.63232 11.2252 3.39131L9.79183 4.81631"
                        stroke="#0066FF"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.6668 9.66702C11.309 9.18858 10.8524 8.7927 10.328 8.50623C9.80371 8.21977 9.22391 8.04942 8.62796 8.00674C8.03201 7.96406 7.43384 8.05004 6.87405 8.25887C6.31425 8.46769 5.8059 8.79446 5.3835 9.21702L2.8835 11.717C2.12451 12.5029 1.70453 13.5554 1.71402 14.6479C1.72352 15.7403 2.16172 16.7854 2.93426 17.5579C3.70679 18.3305 4.75184 18.7687 5.84433 18.7782C6.93681 18.7877 7.98932 18.3677 8.77517 17.6087L10.2002 16.1837"
                        stroke="#0066FF"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="text-[#474C54]">{website}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_1647_30382)">
                        <path
                          d="M8.66965 12.2014C9.44762 13.7919 10.7369 15.0753 12.3309 15.846C12.4475 15.9013 12.5765 15.9252 12.7052 15.9155C12.8339 15.9058 12.9579 15.8627 13.0648 15.7905L15.4119 14.2254C15.5157 14.1562 15.6352 14.1139 15.7594 14.1025C15.8837 14.0911 16.0088 14.1109 16.1235 14.16L20.5144 16.0419C20.6636 16.1052 20.7881 16.2154 20.8693 16.3556C20.9504 16.4959 20.9838 16.6588 20.9643 16.8197C20.8255 17.9057 20.2956 18.9039 19.4739 19.6273C18.6521 20.3508 17.5948 20.7499 16.5 20.75C13.1185 20.75 9.87548 19.4067 7.48439 17.0156C5.0933 14.6245 3.75 11.3815 3.75 7.99997C3.75006 6.90513 4.14918 5.84786 4.87264 5.0261C5.5961 4.20435 6.59428 3.67448 7.68028 3.53569C7.84117 3.51622 8.00403 3.54956 8.14432 3.6307C8.28461 3.71183 8.39473 3.83636 8.4581 3.98552L10.3416 8.38032C10.3903 8.494 10.4101 8.61796 10.3994 8.74116C10.3886 8.86436 10.3475 8.98299 10.2798 9.08647L8.72011 11.4696C8.64912 11.5768 8.60716 11.7006 8.59831 11.8288C8.58947 11.9571 8.61405 12.0855 8.66965 12.2014V12.2014Z"
                          stroke="#0066FF"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1647_30382">
                          <rect
                            width="24"
                            height="24"
                            fill="white"
                            transform="translate(0 0.5)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[#474C54]">{phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="25"
                      viewBox="0 0 24 25"
                      fill="none"
                    >
                      <path
                        d="M21 5.75L12 14L3 5.75"
                        stroke="#0A65CC"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M3 5.75H21V18.5C21 18.6989 20.921 18.8897 20.7803 19.0303C20.6397 19.171 20.4489 19.25 20.25 19.25H3.75C3.55109 19.25 3.36032 19.171 3.21967 19.0303C3.07902 18.8897 3 18.6989 3 18.5V5.75Z"
                        stroke="#0A65CC"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.3638 12.5L3.23145 19.038"
                        stroke="#0A65CC"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M20.7687 19.0381L13.6362 12.5"
                        stroke="#0A65CC"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="text-[#474C54]">{email}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-end flex-col gap-2">
              <div className="flex items-center gap-5">
                <div className="bg-[#E8F1FF] px-3 py-3 rounded-md flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19 21L12 16L5 21V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H17C17.5304 3 18.0391 3.21071 18.4142 3.58579C18.7893 3.96086 19 4.46957 19 5V21Z"
                      stroke="#0A65CC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <button
                  onClick={showModal}
                  className="bg-primary px-4 py-3 rounded-md text-white font-medium flex items-center gap-3"
                >
                  <span>Apply Now</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 12H19"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12 5L19 12L12 19"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </button>
                <Modal
                  open={open}
                  width={800}
                  onOk={handleOk}
                  confirmLoading={confirmLoading}
                  onCancel={handleCancel}
                >
                  <h1 className="mb-5 text-xl font-medium text-[#18191C]">{`Apply Job: ${job_title}`}</h1>
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
                  {expiration_date}
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
                <p className="text-[#5E6670]">{description}</p>
              </div>

              <div className="flex flex-col items-start gap-2">
                <h1 className="text-black text-lg font-medium mb-3">
                  Responsibilities
                </h1>
                <ul className="text-[#5E6670] text-sm list-disc *:mb-3 ml-5">
                  {responsibilities &&
                    responsibilities.map((responsibility, index) => (
                      <li key={index}>{responsibility}</li>
                    ))}
                </ul>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#191F33]">Share this job:</span>
                <button className="border border-[#CEE0F5] px-3 py-2 rounded-lg text-[#0A65CC] flex items-center gap-2">
                    <img src="https://gist.githubusercontent.com/ShejanMahamud/257bddb4ed895b9bf91c7979890f8c3d/raw/8f912afec40244266651bc332c398e565d0088bf/facebook.svg" alt="" />
                  <span>Facebook</span>
                </button>

                <button className="border border-[#CEE0F5] px-3 py-2 rounded-lg text-[#1DA1F2] flex items-center gap-2">
                    <img src="https://gist.githubusercontent.com/ShejanMahamud/6588958734fce721b08e8936e9cd024f/raw/cbb92eeefd308ddcb56a8d948f33d2a7146d6d33/twitter.svg" alt="" />
                  <span>Twitter</span>
                </button>
                <button className="border border-[#CEE0F5] px-3 py-2 rounded-lg text-[#CA2127] flex items-center gap-2">
                <img src="https://gist.githubusercontent.com/ShejanMahamud/2230dc6f21daabb3c38b3b0d08db87c6/raw/639d9bf41e97abe14113637423c3f4238c40bf4c/pinterest.svg" alt="" />
                  <span>Pinterest</span>
                </button>
              </div>
            </div>
            <div className="w-full flex flex-col items-center gap-10">
              <div className="border border-[#E7F0FA] px-10 py-5 w-full rounded-lg">
                <h1 className="text-xl font-medium mb-5">Job Overview</h1>
                <div className="w-full grid grid-cols-3 row-auto items-center gap-x-5 gap-y-12">
                  <div className="flex flex-col items-start gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M26 5H6C5.44772 5 5 5.44772 5 6V26C5 26.5523 5.44772 27 6 27H26C26.5523 27 27 26.5523 27 26V6C27 5.44772 26.5523 5 26 5Z"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M22 3V7"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10 3V7"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M5 11H27"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="text-[#767F8C] text-xs uppercase">
                      Job Posted:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      {posted_date}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M16 27C22.0751 27 27 22.0751 27 16C27 9.92487 22.0751 5 16 5C9.92487 5 5 9.92487 5 16C5 22.0751 9.92487 27 16 27Z"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-miterlimit="10"
                      />
                      <path
                        d="M16 15.9996L20.9497 11.0498"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13 1H19"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="text-[#767F8C] text-xs uppercase">
                      Job expire in:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      {expiration_date}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M5 8V24C5 24.5304 5.21071 25.0391 5.58579 25.4142C5.96086 25.7893 6.46957 26 7 26H27C27.2652 26 27.5196 25.8946 27.7071 25.7071C27.8946 25.5196 28 25.2652 28 25V11C28 10.7348 27.8946 10.4804 27.7071 10.2929C27.5196 10.1054 27.2652 10 27 10H7C6.46957 10 5.96086 9.78929 5.58579 9.41421C5.21071 9.03914 5 8.53043 5 8ZM5 8C5 7.46957 5.21071 6.96086 5.58579 6.58579C5.96086 6.21071 6.46957 6 7 6H24"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23 18C23 18.2761 22.7761 18.5 22.5 18.5C22.2239 18.5 22 18.2761 22 18C22 17.7239 22.2239 17.5 22.5 17.5C22.7761 17.5 23 17.7239 23 18Z"
                        fill="#18191C"
                        stroke="#0A65CC"
                        stroke-width="2"
                      />
                    </svg>
                    <span className="text-[#767F8C] text-xs uppercase">
                      Salaray:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      ${job_salary_min}-{job_salary_max}/month
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M7 29H25"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16 17C18.2091 17 20 15.2091 20 13C20 10.7909 18.2091 9 16 9C13.7909 9 12 10.7909 12 13C12 15.2091 13.7909 17 16 17Z"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M26 13C26 22 16 29 16 29C16 29 6 22 6 13C6 10.3478 7.05357 7.8043 8.92893 5.92893C10.8043 4.05357 13.3478 3 16 3C18.6522 3 21.1957 4.05357 23.0711 5.92893C24.9464 7.8043 26 10.3478 26 13V13Z"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="text-[#767F8C] text-xs uppercase">
                      Location:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      {location}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_1754_47862)">
                        <path
                          d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z"
                          stroke="#0A65CC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M21 9V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H13C12.4696 5 11.9609 5.21071 11.5858 5.58579C11.2107 5.96086 11 6.46957 11 7V9"
                          stroke="#0A65CC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M28.0012 15.7891C24.354 17.8991 20.2137 19.007 16.0002 19.0004C11.7873 19.007 7.64768 17.8995 4.00098 15.7901"
                          stroke="#0A65CC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.5 15H17.5"
                          stroke="#0A65CC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1754_47862">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[#767F8C] text-xs uppercase">
                      job type:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      {job_type}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_1754_47862)">
                        <path
                          d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z"
                          stroke="#0A65CC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M21 9V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H13C12.4696 5 11.9609 5.21071 11.5858 5.58579C11.2107 5.96086 11 6.46957 11 7V9"
                          stroke="#0A65CC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M28.0012 15.7891C24.354 17.8991 20.2137 19.007 16.0002 19.0004C11.7873 19.007 7.64768 17.8995 4.00098 15.7901"
                          stroke="#0A65CC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.5 15H17.5"
                          stroke="#0A65CC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1754_47862">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[#767F8C] text-xs uppercase">
                      Experience:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      {experience}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_1754_47862)">
                        <path
                          d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z"
                          stroke="#0A65CC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M21 9V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H13C12.4696 5 11.9609 5.21071 11.5858 5.58579C11.2107 5.96086 11 6.46957 11 7V9"
                          stroke="#0A65CC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M28.0012 15.7891C24.354 17.8991 20.2137 19.007 16.0002 19.0004C11.7873 19.007 7.64768 17.8995 4.00098 15.7901"
                          stroke="#0A65CC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                        <path
                          d="M14.5 15H17.5"
                          stroke="#0A65CC"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_1754_47862">
                          <rect width="32" height="32" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                    <span className="text-[#767F8C] text-xs uppercase">
                      Education:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      Graduation
                    </span>
                  </div>
                </div>
              </div>
              <div className="border border-[#E7F0FA] px-10 py-5 w-full rounded-lg">
                <div className="flex items-center gap-5 mb-10">
                  <div className="h-20 w-20 rounded-full bg-gray-400 text-3xl text-white flex items-center justify-center">
                    T
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <h1 className="text-[#18191C] text-lg font-medium">
                      {company_name}
                    </h1>
                    <p className="text-[#767F8C] text-sm">{company_category}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-5 mb-10">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Founded in:</span>
                    <span className="text-[#18191C]">{founded_in}</span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Organization type:</span>
                    <span className="text-[#18191C] uppercase">
                      {organization_type}
                    </span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Company size:</span>
                    <span className="text-[#18191C]">{company_size}s</span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Phone:</span>
                    <span className="text-[#18191C]">{phone}</span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Email:</span>
                    <span className="text-[#18191C]">{email}</span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Website:</span>
                    <span className="text-[#18191C]">{website}</span>
                  </div>
                </div>
                <div className="flex items-center gap-5 ">
                  <button className="bg-[#E7F0FA] h-12 w-12 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M9.33328 16H6.16101V8.1131H4V5.54528H6.16092V3.7181C6.16092 1.55288 7.1167 0 10.2804 0C10.9495 0 12 0.134507 12 0.134507V2.51887H10.8966C9.7724 2.51887 9.33345 2.85992 9.33345 3.80281V5.54528H11.9579L11.7242 8.1131H9.33336L9.33328 16Z"
                        fill="#0A65CC"
                      />
                    </svg>
                  </button>

                  <button className="bg-primary h-12 w-12 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M5.00378 14.4026C11.0081 14.4026 14.2917 9.45675 14.2917 5.16789C14.2917 5.02743 14.2888 4.88761 14.2824 4.74837C14.9214 4.28872 15.4728 3.71959 15.9108 3.06768C15.3259 3.32623 14.6965 3.50025 14.0362 3.5787C14.7101 3.1769 15.2275 2.54123 15.4716 1.78352C14.8308 2.16148 14.1298 2.42791 13.3988 2.57135C12.8031 1.94047 11.955 1.5459 11.016 1.5459C9.21328 1.5459 7.75143 2.99941 7.75143 4.79109C7.75143 5.04581 7.78011 5.2935 7.83612 5.53115C5.12304 5.39542 2.71728 4.1039 1.10722 2.14007C0.817235 2.63539 0.664706 3.19832 0.665213 3.77139C0.665213 4.89745 1.24149 5.89149 2.11788 6.47307C1.59949 6.45733 1.09247 6.31811 0.639471 6.06712C0.638986 6.08074 0.638986 6.09402 0.638986 6.10858C0.638986 7.68041 1.76419 8.99279 3.25786 9.29016C2.97733 9.36612 2.68785 9.40453 2.39709 9.40436C2.18712 9.40436 1.98248 9.38382 1.78359 9.34586C2.19918 10.6355 3.40426 11.5739 4.83303 11.6001C3.71575 12.4708 2.30832 12.9894 0.778658 12.9894C0.518442 12.9896 0.258439 12.9746 0 12.9445C1.44471 13.8652 3.16017 14.4024 5.00394 14.4024"
                        fill="white"
                      />
                    </svg>
                  </button>

                  <button className="bg-[#E7F0FA] h-12 w-12 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <g clip-path="url(#clip0_2229_52235)">
                        <path
                          d="M5.33425 8C5.33425 6.5273 6.52778 5.33312 8.00049 5.33312C9.47319 5.33312 10.6674 6.5273 10.6674 8C10.6674 9.4727 9.47319 10.6669 8.00049 10.6669C6.52778 10.6669 5.33425 9.4727 5.33425 8ZM3.89258 8C3.89258 10.2688 5.73169 12.1079 8.00049 12.1079C10.2693 12.1079 12.1084 10.2688 12.1084 8C12.1084 5.7312 10.2693 3.8921 8.00049 3.8921C5.73169 3.8921 3.89258 5.7312 3.89258 8ZM11.311 3.72922C11.3109 3.91909 11.3672 4.10471 11.4726 4.26263C11.578 4.42054 11.7279 4.54365 11.9033 4.61638C12.0787 4.68911 12.2717 4.7082 12.4579 4.67123C12.6442 4.63426 12.8153 4.5429 12.9496 4.40869C13.0839 4.27449 13.1754 4.10347 13.2125 3.91726C13.2496 3.73106 13.2307 3.53802 13.1581 3.36258C13.0855 3.18713 12.9625 3.03715 12.8047 2.9316C12.6468 2.82605 12.4613 2.76968 12.2714 2.7696H12.271C12.0165 2.76972 11.7725 2.87085 11.5925 3.05077C11.4125 3.2307 11.3112 3.47471 11.311 3.72922ZM4.76849 14.5118C3.98852 14.4763 3.56458 14.3464 3.28286 14.2366C2.90935 14.0912 2.64286 13.918 2.36266 13.6382C2.08247 13.3584 1.90903 13.0922 1.76426 12.7187C1.65444 12.4371 1.52452 12.013 1.48906 11.233C1.45028 10.3898 1.44254 10.1364 1.44254 8.00006C1.44254 5.86368 1.45092 5.61107 1.48906 4.7671C1.52458 3.98714 1.65546 3.5639 1.76426 3.28147C1.90967 2.90797 2.08286 2.64147 2.36266 2.36128C2.64247 2.08109 2.90871 1.90765 3.28286 1.76288C3.56446 1.65306 3.98852 1.52314 4.76849 1.48768C5.61175 1.4489 5.86506 1.44115 8.00049 1.44115C10.1359 1.44115 10.3895 1.44954 11.2334 1.48768C12.0134 1.5232 12.4366 1.65408 12.7191 1.76288C13.0926 1.90765 13.3591 2.08147 13.6393 2.36128C13.9195 2.64109 14.0923 2.90797 14.2377 3.28147C14.3475 3.56307 14.4774 3.98714 14.5129 4.7671C14.5517 5.61107 14.5594 5.86368 14.5594 8.00006C14.5594 10.1364 14.5517 10.3891 14.5129 11.233C14.4773 12.013 14.3468 12.4369 14.2377 12.7187C14.0923 13.0922 13.9191 13.3587 13.6393 13.6382C13.3595 13.9178 13.0926 14.0912 12.7191 14.2366C12.4375 14.3464 12.0134 14.4764 11.2334 14.5118C10.3902 14.5506 10.1369 14.5583 8.00049 14.5583C5.8641 14.5583 5.61149 14.5506 4.76849 14.5118ZM4.70225 0.048448C3.8506 0.087232 3.26865 0.222272 2.76042 0.420032C2.23409 0.624256 1.78852 0.89824 1.34327 1.34278C0.898024 1.78733 0.624744 2.2336 0.42052 2.75994C0.22276 3.26848 0.0877203 3.85011 0.0489363 4.70176C0.00951228 5.55475 0.000488281 5.82746 0.000488281 8C0.000488281 10.1725 0.00951228 10.4452 0.0489363 11.2982C0.0877203 12.15 0.22276 12.7315 0.42052 13.2401C0.624744 13.7661 0.898088 14.2129 1.34327 14.6572C1.78846 15.1016 2.23409 15.3752 2.76042 15.58C3.26961 15.7777 3.8506 15.9128 4.70225 15.9516C5.55569 15.9903 5.82794 16 8.00049 16C10.173 16 10.4457 15.991 11.2987 15.9516C12.1504 15.9128 12.732 15.7777 13.2405 15.58C13.7666 15.3752 14.2125 15.1018 14.6577 14.6572C15.1029 14.2127 15.3757 13.7661 15.5805 13.2401C15.7782 12.7315 15.9139 12.1499 15.952 11.2982C15.9908 10.4446 15.9998 10.1725 15.9998 8C15.9998 5.82746 15.9908 5.55475 15.952 4.70176C15.9133 3.85005 15.7782 3.26816 15.5805 2.75994C15.3757 2.23392 15.1022 1.78803 14.6577 1.34278C14.2132 0.897536 13.7666 0.624256 13.2412 0.420032C12.732 0.222272 12.1504 0.086592 11.2994 0.048448C10.4464 0.009664 10.1737 0 8.00113 0C5.82858 0 5.55569 0.009024 4.70225 0.048448Z"
                          fill="#0A65CC"
                        />
                        <path
                          d="M5.33425 8C5.33425 6.5273 6.52778 5.33312 8.00049 5.33312C9.47319 5.33312 10.6674 6.5273 10.6674 8C10.6674 9.4727 9.47319 10.6669 8.00049 10.6669C6.52778 10.6669 5.33425 9.4727 5.33425 8ZM3.89258 8C3.89258 10.2688 5.73169 12.1079 8.00049 12.1079C10.2693 12.1079 12.1084 10.2688 12.1084 8C12.1084 5.7312 10.2693 3.8921 8.00049 3.8921C5.73169 3.8921 3.89258 5.7312 3.89258 8ZM11.311 3.72922C11.3109 3.91909 11.3672 4.10471 11.4726 4.26263C11.578 4.42054 11.7279 4.54365 11.9033 4.61638C12.0787 4.68911 12.2717 4.7082 12.4579 4.67123C12.6442 4.63426 12.8153 4.5429 12.9496 4.40869C13.0839 4.27449 13.1754 4.10347 13.2125 3.91726C13.2496 3.73106 13.2307 3.53802 13.1581 3.36258C13.0855 3.18713 12.9625 3.03715 12.8047 2.9316C12.6468 2.82605 12.4613 2.76968 12.2714 2.7696H12.271C12.0165 2.76972 11.7725 2.87085 11.5925 3.05077C11.4125 3.2307 11.3112 3.47471 11.311 3.72922ZM4.76849 14.5118C3.98852 14.4763 3.56458 14.3464 3.28286 14.2366C2.90935 14.0912 2.64286 13.918 2.36266 13.6382C2.08247 13.3584 1.90903 13.0922 1.76426 12.7187C1.65444 12.4371 1.52452 12.013 1.48906 11.233C1.45028 10.3898 1.44254 10.1364 1.44254 8.00006C1.44254 5.86368 1.45092 5.61107 1.48906 4.7671C1.52458 3.98714 1.65546 3.5639 1.76426 3.28147C1.90967 2.90797 2.08286 2.64147 2.36266 2.36128C2.64247 2.08109 2.90871 1.90765 3.28286 1.76288C3.56446 1.65306 3.98852 1.52314 4.76849 1.48768C5.61175 1.4489 5.86506 1.44115 8.00049 1.44115C10.1359 1.44115 10.3895 1.44954 11.2334 1.48768C12.0134 1.5232 12.4366 1.65408 12.7191 1.76288C13.0926 1.90765 13.3591 2.08147 13.6393 2.36128C13.9195 2.64109 14.0923 2.90797 14.2377 3.28147C14.3475 3.56307 14.4774 3.98714 14.5129 4.7671C14.5517 5.61107 14.5594 5.86368 14.5594 8.00006C14.5594 10.1364 14.5517 10.3891 14.5129 11.233C14.4773 12.013 14.3468 12.4369 14.2377 12.7187C14.0923 13.0922 13.9191 13.3587 13.6393 13.6382C13.3595 13.9178 13.0926 14.0912 12.7191 14.2366C12.4375 14.3464 12.0134 14.4764 11.2334 14.5118C10.3902 14.5506 10.1369 14.5583 8.00049 14.5583C5.8641 14.5583 5.61149 14.5506 4.76849 14.5118ZM4.70225 0.048448C3.8506 0.087232 3.26865 0.222272 2.76042 0.420032C2.23409 0.624256 1.78852 0.89824 1.34327 1.34278C0.898024 1.78733 0.624744 2.2336 0.42052 2.75994C0.22276 3.26848 0.0877203 3.85011 0.0489363 4.70176C0.00951228 5.55475 0.000488281 5.82746 0.000488281 8C0.000488281 10.1725 0.00951228 10.4452 0.0489363 11.2982C0.0877203 12.15 0.22276 12.7315 0.42052 13.2401C0.624744 13.7661 0.898088 14.2129 1.34327 14.6572C1.78846 15.1016 2.23409 15.3752 2.76042 15.58C3.26961 15.7777 3.8506 15.9128 4.70225 15.9516C5.55569 15.9903 5.82794 16 8.00049 16C10.173 16 10.4457 15.991 11.2987 15.9516C12.1504 15.9128 12.732 15.7777 13.2405 15.58C13.7666 15.3752 14.2125 15.1018 14.6577 14.6572C15.1029 14.2127 15.3757 13.7661 15.5805 13.2401C15.7782 12.7315 15.9139 12.1499 15.952 11.2982C15.9908 10.4446 15.9998 10.1725 15.9998 8C15.9998 5.82746 15.9908 5.55475 15.952 4.70176C15.9133 3.85005 15.7782 3.26816 15.5805 2.75994C15.3757 2.23392 15.1022 1.78803 14.6577 1.34278C14.2132 0.897536 13.7666 0.624256 13.2412 0.420032C12.732 0.222272 12.1504 0.086592 11.2994 0.048448C10.4464 0.009664 10.1737 0 8.00113 0C5.82858 0 5.55569 0.009024 4.70225 0.048448Z"
                          fill="#0A65CC"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_2229_52235">
                          <rect width="16" height="16" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </button>

                  <button className="bg-[#E7F0FA] h-12 w-12 rounded-lg flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M8.35464 13.6322L5.07201 13.5709C4.00914 13.5496 2.94366 13.5922 1.90168 13.371C0.316517 13.0406 0.204224 11.4204 0.0867073 10.0613C-0.0752042 8.15064 -0.0125288 6.20532 0.293014 4.31063C0.465371 3.24737 1.14435 2.61314 2.19417 2.54385C5.73794 2.29336 9.30522 2.32267 12.8412 2.43993C13.2146 2.45058 13.5906 2.50921 13.9589 2.57583C15.7765 2.90094 15.8208 4.737 15.9384 6.2826C16.0559 7.84419 16.0063 9.41377 15.7817 10.9647C15.6015 12.2491 15.2568 13.3257 13.8022 13.4297C11.9794 13.5656 10.1983 13.6748 8.37031 13.6402C8.37031 13.6322 8.35986 13.6322 8.35464 13.6322ZM6.42476 10.3811C7.79839 9.57632 9.14592 8.78487 10.5117 7.98542C9.13547 7.18065 7.79056 6.38919 6.42476 5.58975V10.3811Z"
                        fill="#0A65CC"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobDetails;
