import React from "react";
import Marquee from "react-fast-marquee";

const Companies = () => {
  return (
    <div className="w-[90%] mx-auto bg-white py-10 flex flex-col items-start gap-5 font-inter my-10">
      <div className="flex flex-col items-start gap-2 mb-10 w-full">
        <h1 className="text-primary font-medium">Companies we helped</h1>
        <span className=" font-bold lg:text-3xl md:text-xl text-lg">
          Our Trusted Partners
        </span>
        <p className="text-[#737D8C] w-[60%] text-sm">
          We try to provide a better job experience
        </p>
      </div>
      <Marquee>
        <div className="w-full flex items-center gap-20 *:grayscale *:w-40">
          <img src="https://i.ibb.co/C79KYTg/logitech.png" alt="logitech.png" />
          <img src="https://i.ibb.co/TBh51x2/netflix.png" alt="netflix.png" />
          <img src="https://i.ibb.co/DKS67bk/samsung.png" alt="samsung.png" />
          <img src="https://i.ibb.co/nBcLnt3/spotify.png" alt="spotify.png" />
          <img src="https://i.ibb.co/2q0Grhq/pngwing-com-9.png" alt="amazon.png" className="mr-16"/>
        </div>
      </Marquee>
    </div>
  );
};

export default Companies;
