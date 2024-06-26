import React, { useRef } from 'react';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import 'swiper/css';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const reviews = () => {

  const reviews = [
    {
      text: "“Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.”",
      name: "Shejan Mahamud",
      role: "UI/UX Designer",
      image: "https://i.ibb.co/Jm86LQz/vicky-hladynets-C8-Ta0gw-Pb-Qg-unsplash.jpg"
    },
    {
      text: "“Ut ullamcorper hendrerit tempor. Aliquam in rutrum dui. Maecenas ac placerat metus, in faucibus est.”",
      name: "Shejan Mahamud",
      role: "UI/UX Designer",
      image: "https://i.ibb.co/Jm86LQz/vicky-hladynets-C8-Ta0gw-Pb-Qg-unsplash.jpg"
    },
    // Add more reviews here if needed
  ];

  const prevRef = useRef(null);
  const nextRef = useRef(null);



  return (
    <div className="w-[90%] mx-auto my-28 flex flex-col lg:flex-row md:flex-row items-center justify-between bg-[url('https://gist.github.com/ShejanMahamud/422c700fd689df95ca29cc335e2311d2/raw/850f1729a61dc67e6ebd136203a50dd3070e3e17/gradient.svg')] bg-no-repeat bg-center ">
      <div className="flex flex-col items-start gap-2 mb-10 w-full">
        <h1 className="text-primary font-medium">Reviews</h1>
        <span className=" font-bold lg:text-3xl md:text-xl text-lg">
          Look What Our Customers Say!
        </span>
        <p className="text-[#737D8C] w-[60%] text-sm">
          Explore what people saying about our services
        </p>
        <div className='flex items-center gap-5 mt-10'>
          <button ref={prevRef} className='border border-primary rounded-full p-2 text-primary text-2xl'>
            <IoIosArrowRoundBack />
          </button>
          <button ref={nextRef} className='border border-primary rounded-full p-2 text-primary text-2xl'>
            <IoIosArrowRoundForward />
          </button>
        </div>
      </div>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        slidesPerView={1}
        className='lg:w-[50%] w-[90%] p-4'
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <div className='w-full flex flex-col items-start gap-5 bg-white px-5 py-5 rounded-lg shadow-lg'>
              <div className='flex items-center gap-1'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                    <path d="M12.9241 4.51345C13.3643 3.62165 14.636 3.62165 15.0762 4.51345L17.3262 9.07174C17.5009 9.42555 17.8383 9.6709 18.2287 9.72797L23.2623 10.4637C24.2462 10.6075 24.6383 11.8169 23.926 12.5107L20.2856 16.0564C20.0026 16.3321 19.8734 16.7295 19.9402 17.1189L20.7991 22.1266C20.9672 23.107 19.9382 23.8546 19.0578 23.3916L14.5587 21.0256C14.209 20.8417 13.7913 20.8417 13.4416 21.0256L8.94252 23.3916C8.06217 23.8546 7.03311 23.107 7.20125 22.1266L8.06013 17.1189C8.12693 16.7295 7.99773 16.3321 7.71468 16.0564L4.07431 12.5107C3.362 11.8169 3.75414 10.6075 4.73804 10.4637L9.7716 9.72797C10.162 9.6709 10.4995 9.42555 10.6741 9.07174L12.9241 4.51345Z" fill="#FFAA00"/>
                  </svg>
                ))}
              </div>
              <p className='text-[#464D61]'>{review.text}</p>
              <div className='w-full flex items-center justify-between mt-8'>
                <div className='flex items-center gap-2'>
                  <img src={review.image} alt="avatar.png" className='w-12 rounded-full h-12 object-cover'/>
                  <div className='flex flex-col items-start'>
                    <h1 className='text-[#191F33] font-medium'>{review.name}</h1>
                    <p className='text-[#767E94] text-sm'>{review.role}</p>
                  </div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M22 34C22 36.1217 21.1571 38.1566 19.6569 39.6569C18.1566 41.1571 16.1217 42 14 42C11.8783 42 9.84344 41.1571 8.34315 39.6569C6.84285 38.1566 6 36.1217 6 34C6 29.58 14 6 14 6H18L14 26C16.1217 26 18.1566 26.8429 19.6569 28.3431C21.1571 29.8434 22 31.8783 22 34ZM42 34C42 36.1217 41.1571 38.1566 39.6569 39.6569C38.1566 41.1571 36.1217 42 34 42C31.8783 42 29.8434 41.1571 28.3431 39.6569C26.8429 38.1566 26 36.1217 26 34C26 29.58 34 6 34 6H38L34 26C36.1217 26 38.1566 26.8429 39.6569 28.3431C41.1571 29.8434 42 31.8783 42 34Z" fill="#DADDE6"/>
                </svg>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default reviews;