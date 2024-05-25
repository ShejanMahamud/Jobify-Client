import moment from 'moment'
import React from 'react'
import { IoIosArrowRoundForward } from 'react-icons/io'
import useAxiosSecure from '../../hooks/useAxiosSecure'
import useUserInfo from '../../hooks/useUserInfo'


const Subscription = () => {
    const purchase_date = moment().format("MMMM D, YYYY")
    const expiration_date = moment().add(1, 'month').format("MMMM D, YYYY");
    const {user} = useUserInfo()
const axiosSecure = useAxiosSecure()
    const handlePlans = async (plan,price) => {
        const {data} = await axiosSecure.post(`/plans`,{user_email: user?.email,plan:plan,price: price,purchase_date,expiration_date})
        window.location.replace(data.url)
    }

  return (
    <div className=''>
      <div className="w-full flex items-center justify-between mt-8 gap-20">
        <div className="flex flex-col items-start gap-3">
          <h1 className="text-2xl font-medium">
            Buy Premium Subscription to Post a Job
          </h1>
          <p className="text-[#5E6670] text-sm">
            Donec eu dui ut dolor commodo ornare. Sed arcu libero, malesuada
            quis justo sit amet, varius tempus neque. Quisque ultrices mi sed
            lorem condimentum, vel tempus lectus ultricies.
          </p>
        </div>
        <img src="https://i.ibb.co/n8C94D1/Status-update-bro-1.png" alt="" />
      </div>
      <div className="w-full grid grid-cols-3 row-auto items-stretch gap-6 mt-10">
        <div className="w-full flex flex-col items-start border border-[#E4E5E8] px-5 py-5 rounded-lg gap-2 focus:border-primary">
          <h1 className="uppercase font-medium">Basic</h1>
          <p className="text-[#767F8C] text-sm">
            Praesent eget pulvinar orci. Duis ut pellentesque ligula convalis.
          </p>
          <p className="text-primary text-3xl font-medium">
          ৳499 <span className="text-base font-normal">/Monthly</span>
          </p>
          <hr className="border border-[#e4e5e8] w-full my-3" />
          <div className="flex flex-col items-start gap-5">
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">Post 5 Job</h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Urgents & Featured Jobs
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Highlights Job with Colors
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Access & Saved 10 Candidates
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                10 Days Resume Visibility
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">24/7 Critical Support</h1>
            </div>
          </div>

          <button onClick={()=>handlePlans('basic',499)} className="hover:bg-primary bg-[#E7F0FA] px-4 py-2 rounded-md text-primary hover:text-white font-medium gap-2 mt-8 w-full flex justify-center items-center">
            <span>Choose plan</span>
            <IoIosArrowRoundForward className="text-4xl" />
          </button>
        </div>

        <div className="w-full flex flex-col items-start border-2 px-5 py-5 rounded-lg gap-2 border-primary relative">
          <div className="px-2 text-xs absolute  right-0 top-0 py-2 rounded-sm bg-primary text-white font-medium">
            Recommended
          </div>
          <h1 className="uppercase font-medium">Standard</h1>
          <p className="text-[#767F8C] text-sm">
            Praesent eget pulvinar orci. Duis ut pellentesque ligula convalis.
          </p>
          <p className="text-primary text-3xl font-medium">
          ৳699 <span className="text-base font-normal">/Monthly</span>
          </p>
          <hr className="border border-[#e4e5e8] w-full my-3" />
          <div className="flex flex-col items-start gap-5">
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">Post 10 Job</h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Urgents & Featured Jobs
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Highlights Job with Colors
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Access & Saved 20 Candidates
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                20 Days Resume Visibility
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">24/7 Critical Support</h1>
            </div>
          </div>

          <button onClick={()=>handlePlans('standard',699)} className="bg-primary hover:bg-[#E7F0FA] px-4 py-2 rounded-md hover:text-primary text-white font-medium gap-2 mt-8 w-full flex justify-center items-center">
            <span>Choose plan</span>
            <IoIosArrowRoundForward className="text-4xl" />
          </button>
        </div>

        <div className="w-full flex flex-col items-start border border-[#E4E5E8] px-5 py-5 rounded-lg gap-2 focus:border-primary">
          <h1 className="uppercase font-medium">PREMIUM</h1>
          <p className="text-[#767F8C] text-sm">
            Praesent eget pulvinar orci. Duis ut pellentesque ligula convalis.
          </p>
          <p className="text-primary text-3xl font-medium">
          ৳999 <span className="text-base font-normal">/Monthly</span>
          </p>
          <hr className="border border-[#e4e5e8] w-full my-3" />
          <div className="flex flex-col items-start gap-5">
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">Post 20 Job</h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Urgents & Featured Jobs
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Highlights Job with Colors
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                Access & Saved 50 Candidates
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">
                50 Days Resume Visibility
              </h1>
            </div>
            <div className="w-full flex items-center gap-3">
              <div className="h-5 w-5 flex items-center justify-center rounded-full bg-[#F1F2F4] text-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                >
                  <path
                    d="M9.8891 3.08203L4.54188 8.42925L2.11133 5.9987"
                    stroke="#0A65CC"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h1 className="text-[#474C54] text-sm">24/7 Critical Support</h1>
            </div>
          </div>

          <button onClick={()=>handlePlans('premium',999)} className="hover:bg-primary bg-[#E7F0FA] px-4 py-2 rounded-md text-primary hover:text-white font-medium gap-2 mt-8 w-full flex justify-center items-center">
            <span>Choose plan</span>
            <IoIosArrowRoundForward className="text-4xl" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Subscription