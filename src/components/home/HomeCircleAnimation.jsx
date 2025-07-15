"use client";

import { globalState } from "@/redux/reducer/globalSlice";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

// LEVEL constants for different color levels
const LEVEL = {
    0: "bg-[#1D9A8E]", // Red for level 0
    1: "bg-[#007CBA]", // Green for level 1
    2: "bg-[#F2545B]", // Blue for level 2
    3: "bg-[#F5A623]", // Yellow for level 3
};

const sleep = (ms) => new Promise((resolve) => setTimeout(() => {
    resolve()
}, ms))

const HomeCircleAnimation = () => {
    const { selectedLevelNo } = useSelector(globalState); // Use Redux state for selected level (if applicable)
    const [step, setStep] = useState(0); // To control the animation for each level
    const [level, setLevel] = useState(-1); // Track current level
    const [arrowOpacity, setArrowOpacity] = useState([0, 0, 0, 0]); // Store opacity for the arrows (hidden initially)
    const [completedLevel, setCompletedLevel] = useState([true, false, false, false])

    useEffect(() => {
        if (level < 0) return;
        let resetTimer;
        // Animate until the inner circles (1-9) complete
        if (step < 9) {
            const timer = setTimeout(() => setStep((prev) => prev + 1), 400);
            return () => clearTimeout(timer);
        } else if (step === 9 && level < 3) {
            // Proceed to next level after inner circle transition
            const nextLevelTimer = setTimeout(() => {
                setLevel(level + 1); // Go to the next level
                setStep(0); // Reset step for next level
                setArrowOpacity((prev) => {
                    const updated = [...prev];
                    updated[level] = 1; // Show the arrow after level animation completes
                    return updated;
                });
            }, 400); // Delay to start next level
            return () => clearTimeout(nextLevelTimer);
        } else if (level === 3) {
            // Final level (Level 4) - show the last arrow
            setArrowOpacity((prev) => {
                const updated = [...prev];
                updated[3] = 1; // Top-left arrow should appear last
                return updated;
            });

            (async () => {
                await sleep(500); // Wait for 2 seconds
                resetTimer = setTimeout(() => {
                    setLevel(-1); // Reset to first level
                    setStep(0); // Reset the inner circle transition step
                    setArrowOpacity([0, 0, 0, 0]); // Reset all arrows to be hidden
                }, 400); // Delay to restart the animation loop
            })()
        }
        return () => clearTimeout(resetTimer);
    }, [step, level]);

    useEffect(() => {
        if (level !== -1) return;
        (async () => {
            await sleep(300);
            setLevel(0)
        })()
    }, [level])

    const isFilled = (target) => step >= target; // Check if step has passed a certain target
    const getColorForLevel = (level) => LEVEL[level] || "bg-black"; // Default to black if no level found

    return (
        <div className="circle-animation-div relative w-[320px] sm:w-[530px] h-[265px] sm:h-[530px] mx-auto">
            {/* Top Circle */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <div
                    className={`w-[80px] sm:w-[160px] h-[80px] sm:h-[160px] ${level >= 0 && level <= 3 ? LEVEL[0] : "bg-black"} text-white flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-2000 ease-in-out`}
                >
                    1
                </div>
            </div>
            <div
                className="absolute top-[12%] right-[20%] sm:right-[8%] w-[45px] sm:w-[90px] h-auto overflow-hidden"
                style={{ opacity: arrowOpacity[0], transition: "opacity 2s ease-in-out", transform: "rotate(90deg)" }}
            >
                <img
                    src="/images/edge-arrow.svg"
                    alt="Okirikiri Logo"
                    className="w-full h-full object-contain object-center"
                />
            </div>

            {/* Right Circle */}
            <div className="absolute top-1/2 right-[30px] sm:right-0 transform -translate-y-1/2">
                <div
                    className={`w-[80px] sm:w-[160px] h-[80px] sm:h-[160px] ${level > 0 && level <= 3 ? LEVEL[1] : "bg-black"} text-white flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-2000 ease-in-out`}
                >
                    2
                </div>
            </div>
            <div className="absolute bottom-[12%] right-[20%] sm:right-[8%] w-[45px] sm:w-[90px] h-auto overflow-hidden transform rotate-[180deg]"
                style={{ opacity: arrowOpacity[1], transition: "opacity 2s ease-in-out" }}>
                <img
                    src="/images/edge-arrow.svg"
                    alt="Okirikiri Logo"
                    className="w-full h-full object-contain object-center"
                />
            </div>

            {/* Bottom Circle */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div
                    className={`w-[80px] sm:w-[160px] h-[80px] sm:h-[160px] ${level > 1 && level <= 3 ? LEVEL[2] : "bg-black"} text-white flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-2000 ease-in-out`}
                >
                    3
                </div>
            </div>
            <div className="absolute bottom-[12%] left-[20%] sm:left-[8%] w-[45px] sm:w-[90px] h-auto overflow-hidden transform rotate-[270deg]"
                style={{ opacity: arrowOpacity[2], transition: "opacity 2s ease-in-out" }}>
                <img
                    src="/images/edge-arrow.svg"
                    alt="Okirikiri Logo"
                    className="w-full h-full object-contain object-center"
                />
            </div>

            {/* Left Circle */}
            <div className="absolute top-1/2 left-[30px] sm:left-0 transform -translate-y-1/2">
                <div
                    className={`w-[80px] sm:w-[160px] h-[80px] sm:h-[160px] ${level > 2 && level === 3 ? LEVEL[3] : "bg-black"} text-white flex items-center justify-center rounded-full text-sm font-medium transition-colors duration-2000 ease-in-out`}
                >
                    4
                </div>
            </div>
            <div className="absolute top-[12%] left-[20%] sm:left-[8%] w-[45px] sm:w-[90px] h-auto overflow-hidden transform rotate-[360deg]"
                style={{ opacity: arrowOpacity[3], transition: "opacity 2s ease-in-out" }}>
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
                        className={`w-[35px] sm:w-[70px] h-[35px] sm:h-[70px] ${isFilled(index + 1) && level === 0 ? LEVEL[0] :
                            (isFilled(index + 1) && level === 1 ? LEVEL[1] :
                                (isFilled(index + 1) && level === 2 ? LEVEL[2] :
                                    (isFilled(index + 1) && level === 3 ? LEVEL[3] : "bg-black")))} text-white flex items-center justify-center rounded-full text-xs font-medium transition-colors duration-500 ease-in-out`}
                    >
                        {index + 1}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomeCircleAnimation;
