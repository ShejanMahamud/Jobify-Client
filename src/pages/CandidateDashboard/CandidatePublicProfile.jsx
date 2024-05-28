import React from "react";
import { IoFlagOutline, IoLocationOutline } from "react-icons/io5";
import useUserInfo from "../../hooks/useUserInfo";

const CandidatePublicProfile = () => {

const {userInfo} = useUserInfo()

  return (
    <div className="w-full border-l border-[#e4e5e8] min-h-screen py-5 px-5">
      <h1 className="text-base text-[#18191C] font-medium mb-10">
        Public Profile
      </h1>
      <div className="w-full grid grid-cols-[70%_30%] px-5 gap-5 items-start">
        <div className="flex w-full flex-col items-start gap-10">
          <div className="w-full border border-[#D6DDEB] rounded-lg flex flex-col items-center relative">
            <div className="w-full h-[200px] relative">
              <img src="https://i.ibb.co/x6xnyRC/795e8007fd6cfb71065a3f4e130c59af-Expires-1717977600-Key-Pair-Id-APKAQ4-GOSFWCVNEHN3-O4-Signature-dj.jpg" alt="" className="h-full object-cover w-full"/>
              <button className="absolute top-5 p-1 border-white border rounded-md right-5"><img src="https://gist.github.com/ShejanMahamud/7af6b4ca06a65276b66ea9587d6bac98/raw/c66e65691983fe6eaac1ea3026215df62b2764e8/edit.svg" alt="" /></button>
            </div>
            <div className="flex items-center gap-20 w-full justify-end">
            <div className=" flex items-start justify-start gap-5 px-5 py-5">
              <img src={userInfo?.photo} alt="" className="w-32 h-32 object-cover border-4 border-white rounded-full absolute top-36 left-5"/>
              <div className="flex flex-col items-center  w-full gap-2">
              <h1 className="text-xl text-[#18191C] font-medium">
              {userInfo?.name}
      </h1>
      <p className="text-[#636A80]">{userInfo?.title}</p>
      <div className="flex items-center gap-2">
      <IoLocationOutline/>
      <p className="text-[#636A80]">{userInfo?.location}</p>
      </div>

              </div>
            </div>
            <button className="bg-[#E8F1FF] text-primary px-4 py-3 rounded-lg flex items-center gap-2  mx-2">
      <IoFlagOutline className="text-lg"/>
       <span>OPEN FOR OPPORTUNITIES</span></button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatePublicProfile;
