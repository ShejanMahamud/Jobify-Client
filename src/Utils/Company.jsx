import React from 'react'

const Company = () => {
  return (
    <div className="w-full flex items-center justify-between px-5 py-3 rounded-lg border border-[#EDEFF5]">
    <div className="flex items-center gap-5">
    <div
          className={`bg-primary bg-opacity-80 h-16 w-16 rounded-md flex items-center justify-center text-white text-3xl font-bold`}
        >
          T
        </div>
      <div className="flex flex-col items-start gap-3">
          <div className="flex items-center gap-3">
              <h1>tEST</h1>
          </div>
          <div className="flex items-center gap-5">
              <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
<path d="M19.25 9.16675C19.25 15.5834 11 21.0834 11 21.0834C11 21.0834 2.75 15.5834 2.75 9.16675C2.75 6.97871 3.61919 4.88029 5.16637 3.33312C6.71354 1.78594 8.81196 0.916748 11 0.916748C13.188 0.916748 15.2865 1.78594 16.8336 3.33312C18.3808 4.88029 19.25 6.97871 19.25 9.16675Z" stroke="#C5C9D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M11 11.9167C12.5188 11.9167 13.75 10.6855 13.75 9.16675C13.75 7.64797 12.5188 6.41675 11 6.41675C9.48122 6.41675 8.25 7.64797 8.25 9.16675C8.25 10.6855 9.48122 11.9167 11 11.9167Z" stroke="#C5C9D6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<span className="text-[#636A80] text-sm">location</span>
              </div>

              <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <g clip-path="url(#clip0_1754_48742)">
    <path d="M18.5635 6.1875H3.43848C3.05878 6.1875 2.75098 6.4953 2.75098 6.875V17.875C2.75098 18.2547 3.05878 18.5625 3.43848 18.5625H18.5635C18.9432 18.5625 19.251 18.2547 19.251 17.875V6.875C19.251 6.4953 18.9432 6.1875 18.5635 6.1875Z" stroke="#C5C9D6" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M14.4375 6.1875V4.8125C14.4375 4.44783 14.2926 4.09809 14.0348 3.84023C13.7769 3.58237 13.4272 3.4375 13.0625 3.4375H8.9375C8.57283 3.4375 8.22309 3.58237 7.96523 3.84023C7.70737 4.09809 7.5625 4.44783 7.5625 4.8125V6.1875" stroke="#C5C9D6" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M19.2511 10.8545C16.7437 12.3052 13.8972 13.0669 11.0004 13.0623C8.1041 13.0669 5.25808 12.3054 2.75098 10.8552" stroke="#C5C9D6" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M9.96875 10.3125H12.0312" stroke="#C5C9D6" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
  <defs>
    <clipPath id="clip0_1754_48742">
      <rect width="22" height="22" fill="white"/>
    </clipPath>
  </defs>
</svg>
<span className="text-[#636A80] text-sm">3 - Open Job</span>
              </div>

          </div>
      </div>
    </div>
    <button onClick={()=>navigate(`/job/${_id}`)} className="bg-[#E7F0FA] px-4 py-3 rounded-md text-primary font-medium flex items-center gap-3">
<span>Open Position</span>
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
<path d="M5 12H19" stroke="#0A65CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M12 5L19 12L12 19" stroke="#0A65CC" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
</button>
  </div>
  )
}

export default Company