import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="w-full font-inter grid grid-cols-2 row-auto items-center min-h-screen">
      <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12">
        <div class="w-full">
        <div class="flex justify-center mx-auto items-center gap-2">
    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
  <g clip-path="url(#clip0_2202_13434)">
    <path d="M33.751 11.25H6.25098C5.56062 11.25 5.00098 11.8097 5.00098 12.5V32.5C5.00098 33.1904 5.56062 33.75 6.25098 33.75H33.751C34.4413 33.75 35.001 33.1904 35.001 32.5V12.5C35.001 11.8097 34.4413 11.25 33.751 11.25Z" stroke="#0A65CC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M26.25 11.25V8.75C26.25 8.08696 25.9866 7.45107 25.5178 6.98223C25.0489 6.51339 24.413 6.25 23.75 6.25H16.25C15.587 6.25 14.9511 6.51339 14.4822 6.98223C14.0134 7.45107 13.75 8.08696 13.75 8.75V11.25" stroke="#0A65CC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M35.0012 19.7358C30.4423 22.3734 25.2669 23.7583 20 23.75C14.7339 23.7583 9.55935 22.3739 5.00098 19.7371" stroke="#0A65CC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M18.125 18.75H21.875" stroke="#0A65CC" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_2202_13434">
      <rect width="40" height="40" fill="white"/>
    </clipPath>
  </defs>
</svg>
<span className="text-xl font-medium">Jobify</span>
    </div>

          <form class="grid grid-cols-2 gap-6 mt-8 row-auto w-full">
            <div>
              <label class="block mb-2 text-sm text-gray-600  ">
                Your Name
              </label>
              <input
                type="text"
                placeholder="John"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm text-gray-600  ">
                Phone number
              </label>
              <input
                type="text"
                placeholder="XXX-XX-XXXX-XXX"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm text-gray-600  ">
                Email address
              </label>
              <input
                type="email"
                placeholder="johnsnow@example.com"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg    focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm text-gray-600  ">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg         focus:border-blue-400   focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm text-gray-600  ">
                Confirm password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg         focus:border-blue-400   focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm text-gray-600  ">
                Account Type
              </label>
              {/* <input
                type="password"
                placeholder="Enter your password"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400   focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              /> */}
              <select class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400   focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 col-span-2">
              <option value="Select Type" disabled>Select Type</option>
              <option value="Company" >Company</option>
              <option value="Employers" >Employers</option>
              </select>
            </div>
            <div className="flex items-center gap-3 col-span-2">
