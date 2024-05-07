import { Breadcrumb } from "antd";
import React from "react";
import { useParams } from "react-router-dom";
import useCompany from "../hooks/useCompany";
import useJob from "../hooks/useJob";

const JobDetails = () => {
  const {id} = useParams();
  const {data:jobData,isPending:JobPending} = useJob(id);

const { job_title, company_name,expiration_date,description,responsibilities,posted_date,job_salary_min,job_salary_max,location,job_type,experience } = jobData || {};

const {data:companyData,isPending:companyPending} = useCompany(company_name)

  const {
    founded_in,
    organization_type,
    company_size,
    phone,
    email,
    website,
    company_logo,
    company_category,
  } = companyData || {};


  return (
    <>
      {JobPending || companyPending ? (
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
                    <span className="text-[#474C54]">
                      {website}
                    </span>
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
                <button className="bg-primary px-4 py-3 rounded-md text-white font-medium flex items-center gap-3">
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
                <p className="text-[#5E6670]">
                  {description}
                </p>
              </div>

              <div className="flex flex-col items-start gap-2">
                <h1 className="text-black text-lg font-medium mb-3">
                  Responsibilities
                </h1>
                <ul className="text-[#5E6670] text-sm list-disc *:mb-3 ml-5">
                    {
                      responsibilities && responsibilities.map((responsibility,index) => <li key={index}>{responsibility}</li>)
                    }           
                </ul>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#191F33]">Share this job:</span>
                <button className="border border-[#CEE0F5] px-3 py-2 rounded-lg text-[#0A65CC] flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <path
                      d="M12.25 1.58373C11.5584 1.58449 10.747 1.67662 10.1174 2.18761C9.41335 2.75904 9.25013 3.57878 9.25013 4.27817V6.23844V7.48844H10.5001H12.0837L12.0483 7.87723H10.5H9.25004L9.25003 9.12722L9.24995 16.75H8.18113V9.12723V7.87723H6.93113H5.75V7.48844H6.93104H8.18104V6.23844V4.18286C8.18104 3.1226 8.41786 2.4564 8.814 2.04499C9.20286 1.64114 9.97086 1.25 11.5654 1.25C11.7605 1.25 12.0026 1.26271 12.25 1.28129V1.58373Z"
                      fill="#0A65CC"
                      stroke="#0A65CC"
                      stroke-width="2.5"
                    />
                  </svg>
                  <span>Facebook</span>
                </button>

                <button className="border border-[#CEE0F5] px-3 py-2 rounded-lg text-[#1DA1F2] flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <mask id="path-1-inside-1_1647_30348" fill="white">
                      <path d="M5.62925 16.2021C12.3841 16.2021 16.0782 10.638 16.0782 5.81302C16.0782 5.655 16.0749 5.49771 16.0678 5.34107C16.7865 4.82396 17.4068 4.18369 17.8996 3.45029C17.2416 3.74115 16.5335 3.93692 15.7907 4.02519C16.5489 3.57316 17.131 2.85803 17.4056 2.00561C16.6847 2.43081 15.896 2.73055 15.0736 2.89191C14.4035 2.18217 13.4494 1.73828 12.393 1.73828C10.3649 1.73828 8.72036 3.37348 8.72036 5.38912C8.72036 5.67569 8.75263 5.95433 8.81564 6.22169C5.76343 6.06899 3.05694 4.61603 1.24562 2.40673C0.919389 2.96396 0.747795 3.59726 0.748365 4.24196C0.748365 5.50877 1.39668 6.62708 2.38261 7.28135C1.79942 7.26364 1.22903 7.10702 0.719405 6.82465C0.718859 6.83998 0.718859 6.85492 0.718859 6.8713C0.718859 8.6396 1.98471 10.116 3.66509 10.4506C3.3495 10.536 3.02383 10.5792 2.69673 10.5791C2.46051 10.5791 2.23029 10.5559 2.00654 10.5132C2.47408 11.964 3.82979 13.0198 5.43716 13.0493C4.18022 14.0288 2.59686 14.6122 0.87599 14.6122C0.583247 14.6125 0.290744 14.5956 0 14.5617C1.6253 15.5974 3.55519 16.2018 5.62943 16.2018" />
                    </mask>
                    <path
                      d="M5.62925 16.2021C12.3841 16.2021 16.0782 10.638 16.0782 5.81302C16.0782 5.655 16.0749 5.49771 16.0678 5.34107C16.7865 4.82396 17.4068 4.18369 17.8996 3.45029C17.2416 3.74115 16.5335 3.93692 15.7907 4.02519C16.5489 3.57316 17.131 2.85803 17.4056 2.00561C16.6847 2.43081 15.896 2.73055 15.0736 2.89191C14.4035 2.18217 13.4494 1.73828 12.393 1.73828C10.3649 1.73828 8.72036 3.37348 8.72036 5.38912C8.72036 5.67569 8.75263 5.95433 8.81564 6.22169C5.76343 6.06899 3.05694 4.61603 1.24562 2.40673C0.919389 2.96396 0.747795 3.59726 0.748365 4.24196C0.748365 5.50877 1.39668 6.62708 2.38261 7.28135C1.79942 7.26364 1.22903 7.10702 0.719405 6.82465C0.718859 6.83998 0.718859 6.85492 0.718859 6.8713C0.718859 8.6396 1.98471 10.116 3.66509 10.4506C3.3495 10.536 3.02383 10.5792 2.69673 10.5791C2.46051 10.5791 2.23029 10.5559 2.00654 10.5132C2.47408 11.964 3.82979 13.0198 5.43716 13.0493C4.18022 14.0288 2.59686 14.6122 0.87599 14.6122C0.583247 14.6125 0.290744 14.5956 0 14.5617C1.6253 15.5974 3.55519 16.2018 5.62943 16.2018"
                      fill="#1DA1F2"
                    />
                    <path
                      d="M16.0678 5.34107L13.8671 2.28213L12.2101 3.47421L12.3034 5.5133L16.0678 5.34107ZM17.8996 3.45029L21.0275 5.55191L28.2954 -5.26497L16.3761 0.00367224L17.8996 3.45029ZM15.7907 4.02519L13.861 0.788425L16.2353 7.76718L15.7907 4.02519ZM17.4056 2.00561L20.9923 3.16122L24.0338 -6.27872L15.4912 -1.24019L17.4056 2.00561ZM15.0736 2.89191L12.3337 5.47899L13.7602 6.98979L15.7992 6.58972L15.0736 2.89191ZM8.81564 6.22169L8.62735 9.9853L13.6332 10.2357L12.4835 5.35725L8.81564 6.22169ZM1.24562 2.40673L4.15974 0.0175607L0.728203 -4.16797L-2.00635 0.502827L1.24562 2.40673ZM0.748365 4.24196H4.51668L4.51668 4.23863L0.748365 4.24196ZM2.38261 7.28135L2.26824 11.0479L15.4782 11.4491L4.46624 4.14149L2.38261 7.28135ZM0.719405 6.82465L2.54569 3.52846L-2.82799 0.551122L-3.04652 6.69061L0.719405 6.82465ZM3.66509 10.4506L4.65 14.0879L4.40089 6.7548L3.66509 10.4506ZM2.69673 10.5791L2.69891 6.81074H2.69673V10.5791ZM2.00654 10.5132L2.71301 6.81174L-3.52943 5.6203L-1.58013 11.6691L2.00654 10.5132ZM5.43716 13.0493L7.75348 16.0216L16.1516 9.47702L5.50632 9.28161L5.43716 13.0493ZM0.87599 14.6122V10.8439L0.872803 10.8439L0.87599 14.6122ZM0 14.5617L0.436966 10.8188L-2.02521 17.7395L0 14.5617ZM5.62925 19.9704C14.8791 19.9704 19.8465 12.2797 19.8465 5.81302H12.3098C12.3098 8.99624 9.88916 12.4338 5.62925 12.4338V19.9704ZM19.8465 5.81302C19.8465 5.60368 19.8422 5.38864 19.8321 5.16883L12.3034 5.5133C12.3077 5.60677 12.3098 5.70632 12.3098 5.81302H19.8465ZM18.2685 8.40001C19.3499 7.62198 20.2844 6.65777 21.0275 5.55191L14.7718 1.34866C14.5293 1.7096 14.2232 2.02594 13.8671 2.28213L18.2685 8.40001ZM16.3761 0.00367224C16.0619 0.142553 15.7176 0.239051 15.346 0.283195L16.2353 7.76718C17.3495 7.63479 18.4213 7.33975 19.4231 6.8969L16.3761 0.00367224ZM17.7203 7.26195C19.2454 6.35277 20.4296 4.90787 20.9923 3.16122L13.8189 0.849992C13.8258 0.828582 13.8349 0.81395 13.8418 0.805455C13.8481 0.797536 13.8544 0.792378 13.861 0.788425L17.7203 7.26195ZM15.4912 -1.24019C15.1386 -1.03224 14.752 -0.885155 14.3481 -0.805894L15.7992 6.58972C17.04 6.34625 18.2308 5.89385 19.32 5.25141L15.4912 -1.24019ZM17.8136 0.304833C16.4583 -1.13053 14.5247 -2.03003 12.393 -2.03003V5.5066C12.393 5.5066 12.3918 5.50659 12.3896 5.50636C12.3874 5.50613 12.3846 5.50571 12.3814 5.50503C12.3748 5.50363 12.3681 5.50148 12.3619 5.49875C12.3504 5.49367 12.3414 5.48713 12.3337 5.47899L17.8136 0.304833ZM12.393 -2.03003C8.30467 -2.03003 4.95204 1.27145 4.95204 5.38912H12.4887C12.4887 5.40205 12.4853 5.42312 12.4764 5.44395C12.4686 5.4622 12.4597 5.47354 12.4529 5.48026C12.4462 5.48697 12.4371 5.49356 12.4245 5.49887C12.4179 5.50163 12.411 5.50375 12.4044 5.50511C12.4011 5.50577 12.3984 5.50616 12.3962 5.50638C12.394 5.5066 12.3929 5.5066 12.393 5.5066V-2.03003ZM4.95204 5.38912C4.95204 5.95941 5.01637 6.52841 5.14781 7.08613L12.4835 5.35725C12.4889 5.38025 12.4887 5.39196 12.4887 5.38912H4.95204ZM9.00393 2.45809C7.04984 2.36032 5.32042 1.43326 4.15974 0.0175607L-1.66849 4.79589C0.79347 7.7988 4.47701 9.77766 8.62735 9.9853L9.00393 2.45809ZM-2.00635 0.502827C-2.67072 1.63761 -3.02111 2.92914 -3.01995 4.24529L4.51668 4.23863C4.5167 4.26538 4.5095 4.2903 4.4976 4.31062L-2.00635 0.502827ZM-3.01995 4.24196C-3.01995 6.82589 -1.69303 9.09929 0.298994 10.4212L4.46624 4.14149C4.47871 4.14977 4.48967 4.16084 4.49902 4.17788C4.50417 4.18725 4.50892 4.1987 4.51228 4.21164C4.51578 4.2251 4.51668 4.23604 4.51668 4.24196H-3.01995ZM2.49699 3.51477C2.51285 3.51525 2.5295 3.51949 2.54569 3.52846L-1.10688 10.1208C-0.0714354 10.6945 1.08599 11.012 2.26824 11.0479L2.49699 3.51477ZM-3.04652 6.69061C-3.04986 6.78419 -3.04946 6.86635 -3.04946 6.8713H4.48717C4.48717 6.85992 4.4872 6.86906 4.48709 6.88097C4.48697 6.8955 4.4866 6.92314 4.48533 6.9587L-3.04652 6.69061ZM-3.04946 6.8713C-3.04946 10.4855 -0.466088 13.4704 2.9293 14.1464L4.40089 6.7548C4.42841 6.76027 4.44646 6.77385 4.45702 6.78652C4.46341 6.7942 4.4713 6.80628 4.47772 6.82367C4.48478 6.84277 4.48717 6.86069 4.48717 6.8713H-3.04946ZM2.68018 6.81325C2.68651 6.81154 2.69278 6.81074 2.69891 6.81074L2.69455 14.3474C3.35489 14.3477 4.01248 14.2605 4.65 14.0879L2.68018 6.81325ZM2.69673 6.81074C2.70167 6.81074 2.706 6.81099 2.70931 6.81131C2.71258 6.81163 2.71392 6.81192 2.71301 6.81174L1.30007 14.2147C1.74661 14.3 2.2134 14.3474 2.69673 14.3474V6.81074ZM-1.58013 11.6691C-0.62828 14.6227 2.11926 16.7573 5.36799 16.817L5.50632 9.28161C5.50914 9.28166 5.51856 9.28258 5.53047 9.28674C5.54124 9.2905 5.54979 9.29538 5.55623 9.30021C5.5662 9.3077 5.58243 9.32392 5.59321 9.35739L-1.58013 11.6691ZM3.12083 10.0769C2.50441 10.5573 1.73091 10.8439 0.87599 10.8439V18.3806C3.46282 18.3806 5.85602 17.5003 7.75348 16.0216L3.12083 10.0769ZM0.872803 10.8439C0.727132 10.8441 0.581598 10.8356 0.436966 10.8188L-0.436966 18.3046C-0.00010999 18.3556 0.439363 18.3809 0.879178 18.3806L0.872803 10.8439ZM-2.02521 17.7395C0.183207 19.1469 2.81205 19.9701 5.62943 19.9701V12.4335C4.29832 12.4335 3.06739 12.048 2.02521 11.3838L-2.02521 17.7395Z"
                      fill="#1DA1F2"
                      mask="url(#path-1-inside-1_1647_30348)"
                    />
                  </svg>
                  <span>Twitter</span>
                </button>
                <button className="border border-[#CEE0F5] px-3 py-2 rounded-lg text-[#CA2127] flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_1647_30351)">
                      <path
                        d="M17.7346 8.97496C17.7346 13.815 13.8096 17.74 8.96959 17.74C4.12959 17.74 0.20459 13.815 0.20459 8.97496C0.20459 4.13496 4.12959 0.209961 8.96959 0.209961C13.8096 0.209961 17.7346 4.13496 17.7346 8.97496Z"
                        fill="#CA2127"
                      />
                      <path
                        d="M8.2348 3.14484C5.76482 3.40984 3.30484 5.30984 3.20484 8.02984C3.13984 9.68984 3.83483 10.9348 5.49482 11.2848C5.68482 10.4998 5.71982 10.0748 5.71982 10.0748C5.71982 10.0748 4.98982 9.37484 4.91482 8.92984C4.30483 5.34984 9.24979 2.90484 11.8448 5.40484C13.6348 7.13984 12.4548 12.4748 9.56479 11.9198C6.79481 11.3898 10.9198 7.14484 8.70979 6.30984C6.91481 5.62984 5.95982 8.38484 6.80981 9.74984C6.30981 12.0998 5.23482 14.3148 5.66982 17.2598C7.08481 16.2848 7.5598 14.4148 7.9498 12.4648C8.65979 12.8748 9.03979 13.3048 9.94478 13.3698C13.2848 13.6148 15.1497 10.1948 14.6947 7.03484C14.2847 4.23484 11.3548 2.80984 8.2348 3.14484Z"
                        fill="white"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1647_30351">
                        <rect width="18" height="18" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
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
                    <p className="text-[#767F8C] text-sm">
                      {company_category}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-5 mb-10">
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Founded in:</span>
                    <span className="text-[#18191C]">{founded_in}</span>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <span className="text-[#5E6670]">Organization type:</span>
                    <span className="text-[#18191C] uppercase">{organization_type}</span>
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
