import { useMutation } from '@tanstack/react-query';
import { message } from 'antd'; // Import message for displaying upload status
import Dragger from 'antd/es/upload/Dragger';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useCompanyInfo from '../../../hooks/useCompanyInfo';
import useJoditConfigs from '../../../hooks/useJoditConfigs';

const CompanyInfo = () => {
  const [about,setAbout] = useState(null)
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const {editor,config} = useJoditConfigs();
  const axiosSecure = useAxiosSecure();
  const {companyInfo,companyInfoRefetch} = useCompanyInfo()
  const handleCustomRequest = async ({ file, onSuccess, onError, type }) => {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API}`, formData);
      onSuccess(response.data);
      message.success(`${file.name} file uploaded successfully.`);

      if (type === 'profile') {
        setProfileImage(response.data.data.url);
      } else if (type === 'cover') {
        setCoverImage(response.data.data.url);
      }
    } catch (error) {
      onError(error);
      message.error(`${file.name} file upload failed.`);
    }
  };

  const profileUploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    customRequest: (options) => handleCustomRequest({ ...options, type: 'profile' }),
  };

  const coverUploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    customRequest: (options) => handleCustomRequest({ ...options, type: 'cover' }),
  };

  const {mutateAsync} = useMutation({
    mutationFn: async (companyData) => {
      const {data} = await axiosSecure.patch(`/company/${companyInfo?.email}`,companyData)
      if(!data.success){
        return toast.error('Something Went Wrong...')
      }
      return data;
    },
    onSuccess: () => {
      toast.success('Updated Successfully...')
      companyInfoRefetch()
    }
  })

  const handleCompanyInfoUpdate = async (e) => {
    e.preventDefault();
    try{
      const company_name = e.target.name.value;
      const company_about = about;
      const company_logo = profileImage;
      const company_cover = coverImage;
      const companyData = {
        ...(company_name && {company_name}),
        ...(company_about && {company_about}),
        ...(company_logo && {company_logo}),
        ...(company_cover && {company_cover})
      }
      await mutateAsync(companyData)
    }
    catch(error){
      toast.error('Something Went Wrong...')
    }
  }

  return (
    <div className='w-full font-inter'>
      <h1 className='text-lg font-medium'>Logo & Banner Image</h1>
      <div className='w-full grid grid-cols-[30%_60%] row-auto items-center gap-10 mt-5'>
      <div className='w-full'>
        <h2 className='text-sm font-medium mb-3'>Profile Photo</h2>
        <Dragger {...profileUploadProps} className='flex justify-center flex-col items-center'>
          <p className="ant-upload-drag-icon">
            <div className='flex justify-center w-full'>
              <img src="https://gist.github.com/ShejanMahamud/219088817d740708d51d284941ec6031/raw/87a87739ed1468653a95f4bfe179853e5859d29b/upload.svg" alt="" className='w-16'/>
            </div>
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload.
          </p>
        </Dragger>
        
      </div>
      <div className='w-full'>
        <h2 className='text-sm font-medium mb-3'>Cover Photo</h2>
        <Dragger {...coverUploadProps} className='flex justify-center flex-col items-center'>
          <p className="ant-upload-drag-icon">
            <div className='flex justify-center w-full'>
              <img src="https://gist.github.com/ShejanMahamud/219088817d740708d51d284941ec6031/raw/87a87739ed1468653a95f4bfe179853e5859d29b/upload.svg" alt="" className='w-16'/>
            </div>
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
          </p>
        </Dragger>
      </div>
      </div>
      <form onSubmit={handleCompanyInfoUpdate} className='w-full grid grid-cols-1 row-auto items-center gap-10 my-10'>
      <div className='flex flex-col items-start gap-2'>
        <h1 className='text-sm text-[#18191C]'>Company Name</h1>
        <input defaultValue={companyInfo?.company_name} type="text" className='px-4 py-2 rounded-lg bg-transparent w-[82%] border border-[#E4E5E8] focus:outline-none' name='name' placeholder='Company Name'/>
        </div>
        <div className='flex flex-col items-start gap-2 col-span-3 w-full'>
      <h1 className='text-sm text-[#18191C]'>About</h1>
      <JoditEditor
                    ref={editor}
                    config={config}
                    onChange={(newContent) => setAbout(newContent)}
                    value={companyInfo?.company_about}
                  />
      </div>
      <button className='bg-primary text-white px-4 py-3 rounded-md font-medium w-[20%]'>Save Changes</button>
      </form>
    </div>
  );
}

export default CompanyInfo;
