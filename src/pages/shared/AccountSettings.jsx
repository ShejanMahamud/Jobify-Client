import { Modal, Tooltip } from 'antd';
import { EmailAuthProvider, deleteUser, reauthenticateWithCredential, sendEmailVerification, updateEmail, updatePassword } from 'firebase/auth';
import React, { useState } from 'react';
import { AwesomeCaptcha } from 'react-awesome-captcha';
import toast from 'react-hot-toast';
import { IoIosEyeOff, IoMdEye } from 'react-icons/io';
import { IoBriefcaseOutline, IoCheckmarkCircleOutline, IoCloseCircleOutline, IoLocation } from "react-icons/io5";
import { SlEnvolope } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import auth from '../../config/firebase.config';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserInfo from '../../hooks/useUserInfo';

const AccountSettings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const axiosSecure = useAxiosSecure()
  const {user,userInfo} = useUserInfo()
  const [show, setShow] = useState(false);
  const [confirmShow, setConfirmShow] = useState(false);  
  const [oldShow, setOldShow] = useState(false);

  // const {captcha,generateCaptcha} = useCaptcha();

  const handleContactUpdate = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const number = e.target.number.value;
    const location = e.target.location.value;
    // if(captcha !== recaptcha){
    //  return toast.success('Captcha Should Match!')
    // }

    const contactInfo = {
      ...(email && {email}),
      ...(number && {number}),
      ...(location && {location})
    }
    try{
      if(email){
        await updateEmail(auth.currentUser,email)
      }
      if(userInfo?.role === 'candidate'){
        const {data} = await axiosSecure.patch(`/user/${user?.email}`,contactInfo)
        if(data.success){
          toast.success('Profile Updated')
        }
      }

      if(userInfo?.role === 'company'){
        const {data} = await axiosSecure.patch(`/company/${user?.email}`,contactInfo)
        if(data.success){
          toast.success('Profile Updated')
        }
      }

  }
  catch(error){
    toast.error('Something Went Wrong!')
  }
  }
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const oldPassword = e.target.old.value;
    const newPassword = e.target.new.value;
    const confirmPassword = e.target.confirm.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).*$/;
    if(!passwordRegex.test(newPassword)){
      return toast.error('Password Should Be Strong!')
    }
    if(newPassword !== confirmPassword){
      return toast.error('Password Should Be Match!')
    }
    try{
      const credential = EmailAuthProvider.credential(
        user?.email,
        oldPassword
       );
      await reauthenticateWithCredential(auth.currentUser,credential)
      await updatePassword(auth.currentUser,newPassword)
      toast.success('Password updated successfully.');
      e.target.reset();
    }
    catch (error){
      if(error.code === 'auth/invalid-credential'){
       return toast.error('Old Password Wrong');
      }
      toast.error('Something Went Wrong');
    }
  
  }

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const password = e.target.pass.value;
    try{
      const credential = EmailAuthProvider.credential(
        user?.email,
        password
       );
      if(userInfo?.role === 'candidate'){
        await axiosSecure.delete(`/user/${user?.email}`);
      }
      if(userInfo?.role === 'company'){
        await axiosSecure.delete(`/company/${user?.email}`);
      }
      await reauthenticateWithCredential(user,credential)
      await deleteUser(user)
        toast.success('Deleted Successfully!');
        navigate('/login')
    }
    catch(error){
      toast.error('Something Went Wrong!')
    }
  }

  const handleResendEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
    .then(res => {
        toast.success('Email Verification Send!')
    })
    .catch(error => toast.error('Something Went Wrong!'))
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCaptchaValidation = (isValid) => {
    if (isValid) {
        console.log('Captcha is valid');
    } else {
        console.log('Captcha is invalid');
    }
};

  return (
    <div className='w-full px-5 font-inter'>
        <h1 className='text-base text-[#18191C] font-medium mb-10'>Contact Info</h1>
        <form onSubmit={handleContactUpdate} className='grid grid-cols-1 row-auto items-center gap-x-10 gap-y-5'>
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Map Location</h1>
        <input defaultValue={userInfo?.location} type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' name='location' placeholder='Location'/>
        </div>

        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Phone Number</h1>
        <input defaultValue={userInfo?.number} type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' name='number' placeholder='Phone Number'/>
        </div>

        <div className='flex flex-col items-start gap-2 '>
        <h1 className='text-sm text-[#18191C] '>Email</h1>
        <div className='px-5 py-3 flex items-center w-full justify-between rounded-lg border border-[#E4E5E8] '>

        <SlEnvolope className='text-2xl text-primary mr-5'/>
        <input defaultValue={userInfo?.email} type="email" className='bg-transparent w-full focus:outline-none' name='email' placeholder='Email Address'/>
        </div>
        {
          user?.emailVerified ? <div className='text-sm text-green-500 flex items-center gap-1'>
            <IoCheckmarkCircleOutline className='text-lg'/>
            <span>Your email verified</span>
          </div> : <div className='text-sm text-red-500 flex items-center gap-1'>
            <IoCloseCircleOutline className='text-lg'/>
            <span>Your email not verified.</span>
            <button type='button' onClick={handleResendEmailVerification} className='underline decoration-red-500 underline-offset-2'>Verify Here</button>
          </div>
        }

    {/* <div className='w-full flex gap-5 items-start'>
    <div className='flex flex-col items-start gap-2 mt-5'>
        <h1 className='text-sm text-[#18191C]'>Recaptcha</h1>
        <input disabled type="text" className='px-4 py-2 rounded-lg bg-transparent border border-[#E4E5E8] focus:outline-none italic tracking-widest' name='phone' defaultValue={captcha}/>
        <h1 onClick={generateCaptcha} className='text-sm text-primary cursor-pointer'>Reset Recaptcha</h1>
        </div>
        <div className='flex flex-col items-start gap-2 mt-5'>
        <h1 className='text-sm text-[#18191C]'>Submit Recaptcha</h1>
        <input type="text" className='px-4 py-2 rounded-lg bg-transparent border border-[#E4E5E8] focus:outline-none' name='recaptcha' required placeholder='Enter Captcha'/>
        </div>
    </div> */}
    {/* <AwesomeCaptcha onValidate={handleCaptchaValidation}/> */}

        </div>
    <AwesomeCaptcha onValidate={handleCaptchaValidation}/>
        <button className='mt-5 bg-primary text-white font-medium text-lg px-4 py-2 rounded-sm w-[20%]'>Save Changes</button>

        </form>
        <hr className='w-full border border-[#E4E5E8] rounded-full my-10'/>
        <h1 className='text-base text-[#18191C] font-medium mb-10 select-none'>Job Alerts</h1>

        <form className='grid grid-cols-2 row-auto items-center gap-5'>

<div className='flex flex-col items-start gap-2 '>
<h1 className='text-sm text-[#18191C] '>Job Role</h1>
<div className='px-5 py-3 flex items-center w-full justify-between rounded-lg border border-[#E4E5E8] '>

<IoBriefcaseOutline className='text-2xl text-primary mr-5'/>
<input type="text" className='bg-transparent w-full focus:outline-none' name='role' placeholder='Job Role'/>
</div>
</div>

<div className='flex flex-col items-start gap-2 '>
<h1 className='text-sm text-[#18191C] '>Job Location</h1>
<div className='px-5 py-3 flex items-center w-full justify-between rounded-lg border border-[#E4E5E8] '>

<IoLocation className='text-2xl text-primary mr-5'/>
<input type="text" className='bg-transparent w-full focus:outline-none' name='location' placeholder='Job Location'/>
</div>
</div>

<Tooltip title='Coming Soon...'>
<button disabled className='mt-5 bg-primary text-white font-medium text-lg px-4 py-2 rounded-sm w-[40%]'>Save Changes</button>
</Tooltip>
</form>

        <hr className='w-full border border-[#E4E5E8] rounded-full my-10'/>
        <h1 className='text-base text-[#18191C] font-medium mb-10'>Change Password</h1>
        <form onSubmit={handlePasswordChange} className='grid grid-cols-3 row-auto items-center gap-5'>

        <div>
              <label class="block mb-2 text-sm text-gray-600  ">
                Old Password
              </label>
              <div className="flex items-center justify-between w-full px-5 py-3 mt-2 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:ring focus:ring-opacity-40">
                <input
                  name="old"
                  required
                  type={oldShow ? "text" : "password"}
                  placeholder="Confirm Password"
                  class="block w-full  text-gray-700 placeholder-gray-400 focus:outline-none "
                />
                {show ? (
                  <IoIosEyeOff
                    onClick={() => setOldShow(!oldShow)}
                    className="text-gray-500 cursor-pointer"
                  />
                ) : (
                  <IoMdEye
                    onClick={() => setOldShow(!oldShow)}
                    className="text-gray-500 cursor-pointer"
                  />
                )}
              </div>
            </div>

        <div>
              <label class="block mb-2 text-sm text-gray-600  ">New Password</label>
              <div className="flex items-center justify-between w-full px-5 py-3 mt-2 bg-white border border-gray-200 rounded-lg focus:border-blue-400 focus:ring-blue-400 focus:ring focus:ring-opacity-40">
                <input
                  name="new"
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
        <button className='mt-5 bg-primary text-white font-medium text-lg px-4 py-2 rounded-sm w-[60%]'>Save Changes</button>
        </form>

        <hr className='w-full border border-[#E4E5E8] rounded-full my-10'/>
        
        
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-base text-[#18191C] font-medium'>Delete Account</h1>
        <p className='text-[#767F8C] w-[60%]'>If you delete your Jobify account, you will no longer be able to get information about the matched jobs, following employers, and job alert, shortlisted jobs and more. You will be abandoned from all the services of Jobify.com.</p>
        <button onClick={showModal} className='flex items-center gap-2 text-[#E05151]'>
        <IoCloseCircleOutline className='text-xl'/>
        <span className='text-sm'>Close Account</span>
        </button>
        <Modal title="Are You Sure?" open={isModalOpen} onCancel={()=>setIsModalOpen(false)} footer={false}>
        <form onSubmit={handleDeleteAccount} className='w-full flex items-start justify-center flex-col gap-2'>
        
        <p className='text-[#767F8C]'>Enter your password to delete your account</p>
        <div className='flex flex-col items-start gap-2'>
        {/* <h1 className='text-sm text-[#18191C]'>Phone Number</h1> */}
        <input type="password" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' name='pass' placeholder='Password'/>
        <button className='bg-red-500 text-white font-medium px-4 py-2 rounded-md mt-5'>Delete</button>
        </div>
        </form>
      </Modal>
        </div>
    </div>
  )
}

export default AccountSettings