import { applyActionCode, confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../Utils/Logo";
import auth from "../config/firebase.config";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const params = new URLSearchParams(location.search);
  const mode = params.get("mode");
  const actionCode = params.get("oobCode");

  useEffect(() => {
    const handleVerifyEmail = async () => {
      try {
        await applyActionCode(auth, actionCode);
        setVerificationStatus("success");
      } catch (error) {
        console.error("Email verification error:", error);
        setVerificationStatus("rejected");
      }
    };

    const handleResetPassword = async () => {
      try {
        await verifyPasswordResetCode(auth, actionCode);
        setVerificationStatus("passwordReset");
      } catch (error) {
        console.error("Password reset error:", error);
        setVerificationStatus("rejected");
      }
    };

    if (mode === "verifyEmail") {
      handleVerifyEmail();
    } else if (mode === "resetPassword") {
      handleResetPassword();
    }
  }, [location, mode, actionCode]);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirm.value;
    if (password !== confirmPassword) {
      return toast.error('Passwords do not match!');
    }

    try {
      await confirmPasswordReset(auth, actionCode, password);
      toast.success('Password reset successfully!');
      navigate("/login");
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      {mode === "verifyEmail" && (
        <div className="w-full min-h-screen flex flex-col items-center justify-start gap-40">
          <Logo />
          <div className="flex flex-col items-center gap-5">
            {verificationStatus === "pending" && (
              <div className="flex flex-col items-center gap-5">
                <h1 className="text-3xl font-medium">Email Verification In Progress...</h1>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-600"></div>
                  <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-600"></div>
                  <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-600"></div>
                </div>
              </div>
            )}
            {verificationStatus === "success" && (
              <div className="flex flex-col items-center gap-5">
                <h1 className="text-3xl font-medium">Email Verification Successful!</h1>
                <p className="text-[#767F8C] ">Now you can log in to your account and find your desired job.</p>
              </div>
            )}
            {verificationStatus === "rejected" && (
              <div className="flex flex-col items-center gap-5">
                <h1 className="text-3xl font-medium">Email Verification Rejected!</h1>
                <p className="text-[#767F8C] ">Please verify your email first and activate your account.</p>
              </div>
            )}
            <button onClick={() => navigate("/login")} className="bg-primary text-white font-medium uppercase px-4 py-2 rounded-lg">Back To Login</button>
          </div>
        </div>
      )}
      {mode === "resetPassword" && (
        <div className="w-full min-h-screen flex flex-col items-center gap-5 justify-center font-inter">
          <Logo />
          <div className="flex flex-col items-center w-full gap-5">
            <h1 className="text-3xl font-medium text-[#18191C]">Reset Password</h1>
            <form onSubmit={handlePasswordReset} className="w-[30%] flex flex-col gap-5">
              <input
                type="password"
                name="password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 placeholder:text-sm"
                placeholder="New Password"
                required
              />
              <input
                type="password"
                name="confirm"
                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-lg dark:text-gray-300 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 placeholder:text-sm"
                placeholder="Confirm Password"
                required
              />
              <button type="submit" className="bg-primary text-white font-medium uppercase px-4 py-2 rounded-lg w-full flex items-center justify-center gap-5">
                <span className="text-sm">Reset Password</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12H19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 5L19 12L12 19" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
            <p className="text-sm font-light text-center text-[#767F8C]">
              Go back to
              <Link to="/login" className="font-medium text-primary hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
