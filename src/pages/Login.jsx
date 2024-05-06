import React from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../Utils/Logo";
import useAuth from './../hooks/useAuth';

const Login = () => {

const {googleLogin,emailPasswordLogin} = useAuth();
const navigate = useNavigate();
const location = useLocation();

const handleGoogleLogin = async () => {
  try{
    await googleLogin()
    toast.success('Successfully Logged In!')
    setTimeout(()=>{
      navigate(location?.state || '/')
    },1000)
  }
  catch{
    toast.error('Something Went Wrong!')
  }
}

const handleEmailPasswordLogin = async (e) => {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  try{
    await emailPasswordLogin(email,password)
    toast.success('Successfully Logged In!')
    setTimeout(()=>{
      navigate(location?.state || '/')
    },1000)
  }
  catch{
    toast.error('Something Went Wrong!')
  }
}

  return (
    <div className="w-full font-inter grid grid-cols-2 row-auto items-center min-h-screen">
<div class="w-full max-w-sm p-6 m-auto mx-auto bg-white rounded-lg shadow-md ">
<Logo/>

    <form class="mt-6" onSubmit={handleEmailPasswordLogin}>
        <div>
            <label for="email" class="block text-sm text-gray-800 ">Email Address</label>
            <input type="email" required name="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg  dark:text-gray-300  focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>

        <div class="mt-4">
            <div class="flex items-center justify-between">
                <label for="password" class="block text-sm text-gray-800 ">Password</label>
                <Link to="/forget_password" class="text-xs text-gray-600 hover:underline">Forget Password?</Link>
            </div>

            <input type="password" name="password" required class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40" />
        </div>

        <div class="mt-6">
            <button class="w-full px-6 py-2.5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Sign In
            </button>
        </div>
    </form>

    <div class="flex items-center justify-between mt-4">
        <span class="w-1/5 border-b lg:w-1/5"></span>

        <a href="#" class="text-xs text-center text-gray-500 uppercase hover:underline">
            or login with Social Media
        </a>

        <span class="w-1/5 border-b lg:w-1/5"></span>
    </div>

    <div class="flex items-center mt-6 -mx-2">
        <button onClick={handleGoogleLogin} type="button" class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:bg-blue-400 focus:outline-none">
            <svg class="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
                <path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z">
                </path>
            </svg>

            <span class="hidden mx-2 sm:inline">Sign in with Google</span>
        </button>

        <a href="#" class="p-2 mx-2 text-sm font-medium text-gray-500 transition-colors duration-300 transform bg-gray-300 rounded-lg hover:bg-gray-200">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z">
                </path>
            </svg>
        </a>
    </div>

    <p class="mt-8 text-xs font-light text-center text-gray-400"> Don't have an account? <Link to="/register" class="font-medium text-gray-700 hover:underline"> Create One</Link></p>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <g clip-path="url(#clip0_1647_28598)">
    <path opacity="0.2" d="M17.999 26.9979V4.99786C17.999 4.73265 17.8937 4.47829 17.7061 4.29076C17.5186 4.10322 17.2642 3.99786 16.999 3.99786H4.99902C4.73381 3.99786 4.47945 4.10322 4.29192 4.29076C4.10438 4.47829 3.99902 4.73265 3.99902 4.99786V26.9979" fill="white"/>
    <path d="M2 26.9979H30" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M17.999 26.9979V4.99786C17.999 4.73265 17.8937 4.47829 17.7061 4.29076C17.5186 4.10322 17.2642 3.99786 16.999 3.99786H4.99902C4.73381 3.99786 4.47945 4.10322 4.29192 4.29076C4.10438 4.47829 3.99902 4.73265 3.99902 4.99786V26.9979" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M27.999 26.9979V12.9979C27.999 12.7326 27.8937 12.4783 27.7061 12.2908C27.5186 12.1032 27.2642 11.9979 26.999 11.9979H17.999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.99902 8.99786H11.999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.99902 16.9979H13.999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.99902 21.9979H11.999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21.999 21.9979H23.999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21.999 16.9979H23.999" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1647_28598">
      <rect width="32" height="32" fill="white"/>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <g clip-path="url(#clip0_1647_28614)">
    <path opacity="0.2" d="M16 19C11.7872 19.0066 7.64764 17.8991 4.00098 15.7898V26C4.00098 26.1313 4.02684 26.2614 4.0771 26.3827C4.12735 26.504 4.20101 26.6143 4.29387 26.7071C4.38673 26.8 4.49697 26.8736 4.61829 26.9239C4.73962 26.9741 4.86965 27 5.00098 27H27.001C27.1323 27 27.2623 26.9741 27.3837 26.9239C27.505 26.8736 27.6152 26.8 27.7081 26.7071C27.8009 26.6143 27.8746 26.504 27.9249 26.3827C27.9751 26.2614 28.001 26.1313 28.001 26V15.7886C24.3539 17.8987 20.2135 19.0066 16 19Z" fill="white"/>
    <path d="M27.001 9H5.00098C4.44869 9 4.00098 9.44772 4.00098 10V26C4.00098 26.5523 4.44869 27 5.00098 27H27.001C27.5533 27 28.001 26.5523 28.001 26V10C28.001 9.44772 27.5533 9 27.001 9Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M21 9V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H13C12.4696 5 11.9609 5.21071 11.5858 5.58579C11.2107 5.96086 11 6.46957 11 7V9" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M28.0012 15.7887C24.354 17.8988 20.2137 19.0067 16.0002 19.0001C11.7873 19.0067 7.64768 17.8991 4.00098 15.7898" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.5 15H17.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1647_28614">
      <rect width="32" height="32" fill="white"/>
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

export default Login;
