import { message, Upload } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';
const { Dragger } = Upload;

const CandidateSettingPersonal = () => {
const [image,setImage] = useState(null)
const {user} = useAuth();
  const props = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, formData);
        onSuccess(response.data);
        message.success(`${file.name} file uploaded successfully.`);
        setImage(response.data.data.url);
      } catch (error) {
        onError(error);
        message.error(`${file.name} file upload failed.`);
      }
    },
  };

  const handlePersonalSetting = async (e) => {
    e.preventDefault()
    const name = e.target.name.value;
    const title = e.target.title.value;
    const experience = e.target.experience.value;
    const education = e.target.education.value;
    const website = e.target.website.value;
    const resume = e.target.resume.value;
    const photo = image;
    const userInfo = {name,title,experience,education,website,resume,photo}

    try{
      const {data} = await axios.patch(`http://localhost:5948/user/${user?.email}`,userInfo)
      console.log(data)
      if(data.success){
        toast.success('Profile Updated')
      }
    }
    catch(error){
      toast.error('Something Went Wrong!')
      console.log(error)
    }
  }

  return (
    <div className='w-full font-inter'>
      <h1 className='text-base text-[#18191C] font-medium mb-10'>Basic Information</h1>
      <div className='w-full grid grid-cols-[30%_70%] items-start gap-5'>
      <div className='w-full flex flex-col items-start gap-3'>
      <h1 className='text-base text-[#18191C]'>Profile Picture</h1>
      <Dragger {...props} className='flex justify-center flex-col items-center'>
    <p className="ant-upload-drag-icon">
      <div className='flex justify-center w-full'>
      <img src="https://gist.github.com/ShejanMahamud/219088817d740708d51d284941ec6031/raw/87a87739ed1468653a95f4bfe179853e5859d29b/upload.svg" alt="" className='w-20'/>
      </div>
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibited from uploading company data or other
      banned files.
    </p>
  </Dragger>
      </div>
      <form onSubmit={handlePersonalSetting} className='w-full grid grid-cols-2 row-auto items-center gap-5 mt-5'>
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Full Name</h1>
        <input type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' name='name' placeholder='Full Name'/>
        </div>
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Title/Heading</h1>
        <input type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' name='title' placeholder='Title'/>
        </div>
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Experience</h1>
        <select name="experience" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none'>
          <option value="select" selected disabled>Select</option>
          <option value="fresher">Fresher</option>
        </select>
        </div>
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Education</h1>
        <input name='education' type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' placeholder='Education'/>
        </div>
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Personal Website</h1>
        <input name='website' type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' placeholder='Website URL'/>
        </div>
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Professional Resume</h1>
        <input name='resume' type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' placeholder='Resume URL'/>
        </div>
              <button className='bg-primary text-white font-medium text-lg px-4 py-2 rounded-sm w-[50%]'>Save Changes</button>
      </form>
      </div>
    </div>
  )
}

export default CandidateSettingPersonal