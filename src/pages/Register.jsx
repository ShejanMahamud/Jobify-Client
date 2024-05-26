import { sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../Utils/Logo";
import auth from "../config/firebase.config";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "./../hooks/useAxiosSecure";
// in custom email verification page there is a problem that is its says rejected but it working [maybe a condition issue need to fix]
const Register = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);

  const { emailPasswordRegister, logOut } = useAuth();

  const handleEmailPassRegister = async (e) => {
    e.preventDefault();

    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).*$/;

    const name = e.target.name.value;
    const username = e.target.username.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirm.value;
    const role = e.target.account.value;
    const terms = e.target.terms.checked;
    const phone_number = e.target.phone_number.value;
    const user = { name, username, email, phone_number, role, photo };

    if (!terms) {
      return toast.error("Please Accept Terms & Services!");
    }
    if (password !== confirmPassword) {
      return toast.error("Password & Confirm Password Should Be Same!");
    }
    if (!usernameRegex.test(username)) {
      return toast.error("Username Not Available!");
    }
    if (!passwordRegex.test(password)) {
      return toast.error("Password Must Be Strong!");
    }

    try {
      await emailPasswordRegister(email, password);
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });
      await sendEmailVerification(auth.currentUser);
      if(role === 'company'){
        const { data } = await axiosSecure.post("/company", {company_name: name,email,company_logo: photo,phone: phone_number,plan:'free',job_limit:1,resume_access_limit: 5,resume_visibility_limit: 5,featured:false});
      }
      const { data } = await axiosSecure.post("/user", user);
      if (data.insertedId) {
        toast.success("Account Registration Successfully!");
        await logOut();
        setTimeout(() => {
          navigate("/email_verification");
        }, 1000);
      }
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        return toast.error("User already exists!");
      }
      toast.error("Something Went Wrong!");
    }
  };

  return (
    <div className="w-full font-inter grid grid-cols-2 row-auto items-center min-h-screen">
      <div class="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12">
        <div class="w-full">
          <Logo />

          <form
            onSubmit={handleEmailPassRegister}
            class="grid grid-cols-2 gap-6 mt-8 row-auto w-full"
          >
            <div>
              <label class="block mb-2 text-sm text-gray-600  ">
                Your Name
              </label>
              <input
                type="text"
                required
                placeholder="John"
                name="name"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm text-gray-600  ">Username</label>
              <input
                type="text"
                required
                name="username"
                placeholder="Username"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm text-gray-600  ">
                Photo URL
              </label>
              <input
                type="text"
                required
                name="photo"
                placeholder="Photo URL/Logo URL"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm text-gray-600  ">
                Phone Number
              </label>
              <input
                name="phone_number"
                type="number"
                required
                placeholder="+880171233474"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm text-gray-600  ">
                Email address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="johnsnow@example.com"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg    focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div>
              <label class="block mb-2 text-sm text-gray-600  ">Password</label>
              <div className="flex items-center justify-between w-full px-5 py-3 mt-2 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:ring focus:ring-opacity-40">
                <input
                  name="password"
                  required
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  class="block w-full  text-gray-700 placeholder-gray-400 focus:outline-none "
                />
                {show ? (
                  <IoIosEyeOff
                    onClick={() => setShow(!show)}
                    className="text-gray-500 cursor-pointer"
                  />
                ) : (
                  <IoMdEye
                    onClick={() => setShow(!show)}
                    className="text-gray-500 cursor-pointer"
                  />
                )}
              </div>
            </div>

            <div>
              <label class="block mb-2 text-sm text-gray-600  ">
                Confirm Password
              </label>
              <div className="flex items-center justify-between w-full px-5 py-3 mt-2 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:ring focus:ring-opacity-40">
                <input
                  name="confirm"
                  required
                  type={confirmShow ? "text" : "password"}
                  placeholder="Confirm Password"
                  class="block w-full  text-gray-700 placeholder-gray-400 focus:outline-none "
                />
                {show ? (
                  <IoIosEyeOff
                    onClick={() => setConfirmShow(!confirmShow)}
                    className="text-gray-500 cursor-pointer"
                  />
                ) : (
                  <IoMdEye
                    onClick={() => setConfirmShow(!confirmShow)}
                    className="text-gray-500 cursor-pointer"
                  />
                )}
              </div>
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
              <select
                required
                name="account"
                class="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:border-blue-400   focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40 col-span-2"
              >
                <option value="Select Type" disabled selected>
                  Select Type
                </option>
                <option value="company">Company</option>
                <option value="candidate">Candidate</option>
              </select>
            </div>
            <div className="flex items-center gap-3 col-span-2">
              <input
                name="terms"
                type="checkbox"
                className="focus:outline-[#9DC1EB] w-5 h-5 accent-primary rounded-lg"
              />
              <p className="text-[#767F8C]">
                I've read and agree with your{" "}
                <span className="text-primary font-medium hover:underline underline-offset-2">
                  Terms of Services
                </span>
              </p>
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
          <p class="mt-8 text-xs font-light text-center text-gray-400">
            {" "}
            Already have an account?{" "}
            <Link to="/login" class="font-medium text-gray-700 hover:underline">
              {" "}
              Login Here
            </Link>
          </p>
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
