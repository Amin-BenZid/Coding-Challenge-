import React from "react";
import img from "./img/cactus_img.jpg";

const One = () => {
  return (
    <div className=" p-16">
      <div className="w-auto h-auto lg:w-[386px] lg:h-[400px] md:w-[386px] md:h-[400px] sm:w-[386px] sm:h-[400px] rounded-2xl shadow-2xl transition-all">
        <img src={img} className="p-[16px] rounded-3xl" />
        <div className=" bg-[#E6D6FC] w-[80px] h-6 ml-[16px] rounded-3xl text-[12px] text-center pt-[2px] text-[#883AE1] font-bold">
          Design
        </div>
        <div className="p-[16px] pb-[20px]">
          <div>
            <h1 className="font-bold text-lg">Embracing Minimalism</h1>
          </div>
          <div className="pt-[6px]">
            <p className=" text-sm text-gray-500">
              From minimalist sculptures to minimalist paintings, this blog will inspire
              you to apprecate the beaty that list in simplicity.
            </p>
          </div>
        </div>
        <div className="w-full h-[1px] bg-slate-300 "></div>
        <div>
          <p className="pl-[16px] pt-[20px] text-[11px] text-gray-500">Annie Spratt</p>
        </div>
      </div>
    </div>
  );
};

export default One;
