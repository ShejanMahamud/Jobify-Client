import { message, Upload } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useUserInfo from '../../hooks/useUserInfo';
const { Dragger } = Upload;
// i want to implement upload direct resume pdf 
const CandidateSettingPersonal = () => {
const axiosCommon = useAxiosCommon()
const axiosSecure = useAxiosSecure()
const {userInfo,userInfoPending,userInfoRefetch,user} = useUserInfo()

const [image,setImage] = useState(null)
  const props = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    customRequest: async ({ file, onSuccess, onError }) => {
      const formData = new FormData();
      formData.append('image', file);

      try {
        const response = await axiosCommon.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, formData);
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
    const preference = e.target.job_preference.value;
    const job_preference = preference.split(',')
    // const userInfo = {name,title,experience,education,website,resume,photo}
    const userInfo ={
      ...(name && {name}),
      ...(title && {title}),
      ...(experience && {experience}),
      ...(education && {education}),
      ...(website && {website}),
      ...(resume && {resume}),
      ...(photo && {photo}),
      ...(job_preference && {job_preference})
    }
    try{
      const {data} = await axiosSecure.patch(`http://localhost:5948/user/${user?.email}`,userInfo)
      console.log(data)
      if(data.success){
        toast.success('Profile Updated')
        userInfoRefetch()
      }
    }
    catch(error){
      toast.error('Something Went Wrong!')
    }
  }

  if(userInfoPending){
    return <div className="flex items-center justify-center space-x-2 w-full min-h-screen">
    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
    <div className="w-4 h-4 rounded-full animate-pulse bg-primary"></div>
  </div>
  }

  return (
    <div className='w-full font-inter'>
      <h1 className='text-base text-[#18191C] font-medium mb-10'>Basic Information</h1>
      <div className='w-full grid grid-cols-[30%_70%] items-start gap-5'>
      <div className='w-full flex flex-col items-center gap-3'>
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
  <img src={userInfo?.photo} alt="photo.png" className='w-40 h-40 object-cover rounded-full'/>
      </div>
      <form onSubmit={handlePersonalSetting} className='w-full grid grid-cols-2 row-auto items-center gap-5 mt-5'>
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Full Name</h1>
        <input type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' name='name' defaultValue={userInfo?.name} placeholder='Full Name'/>
        </div>
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Title/Heading</h1>
        <input type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' name='title' placeholder='Title' defaultValue={userInfo?.title}/>
        </div>
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Experience</h1>
        <select defaultValue={userInfo?.experience} name="experience" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none'>
          <option value="select" selected disabled>Select</option>
          <option value="fresher">Fresher</option>
          <option value="1 Year">1 Year</option>
          <option value="2 Year">2 Year</option>
          <option value="3 Year">3 Year</option>
          <option value="4 Year">4 Year</option>
          <option value="5 Year">5 Year</option>
          <option value="5+ Year">5+ Year</option>
        </select>
        </div>
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Education</h1>
        <input defaultValue={userInfo?.education} name='education' type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' placeholder='Education'/>
        </div>
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Personal Website</h1>
        <input defaultValue={userInfo?.website} name='website' type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' placeholder='Website URL'/>
        </div>
        <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Professional Resume</h1>
        <input defaultValue={userInfo?.resume} name='resume' type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' placeholder='Resume URL (Only Google Drive)'/>
        </div>
        <div className='flex flex-col items-start gap-2 col-span-2'>
        <h1 className='text-sm text-[#18191C]'>Job Preference (For Job Alert)</h1>
        <input defaultValue={userInfo?.job_preference} name='job_preference' type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' placeholder='React.Js Developer, Frontend Developer'/>
        </div>
              <button className='bg-primary text-white font-medium text-lg px-4 py-2 rounded-sm w-[50%]'>Save Changes</button>
      </form>
      </div>
    </div>
  )
}

export default CandidateSettingPersonal