import React from 'react';
import toast from 'react-hot-toast';
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoGithub, IoLogoLinkedin } from "react-icons/io5";
import useAxiosCommon from '../../hooks/useAxiosCommon';
import useUserInfo from '../../hooks/useUserInfo';

const SocialSettings = () => {
  const { user, userInfo } = useUserInfo();
  const axiosCommon = useAxiosCommon();

  const handleSocialAdd = async (e) => {
    e.preventDefault();
    const linkedin = e.target.linkedin.value;
    const github = e.target.github.value;
    const instagram = e.target.instagram.value;
    const twitter = e.target.twitter.value;
    const facebook = e.target.facebook.value;

    const socialInfo = {
      ...(linkedin && { linkedin }),
      ...(github && { github }),
      ...(instagram && { instagram }),
      ...(twitter && { twitter }),
      ...(facebook && { facebook })
    };

    try {
      let response;
      if (userInfo?.role === 'company') {
        response = await axiosCommon.patch(`/company/${user?.email}`, socialInfo);
      } else {
        response = await axiosCommon.patch(`/user/${user?.email}`, socialInfo);
      }

      if (response.data.success) {
        toast.success('Profile Updated');
      }
    } catch (error) {
      toast.error('Something Went Wrong!');
    }
  };

  return (
    <div className='w-full px-5 font-inter'>
      <h1 className='text-base text-[#18191C] font-medium mb-10'>Social Links</h1>
      <form onSubmit={handleSocialAdd} className='grid grid-cols-2 row-auto items-center gap-x-10 gap-y-5'>
        <div className='flex flex-col items-start gap-2 '>
          <h1 className='text-sm text-[#18191C]'>Linkedin</h1>
          <div className='px-5 py-3 flex items-center w-full justify-between rounded-lg border border-[#E4E5E8]'>
            <IoLogoLinkedin className='text-2xl text-primary mr-5' />
            <input defaultValue={userInfo?.linkedin} type="text" className='bg-transparent w-full focus:outline-none' name='linkedin' placeholder='Linkedin Profile' />
          </div>
        </div>

        <div className='flex flex-col items-start gap-2 '>
          <h1 className='text-sm text-[#18191C]'>Github</h1>
          <div className='px-5 py-3 flex items-center w-full justify-between rounded-lg border border-[#E4E5E8]'>
            <IoLogoGithub className='text-2xl text-primary mr-5' />
            <input defaultValue={userInfo?.github} type="text" className='bg-transparent w-full focus:outline-none' name='github' placeholder='Github Profile' />
          </div>
        </div>

        <div className='flex flex-col items-start gap-2 '>
          <h1 className='text-sm text-[#18191C]'>Twitter(X)</h1>
          <div className='px-5 py-3 flex items-center w-full justify-between rounded-lg border border-[#E4E5E8]'>
            <FaSquareXTwitter className='text-2xl text-primary mr-5' />
            <input defaultValue={userInfo?.twitter} type="text" className='bg-transparent w-full focus:outline-none' name='twitter' placeholder='Twitter Profile' />
          </div>
        </div>

        <div className='flex flex-col items-start gap-2 '>
          <h1 className='text-sm text-[#18191C]'>Instagram</h1>
          <div className='px-5 py-3 flex items-center w-full justify-between rounded-lg border border-[#E4E5E8]'>
            <FaSquareInstagram className='text-2xl text-primary mr-5' />
            <input defaultValue={userInfo?.instagram} type="text" className='bg-transparent w-full focus:outline-none' name='instagram' placeholder='Instagram Profile' />
          </div>
        </div>

        <div className='flex flex-col items-start gap-2 col-span-2'>
          <h1 className='text-sm text-[#18191C]'>Facebook</h1>
          <div className='px-5 py-3 flex items-center w-full justify-between rounded-lg border border-[#E4E5E8]'>
            <FaFacebookSquare className='text-2xl text-primary mr-5' />
            <input defaultValue={userInfo?.facebook} type="text" className='bg-transparent w-full focus:outline-none' name='facebook' placeholder='Facebook Profile' />
          </div>
        </div>

        <button className='mt-5 bg-primary text-white font-medium text-lg px-4 py-2 rounded-sm w-[40%]'>
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default SocialSettings;
