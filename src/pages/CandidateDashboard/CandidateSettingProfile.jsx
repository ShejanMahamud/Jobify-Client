import { DatePicker } from 'antd';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useJoditConfigs from '../../hooks/useJoditConfigs';
import useUserInfo from '../../hooks/useUserInfo';

const CandidateSettingProfile = () => {
  const {user,userInfo} = useUserInfo()
  const [content, setContent] = useState("");
  const {editor,config} = useJoditConfigs()

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const dob = e.target.date.value;
    const nationality = e.target.nationality.value;
    const gender = e.target.gender.value;
    const marital_status = e.target.marital.value;
    const biodata = content;

    const userInfo = {
      ...(dob && { dob }),
      ...(nationality && { nationality }),
      ...(gender && { gender }),
      ...(marital_status && { marital_status }),
      ...(biodata && { biodata })
    };
    
    try{
      const {data} = await axios.patch(`http://localhost:5948/user/${user?.email}`,userInfo)
      if(data.success){
        toast.success('Profile Updated')
      }
    }
    catch(error){
      toast.error('Something Went Wrong!')
    }
  }

  return (
    <div className='w-full font-inter'>
    <h1 className='text-base text-[#18191C] font-medium mb-10'>Profile Information</h1>
    <form onSubmit={handleProfileUpdate}  className='w-full grid grid-cols-2 row-auto items-center gap-10 mt-5'>
      <div className='flex flex-col items-start gap-2'>
      <h1 className='text-sm text-[#18191C]'>Nationality</h1>
      <input defaultValue={userInfo?.nationality} type="text" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' name='nationality' placeholder='Nationality'/>
      </div>
      <div className='flex flex-col items-start gap-2'>
      <h1 className='text-sm text-[#18191C]'>Date of Birth</h1>
      <DatePicker
      
                      name="date"
                      format="YYYY-MM-DD"
                      className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' placeholder='Date of Birth'
                    />
      </div>
      <div className='flex flex-col items-start gap-2'>
      <h1 className='text-sm text-[#18191C]'>Gender</h1>
      <select defaultValue={userInfo?.gender} name="gender" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none'>
        <option value="select" disabled>Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Custom">Custom</option>
      </select>
      </div>
      <div className='flex flex-col items-start gap-2'>
      <h1 className='text-sm text-[#18191C]'>Marital Status</h1>
      <select defaultValue={userInfo?.marital} name="marital" className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none'>
        <option value="select" disabled>Select</option>
        <option value="Married">Married</option>
        <option value="Unmarried">Unmarried</option>
      </select>
      </div>
      <div className='flex flex-col items-start gap-2 col-span-2 w-full'>
      <h1 className='text-sm text-[#18191C]'>Personal Biography</h1>
      <JoditEditor
                    ref={editor}
                    value={userInfo?.biodata}
                    config={config}
                    onChange={(newContent) => setContent(newContent)}
                    
                  />
      </div>
            <button className='bg-primary text-white font-medium text-lg px-4 py-2 rounded-sm w-[50%]'>Save Changes</button>
    </form>
  </div>
  )
}

export default CandidateSettingProfile