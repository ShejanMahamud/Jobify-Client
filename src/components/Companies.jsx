import React from "react";
import Marquee from "react-fast-marquee";

const Companies = () => {
  return (
    <div className="w-full bg-white py-10 flex flex-col items-start gap-5 px-10 font-inter my-10">
      <h1 className="font-medium text-lg text-[#202430] opacity-80 mb-5">Companies we helped grow</h1>
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
