import { DatePicker } from 'antd';
import JoditEditor from 'jodit-react';
import React, { useState } from 'react';
import { FiLink } from "react-icons/fi";
import useJoditConfigs from './../../../hooks/useJoditConfigs';
//todo: need to complete
const CompanyFundingInfo = () => {

const [vision,setVision] = useState(null)
const {config,editor} = useJoditConfigs()

  return (
    <div className='w-full px-5 py-5 font-inter grid grid-cols-3 row-auto items-center gap-5'>
        <div className="flex flex-col items-start gap-2">
  <h1 className="text-sm text-[#18191C] mb-2">Organization Type</h1>
  <select
    required
    name="organization_type"
    className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
  >
    <option value="" selected disabled>
      Select...
    </option>
    <option value="Private">Private</option>
    <option value="Public">Public</option>
    <option value="Non-Profit">Non-Profit</option>
    <option value="Government">Government</option>
    <option value="Educational Institution">Educational Institution</option>
    <option value="Healthcare">Healthcare</option>
    <option value="Start-Up">Start-Up</option>
    <option value="Cooperative">Cooperative</option>
    <option value="Multinational Corporation">Multinational Corporation</option>
    <option value="Partnership">Partnership</option>
    <option value="Sole Proprietorship">Sole Proprietorship</option>
    <option value="NGO">NGO (Non-Governmental Organization)</option>
  </select>
</div>
<div className="flex flex-col items-start gap-2">
  <h1 className="text-sm text-[#18191C] mb-2">Industry Type</h1>
  <select
    required
    name="industry_type"
    className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
  >
    <option className='text-[#767F8C]' value="" selected disabled>
      Select...
    </option>
    <option value="Agriculture">Agriculture</option>
    <option value="Automotive">Automotive</option>
    <option value="Banking">Banking</option>
    <option value="Construction">Construction</option>
    <option value="Consulting">Consulting</option>
    <option value="Education">Education</option>
    <option value="Energy">Energy</option>
    <option value="Entertainment">Entertainment</option>
    <option value="Fashion">Fashion</option>
    <option value="Finance">Finance</option>
    <option value="Healthcare">Healthcare</option>
    <option value="Hospitality">Hospitality</option>
    <option value="Information Technology">Information Technology</option>
    <option value="Insurance">Insurance</option>
    <option value="Legal">Legal</option>
    <option value="Logistics">Logistics</option>
    <option value="Manufacturing">Manufacturing</option>
    <option value="Marketing">Marketing</option>
    <option value="Media">Media</option>
    <option value="Non-Profit">Non-Profit</option>
    <option value="Pharmaceutical">Pharmaceutical</option>
    <option value="Real Estate">Real Estate</option>
    <option value="Retail">Retail</option>
    <option value="Telecommunications">Telecommunications</option>
    <option value="Transportation">Transportation</option>
    <option value="Travel">Travel</option>
    <option value="Utilities">Utilities</option>
  </select>
</div>
<div className="flex flex-col items-start gap-2">
  <h1 className="text-sm text-[#18191C] mb-2">Team Size</h1>
  <select
    required
    name="team_size"
    className="px-4 py-3 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none"
  >
    <option value="" selected disabled>
      Select...
    </option>
    <option value="1-5">1-5</option>
    <option value="6-10">6-10</option>
    <option value="11-20">11-20</option>
    <option value="21-50">21-50</option>
    <option value="51-100">51-100</option>
    <option value="101-200">101-200</option>
    <option value="201-500">201-500</option>
    <option value="501-1000">501-1000</option>
    <option value="1001+">1001+</option>
  </select>
</div>

<div className='flex flex-col items-start gap-2'>
      <h1 className='text-sm text-[#18191C]'>Founded In</h1>
      <DatePicker
      
                      name="date"
                      format="YYYY-MM-DD"
                      className='px-4 py-2 rounded-lg bg-transparent w-full border border-[#E4E5E8] focus:outline-none' placeholder='Founded Year'
                    />
      </div>
      <div className='flex flex-col items-start gap-2 '>
        <h1 className='text-sm text-[#18191C] '>Website</h1>
        <div className='px-5 py-3 flex items-center w-full justify-between rounded-lg border border-[#E4E5E8] '>

        <FiLink className='text-2xl text-primary mr-5'/>
        <input type="text" className='bg-transparent w-full focus:outline-none' name='website' placeholder='Company Website'/>
        </div>
        </div>

        <div className='flex flex-col items-start gap-2 col-span-3 w-full'>
      <h1 className='text-sm text-[#18191C]'>Company Vision</h1>
      <JoditEditor
                    ref={editor}
                    config={config}
                    onChange={(newContent) => setVision(newContent)}
                    
                  />
      </div>
      <button className='bg-primary text-white font-medium text-base px-4 py-3 rounded-sm w-[50%]'>Save Changes</button>
    </div>
  )
}

export default CompanyFundingInfo