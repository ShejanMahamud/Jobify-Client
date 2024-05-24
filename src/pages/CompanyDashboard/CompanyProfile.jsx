import { useMutation } from '@tanstack/react-query';
import { Modal } from 'antd';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineUserSwitch } from 'react-icons/ai';
import useAxiosCommon from '../../hooks/useAxiosCommon';
import useCompanyInfo from '../../hooks/useCompanyInfo';

const CompanyProfile = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
const axiosCommon = useAxiosCommon()
const {companyInfo} = useCompanyInfo();

const { mutateAsync:handlePromote } = useMutation({
    mutationFn: async (promote) => {
      const { data } = await axiosCommon.patch(`/company/${companyInfo?.email}`, { [promote]: true })
      if (!data.success) {
        toast.error('Something Went Wrong...')
      }
      return data
    },
    onSuccess: () => {
      toast.success('Successfully Promoted...')
      setIsModalOpen(false);
    }
  })

  const handlePromoteCompany = async (e) => {
    e.preventDefault()
    try{
    const promote = e.target.radio.value;
     await handlePromote(promote)
    }
    catch(error){
      toast.error('Something Went Wrong...')
    }
    
  }

  return (
    <div className='w-full font-inter border-l border-[#E4E5E8] px-5 py-5 min-h-screen'>

      <div className="w-full px-5">
      <div className="w-full rounded-lg border border-[#E4E5E8] h-[250px] z-10 relative">
            <img src="https://i.ibb.co/y5qNCph/israel-andrade-YI-9-Siv-Vt-s-unsplash.jpg" alt="" className="w-full object-cover h-full rounded-lg"/>
      </div>
      <div className="w-[90%] mx-auto bg-white relative z-50 py-5 px-5 rounded-lg flex items-center justify-between -mt-16 border border-[#E4E5E8]">
      <div className="flex items-center gap-5">
      <img src={companyInfo?.company_logo} alt="" className='h-20 w-20 object-cover rounded-full border border-primary'/>
              <div className="flex flex-col items-start">
                <h1 className="text-[#18191C] font-medium text-2xl">{companyInfo?.company_name}</h1>
                <span className="text-[#5E6670]">{companyInfo?.company_category}</span>
              </div>
      </div>
              <button onClick={()=>setIsModalOpen(true)} className="bg-primary text-white font-medium text-lg px-6 py-3 rounded-lg">Promote Company</button>
              <Modal width={600} footer={false} open={isModalOpen} onCancel={() => setIsModalOpen(false)}>

          <form onSubmit={handlePromoteCompany} className='w-full mb-5'>
            <h1 className='text-2xl font-medium mb-3'>Promote Company: {companyInfo?.company_name}</h1>
            <p className='text-[#5E6670] mb-3'>Fusce commodo, sem non tempor convallis, sapien turpis bibendum turpis, non pharetra nisl velit pulvinar lectus. Suspendisse varius at nisl aliquam. </p>
            <div className='w-full grid grid-cols-1 row-auto items-center gap-5'>
              <div className='w-full bg-[#f1f2f480] rounded-lg px-5 py-5 hover:bg-[#E7F0FA]'>
                <div className='bg-white px-2 py-2 rounded-lg border-[#E4E5E8] border mb-5'>
                  <h1 className='font-medium text-xs mb-5'>ALWAYS ON THE TOP</h1>
                  <div className='w-full grid grid-cols-4 row-auto items-center gap-2'>
                    <img src="https://gist.github.com/ShejanMahamud/bf5c8684d52c8ede1913a60c3613e91b/raw/0f0ac37b53d0e465c7a78f00642ddba33e5bc00d/featured-1.svg" alt="" />
                    <img src="https://gist.github.com/ShejanMahamud/77a633e406245a3540026ca60be24105/raw/6b4db8004749f477f9845753e5d2fd1482953910/featured-2.svg" alt="" />
                    <img src="https://gist.github.com/ShejanMahamud/77a633e406245a3540026ca60be24105/raw/6b4db8004749f477f9845753e5d2fd1482953910/featured-2.svg" alt="" />
                    <img src="https://gist.github.com/ShejanMahamud/77a633e406245a3540026ca60be24105/raw/6b4db8004749f477f9845753e5d2fd1482953910/featured-2.svg" alt="" />
                  </div>
                </div>
                <div className="w-full rounded-lg flex items-start gap-3">
                  <input required type="radio" name="radio" value={'featured'} className="radio checked:bg-primary" />
                  <div className="flex flex-col items-start gap-2">
                    <h1 className="text-lg text-[#18191C] font-medium ">Featured Your Company</h1>
                    <p className="text-xs text-[#5E6670]">Candidate will apply job using jobpilot & all application will show on your dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full flex items-center justify-between mt-10'>
              <button onClick={()=>setIsModalOpen(false)} className='text-[#767F8C] font-medium text-base'>Cancel</button>
              <button className="bg-primary px-4 py-3 rounded-md text-white flex items-center gap-3 text-base">
<span>Promote Company</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5 12H19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5L19 12L12 19" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
            </div>
          </form>
      </Modal>
      </div>
      <div className="w-full grid grid-cols-2 gap-16 justify-items-end row-auto items-start my-10 py-5">
            <div className="w-full flex flex-col items-start gap-12">
                <div className="flex flex-col items-start gap-3">
                    <h1 className="text-[#18191C] text-lg font-medium">Description</h1>
                    <p className="text-[#5E6670]">{companyInfo?.description}</p>
                </div>

                <div className="flex flex-col items-start gap-3">
                    <h1 className="text-[#18191C] text-lg font-medium">Company Benefits</h1>
                    <ul className="text-[#5E6670] list-disc *:mb-3 ml-5">
                  {companyInfo?.benefits &&
                    companyInfo?.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                </ul>
                </div>

                <div className="flex flex-col items-start gap-3">
                    <h1 className="text-[#18191C] text-lg font-medium">Company Vision</h1>
                    <p className="text-[#5E6670]">{companyInfo?.company_vision}</p>
                </div>

                <div className="flex items-center gap-2 w-full">
                <span className="text-[#191F33] text-sm">Share this profile:</span>
                <button className="border border-[#CEE0F5] px-2 py-2 rounded-lg text-[#0A65CC] flex items-center text-sm">
                    <img src="https://gist.githubusercontent.com/ShejanMahamud/257bddb4ed895b9bf91c7979890f8c3d/raw/8f912afec40244266651bc332c398e565d0088bf/facebook.svg" alt="" />
                </button>

                <button className="border border-[#CEE0F5] px-3 py-2 rounded-lg text-[#1DA1F2] flex items-center gap-2">
                    <img src="https://gist.githubusercontent.com/ShejanMahamud/6588958734fce721b08e8936e9cd024f/raw/cbb92eeefd308ddcb56a8d948f33d2a7146d6d33/twitter.svg" alt="" />

                </button>
                <button className="border border-[#CEE0F5] px-3 py-2 rounded-lg text-[#CA2127] flex items-center gap-2">
                <img src="https://gist.githubusercontent.com/ShejanMahamud/2230dc6f21daabb3c38b3b0d08db87c6/raw/639d9bf41e97abe14113637423c3f4238c40bf4c/pinterest.svg" alt="" />

                </button>
              </div>
            </div>


            <div className="w-full flex flex-col gap-10">
            <div className="border border-[#E7F0FA] px-10 py-10 w-full rounded-lg">
                <div className="w-full grid grid-cols-2 row-auto items-center gap-x-5 gap-y-12">
                  <div className="flex flex-col items-start gap-1">
                    <img src="https://gist.github.com/ShejanMahamud/b2e67ef498252b88ce5124073542dff0/raw/ad57e2209a95c8e6a1015e3249a816361bdf35e9/date.svg" alt="" />
                    <span className="text-[#767F8C] text-xs uppercase">
                     Founded In:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      {companyInfo?.founded_in}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <img src="https://gist.github.com/ShejanMahamud/2719691afac08449268dc6bfd73f3033/raw/684fb1644a95af13f3924f2f11c7ef71de581dd1/case.svg" alt="" />
                    <span className="text-[#767F8C] text-xs uppercase">
                      Organization Type:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium uppercase">
                      {companyInfo?.organization_type}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                  <AiOutlineUserSwitch className="text-primary text-3xl"/>
                    <span className="text-[#767F8C] text-xs uppercase">
                      Team Size:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium uppercase">
                      {companyInfo?.company_size}
                    </span>
                  </div>

                  <div className="flex flex-col items-start gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                    >
                      <path
                        d="M7 29H25"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16 17C18.2091 17 20 15.2091 20 13C20 10.7909 18.2091 9 16 9C13.7909 9 12 10.7909 12 13C12 15.2091 13.7909 17 16 17Z"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M26 13C26 22 16 29 16 29C16 29 6 22 6 13C6 10.3478 7.05357 7.8043 8.92893 5.92893C10.8043 4.05357 13.3478 3 16 3C18.6522 3 21.1957 4.05357 23.0711 5.92893C24.9464 7.8043 26 10.3478 26 13V13Z"
                        stroke="#0A65CC"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span className="text-[#767F8C] text-xs uppercase">
                      Location:
                    </span>
                    <span className="text-sm text-[#18191C] font-medium">
                      {companyInfo?.location}
                    </span>
                  </div>

                </div>
               
              </div>
              <div className="border border-[#E7F0FA] px-10 py-10 w-full rounded-lg">
                <h1 className="text-xl font-medium mb-10">Contact Information</h1>
                <div className="flex items-center gap-3">
                    <img src="https://gist.github.com/ShejanMahamud/1b527c1461bd70ee259aad5a3465cc2f/raw/caf2be0686385bb7bc9dcaaa3cbf5fbc97cbea95/globe.svg" alt="" />
                    <div className="flex flex-col items-start">
                    <h1 className="uppercase text-xs text-[#767F8C] mb-1">Website</h1>
                    <p className="font-medium text-[#18191C]">{companyInfo?.website}</p>
                    </div>
                </div>
                <hr className="border border-[#E4E5E8] w-full rounded-full my-5"/>
                <div className="flex items-center gap-3">
                    <img src="https://gist.github.com/ShejanMahamud/f73c44e6f5a5eb8b101e012a4b9ba526/raw/47152dabb6afa9e32b31a784329559a0be53d611/phone.svg" alt="" />
                    <div className="flex flex-col items-start">
                    <h1 className="uppercase text-xs text-[#767F8C] mb-1">Phone</h1>
                    <p className="font-medium text-[#18191C]">{companyInfo?.phone}</p>
                    </div>
                </div>
                <hr className="border border-[#E4E5E8] w-full rounded-full my-5"/>
                <div className="flex items-center gap-3">
                    <img src="https://gist.github.com/ShejanMahamud/2374104d4a783130c5540f1fb53d5013/raw/d2de14c9c15942c354ae03fd2ac8dca6cc3a1eb9/email.svg" alt="" />
                    <div className="flex flex-col items-start">
                    <h1 className="uppercase text-xs text-[#767F8C] mb-1">Email</h1>
                    <p className="font-medium text-[#18191C]">{companyInfo?.email}</p>
                    </div>
                </div>
                </div>
                <div className="flex flex-col items-start gap-5 border border-[#E7F0FA] w-full rounded-lg px-10 py-10">
                <h1 className="text-xl font-medium">Follow us on:</h1>
                  <div className="flex items-center gap-3">
                  <button className="bg-[#E7F0FA] h-12 w-12 rounded-lg flex items-center justify-center">
                    <img src="https://gist.githubusercontent.com/ShejanMahamud/257bddb4ed895b9bf91c7979890f8c3d/raw/8f912afec40244266651bc332c398e565d0088bf/facebook.svg" alt="" />
                  </button>

                  <button className="bg-primary h-12 w-12 rounded-lg flex items-center justify-center">
                        <img src="https://gist.github.com/ShejanMahamud/372ef393a3da0d042a6a3b5e737f4d33/raw/79340a1ae04cd2237dd8c2bf9ecacf1086c041b1/twitter-white.svg" alt="" />
                  </button>

                  <button className="bg-[#E7F0FA] h-12 w-12 rounded-lg flex items-center justify-center">
                  <img src="https://gist.github.com/ShejanMahamud/a7272c50110795fa41efab3e55522c5d/raw/52e3e7273026695fa3c90a81f31024071b8b30c5/instagram.svg" alt="" />
                  </button>

                  <button className="bg-[#E7F0FA] h-12 w-12 rounded-lg flex items-center justify-center">
                    <img src="https://gist.github.com/ShejanMahamud/1396a416e70ca905c85b3d482668d2f2/raw/a72bb12ba36d587f3c6068c29326ef410894b8d3/youtube.svg" alt="" />
                  </button>
                  </div>
                </div>
            </div>
      </div>
      </div>
    </div>
  )
}

export default CompanyProfile