<input type="checkbox" className="focus:outline-[#9DC1EB] w-5 h-5 accent-primary rounded-lg"/>
<p className="text-[#767F8C]">I've read and agree with your <span className="text-primary font-medium hover:underline underline-offset-2">Terms of Services</span></p>
            </div>
            <button class="flex items-center justify-between px-6 py-4 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50 w-full col-span-2">
              <span>Sign Up </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5 rtl:-scale-x-100"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </form>
          <p class="mt-8 text-xs font-light text-center text-gray-400"> Already have an account? <Link to="/login" class="font-medium text-gray-700 hover:underline"> Login Here</Link></p>
        </div>
      </div>
      <div className="w-full bg-login bg-no-repeat bg-cover bg-center h-full flex items-end justify-center px-10 py-10">
        <div className="flex flex-col items-start gap-10">
          <h1 className="font-medium text-3xl w-[80%] text-white">
            Over 1,75,324 candidates waiting for good employees.
          </h1>
          <div className="flex items-center gap-16">
            <div className="flex items-start flex-col gap-5">
              <div className="bg-[#ffffff1a] px-3 py-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clip-path="url(#clip0_1647_28586)">
                    <path
                      opacity="0.2"
                      d="M16 19C11.7872 19.0066 7.64764 17.8991 4.00098 15.7898V26C4.00098 26.1313 4.02684 26.2614 4.0771 26.3827C4.12735 26.504 4.20101 26.6143 4.29387 26.7071C4.38673 26.8 4.49697 26.8736 4.61829 26.9239C4.73962 26.9741 4.86965 27 5.00098 27H27.001C27.1323 27 27.2623 26.9741 27.3837 26.9239C27.505 26.8736 27.6152 26.8 27.7081 26.7071C27.8009 26.6143 27.8746 26.504 27.9249 26.3827C27.9751 26.2614 28.001 26.1313 28.001 26V15.7886C24.3539 17.8987 20.2135 19.0066 16 19Z"
                      fill="white"
                    />
                    <path
                      d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21 9V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H13C12.4696 5 11.9609 5.21071 11.5858 5.58579C11.2107 5.96086 11 6.46957 11 7V9"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M28.0012 15.7887C24.354 17.8988 20.2137 19.0067 16.0002 19.0001C11.7873 19.0067 7.64768 17.8991 4.00098 15.7898"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.5 15H17.5"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1647_28586">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col items-start gap-1 text-white">
                <h1 className="text-xl font-medium">1,75,324</h1>
                <p className="text-white opacity-70 text-sm">Live Jobs</p>
              </div>
            </div>
            <div className="flex items-start flex-col gap-5">
              <div className="bg-[#ffffff1a] px-3 py-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clip-path="url(#clip0_1647_28598)">
                    <path
                      opacity="0.2"
                      d="M17.999 26.9979V4.99786C17.999 4.73265 17.8937 4.47829 17.7061 4.29076C17.5186 4.10322 17.2642 3.99786 16.999 3.99786H4.99902C4.73381 3.99786 4.47945 4.10322 4.29192 4.29076C4.10438 4.47829 3.99902 4.73265 3.99902 4.99786V26.9979"
                      fill="white"
                    />
                    <path
                      d="M2 26.9979H30"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.999 26.9979V4.99786C17.999 4.73265 17.8937 4.47829 17.7061 4.29076C17.5186 4.10322 17.2642 3.99786 16.999 3.99786H4.99902C4.73381 3.99786 4.47945 4.10322 4.29192 4.29076C4.10438 4.47829 3.99902 4.73265 3.99902 4.99786V26.9979"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M27.999 26.9979V12.9979C27.999 12.7326 27.8937 12.4783 27.7061 12.2908C27.5186 12.1032 27.2642 11.9979 26.999 11.9979H17.999"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.99902 8.99786H11.999"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M9.99902 16.9979H13.999"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M7.99902 21.9979H11.999"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21.999 21.9979H23.999"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21.999 16.9979H23.999"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1647_28598">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col items-start gap-1 text-white">
                <h1 className="text-xl font-medium">97,354</h1>
                <p className="text-white opacity-70 text-sm">Companies</p>
              </div>
            </div>
            <div className="flex items-start flex-col gap-5">
              <div className="bg-[#ffffff1a] px-3 py-3 rounded-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <g clip-path="url(#clip0_1647_28614)">
                    <path
                      opacity="0.2"
                      d="M16 19C11.7872 19.0066 7.64764 17.8991 4.00098 15.7898V26C4.00098 26.1313 4.02684 26.2614 4.0771 26.3827C4.12735 26.504 4.20101 26.6143 4.29387 26.7071C4.38673 26.8 4.49697 26.8736 4.61829 26.9239C4.73962 26.9741 4.86965 27 5.00098 27H27.001C27.1323 27 27.2623 26.9741 27.3837 26.9239C27.505 26.8736 27.6152 26.8 27.7081 26.7071C27.8009 26.6143 27.8746 26.504 27.9249 26.3827C27.9751 26.2614 28.001 26.1313 28.001 26V15.7886C24.3539 17.8987 20.2135 19.0066 16 19Z"
                      fill="white"
                    />
                    <path
                      d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M21 9V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H13C12.4696 5 11.9609 5.21071 11.5858 5.58579C11.2107 5.96086 11 6.46957 11 7V9"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M28.0012 15.7887C24.354 17.8988 20.2137 19.0067 16.0002 19.0001C11.7873 19.0067 7.64768 17.8991 4.00098 15.7898"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M14.5 15H17.5"
                      stroke="white"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1647_28614">
                      <rect width="32" height="32" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="flex flex-col items-start gap-1 text-white">
                <h1 className="text-xl font-medium">7,354</h1>
                <p className="text-white opacity-70 text-sm">New Jobs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
