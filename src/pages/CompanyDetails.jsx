import { useQuery } from "@tanstack/react-query";
import { Breadcrumb } from "antd";
import React from "react";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { DiGithubAlt } from "react-icons/di";
import { FaFacebookF, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import CardJob from "../Utils/CardJob";
import useAxiosCommon from "../hooks/useAxiosCommon";

const CompanyDetails = () => {
  const {id} = useParams()
  const axiosCommon = useAxiosCommon()
  const {data: company,isPending} = useQuery({
    queryKey: ['company',id],
    queryFn: async () => {
      const {data} = await axiosCommon.get(`/company/${id}`)
      return data[0]
    }
  })

  if(isPending){
    return <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
  </div>
  }
console.log(company)
  return (
    <div className="w-full font-inter">
      <div className="bg-[#F1F2F4] py-10 flex flex-col items-center gap-5 w-full lg:px-20 px-5">
        <div className="flex items-center justify-between w-full ">
          <h1 className="text-[#18191C] text-lg font-medium">{company?.company_name}</h1>
          <Breadcrumb
            separator=">"
            items={[
              {
                title: "Home",
              },
              {
                title: "Find Companies",
                href: "/find_companies",
              },
              {
                title: "Company",
              },
            ]}
          />
        </div>
      </div>

      <div className="w-[90%] mx-auto">
      <div className="w-full rounded-lg border border-[#E4E5E8] h-[250px] z-10 relative">
            <img src="https://i.ibb.co/y5qNCph/israel-andrade-YI-9-Siv-Vt-s-unsplash.jpg" alt="" className="w-full object-cover h-full rounded-lg"/>
      </div>
      <div className="w-[90%] mx-auto bg-white relative z-50 py-5 px-5 rounded-lg flex items-center justify-between -mt-16 border border-[#E4E5E8] flex-col lg:flex-row gap-5">
      <div className="flex items-center gap-5">
      <img src={company?.company_logo || 'https://i.ibb.co/jMNrMnz/enterprise.png'} alt="" className='h-20 w-20 rounded-full object-cover p-2 bg-white shadow-lg'/>
              <div className="flex flex-col items-start">
                <h1 className="text-[#18191C] font-medium lg:text-2xl text-xl">{company?.company_name}</h1>
                <span className="text-[#5E6670]">{company?.company_category}</span>
              </div>
      </div>
              <button className="bg-primary text-white font-medium lg:text-lg text-sm lg:px-6 px-4 py-3 rounded-lg w-full lg:w-auto">Open Positions</button>
      </div>
      <div className="w-full grid lg:grid-cols-[50%_40%] grid-cols-1 gap-16 justify-items-end row-auto items-start my-10 py-5">
            <div className="w-full flex flex-col items-start gap-12">
                <div className="flex flex-col items-start gap-3">
                    <h1 className="text-[#18191C] text-lg font-medium">Description</h1>
                    <p className="text-[#5E6670]">{company?.description}</p>
                </div>

                <div className="flex flex-col items-start gap-3">
                    <h1 className="text-[#18191C] text-lg font-medium">Company Benefits</h1>
                    <ul className="text-[#5E6670] list-disc *:mb-3 ml-5">
                  {company?.benefits &&
                    company?.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                </ul>
                </div>

                <div className="flex flex-col items-start gap-3">
                    <h1 className="text-[#18191C] text-lg font-medium">Company Vision</h1>
                    <p className="text-[#5E6670]">{company?.company_vision}</p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                <span className="text-[#191F33]">Share this profile:</span>
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


            <div className="w-full flex flex-col gap-10">
            <div className="border border-[#E7F0FA] px-10 py-10 w-full rounded-lg">
                <div className="w-full grid grid-cols-2 row-auto items-center gap-x-5 gap-y-12">
                  <div className="flex flex-col items-start gap-1">
                    <img src="https://gist.github.com/ShejanMahamud/b2e67ef498252b88ce5124073542dff0/raw/ad57e2209a95c8e6a1015e3249a816361bdf35e9/date.svg" alt="" />
                    <span className="text-[#767F8C] text-xs uppercase">
                     Founded In:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      {company?.founded_in}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <img src="https://gist.github.com/ShejanMahamud/2719691afac08449268dc6bfd73f3033/raw/684fb1644a95af13f3924f2f11c7ef71de581dd1/case.svg" alt="" />
                    <span className="text-[#767F8C] text-xs uppercase">
                      Organization Type:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium uppercase">
                      {company?.organization_type}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                  <AiOutlineUserSwitch className="text-primary text-3xl"/>
                    <span className="text-[#767F8C] text-xs uppercase">
                      Team Size:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium uppercase">
                      {company?.company_size}
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
                      {company?.location}
                    </span>
                  </div>

                </div>
               
              </div>
              <div className="border border-[#E7F0FA] lg:px-10 px-5 py-10 w-full rounded-lg">
                <h1 className="text-xl font-medium mb-10">Contact Information</h1>
                <div className="flex items-center gap-3">
                    <img src="https://gist.github.com/ShejanMahamud/1b527c1461bd70ee259aad5a3465cc2f/raw/caf2be0686385bb7bc9dcaaa3cbf5fbc97cbea95/globe.svg" alt="" />
                    <div className="flex flex-col items-start">
                    <h1 className="uppercase text-xs text-[#767F8C] mb-1">Website</h1>
                    <p className="font-medium text-[#18191C] lg:text-base text-sm">{company?.website}</p>
                    </div>
                </div>
                <hr className="border border-[#E4E5E8] w-full rounded-full my-5"/>
                <div className="flex items-center gap-3">
                    <img src="https://gist.github.com/ShejanMahamud/f73c44e6f5a5eb8b101e012a4b9ba526/raw/47152dabb6afa9e32b31a784329559a0be53d611/phone.svg" alt="" />
                    <div className="flex flex-col items-start">
                    <h1 className="uppercase text-xs text-[#767F8C] mb-1">Phone</h1>
                    <p className="font-medium text-[#18191C] lg:text-base text-sm">{company?.phone}</p>
                    </div>
                </div>
                <hr className="border border-[#E4E5E8] w-full rounded-full my-5"/>
                <div className="flex items-center gap-3">
                    <img src="https://gist.github.com/ShejanMahamud/2374104d4a783130c5540f1fb53d5013/raw/d2de14c9c15942c354ae03fd2ac8dca6cc3a1eb9/email.svg" alt="" />
                    <div className="flex flex-col items-start">
                    <h1 className="uppercase text-xs text-[#767F8C] mb-1">Email</h1>
                    <p className="font-medium text-[#18191C] lg:text-base text-sm">{company?.email}</p>
                    </div>
                </div>
                </div>
                <div className="flex flex-col items-start gap-5 border border-[#E7F0FA] w-full rounded-lg px-10 py-10">
                <h1 className="text-xl font-medium">Follow us on:</h1>
                <div className="flex items-center gap-5 ">
                  {company?.linkedin && (
                    <Link
                      href={company?.linkedin}
                      className="bg-[#E7F0FA] h-12 w-12 rounded-lg flex items-center justify-center text-primary hover:text-white hover:bg-primary duration-500 text-2xl"
                    >
                      <FaLinkedinIn />
                    </Link>
                  )}
                  {company?.facebook && (
                    <Link
                      href={company?.facebook}
                      className="bg-[#E7F0FA] h-12 w-12 rounded-lg flex items-center justify-center text-primary hover:text-white hover:bg-primary duration-500 text-2xl"
                    >
                      <FaFacebookF />
                    </Link>
                  )}
                  {company?.twitter && (
                    <Link
                      href={company?.twitter}
                      className="bg-[#E7F0FA] h-12 w-12 rounded-lg flex items-center justify-center text-primary hover:text-white hover:bg-primary duration-500 text-2xl"
                    >
                      <FaXTwitter />
                    </Link>
                  )}
                  {company?.github && (
                    <Link
                      href={company?.github}
                      className="bg-[#E7F0FA] h-12 w-12 rounded-lg flex items-center justify-center text-primary hover:text-white hover:bg-primary duration-500 text-2xl"
                    >
                      <DiGithubAlt />
                    </Link>
                  )}
                </div>
                </div>
            </div>
      </div>
      </div>
      <div className="my-10 py-10 border border-[#E4E5E8] lg:px-20 px-5 w-full">
        <h1 className="text-[#18191C] lg:text-[40px] text-3xl font-medium">Open Positions ({company?.open_jobs && company?.open_jobs.length})</h1>
        <div className="w-full grid lg:grid-cols-3 grid-cols-1 row-auto items-center gap-10 my-10">
        {
            company?.open_jobs && company?.open_jobs.map(job => <CardJob job={job} key={job._id}/>)
        }
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
