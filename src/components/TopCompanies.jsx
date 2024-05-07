import React from 'react'

const TopCompanies = () => {
  return (
    <div className='w-full my-28 font-inter'>
        <div className="w-[90%] mx-auto flex items-center justify-between">
        <div className="flex flex-col items-start gap-2 mb-10 w-full">
          <h1 className="text-primary font-medium">Top Companies</h1>
          <span className=" font-bold lg:text-3xl md:text-xl text-lg">
            Explore our top companies
          </span>
          <p className="text-[#737D8C] w-[60%] text-sm">
            Find your dream job in Jobify
          </p>
        </div>
        <button className="border border-[#CEE0F5] px-4 py-2 rounded-md text-primary font-medium flex items-center gap-2 text-sm w-[10%] justify-center">
          <span>See All</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M5 12H19"
              stroke="#0A65CC"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 5L19 12L12 19"
              stroke="#0A65CC"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className='w-[90%] my-10 grid grid-cols-4 row-auto items-center gap-8 mx-auto'>
        <div className='w-full border border-[#EDEFF5] rounded-lg px-5 py-5 flex flex-col items-center gap-10'>
            <div className='flex items-center gap-5'>
                <div className='px-5 py-5 bg-[#EA4C89] rounded-lg flex items-center justify-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <g clip-path="url(#clip0_1647_32443)">
    <path d="M0 12C0 9.82399 0.536016 7.81601 1.608 5.976C2.68001 4.13599 4.13602 2.68001 5.976 1.608C7.81601 0.535992 9.82402 0 12 0C14.176 0 16.184 0.535992 18.024 1.608C19.864 2.68001 21.32 4.13599 22.392 5.976C23.464 7.81601 24 9.82399 24 12C24 14.176 23.464 16.184 22.392 18.024C21.32 19.864 19.864 21.32 18.024 22.392C16.184 23.464 14.176 24 12 24C9.82402 24 7.81601 23.464 5.976 22.392C4.13602 21.32 2.68001 19.864 1.608 18.024C0.536016 16.184 0 14.176 0 12ZM1.992 12C1.992 14.496 2.832 16.696 4.512 18.6C5.28 17.096 6.49601 15.664 8.16 14.304C9.82402 12.944 11.448 12.088 13.032 11.736C12.792 11.176 12.56 10.672 12.336 10.224C9.58402 11.104 6.60802 11.544 3.408 11.544C2.784 11.544 2.32001 11.536 2.016 11.52C2.016 11.584 2.01202 11.664 2.004 11.76C1.99601 11.856 1.992 11.936 1.992 12ZM2.304 9.528C2.65601 9.55999 3.17602 9.576 3.864 9.576C6.53602 9.576 9.072 9.216 11.472 8.496C10.256 6.336 8.92001 4.536 7.464 3.096C6.20002 3.73601 5.11601 4.62401 4.212 5.76C3.30802 6.89599 2.67202 8.15201 2.304 9.528ZM5.88 19.896C7.68802 21.304 9.72802 22.008 12 22.008C13.184 22.008 14.36 21.784 15.528 21.336C15.208 18.6 14.584 15.952 13.656 13.392C12.184 13.712 10.7 14.52 9.204 15.816C7.70801 17.112 6.6 18.472 5.88 19.896ZM9.552 2.328C10.96 3.78401 12.264 5.59999 13.464 7.776C15.64 6.864 17.28 5.70401 18.384 4.296C16.528 2.76 14.4 1.992 12 1.992C11.184 1.992 10.368 2.10401 9.552 2.328ZM14.328 9.48C14.568 9.99199 14.84 10.64 15.144 11.424C16.328 11.312 17.616 11.256 19.008 11.256C20 11.256 20.984 11.28 21.96 11.328C21.832 9.15199 21.048 7.21601 19.608 5.52C18.568 7.07201 16.808 8.39201 14.328 9.48ZM15.744 13.104C16.56 15.472 17.112 17.904 17.4 20.4C18.664 19.584 19.696 18.536 20.496 17.256C21.296 15.976 21.776 14.592 21.936 13.104C20.768 13.024 19.704 12.984 18.744 12.984C17.864 12.984 16.864 13.024 15.744 13.104Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0_1647_32443">
      <rect width="24" height="24" fill="white"/>
    </clipPath>
  </defs>
</svg>
                </div>
                <div className='flex items-start flex-col gap-3'>
                    <div className='flex items-center gap-3'>
                    <h1 className='text-[#191F33] text-lg font-medium'>Dribble</h1>
                    <span className='text-[#E05151] bg-[#FCEEEE] px-2 py-1 rounded-full text-xs'>Featured</span>
                    </div>
                    <div className='flex items-center gap-3'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
  <path d="M15.75 7.5C15.75 12.75 9 17.25 9 17.25C9 17.25 2.25 12.75 2.25 7.5C2.25 5.70979 2.96116 3.9929 4.22703 2.72703C5.4929 1.46116 7.20979 0.75 9 0.75C10.7902 0.75 12.5071 1.46116 13.773 2.72703C15.0388 3.9929 15.75 5.70979 15.75 7.5Z" stroke="#939AAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z" stroke="#939AAD" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
<span className='text-[#939AAD] text-sm'>United States</span>
                    </div>
                </div>
            </div>
            <button className='w-full py-3 rounded-md text-[#0A65CC] bg-[#E7F0FA] font-medium'>
                Open Position
            </button>
        </div>
      </div>
    </div>
  )
}

export default TopCompanies