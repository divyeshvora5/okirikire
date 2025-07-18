"use client";

import { cn } from "@/lib/utils";
import { globalState } from "@/redux/reducer/globalSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";


const LEVEL = {
    0: "bg-[#1D9A8E]", // Red for level 0
    1: "bg-[#007CBA]", // Green for level 1
    2: "bg-[#F2545B]", // Blue for level 2
    3: "bg-[#F5A623]", // Yellow for level 3
};

const isLevelActive = (level, selectedLevel) => {
  if (Number(level) === Number(selectedLevel)) {
    return LEVEL[level];
  }

  return "bg-black";
}

const isInnerCircleFilled = (donationCount, index, selectedLevel) => {

  if (donationCount === null || selectedLevel === null || selectedLevel === "") {
    return "bg-black";
  }

  if (index <= donationCount) {
    return LEVEL[selectedLevel];
  }

  return "bg-black";
}


const arrowshow = (level, selectedLevel, donationCount) => {
  if (donationCount === null || selectedLevel === null || selectedLevel === "") {
    return "opacity-0"
  }

  if ((Number(level) === Number(selectedLevel)) && donationCount >= 9) {
    return "opacity-100"
  }

  return "opacity-0"
}

const CircleAnimation = () => {


  const { selectedLevelNo, levelDonationCount } = useSelector(globalState);

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step > 0 && step <= 13) {
      const timer = setTimeout(() => setStep((prev) => prev + 1), 400);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const isFilled = (target) => step >= target;
  const startAnimation = () => setStep(1);
  const resetAnimation = () => setStep(0);

  return (
    <div className="circle-animation-div relative w-[320px] sm:w-[530px] h-[265px] sm:h-[530px] mx-auto">
      {/* Top Circle */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
        <div className={`w-[80px] sm:w-[160px] h-[80px] sm:h-[160px] ${isLevelActive(0, selectedLevelNo)} text-white flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-2000 ease-in-out`}>
          1
        </div>
      </div>
      <div className={cn("absolute top-[12%] left-[20%] sm:left-[8%] w-[45px] sm:w-[90px] h-auto overflow-hidden", arrowshow(0, selectedLevelNo, levelDonationCount))}>
        <img
          src="/images/edge-arrow.svg"
          alt="Okirikiri Logo"
          className="w-full h-full object-contain object-center"
        />
      </div>
      {/* Right Circle */}
      <div className="absolute top-1/2 right-[30px] sm:right-0 transform -translate-y-1/2">
        <div className={`w-[80px] sm:w-[160px] h-[80px] sm:h-[160px] ${isLevelActive(1, selectedLevelNo)} text-white flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-2000 ease-in-out`}>
          2
        </div>
      </div>
      <div className={cn("absolute top-[12%] right-[20%] sm:right-[8%] w-[45px] sm:w-[90px] h-auto overflow-hidden transform rotate-[90deg]", arrowshow(1, selectedLevelNo, levelDonationCount))}>
        <img
          src="/images/edge-arrow.svg"
          alt="Okirikiri Logo"
          className="w-full h-full object-contain object-center"
        />
      </div>

      {/* Bottom Circle */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
        <div className={`w-[80px] sm:w-[160px] h-[80px] sm:h-[160px] ${isLevelActive(2, selectedLevelNo)} text-white flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-2000 ease-in-out`}>
          3
        </div>
      </div>
      <div className={cn("absolute bottom-[12%] right-[20%] sm:right-[8%] w-[45px] sm:w-[90px] h-auto overflow-hidden transform rotate-[180deg]", arrowshow(2, selectedLevelNo, levelDonationCount))}>
        <img
          src="/images/edge-arrow.svg"
          alt="Okirikiri Logo"
          className="w-full h-full object-contain object-center"
        />
      </div>

      {/* Left Circle */}
      <div className="absolute top-1/2 left-[30px] sm:left-0 transform -translate-y-1/2">
        <div className={`w-[80px] sm:w-[160px] h-[80px] sm:h-[160px] ${isLevelActive(3, selectedLevelNo)} text-white flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-2000 ease-in-out`}>
          4
        </div>
      </div>
      <div className={cn("absolute bottom-[12%] left-[20%] sm:left-[8%] w-[45px] sm:w-[90px] h-auto overflow-hidden transform rotate-[270deg]", arrowshow(3, selectedLevelNo, levelDonationCount))}>
        <img
          src="/images/edge-arrow.svg"
          alt="Okirikiri Logo"
          className="w-full h-full object-contain object-center"
        />
      </div>

      {/* Inner Grid */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 grid grid-cols-3 gap-0">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className={`w-[35px] sm:w-[70px] h-[35px] sm:h-[70px] ${isInnerCircleFilled(levelDonationCount, index + 1, selectedLevelNo)} text-white flex items-center justify-center rounded-full text-xs font-medium transition-colors duration-500 ease-in-out`}
          >
            {index + 1}
          </div>
        ))}
      </div>
      {/* Controls */}
      {/* <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
        <button onClick={startAnimation} className="bg-blue-600 text-white px-4 py-2 rounded text-xs">Start Animation</button>
        <button onClick={resetAnimation} className="bg-gray-500 text-white px-4 py-2 rounded text-xs">Reset</button>
      </div> */}
    </div>
  );
};

export default CircleAnimation;
