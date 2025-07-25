"use client"
import BannerSection from "@/components/home/BannerSection";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useDispatch, useSelector } from "react-redux";
import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { globalState } from "@/redux/reducer/globalSlice";
import { useCallback, useMemo } from "react";
import { MINI_PATH, PATH_WITH_LEVEL, STANDARD_PATH } from "@/utils/constants";
import { donateAction } from "@/redux/actions/globalAction";
import { useEffect, useState } from 'react';
import CircleAnimation from "@/components/home/CircleAnimation";
import ContectUsForm from "@/components/home/ContectUsForm";
import NewsLatter from "@/components/home/NewsLatter";
import HomeCircleAnimation from "@/components/home/HomeCircleAnimation";
import { cn } from "@/lib/utils";

export default function Home() {



    const dispatch = useDispatch();
    const { wallet, chain, signMessage } = useActiveWeb3React();
    const { contractLoading, globalPath } = useSelector(globalState);


    const [active, setActive] = useState("IM")


    const handleDonate = useCallback(
        (path = MINI_PATH) => {
            if (contractLoading) return;
            dispatch(
                donateAction({
                    path: path,
                    wallet,
                    chain,
                    signMessage,
                }),
            );
        },
        [contractLoading, dispatch, wallet, chain, signMessage],
    );
    return (
        <>
            {/* <BannerSection /> */}
            <section className="pt-[50px] md:pt-[60px] lg:pt-[70px] xl:pt-[80px] pb-[50px] sm:pb-[60px] md:pb-[70px] lg:pb-[80px] xl:pb-[90px] px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
                <div className="flex justify-center items-center flex-col">
                    <h2 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[100%] uppercase text-center font-medium tracking-[1px] mb-[30px]">Join OKIRIKIRI: The Circular Protocol That Can Change the World</h2>
                    <div className="w-[320px] h-[auto] overflow-hidden mb-[30px]">
                        <img
                            src="/images/okirikiri-banner-image.png"
                            alt="Okirikiri Logo"
                            className="w-full h-full object-contain object-center"
                        />
                    </div>
                    <p className="max-w-[870px] w-full text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] tracking-[1px] text-center text-black">
                        OKIRIKIRI is a decentralized protocol based on voluntary donations, promoting a
                        democratic circular economy. It is powered by transparent smart contracts on the
                        blockchain—automatic, fair, and open to everyone.
                    </p>
                </div>
            </section>
            <section className="py-[50px] md:py-[60px] lg:py-[70px] xl:py-[80px] px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
                <h2 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[100%] uppercase text-center font-medium tracking-[1px] mb-[50px]">Choose Your Path and Reserve Your Spot in the Okirikiri Process</h2>
                <div className="flex flex-col md:flex-row items-stretch m-0 md:m-[-12px]">
                    <div className="max-w-full md:max-w-1/2 basis-full md:basis-1/2 p-[6px] md:p-[8px] lg:p-[10px] xl:p-[12px]">
                        <div className="bg-[#F4F4F4] rounded-[21px] px-[40px] pt-[50px] pb-[40px] text-center h-full okiri-spot-selection-box flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center mb-[18px] text-black">MINI PATH – 25 USDT</h3>
                                <p className="font-medium text-base md:text-lg lg:text-xl xl:text-2xl leading-[25px] sm:leading-[30px] md:leading-[35px] lg:leading-[40px] xl:leading-[45px] mb-[60px] text-center">Start small, grow big</p>
                            </div>
                            <Button
                                onClick={() => handleDonate(MINI_PATH)}
                                disabled={contractLoading}
                                className="w-full text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white tracking-[1px] rounded-[100px] font-normal cursor-pointer flex items-center justify-center text-center py-4 min-h-[50px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[80px]"
                            >
                                Donate Now
                            </Button>
                        </div>
                    </div>
                    <div className="max-w-full md:max-w-1/2 basis-full md:basis-1/2 p-[6px] md:p-[8px] lg:p-[10px] xl:p-[12px]">
                        <div className="bg-[#F4F4F4] rounded-[21px] px-[40px] pt-[50px] pb-[40px] h-full text-center okiri-spot-selection-box flex flex-col justify-between">
                            <div>
                                <h3 className="font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center mb-[18px] text-black">STANDARD PATH – 250 USDT</h3>
                                <div className="relative">
                                    <p className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl leading-[25px] sm:leading-[30px] md:leading-[35px] lg:leading-[40px] xl:leading-[45px] mb-[60px] text-center flex justify-center items-center standard-path-text text-[#CD1A1A]">The full journey, up to 201,875 USDT
                                        <div className="clearfix">
                                            <i className="w-[25px] h-auto overflow-hidden block ml-[6px]">
                                                <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.2391 5.68648C7.04029 5.28108 6.86067 4.87525 6.70021 4.46368C6.45929 3.84638 6.30229 3.19887 6.09541 2.57145C6.00743 2.30534 5.76717 1.61478 5.75018 1.51023C5.60678 0.59777 6.27512 0.252931 6.47515 0.16737C6.57109 0.123189 7.56596 -0.297772 8.12727 0.777503C8.81448 2.09196 9.31945 3.47101 9.6322 4.87591C10.2049 5.97911 10.9359 7.03 11.7574 7.934C15.0255 11.5291 18.9973 10.792 23.1578 9.51341C23.7965 9.31308 24.479 9.65819 24.7021 10.286C24.9267 10.9186 24.6145 11.6168 23.9929 11.8642C21.7279 12.7829 18.1465 15.8831 17.2948 18.2552C17.1168 18.7517 17.235 19.7865 17.2913 20.8188C17.3678 22.2522 17.3791 23.6893 17.1162 24.3729C17.0776 24.4783 16.5588 25.5929 16.3642 25.7916C15.8954 26.265 15.3943 26.2209 15.0912 26.1335C14.7881 26.0462 14.4043 25.8106 14.131 25.3125C13.8453 24.792 13.6077 23.6205 13.5162 23.3815C13.1844 22.5146 12.4895 20.8267 11.6827 19.4382C11.248 18.6906 10.819 18.0092 10.3649 17.7423C8.68402 16.7546 6.7059 17.5619 5.05666 18.2975C4.86671 18.38 4.67818 18.4674 4.4887 18.5498C3.85133 18.9637 3.15509 19.3377 2.39814 19.6619C1.25553 20.1529 0.737248 19.1223 0.705315 19.0535C0.636213 18.9018 0.311864 18.111 1.10733 17.5196C1.19469 17.4571 1.86599 17.0853 2.12414 16.9407C2.48402 16.7398 2.85392 16.5568 3.22669 16.3781C6.89514 13.9201 8.0412 9.73812 7.2391 5.68648ZM9.92223 9.63302C12.3861 12.3347 15.1551 13.1712 18.1052 13.0457L18.1047 13.0458C16.6575 14.4521 15.4321 16.0376 14.9409 17.4102C14.7541 17.9302 14.7216 18.874 14.7487 19.915C14.3416 19.0601 13.868 18.1622 13.3749 17.4216C12.813 16.5761 12.1994 15.9183 11.6338 15.5854C10.5424 14.9443 9.35695 14.7592 8.16742 14.8467C9.15223 13.2648 9.7269 11.4865 9.92223 9.63302Z" fill="#CD1A1A" />
                                                </svg>
                                            </i>
                                        </div>
                                    </p>
                                    <div className="w-full sm:w-[280px] h-auto overflow-hidden absolute bottom-[-20px] left-0 right-0 m-auto okiri-line-image-wrapper standard-path-bottom-image-wrapper">
                                        <svg width="281" height="21" viewBox="0 0 281 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 19C57.0548 8.34266 186.236 -9.22896 280 11.9817" stroke="#CD1A1A" strokeWidth="3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <Button
                                onClick={() => handleDonate(STANDARD_PATH)}
                                disabled={contractLoading}
                                className="w-full text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white tracking-[1px] rounded-[100px] font-normal cursor-pointer flex items-center justify-center text-center py-4 min-h-[50px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[80px]"
                            >
                                Donate Now
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
            <section className="pb-[80px] px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
                <h3 className="font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center mb-[70px] text-black">IT’S EASY – JUST 3 SIMPLE STEPS TO UNLOCK OKIRIKIRI</h3>
                <div className="flex flex-col lg:flex-row justify-between items-start">
                    <div className="w-full lg:w-1/2 mb-[30px] lg:mb-0">
                        <div className="okiri-accordion-main-div">
                            <Accordion
                                type="single"
                                collapsible
                                className="w-full accordion-inner-div"
                                defaultValue="item-1"
                            >
                                <AccordionItem value="item-1" className="accordion-item-div">
                                    <AccordionTrigger className="accordion-title-div">1.Start</AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance pb-[30px]">
                                        <p className="font-normal text-base md:text-lg lg:text-xl leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] text-black">
                                            Make <span className="font-semibold">just one donation</span> (starting from <span className="font-semibold">25 USDT</span> or <span className="font-semibold">250 USDT) </span>
                                            to <span className="font-semibold">reserve your spot</span> and become <span className="font-semibold">Master Receiver 1.</span>
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-2" className="accordion-item-div">
                                    <AccordionTrigger className="accordion-title-div">2.Share</AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance">
                                        <p className="font-normal text-base md:text-lg lg:text-xl leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] text-black">
                                            Tell your friends and network.
                                            The protocol will automatically assign you <span className="font-semibold"> 90% of the next 9 donations</span> made globally after yours – in strict chronological order.
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                                <AccordionItem value="item-3" className="accordion-item-div">
                                    <AccordionTrigger className="accordion-title-div">3.Store Up</AccordionTrigger>
                                    <AccordionContent className="flex flex-col gap-4 text-balance">
                                        <p className="font-normal text-base md:text-lg lg:text-xl leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] text-black">
                                            Watch your donations grow.
                                            Once your 9 spots are filled, you can  <span className="font-semibold">withdraw your earnings</span> or reinvest to move to the next level.
                                            <span className="font-semibold">No obligation. You're always in control.</span>
                                        </p>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        </div>
                    </div>
                    <div className="flex-1 ml-auto lg:ml-[30px] flex lg:block mr-auto lg:mr-0">
                        <div className="pt-[50px]">
                            <div className="relative w-full sm:w-[520px] h-[480px] mx-auto">
                                {/* Outer Ring */}
                                <div className="absolute top-[30px] left-[50%] translate-x-[-50%] w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border-[30px] border-[#F8F8F8]"></div>

                                {/* Center Logo */}
                                <div className="absolute top-[10%] sm:top-1/2 left-1/2 transform -translate-x-[40%] sm:-translate-x-1/2 -translate-y-[-240%] sm:-translate-y-1/2 w-[50px] sm:w-[unset]">
                                    <img
                                        src="/images/multiple-dots-image.svg"
                                        alt="center logo"
                                        className="w-[50px] sm:w-[100px] h-[50px] sm:h-[100px]"
                                    />
                                </div>

                                {/* Step 01 - Top */}
                                <div className="absolute top-[-8%] left-1/2 transform -translate-x-1/2">
                                    {/* Desktop hover */}
                                    <div className="hidden sm:flex group flex-col items-center justify-center w-[120px] sm:w-[180px] h-[120px] sm:h-[180px]
                                        rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white
                                        transition-all duration-300 ease-in-out hover:ring-4 hover:ring-[#D1D5DB] hover:scale-105">
                                        <div className="bg-[#F8F8F8] w-[70px] sm:w-[130px] h-[70px] sm:h-[130px] rounded-full flex flex-col justify-center text-center transition-all duration-300 ease-in-out group-hover:bg-[#e0e0e0]">
                                            <div className="text-xl sm:text-3xl font-semibold text-black group-hover:text-blue-600">01</div>
                                            <div className="text-base sm:text-xl font-semibold text-black group-hover:text-blue-600">Start</div>
                                        </div>
                                    </div>
                                    {/* Mobile auto animate */}
                                    <div className="flex sm:hidden mobile-step1 flex-col items-center justify-center w-[120px] h-[120px]
                                        rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white">
                                        <div className="bg-[#e0e0e0] w-[70px] h-[70px] rounded-full flex flex-col justify-center text-center">
                                            <div className="text-xl font-semibold text-blue-600">01</div>
                                            <div className="text-sm font-semibold text-blue-600">Start</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 02 - Bottom Right */}
                                <div className="absolute right-[100px] sm:right-[15%] bottom-[70px] sm:bottom-[unset] sm:top-[70%] transform translate-x-1/2 -translate-y-1/2">
                                    {/* Desktop hover */}
                                    <div className="hidden sm:flex group flex-col items-center justify-center w-[120px] sm:w-[180px] h-[120px] sm:h-[180px]
                                        rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white
                                        transition-all duration-300 ease-in-out hover:ring-4 hover:ring-[#D1D5DB] hover:scale-105">
                                        <div className="bg-[#F8F8F8] w-[70px] sm:w-[130px] h-[70px] sm:h-[130px] rounded-full flex flex-col justify-center text-center transition-all duration-300 ease-in-out group-hover:bg-[#e0e0e0]">
                                            <div className="text-xl sm:text-3xl font-semibold text-black group-hover:text-blue-600">02</div>
                                            <div className="text-base sm:text-xl font-semibold text-black group-hover:text-blue-600">Share</div>
                                        </div>
                                    </div>
                                    {/* Mobile auto animate */}
                                    <div className="flex sm:hidden mobile-step2 flex-col items-center justify-center w-[120px] h-[120px]
                                        rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white">
                                        <div className="bg-[#e0e0e0] w-[70px] h-[70px] rounded-full flex flex-col justify-center text-center">
                                            <div className="text-xl font-semibold text-blue-600">03</div>
                                            <div className="text-sm font-semibold text-blue-600">Store Up</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 03 - Bottom Left */}
                                <div className="absolute left-[100px] sm:left-[15%] bottom-[70px] sm:bottom-[unset] sm:top-[70%] transform -translate-x-1/2 -translate-y-1/2">
                                    {/* Desktop hover */}
                                    <div className="hidden sm:flex group flex-col items-center justify-center w-[120px] sm:w-[180px] h-[120px] sm:h-[180px]
                                        rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white
                                        transition-all duration-300 ease-in-out hover:ring-4 hover:ring-[#D1D5DB] hover:scale-105">
                                        <div className="bg-[#F8F8F8] w-[70px] sm:w-[130px] h-[70px] sm:h-[130px] rounded-full flex flex-col justify-center text-center transition-all duration-300 ease-in-out group-hover:bg-[#e0e0e0]">
                                            <div className="text-xl sm:text-3xl font-semibold text-black group-hover:text-blue-600">03</div>
                                            <div className="text-base sm:text-xl font-semibold text-black group-hover:text-blue-600">Store Up</div>
                                        </div>
                                    </div>
                                    {/* Mobile auto animate */}
                                    <div className="flex sm:hidden mobile-step3 flex-col items-center justify-center w-[120px] h-[120px]
                                        rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white">
                                        <div className="bg-[#e0e0e0] w-[70px] h-[70px] rounded-full flex flex-col justify-center text-center">
                                            <div className="text-xl font-semibold text-blue-600">02</div>
                                            <div className="text-sm font-semibold text-blue-600">Share</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-black p-[12px] rounded-[20px] mt-0 sm:mt-[20px] md:mt-[40px] lg:mt-[60px] xl:mt-[80px] flex flex-col sm:flex-row items-center relative">
                    <div className="w-full sm:w-[300px] h-[135px] bg-white rounded-[10px] mb-[24px] sm:mb-0 mr-0 sm:mr-[24px] flex justify-center items-center">
                        <div className="w-[264px] h-[90px] oveflow-hidden">
                            <img
                                src="/images/okirikiri-footer-logo.png"
                                alt="Okirikiri Logo"
                                className="w-full h-full object-contain object-center"
                            />
                        </div>
                    </div>
                    <p className="font-semibold text-sm md:text-base lg:text-lg xl:text-xl leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] text-white max-w-full sm:max-w-[56%]">
                        If you follow the Okirikiri process to the end of the fourth level you will have collected
                        approximately $201,875 and can always start again whenever you want, reserving your
                        spot to become Master Receiver 1 again.
                    </p>
                    <div className="absolute top-[unset] sm:top-[20px] bottom-0 sm:bottom-unset right-[20px] w-[58px] h-[68px] overflow-hidden">
                        <img
                            src="/images/diamond-shape-icon.svg"
                            alt="Okirikiri Logo"
                            className="w-full h-full object-contain object-center"
                        />
                    </div>
                </div>
            </section>
            <section
                className="py-[60px] px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px] about-section-wrapper relative"
                id="about"
            >
                <h3 className="font-medium text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center mb-[30px] text-black">WHY OKIRIKIRI?</h3>
                <div className="max-w-[1050px] m-auto">
                    <p className="text-black font-normal text-base md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] mb-[18px] text-center">In <span className="font-semibold">Igbo</span>, Okirikiri means <span className="font-semibold">“circle”</span> — a symbol of continuity, balance, and shared abundance.</p>
                    <p className="text-black font-normal text-base md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] mb-[18px] text-center">Okirikiri is more than a platform. It’s a <span className="font-semibold">decentralized donation protocol</span> designed to break the logic of financial
                        control and restore the natural flow of wealth among people — without banks, intermediaries, or hierarchies.</p>
                    <p className="text-black font-normal text-base md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] mb-[18px] text-center">Everyone starts with just one voluntary donation. From there, a <span className="font-semibold">transparent smart contract</span> activates a circular
                        process where <span className="font-semibold">giving opens the door to receiving</span>, and anyone can benefit in the same way — fairly, chronologically, and freely.</p>
                    <p className="text-black font-normal text-base md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] text-center">Because money should unite, not divide. And life is too short not to be lived fully.</p>
                </div>
                <div className="absolute top-[24px] right-[26px] overflow-hidden w-[58px] h-[68px]">
                    <img
                        src="/images/grey-diamond-shape-image.svg"
                        alt="Okirikiri Logo"
                        className="w-full h-full object-contain object-center"
                    />
                </div>
            </section>
            <section
                className="px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px] py-[30px] sm:py-[40px] md:py-[50px] lg:py-[60px] xl:py-[70px]"
                id="how-it-works"
            >
                <h3 className="font-medium text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center mb-[30px] text-black">How It Works</h3>
                <div className="flex items-center flex-col xl:flex-row">
                    <div className="w-full xl:w-1/2 mb-[30px] xl:mb-0">
                        <HomeCircleAnimation />

                    </div>
                    <div className="flex-1 px-[15px] sm:px-0">
                        <div>
                            <p className="text-black font-normal text-base md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] mb-[30px]">With <span className="font-semibold">one initial donation per wallet,</span> you can activate a
                                position in the OKIRIKIRI protocol and start receiving 90%
                                of the donations made by the next 9 users who enter the
                                system after you.</p>
                            <p className="font-semibold text-sm md:text-base lg:text-lg leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px] text-black mb-[8px]">At the end of each of the 4 levels, you will have complete freedom to:</p>
                            <div className="">
                                <p className="font-bold text-sm sm:text-base leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] text-black mb-[2px]">1. Withdraw the donations collected (subject to a 10% fee), or</p>
                                <p className="font-bold text-sm sm:text-base leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] text-black">2. Reinvest part of your collected donations to move up to the next level</p>
                            </div>
                            <p className="font-normal leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px]  text-sm md:text-base lg:text-lg text-black">You decide. No obligation to continue beyond any level.</p>
                            <p className="font-bold leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px]  text-sm md:text-base lg:text-lg text-black">Note: You can only participate with one wallet and one donation at a time. You must complete each level to move to the next. </p>
                        </div>
                    </div>
                </div>
                <div className="how-it-works-main-box-div p-[12px] rounded-[20px] mt-[20px] mb-[55px] flex flex-col sm:flex-row items-center relative">
                    <div className="w-full sm:w-[300px] h-[125px] bg-white rounded-[10px] mb-[24px] sm:mb-0 mr-0 sm:mr-[24px] flex justify-center items-center">
                        <div className="w-[264px] h-[90px] oveflow-hidden">
                            <img
                                src="/images/okirikiri-footer-logo.png"
                                alt="Okirikiri Logo"
                                className="w-full h-full object-contain object-center"
                            />
                        </div>
                    </div>
                    <div>
                        <h4 className="text-[18px] md:text-[22px] lg:text-[26px] xl:text-[30px] font-bold leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] tracking-[1px] text-black mb-[12px]">
                            201,875 USDT
                        </h4>
                        <p className="font-semibold text-sm sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[30px] sm:leading-[34px] md:leading-[38px] lg:leading-[42px] xl:leading-[46px] text-black">
                            Donation Automatically Collected at the end of the OKIRIKIRI Process
                        </p>
                    </div>
                    <div className="absolute top-[unset] sm:top-[20px] bottom-0 sm:bottom-unset right-[20px] w-[58px] h-[68px] overflow-hidden">
                        <img
                            src="/images/grey-diamond-shape-image.svg"
                            alt="Okirikiri Logo"
                            className="w-full h-full object-contain object-center"
                        />
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-stretch m-0 md:m-[-12px]">
                    <div className="max-w-full md:max-w-1/3 basis-full md:basis-1/3 p-[12px]">
                        <div className="bg-[#F4F4F4] rounded-[20px] px-[12px] md:px-[14px] lg:px-[16px] xl:px-[18px] py-[22px] md:py-[26px] lg:py-[30px] xl:py-[34px] okiri-donate-box-wrapper h-full flex flex-col justify-between">
                            <div className="mb-[35px]">
                                <p className="mb-[18px] font-medium text-sm md:text-base lg:text-lg leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[24px] xl:leading-[26px] text-black">
                                    At the end of each of the 4 levels you will have the freedom to exit the process and you can always reserve your slot to return to being Master Receiver 1.
                                </p>
                                <p className="font-medium text-sm md:text-base lg:text-lg leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[24px] xl:leading-[26px] text-black">
                                    Each wallet can reserve only one spot in the Okirikiri system.
                                </p>
                            </div>
                            <Link href="/" className="font-bold text-base leading-[100%] text-black uppercase flex items-center donate-btn-wrapper">
                                DONATE NOW
                                <i className="block w-[16px] h-[16px] overflow-hidden ml-[6px]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_180_463)">
                                            <path d="M12.5082 11.5016C12.6433 11.5027 12.7733 11.4502 12.8697 11.3556L15.8535 8.36421C15.9473 8.27042 15.9999 8.14335 15.9999 8.01077C15.9999 7.8782 15.9473 7.75099 15.8535 7.65721L12.8537 4.64996C12.7837 4.57942 12.6944 4.53126 12.597 4.51171C12.4996 4.49217 12.3985 4.50213 12.3068 4.54022C12.215 4.57832 12.1367 4.64281 12.0818 4.7256C12.0269 4.80839 11.9979 4.90574 11.9984 5.00509V6.30179H6.49891C6.36635 6.30208 6.2393 6.3549 6.14556 6.44864C6.05183 6.54237 5.99904 6.66938 5.99876 6.80194V8.84847C5.99876 9.12467 6.22271 9.34851 6.49891 9.34744H12.007V11.0037C12.008 11.2767 12.2267 11.4974 12.4997 11.5016H12.5082ZM4.5079 9.35929C4.78517 9.35929 5.00699 9.12886 5.00272 8.85159V6.80415C5.01125 6.12804 3.99389 6.12804 4.00242 6.80415V8.85159C4.00141 8.91853 4.01386 8.98508 4.03901 9.04712C4.06416 9.10916 4.10152 9.1655 4.14885 9.21284C4.19619 9.26018 4.25255 9.29756 4.3146 9.32271C4.37664 9.34786 4.4431 9.3603 4.51004 9.35929H4.5079ZM2.50837 9.35929C2.57417 9.35874 2.63922 9.34509 2.69972 9.31919C2.76022 9.2933 2.81498 9.25564 2.86082 9.20841C2.90665 9.16119 2.94265 9.10538 2.96673 9.04413C2.9908 8.98288 3.00247 8.91739 3.00105 8.85159V6.80415C3.00958 6.12804 1.99222 6.12804 2.00075 6.80415V8.85159C1.99974 8.91853 2.01219 8.98508 2.03734 9.04712C2.06249 9.10916 2.09985 9.1655 2.14718 9.21284C2.19452 9.26018 2.25088 9.29756 2.31293 9.32271C2.37497 9.34786 2.44143 9.3603 2.50837 9.35929ZM0.508829 9.35929C0.574637 9.35874 0.63968 9.34509 0.700184 9.31919C0.760687 9.2933 0.815446 9.25564 0.861281 9.20841C0.907116 9.16119 0.943115 9.10538 0.967188 9.04413C0.991262 8.98288 1.00293 8.91739 1.00152 8.85159V6.80415C1.00578 6.13231 -0.00518542 6.13231 -0.00091974 6.80415V8.85159C-0.00193019 8.91863 0.010545 8.98514 0.0357645 9.04725C0.0609839 9.10937 0.0984329 9.16588 0.145886 9.21323C0.193338 9.26058 0.249826 9.29788 0.311993 9.32297C0.374159 9.34806 0.441801 9.36044 0.508829 9.35929Z" fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_180_463">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </i>
                            </Link>
                        </div>
                    </div>
                    <div className="max-w-full md:max-w-1/3 basis-full md:basis-1/3 p-[12px]">
                        <div className="bg-[#F4F4F4] rounded-[20px] px-[12px] md:px-[14px] lg:px-[16px] xl:px-[18px] py-[22px] md:py-[26px] lg:py-[30px] xl:py-[34px] okiri-donate-box-wrapper h-full flex flex-col justify-between">
                            <div className="mb-[35px]">
                                <p className="mb-[18px] font-medium text-sm md:text-base lg:text-lg leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[24px] xl:leading-[26px] text-black">
                                    No one can join the process by reserving a place in different levels in the OKIRIKIRI protocol.
                                </p>
                                <p className="font-medium text-sm md:text-base lg:text-lg leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[24px] xl:leading-[26px] text-black">
                                    To reserve a spot in a higher level, the previous level must be completed.
                                </p>
                            </div>
                            <Link href="/" className="font-bold text-base leading-[100%] text-black uppercase flex items-center donate-btn-wrapper">
                                DONATE NOW
                                <i className="block w-[16px] h-[16px] overflow-hidden ml-[6px]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_180_463)">
                                            <path d="M12.5082 11.5016C12.6433 11.5027 12.7733 11.4502 12.8697 11.3556L15.8535 8.36421C15.9473 8.27042 15.9999 8.14335 15.9999 8.01077C15.9999 7.8782 15.9473 7.75099 15.8535 7.65721L12.8537 4.64996C12.7837 4.57942 12.6944 4.53126 12.597 4.51171C12.4996 4.49217 12.3985 4.50213 12.3068 4.54022C12.215 4.57832 12.1367 4.64281 12.0818 4.7256C12.0269 4.80839 11.9979 4.90574 11.9984 5.00509V6.30179H6.49891C6.36635 6.30208 6.2393 6.3549 6.14556 6.44864C6.05183 6.54237 5.99904 6.66938 5.99876 6.80194V8.84847C5.99876 9.12467 6.22271 9.34851 6.49891 9.34744H12.007V11.0037C12.008 11.2767 12.2267 11.4974 12.4997 11.5016H12.5082ZM4.5079 9.35929C4.78517 9.35929 5.00699 9.12886 5.00272 8.85159V6.80415C5.01125 6.12804 3.99389 6.12804 4.00242 6.80415V8.85159C4.00141 8.91853 4.01386 8.98508 4.03901 9.04712C4.06416 9.10916 4.10152 9.1655 4.14885 9.21284C4.19619 9.26018 4.25255 9.29756 4.3146 9.32271C4.37664 9.34786 4.4431 9.3603 4.51004 9.35929H4.5079ZM2.50837 9.35929C2.57417 9.35874 2.63922 9.34509 2.69972 9.31919C2.76022 9.2933 2.81498 9.25564 2.86082 9.20841C2.90665 9.16119 2.94265 9.10538 2.96673 9.04413C2.9908 8.98288 3.00247 8.91739 3.00105 8.85159V6.80415C3.00958 6.12804 1.99222 6.12804 2.00075 6.80415V8.85159C1.99974 8.91853 2.01219 8.98508 2.03734 9.04712C2.06249 9.10916 2.09985 9.1655 2.14718 9.21284C2.19452 9.26018 2.25088 9.29756 2.31293 9.32271C2.37497 9.34786 2.44143 9.3603 2.50837 9.35929ZM0.508829 9.35929C0.574637 9.35874 0.63968 9.34509 0.700184 9.31919C0.760687 9.2933 0.815446 9.25564 0.861281 9.20841C0.907116 9.16119 0.943115 9.10538 0.967188 9.04413C0.991262 8.98288 1.00293 8.91739 1.00152 8.85159V6.80415C1.00578 6.13231 -0.00518542 6.13231 -0.00091974 6.80415V8.85159C-0.00193019 8.91863 0.010545 8.98514 0.0357645 9.04725C0.0609839 9.10937 0.0984329 9.16588 0.145886 9.21323C0.193338 9.26058 0.249826 9.29788 0.311993 9.32297C0.374159 9.34806 0.441801 9.36044 0.508829 9.35929Z" fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_180_463">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </i>
                            </Link>
                        </div>
                    </div>
                    <div className="max-w-full md:max-w-1/3 basis-full md:basis-1/3 p-[12px]">
                        <div className="bg-[#F4F4F4] rounded-[20px] px-[12px] md:px-[14px] lg:px-[16px] xl:px-[18px] py-[22px] md:py-[26px] lg:py-[30px] xl:py-[34px] okiri-donate-box-wrapper h-full flex flex-col justify-between">
                            <div className="mb-[35px]">
                                <p className="mb-[18px] font-medium text-sm md:text-base lg:text-lg leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[24px] xl:leading-[26px] text-black">
                                    OKIRIKIRI works only with crypto. The accepted currency to join the process is USDT BEP-20.
                                </p>
                                <p className="mb-[35px] font-medium text-sm md:text-base lg:text-lg leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[24px] xl:leading-[26px] text-black">
                                    Go to the FAQ to find out how to get USTD BEP-20
                                </p>
                            </div>
                            <Link href="/" className="font-bold text-base leading-[100%] text-black uppercase flex items-center donate-btn-wrapper">
                                DONATE NOW
                                <i className="block w-[16px] h-[16px] overflow-hidden ml-[6px]">
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clipPath="url(#clip0_180_463)">
                                            <path d="M12.5082 11.5016C12.6433 11.5027 12.7733 11.4502 12.8697 11.3556L15.8535 8.36421C15.9473 8.27042 15.9999 8.14335 15.9999 8.01077C15.9999 7.8782 15.9473 7.75099 15.8535 7.65721L12.8537 4.64996C12.7837 4.57942 12.6944 4.53126 12.597 4.51171C12.4996 4.49217 12.3985 4.50213 12.3068 4.54022C12.215 4.57832 12.1367 4.64281 12.0818 4.7256C12.0269 4.80839 11.9979 4.90574 11.9984 5.00509V6.30179H6.49891C6.36635 6.30208 6.2393 6.3549 6.14556 6.44864C6.05183 6.54237 5.99904 6.66938 5.99876 6.80194V8.84847C5.99876 9.12467 6.22271 9.34851 6.49891 9.34744H12.007V11.0037C12.008 11.2767 12.2267 11.4974 12.4997 11.5016H12.5082ZM4.5079 9.35929C4.78517 9.35929 5.00699 9.12886 5.00272 8.85159V6.80415C5.01125 6.12804 3.99389 6.12804 4.00242 6.80415V8.85159C4.00141 8.91853 4.01386 8.98508 4.03901 9.04712C4.06416 9.10916 4.10152 9.1655 4.14885 9.21284C4.19619 9.26018 4.25255 9.29756 4.3146 9.32271C4.37664 9.34786 4.4431 9.3603 4.51004 9.35929H4.5079ZM2.50837 9.35929C2.57417 9.35874 2.63922 9.34509 2.69972 9.31919C2.76022 9.2933 2.81498 9.25564 2.86082 9.20841C2.90665 9.16119 2.94265 9.10538 2.96673 9.04413C2.9908 8.98288 3.00247 8.91739 3.00105 8.85159V6.80415C3.00958 6.12804 1.99222 6.12804 2.00075 6.80415V8.85159C1.99974 8.91853 2.01219 8.98508 2.03734 9.04712C2.06249 9.10916 2.09985 9.1655 2.14718 9.21284C2.19452 9.26018 2.25088 9.29756 2.31293 9.32271C2.37497 9.34786 2.44143 9.3603 2.50837 9.35929ZM0.508829 9.35929C0.574637 9.35874 0.63968 9.34509 0.700184 9.31919C0.760687 9.2933 0.815446 9.25564 0.861281 9.20841C0.907116 9.16119 0.943115 9.10538 0.967188 9.04413C0.991262 8.98288 1.00293 8.91739 1.00152 8.85159V6.80415C1.00578 6.13231 -0.00518542 6.13231 -0.00091974 6.80415V8.85159C-0.00193019 8.91863 0.010545 8.98514 0.0357645 9.04725C0.0609839 9.10937 0.0984329 9.16588 0.145886 9.21323C0.193338 9.26058 0.249826 9.29788 0.311993 9.32297C0.374159 9.34806 0.441801 9.36044 0.508829 9.35929Z" fill="black" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_180_463">
                                                <rect width="16" height="16" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                </i>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
                <h3 className="font-medium text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center mb-[50px] text-black uppercase">PATH DETAILS – Overview</h3>
                <div className="max-w-[1095px] m-auto px-[15px] sm:px-0">
                    <div className="path-detail-table-wrapper">
                        <h3 className="font-bold text-base lg:text-lg xl:text-[22px] leading-[100%] text-[#212B36] pt-[28px] pb-[23px] px-[20px]">MINI PATH – 25 USDT</h3>
                        <div className="okiri-table-div">
                            <Table className="">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="">Level</TableHead>
                                        <TableHead>Donation In</TableHead>
                                        <TableHead>Donations Received (90% of 9)</TableHead>
                                        <TableHead className="">Reinvestment (Optional)</TableHead>
                                        <TableHead className="">Net Available</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="">Level 1(MR1)</TableCell>
                                        <TableCell>25 USDT</TableCell>
                                        <TableCell>202.50 USDT</TableCell>
                                        <TableCell className="">100 USDT</TableCell>
                                        <TableCell className="">102.50 USDT</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="">Level 2(MR2)</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>810 USDT</TableCell>
                                        <TableCell className="">500 USDT</TableCell>
                                        <TableCell className="">310 USDT</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="">Level 3(MR3)</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>4,050 USDT</TableCell>
                                        <TableCell className="">2,500 USDT</TableCell>
                                        <TableCell className="">1,550 USDT</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="">Level 4(MR4)</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell><span className="font-black">18,225 USDT</span></TableCell>
                                        <TableCell className="">-</TableCell>
                                        <TableCell className=""><span className="font-black">18,225 USDT</span></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className=""><span className="font-bold">TOTAL NET</span></TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell className="">-</TableCell>
                                        <TableCell className=""><span className="font-black">20,187.50 USDT</span></TableCell>
                                    </TableRow>
                                </TableBody>
                                {/* <TableFooter>
                                    <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell className="text-right">$2,500.00</TableCell>
                                    </TableRow>
                                </TableFooter> */}
                            </Table>
                        </div>
                    </div>
                    <div className="mt-[20px]">
                        <div className="flex items-center mb-[12px]">
                            <i className="w-[16px] h-[16px] overflow-hidden block mr-[10px]">
                                <img
                                    src="/images/black-arrow-icon.svg"
                                    alt="Okirikiri Logo"
                                    className="w-full h-full object-contain object-center"
                                />
                            </i>
                            <p className="font-medium text-sm leading-[100%] text-black">You can stop and withdraw at the end of <span className="font-bold">any level.</span></p>
                        </div>
                        <div className="flex items-center mb-[12px]">
                            <i className="w-[16px] h-[16px] overflow-hidden block mr-[10px]">
                                <img
                                    src="/images/black-arrow-icon.svg"
                                    alt="Okirikiri Logo"
                                    className="w-full h-full object-contain object-center"
                                />
                            </i>
                            <p className="font-medium text-sm leading-[100%] text-black">You can <span className="font-bold">start over anytime</span> with a new donation from the same wallet only if the previous cycle is completed or exited</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px] pt-[40px] pb-[70px]">
                <h3 className="font-bold text-base lg:text-lg xl:text-[22px] leading-[100%] text-[#212B36] pt-[28px] pb-[23px] text-center">MINI PATH – 25 USDT</h3>
                <div className="flex flex-col md:flex-row items-stretch justify-center flex-wrap m-0 md:m-[-12px]">
                    <div className="max-w-full md:max-w-1/2 basis-full md:basis-1/2 p-[12px] w-full">
                        <div className="bg-[#F4F4F4] rounded-[21px] p-[20px] sm:p-[25px] md:p-[30px] lg:p-[35px] xl:p-[40px] okiri-mini-path-box-wrapper text-center min-h-full md:min-h-[415px] flex flex-col justify-between items-center h-full">
                            <h3 className="font-bold text-base sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] uppercase text-black text-center mb-[30px]">Level 1 – Master Receiver 1</h3>
                            <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[100%] text-center text-black mb-[30px]">You start by donating 25 USDT.</p>
                            <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] text-center text-black mb-[15px]">You receive 90% of 9 donations of
                                25 USDT = 202.50 USDT.</p>
                            <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[25px] sm:leading-[30px] md:leading-[35px] lg:leading-[40px] xl:leading-[45px] text-center text-black mb-[25px]">You reinvest 100 USDT to move to Level 2.</p>
                            <p className="font-semibold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center text-black uppercase">Net available: 102.50 USDT</p>
                        </div>
                    </div>
                    <div className="max-w-full md:max-w-1/2 basis-full md:basis-1/2 p-[12px] w-full">
                        <div className="bg-[#F4F4F4] rounded-[21px] p-[20px] sm:p-[25px] md:p-[30px] lg:p-[35px] xl:p-[40px] okiri-mini-path-box-wrapper text-center min-h-full md:min-h-[415px] flex flex-col justify-between items-center h-full">
                            <div>
                                <h3 className="font-bold text-base sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] uppercase text-black text-center mb-[30px]">Level 2 – Master Receiver 2</h3>
                                <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] text-center text-black mb-[15px]">You receive 90% of 9 donations of 100 USDT = 810 USDT.</p>
                                <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[25px] sm:leading-[30px] md:leading-[35px] lg:leading-[40px] xl:leading-[45px] text-center text-black mb-[25px]">You reinvest 500 USDT to move to Level 3.</p>
                            </div>
                            <p className="font-semibold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center text-black uppercase">Net available: 310 USDT</p>
                        </div>
                    </div>
                    <div className="max-w-full md:max-w-1/2 basis-full md:basis-1/2 p-[12px] w-full">
                        <div className="bg-[#F4F4F4] rounded-[21px] p-[20px] sm:p-[25px] md:p-[30px] lg:p-[35px] xl:p-[40px] okiri-mini-path-box-wrapper text-center min-h-full md:min-h-[415px] flex flex-col justify-between items-center h-full">
                            <div>
                                <h3 className="font-bold text-base sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] uppercase text-black text-center mb-[30px]">Level 3 – Master Receiver 3</h3>
                                <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] text-center text-black mb-[15px]">You receive 90% of 9 donations of
                                    500 USDT = 4,050 USDT.</p>
                                <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[25px] sm:leading-[30px] md:leading-[35px] lg:leading-[40px] xl:leading-[45px] text-center text-black mb-[25px]">You reinvest 2,500 USDT to move to Level 4.</p>
                            </div>
                            <p className="font-semibold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center text-black uppercase">Net available: 1,550 USDT</p>
                        </div>
                    </div>
                    <div className="max-w-full md:max-w-1/2 basis-full md:basis-1/2 p-[12px] w-full">
                        <div className="bg-[#F4F4F4] rounded-[21px] p-[20px] sm:p-[25px] md:p-[30px] lg:p-[35px] xl:p-[40px] okiri-mini-path-box-wrapper text-center min-h-full md:min-h-[415px] flex flex-col justify-between items-center h-full">
                            <div>
                                <h3 className="font-bold text-base sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] uppercase text-black text-center mb-[30px]">Level 4 – Master Receiver 4</h3>
                                <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] text-center text-black mb-[15px]">You receive 90% of 9 donations of 2,500 USDT = 18,225 USDT.</p>
                            </div>
                            <p className="font-semibold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center text-black uppercase">Net available: 18,225 USDT</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center mt-[20px] px-[15px] sm:px-0">
                    <i className="w-[16px] h-[16px] overflow-hidden block mr-[10px]">
                        <img
                            src="/images/black-arrow-icon.svg"
                            alt="Okirikiri Logo"
                            className="w-full h-full object-contain object-center"
                        />
                    </i>
                    <p className="font-medium text-sm sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[100%] text-black "><span className="font-bold">TOTAL NET AVAILABLE </span>(if completing all levels): <span className="font-bold">20,187.50 USDT </span>(102.50 + 310 + 1,550 + 18,225)</p>
                </div>
            </section>
            <section className="sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
                <div className="max-w-[1095px] m-auto px-[15px] sm:px-0">
                    <div className="path-detail-table-wrapper">
                        <h3 className="font-bold text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[100%] text-[#212B36] pt-[28px] pb-[23px] px-[20px]">STANDARD PATH – 250 USDT</h3>
                        <div className="okiri-table-div">
                            <Table className="">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="">Level</TableHead>
                                        <TableHead>Donation In</TableHead>
                                        <TableHead>Donations Received (90% of 9)</TableHead>
                                        <TableHead className="">Reinvestment (Optional)</TableHead>
                                        <TableHead className="">Net Available</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="">Level 1(MR1)</TableCell>
                                        <TableCell>250 USDT</TableCell>
                                        <TableCell>2,025 USDT</TableCell>
                                        <TableCell className="">1,000 USDT</TableCell>
                                        <TableCell className="">1,025 USDT</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="">Level 2(MR2)</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>8,100 USDT</TableCell>
                                        <TableCell className="">5,000 USDT</TableCell>
                                        <TableCell className="">3,100 USDT</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="">Level 3(MR3)</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>40,500 USDT</TableCell>
                                        <TableCell className="">25,000 USDT</TableCell>
                                        <TableCell className="">15,500 USDT</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="">Level 4(MR4)</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell><span className="font-bold">182,250 USDT</span></TableCell>
                                        <TableCell className="">-</TableCell>
                                        <TableCell className=""><span className="font-bold">182,250 USDT</span></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className=""><span className="font-bold">TOTAL NET</span></TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell>-</TableCell>
                                        <TableCell className="">-</TableCell>
                                        <TableCell className=""><span className="font-black">201,875 USDT</span></TableCell>
                                    </TableRow>
                                </TableBody>
                                {/* <TableFooter>
                                    <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell className="text-right">$2,500.00</TableCell>
                                    </TableRow>
                                </TableFooter> */}
                            </Table>
                        </div>
                    </div>
                    <div className="mt-[20px]">
                        <div className="flex items-center mb-[12px]">
                            <i className="w-[16px] h-[16px] overflow-hidden block mr-[10px]">
                                <img
                                    src="/images/black-arrow-icon.svg"
                                    alt="Okirikiri Logo"
                                    className="w-full h-full object-contain object-center"
                                />
                            </i>
                            <p className="font-medium text-sm leading-[100%] text-black">Total Potential Net Collection: <span className="font-bold">201,875 USDT</span></p>
                        </div>
                        <div className="flex items-center mb-[12px]">
                            <i className="w-[16px] h-[16px] overflow-hidden block mr-[10px]">
                                <img
                                    src="/images/black-arrow-icon.svg"
                                    alt="Okirikiri Logo"
                                    className="w-full h-full object-contain object-center"
                                />
                            </i>
                            <p className="font-medium text-sm leading-[100%] text-black">With full freedom to exit at any stage and withdraw what you've earned (minus fees)</p>
                        </div>
                    </div>
                </div>
                <div className="my-[35px] px-[15px] sm:px-0">
                    <p className="font-semibold text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[100%] mb-[40px] text-center flex justify-center items-center standard-path-text text-[#CD1A1A]">STANDARD PATH – Total Donations Received: <span className="font-black relative ml-[6px]"> 201,875 USDT
                        <div className="w-[150px] h-[auto] overflow-hidden absolute bottom-[-20px] right-0 m-auto okiri-line-image-wrapper okiri-standard-line-image">
                            <svg width="281" height="21" viewBox="0 0 281 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 19C57.0548 8.34266 186.236 -9.22896 280 11.9817" stroke="#CD1A1A" strokeWidth="3" />
                            </svg>
                        </div>
                    </span>

                        <div className="clearfix">
                            <i className="w-[25px] h-auto overflow-hidden block ml-[6px]">
                                <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M7.2391 5.68648C7.04029 5.28108 6.86067 4.87525 6.70021 4.46368C6.45929 3.84638 6.30229 3.19887 6.09541 2.57145C6.00743 2.30534 5.76717 1.61478 5.75018 1.51023C5.60678 0.59777 6.27512 0.252931 6.47515 0.16737C6.57109 0.123189 7.56596 -0.297772 8.12727 0.777503C8.81448 2.09196 9.31945 3.47101 9.6322 4.87591C10.2049 5.97911 10.9359 7.03 11.7574 7.934C15.0255 11.5291 18.9973 10.792 23.1578 9.51341C23.7965 9.31308 24.479 9.65819 24.7021 10.286C24.9267 10.9186 24.6145 11.6168 23.9929 11.8642C21.7279 12.7829 18.1465 15.8831 17.2948 18.2552C17.1168 18.7517 17.235 19.7865 17.2913 20.8188C17.3678 22.2522 17.3791 23.6893 17.1162 24.3729C17.0776 24.4783 16.5588 25.5929 16.3642 25.7916C15.8954 26.265 15.3943 26.2209 15.0912 26.1335C14.7881 26.0462 14.4043 25.8106 14.131 25.3125C13.8453 24.792 13.6077 23.6205 13.5162 23.3815C13.1844 22.5146 12.4895 20.8267 11.6827 19.4382C11.248 18.6906 10.819 18.0092 10.3649 17.7423C8.68402 16.7546 6.7059 17.5619 5.05666 18.2975C4.86671 18.38 4.67818 18.4674 4.4887 18.5498C3.85133 18.9637 3.15509 19.3377 2.39814 19.6619C1.25553 20.1529 0.737248 19.1223 0.705315 19.0535C0.636213 18.9018 0.311864 18.111 1.10733 17.5196C1.19469 17.4571 1.86599 17.0853 2.12414 16.9407C2.48402 16.7398 2.85392 16.5568 3.22669 16.3781C6.89514 13.9201 8.0412 9.73812 7.2391 5.68648ZM9.92223 9.63302C12.3861 12.3347 15.1551 13.1712 18.1052 13.0457L18.1047 13.0458C16.6575 14.4521 15.4321 16.0376 14.9409 17.4102C14.7541 17.9302 14.7216 18.874 14.7487 19.915C14.3416 19.0601 13.868 18.1622 13.3749 17.4216C12.813 16.5761 12.1994 15.9183 11.6338 15.5854C10.5424 14.9443 9.35695 14.7592 8.16742 14.8467C9.15223 13.2648 9.7269 11.4865 9.92223 9.63302Z" fill="#CD1A1A" />
                                </svg>
                            </i>
                        </div>
                    </p>
                </div>
            </section>
            <section className="sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px] pb-[70px]">
                <div className="flex flex-col md:flex-row items-stretch justify-center flex-wrap m-0 md:m-[-12px]">
                    <div className="max-w-full md:max-w-1/2 basis-full md:basis-1/2 p-[12px] w-full">
                        <div className="bg-[#F4F4F4] rounded-[21px] p-[20px] sm:p-[25px] md:p-[30px] lg:p-[35px] xl:p-[40px] okiri-mini-path-box-wrapper text-center min-h-full md:min-h-[415px] flex flex-col justify-between items-center h-full">
                            <h3 className="font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] uppercase text-black text-center mb-[30px]">Level 1 – Master Receiver 1</h3>
                            <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[100%] text-center text-black mb-[30px]">You start by donating 250 USDT.</p>
                            <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[38px] text-center text-black mb-[15px]">You receive 90% of 9 donations of 250 USDT = 2,025 USDT.</p>
                            <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[25px] sm:leading-[30px] md:leading-[35px] lg:leading-[40px] xl:leading-[45px] text-center text-black mb-[25px]">You reinvest 1,000 USDT to move to Level 2.</p>
                            <p className="font-semibold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center text-black uppercase">Net available: 1,025 USDT</p>
                        </div>
                    </div>
                    <div className="max-w-full md:max-w-1/2 basis-full md:basis-1/2 p-[12px] w-full">
                        <div className="bg-[#F4F4F4] rounded-[21px] p-[20px] sm:p-[25px] md:p-[30px] lg:p-[35px] xl:p-[40px] okiri-mini-path-box-wrapper text-center min-h-full md:min-h-[415px] flex flex-col justify-between items-center h-full">
                            <div>
                                <h3 className="font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] uppercase text-black text-center mb-[30px]">Level 2 – Master Receiver 2</h3>
                                <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[38px] text-center text-black mb-[15px]">You receive 90% of 9 donations of 1,000 USDT = 8,100 USDT.</p>
                                <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[25px] sm:leading-[30px] md:leading-[35px] lg:leading-[40px] xl:leading-[45px] text-center text-black mb-[25px]">You reinvest 5,000 USDT to move to Level 3</p>
                            </div>
                            <p className="font-semibold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center text-black uppercase">Net available: 3,100 USDT</p>
                        </div>
                    </div>
                    <div className="max-w-full md:max-w-1/2 basis-full md:basis-1/2 p-[12px] w-full">
                        <div className="bg-[#F4F4F4] rounded-[21px] p-[20px] sm:p-[25px] md:p-[30px] lg:p-[35px] xl:p-[40px] okiri-mini-path-box-wrapper text-center min-h-full md:min-h-[415px] flex flex-col justify-between items-center h-full">
                            <div>
                                <h3 className="font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] uppercase text-black text-center mb-[30px]">Level 3 – Master Receiver 3</h3>
                                <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[38px] text-center text-black mb-[15px]">You receive 90% of 9 donations of 5,000 USDT = 40,500 USDT.</p>
                                <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[25px] sm:leading-[30px] md:leading-[35px] lg:leading-[40px] xl:leading-[45px] text-center text-black mb-[25px]">You reinvest 25,000 USDT to move to Level 4.</p>
                            </div>
                            <p className="font-semibold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center text-black uppercase">Net available: 15,500 USDT</p>
                        </div>
                    </div>
                    <div className="max-w-full md:max-w-1/2 basis-full md:basis-1/2 p-[12px] w-full">
                        <div className="bg-[#F4F4F4] rounded-[21px] p-[20px] sm:p-[25px] md:p-[30px] lg:p-[35px] xl:p-[40px] okiri-mini-path-box-wrapper text-center min-h-full md:min-h-[415px] flex flex-col justify-between items-center h-full">
                            <div>
                                <h3 className="font-bold text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] uppercase text-black text-center mb-[30px]">Level 4 – Master Receiver 4</h3>
                                <p className="font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] text-center text-black mb-[15px]">You receive 90% of 9 donations of
                                    25,000 USDT = 182,250 USDT..</p>
                            </div>
                            <p className="font-semibold text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] text-center text-black uppercase">Net available: 182,250 USDT</p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center mt-[20px] px-[15px] sm:px-0">
                    <i className="w-[16px] h-[16px] overflow-hidden block mr-[10px]">
                        <img
                            src="/images/black-arrow-icon.svg"
                            alt="Okirikiri Logo"
                            className="w-full h-full object-contain object-center"
                        />
                    </i>
                    <p className="font-medium text-sm sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[100%] text-black "><span className="font-bold">TOTAL NET AVAILABLE </span>(if completing all levels): <span className="font-bold">201,875 USDT </span>(1,025 + 3,100 + 15,500 + 182,250)</p>
                </div>
            </section>
            <section className="py-[40px] px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px] about-section-wrapper relative">
                <div className="flex flex-col md:flex-row items-center">
                    <div className="flex-1">
                        <h3 className="font-medium text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[28px] sm:leading-[32px] md:leading-[36px] lg:leading-[40px] xl:leading-[44px] mb-[30px] text-black">PARTICIPATION RULES (Clear and Simple)</h3>
                        <div className="flex items-center mt-[30px]">
                            <i className="w-[16px] h-[16px] overflow-hidden block mr-[10px]">
                                <img
                                    src="/images/black-arrow-icon.svg"
                                    alt="Okirikiri Logo"
                                    className="w-full h-full object-contain object-center"
                                />
                            </i>
                            <p className="font-medium text-sm sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[100%] text-black ">Only one active donation per wallet at a time</p>
                        </div>
                        <div className="flex items-center mt-[30px]">
                            <i className="w-[16px] h-[16px] overflow-hidden block mr-[10px]">
                                <img
                                    src="/images/black-arrow-icon.svg"
                                    alt="Okirikiri Logo"
                                    className="w-full h-full object-contain object-center"
                                />
                            </i>
                            <p className="font-medium text-sm sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px]] leading-[100%] text-black ">You must complete a level to unlock access to the next</p>
                        </div>
                        <div className="flex items-center mt-[30px]">
                            <i className="w-[16px] h-[16px] overflow-hidden block mr-[10px]">
                                <img
                                    src="/images/black-arrow-icon.svg"
                                    alt="Okirikiri Logo"
                                    className="w-full h-full object-contain object-center"
                                />
                            </i>
                            <p className="font-medium text-sm sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[100%] text-black ">After each level, you choose: reinvest or withdraw</p>
                        </div>
                        <div className="flex items-center mt-[30px]">
                            <i className="w-[16px] h-[16px] overflow-hidden block mr-[10px]">
                                <img
                                    src="/images/black-arrow-icon.svg"
                                    alt="Okirikiri Logo"
                                    className="w-full h-full object-contain object-center"
                                />
                            </i>
                            <p className="font-medium text-sm sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[100%] text-black "><span className="fomt-semibold">USDT BEP-20 only (Binance Smart Chain) </span></p>
                        </div>
                        <div className="flex items-center mt-[30px]">
                            <i className="w-[16px] h-[16px] overflow-hidden block mr-[10px]">
                                <img
                                    src="/images/black-arrow-icon.svg"
                                    alt="Okirikiri Logo"
                                    className="w-full h-full object-contain object-center"
                                />
                            </i>
                            <p className="font-medium text-sm sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[100%] text-black ">You can restart the process once a cycle is completed or exited</p>
                        </div>
                    </div>
                    <div className="mt-[30px] md:mt-0 w-full sm:w-[415px] h-[410px] oveflow-hidden">
                        <img
                            src="/images/participation-right-image.svg"
                            alt="Okirikiri Logo"
                            className="w-full h-full object-contain object-center"
                        />
                    </div>
                </div>
                <div className="absolute top-[24px] right-[26px] overflow-hidden w-[58px] h-[68px]">
                    <img
                        src="/images/grey-diamond-shape-image.svg"
                        alt="Okirikiri Logo"
                        className="w-full h-full object-contain object-center"
                    />
                </div>
            </section>
            <section className="pt-[30px] pb-[70px] px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
                <h3 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] font-medium text-black leading-[100%] tracking-[1px] uppercase text-center mb-[30px]">HOW TO START</h3>
                <div className="flex flex-col lg:flex-row items-center">
                    <div className="w-full lg:w-1/2 pt-[50px] lg:pt-0 pb-[60px] lg:pb-0">
                        <div className="relative w-[320px] sm:w-[520px] h-[480px] mx-auto">
                            {/* Outer Ring */}
                            <div className="absolute top-[30px] left-[50%] translate-x-[-50%] w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full border-[30px] border-[#F8F8F8]"></div>

                            {/* Center Logo */}
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-[40%] sm:-translate-x-1/2 -translate-y-[160%] sm:-translate-y-1/2">
                                <img src="/images/multiple-dots-image.svg" alt="center logo" className="w-[50px] sm:w-[100px] h-[50px] sm:h-[100px]" />
                            </div>

                            {/* Step 01 - Top */}
                            <div className="absolute top-[-4%] sm:top-[-8%] left-1/2 transform -translate-x-1/2">
                                {/* Desktop */}
                                <div className="hidden sm:flex group flex-col items-center justify-center w-[100px] sm:w-[180px] h-[100px] sm:h-[180px]
                                    rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white
                                    transition-all duration-300 ease-in-out hover:ring-4 hover:ring-[#D1D5DB] hover:scale-105">
                                    <div className="bg-[#F8F8F8] w-[60px] sm:w-[130px] h-[60px] sm:h-[130px]
                                    rounded-full flex justify-center items-center text-xl sm:text-3xl font-semibold text-black
                                    group-hover:bg-[#e0e0e0] group-hover:text-blue-600">01</div>
                                </div>
                                {/* Mobile */}
                                <div className="sm:hidden mobile-step mobile-step-01 flex flex-col items-center justify-center w-[100px] h-[100px]
                                    rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white">
                                    <div className="mobile-inner bg-[#F8F8F8] w-[60px] h-[60px] rounded-full flex justify-center items-center text-xl font-semibold text-black">01</div>
                                </div>
                            </div>

                            {/* Step 02 - Right */}
                            <div className="absolute right-[30px] sm:right-[15%] top-[40%] sm:top-[50%] transform translate-x-1/2 -translate-y-1/2">
                                {/* Desktop */}
                                <div className="hidden sm:flex group flex-col items-center justify-center w-[100px] sm:w-[180px] h-[100px] sm:h-[180px]
                                    rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white
                                    transition-all duration-300 ease-in-out hover:ring-4 hover:ring-[#D1D5DB] hover:scale-105">
                                    <div className="bg-[#F8F8F8] w-[60px] sm:w-[130px] h-[60px] sm:h-[130px]
                                    rounded-full flex justify-center items-center text-xl sm:text-3xl font-semibold text-black
                                    group-hover:bg-[#e0e0e0] group-hover:text-blue-600">02</div>
                                </div>
                                {/* Mobile */}
                                <div className="sm:hidden mobile-step mobile-step-02 flex flex-col items-center justify-center w-[100px] h-[100px]
                                    rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white">
                                    <div className="mobile-inner bg-[#F8F8F8] w-[60px] h-[60px] rounded-full flex justify-center items-center text-xl font-semibold text-black">02</div>
                                </div>
                            </div>

                            {/* Step 03 - Bottom */}
                            <div className="absolute bottom-[20%] sm:bottom-[-8%] left-1/2 transform -translate-x-1/2">
                                {/* Desktop */}
                                <div className="hidden sm:flex group flex-col items-center justify-center w-[100px] sm:w-[180px] h-[100px] sm:h-[180px]
                                    rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white
                                    transition-all duration-300 ease-in-out hover:ring-4 hover:ring-[#D1D5DB] hover:scale-105">
                                    <div className="bg-[#F8F8F8] w-[60px] sm:w-[130px] h-[60px] sm:h-[130px]
                                    rounded-full flex justify-center items-center text-xl sm:text-3xl font-semibold text-black
                                    group-hover:bg-[#e0e0e0] group-hover:text-blue-600">03</div>
                                </div>
                                {/* Mobile */}
                                <div className="sm:hidden mobile-step mobile-step-03 flex flex-col items-center justify-center w-[100px] h-[100px]
                                    rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white">
                                    <div className="mobile-inner bg-[#F8F8F8] w-[60px] h-[60px] rounded-full flex justify-center items-center text-xl font-semibold text-black">03</div>
                                </div>
                            </div>

                            {/* Step 04 - Left */}
                            <div className="absolute left-[30px] sm:left-[15%] top-[40%] sm:top-[50%] transform -translate-x-1/2 -translate-y-1/2">
                                {/* Desktop */}
                                <div className="hidden sm:flex group flex-col items-center justify-center w-[100px] sm:w-[180px] h-[100px] sm:h-[180px]
                                    rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white
                                    transition-all duration-300 ease-in-out hover:ring-4 hover:ring-[#D1D5DB] hover:scale-105">
                                    <div className="bg-[#F8F8F8] w-[60px] sm:w-[130px] h-[60px] sm:h-[130px]
                                    rounded-full flex justify-center items-center text-xl sm:text-3xl font-semibold text-black
                                    group-hover:bg-[#e0e0e0] group-hover:text-blue-600">04</div>
                                </div>
                                {/* Mobile */}
                                <div className="sm:hidden mobile-step mobile-step-04 flex flex-col items-center justify-center w-[100px] h-[100px]
                                    rounded-full border-[18px] border-[#F4F4F4] text-center shadow-sm bg-white">
                                    <div className="mobile-inner bg-[#F8F8F8] w-[60px] h-[60px] rounded-full flex justify-center items-center text-xl font-semibold text-black">04</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 pl-0 lg:pl-[50px]">
                        <div className="relative max-w-xl w-full">
                            <div className="relative mb-2">
                                <div className="flex items-center">
                                    <h3
                                        onClick={() => setActive("IM")}
                                        className={cn("pt-[20px] pb-[30px] font-semibold text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl tracking-[1px] leading-[100%] text-[#818181]", active === "IM" ? "active-text" : "")}
                                    >
                                        1. <Link href="https://metamask.io/" target="_blank">INSTALL METAMASK</Link>
                                    </h3>
                                    <div className="w-[48px] h-auto overflow-hidden ml-[12px]">
                                        <img
                                            src="/images/meta-mask-icon.svg"
                                            alt="Okirikiri Logo"
                                            className="w-full h-full object-contain object-center"
                                        />
                                    </div>
                                </div>
                                <div className="h-[2px] bg-[#F3F0F0] relative overflow-hidden">
                                    {active === "IM" && <div className="absolute top-0 left-0 h-full bg-black animate-grow-left-to-right-loop"></div>}
                                </div>
                            </div>
                            <div className="mb-2">
                                <h3
                                    onClick={() => setActive("BSN")}
                                    className={cn("text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#818181] font-semibold pt-[20px] pb-[30px] tracking-[1px] leading-[100%] cursor-pointer", active === "BSN" ? "active-text" : "")}>
                                    2. <span>SWITCH TO THE BNB SMART CHAIN</span>
                                </h3>
                                <div className="h-[2px] bg-[#F3F0F0] relative overflow-hidden">
                                    {active === "BSN" && <div className="absolute top-0 left-0 h-full bg-black animate-grow-left-to-right-loop"></div>}
                                </div>
                            </div>
                            <div className="mb-2">
                                <h3
                                    onClick={() => setActive("CRD")}
                                    className={cn("text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#818181] font-semibold pt-[20px] pb-[30px] cursor-pointer", active === "CRD" ? "active-text" : "")}
                                >
                                    3. <span>BUY BNB WITH YOUR CREDIT CARD & SWAP FOR USDT BEP-20</span>
                                </h3>
                                <div className="h-[2px] bg-[#F3F0F0] relative overflow-hidden">
                                    {active === "CRD" && <div className="absolute top-0 left-0 h-full bg-black animate-grow-left-to-right-loop"></div>}
                                </div>
                            </div>
                            <div className="mb-2">
                                <h3
                                    onClick={() => setActive("CM")}
                                    className={cn("text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-[#818181] font-semibold pt-[20px] pb-[30px] cursor-pointer", active === "CM" ? "active-text" : "")}
                                >
                                    4. <span>CONNECT METAMASK TO OKIRIKIRI AND CLICK DONATE NOW</span>
                                </h3>
                                <div className="h-[2px] bg-[#F3F0F0] relative overflow-hidden">
                                    {active === "CM" && <div className="absolute top-0 left-0 h-full bg-black animate-grow-left-to-right-loop"></div>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="py-[60px] px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px] about-section-wrapper relative"
                id="faq"
            >
                <h3 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] font-medium leading-[100%] tracking-[1px] uppecase mb-[40px] text-center">FAQ</h3>
                <div className="faq-accordion-main-div">
                    <Accordion
                        type="single"
                        collapsible
                        className="w-full accordion-inner-div"
                        defaultValue="item-1"
                    >
                        <AccordionItem value="item-1" className="accordion-item-div">
                            <AccordionTrigger className="accordion-trigger-div">What fees are there in OKIRIKIRI and what are they used for?</AccordionTrigger>
                            <AccordionContent className="accordion-content-div">
                                <p className="font-normal text-sm sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px] tracking-[1px] text-[#5F5F5F] mb-[4px]">
                                    This fee covers the operational costs necessary to keep the protocol running and expanding.
                                    The ideal allocation of this fee is as follows:
                                </p>
                                <div className="my-[12px]">
                                    <ul className="okiri-landing-list-wrapper">
                                        <li className="font-bold text-sm sm:text-base leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] text-[#5F5F5F] mb-[2px]">
                                            🛠 50% for administrative and development expenses
                                        </li>
                                        <li className="font-bold text-sm sm:text-base leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] text-[#5F5F5F] mb-[2px]">
                                            📣 25% for marketing and global outreach
                                        </li>
                                        <li className="font-bold text-sm sm:text-base leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] text-[#5F5F5F] mb-[2px]">
                                            ❤️ 25% for charitable support and social impact projects
                                        </li>
                                    </ul>
                                </div>
                                <p className="font-normal text-sm sm:text-[16px] md:text-[18px] leading-[20px] sm:leading-[24px] md:leading-[28px] tracking-[1px] text-[#5F5F5F] mb-[4px]">
                                    Additionally, OKIRIKIRI guarantees that for every <span className="font-bold">Master Receiver 4 position</span> opened, at least <span className="font-bold">10 level 1 positions</span> will be assigned in favor of<span className="font-bold"> non-profit organizations or initiatives supporting people in need.</span>
                                    In this way, the circular economy of OKIRIKIRI not only benefits individuals, but actively fuels collective good.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2" className="accordion-item-div">
                            <AccordionTrigger className="accordion-trigger-div">Can I receive donations in different cryptocurrencies?</AccordionTrigger>
                            <AccordionContent className="accordion-content-div">
                                <p className="font-normal text-sm sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px] tracking-[1px] text-[#5F5F5F] mb-[4px]">
                                    Yes! You can withdraw in:
                                </p>
                                <div className="my-[12px]">
                                    <ul className="okiri-landing-list-wrapper">
                                        <li className="font-bold text-sm sm:text-base leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] text-[#5F5F5F] mb-[2px]">
                                            <span className="font-black">USDT BEP-20</span> (stablecoin), or 
                                        </li>
                                        <li className="font-bold text-sm sm:text-base leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] text-[#5F5F5F] mb-[2px]">
                                            <span className="font-black">MARCO Token </span>(variable token with staking opportunities) 
                                        </li>
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3" className="accordion-item-div">
                            <AccordionTrigger className="accordion-trigger-div">How does the donation cycle work?</AccordionTrigger>
                            <AccordionContent className="accordion-content-div">
                                <p className="font-normal text-sm sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px] tracking-[1px] text-[#5F5F5F] mb-[4px]">
                                You will receive 90% of the donation from the next 9 users who join after you at each level. When you complete a level, you choose to:
                                </p>
                                <div className="my-[12px]">
                                    <ul className="okiri-landing-list-wrapper">
                                        <li className="font-bold text-sm sm:text-base leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] text-[#5F5F5F] mb-[2px]">
                                            Move forward to the next level (no fee) 
                                        </li>
                                        <li className="font-bold text-sm sm:text-base leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] text-[#5F5F5F] mb-[2px]">
                                            Or withdraw the collected donations (10% fee applies) 
                                        </li>
                                    </ul>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4" className="accordion-item-div">
                            <AccordionTrigger className="accordion-trigger-div">What charities does OKIRIKIRI support?</AccordionTrigger>
                            <AccordionContent className="accordion-content-div">
                                <p className="font-normal text-sm sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px] tracking-[1px] text-[#5F5F5F] mb-[4px]">
                                    Any legitimate charitable initiative submitted through the <span className="font-bold">Charity </span>section. Every approved project will be shared through our newsletter and public reports.
                                </p>
                                <p className="font-normal text-sm sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[20px] sm:leading-[24px] md:leading-[28px] lg:leading-[32px] xl:leading-[36px] tracking-[1px] text-[#5F5F5F] mb-[4px]">
                                    Also, for every <span className="font-bold">Master Receiver 4 </span>created, OKIRIKIRI funds <span className="font-bold">10 Master Receiver 1 spots </span>for verified non-profit causes.
                                </p>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5" className="accordion-item-div">
                            <AccordionTrigger className="accordion-trigger-div">My Web3 wallet isn't connecting. What can I do?</AccordionTrigger>
                            <AccordionContent className="accordion-content-div">
                                <ul className="okiri-landing-list-wrapper">
                                    <li className="font-bold text-sm sm:text-base leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] text-[#5F5F5F] mb-[2px]">
                                        Try using the internal browser inside MetaMask 
                                    </li>
                                    <li className="font-bold text-sm sm:text-base leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] text-[#5F5F5F] mb-[2px]">
                                        Clear your browser cache and restart 
                                    </li>
                                    <li className="font-bold text-sm sm:text-base leading-[16px] sm:leading-[20px] md:leading-[24px] lg:leading-[28px] xl:leading-[32px] text-[#5F5F5F] mb-[2px]">
                                        Still stuck? Contact [support here] 
                                    </li>
                                </ul>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className="absolute top-[24px] right-[26px] overflow-hidden w-[58px] h-[68px]">
                    <img
                        src="/images/grey-diamond-shape-image.svg"
                        alt="Okirikiri Logo"
                        className="w-full h-full object-contain object-center"
                    />
                </div>
            </section>
            <section
                className="pt-[70px] pb-[50px] px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]"
                id="community"
            >
                <div className="bg-black p-[12px] rounded-[20px] mb-[70px] flex flex-col sm:flex-row items-stretch relative">
                    <div className="w-full sm:w-[300px] h-[auto] bg-white rounded-[10px] py-[40px] mb-[24px] sm:mb-0 mr-0 sm:mr-[24px] flex justify-center items-center">
                        <div className="w-[170px] h-auto">
                            <h3 className="font-medium text-[18px] sm:text-[22px] md:text-[26px] lg:text-[30px] xl:text-[34px] leading-[100%] text-center text-black">Join Our Community</h3>
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="max-w-full sm:max-w-[78%]">
                            <p className="text-white text-sm md:text-base lg:text-lg xl:text-xl font-semibold leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] mb-[15px]">
                                Join the official <span className="font-black">OKIRIKIRI</span> channels for updates, or start your own local community to help spread the word globally.
                            </p>
                        </div>
                        <div className="flex flex-wrap items-center">
                            <Link href="https://t.me/okirikiri" target="_blank" className="bg-white rounded-[8px] flex justify-center items-center p-[12px] font-medium leading-[100%] text-black capitalize min-w-full sm:min-w-[210px] mr-0 sm:mr-[16px] mb-[6px] text-sm lg:text-base xl:text-lg">
                                <div className="clearfix">
                                    <i className="block w-[24px] h-[24px] overflow-hidden mr-[10px]">
                                        <img
                                            src="/images/telegram.svg"
                                            alt="Okirikiri Logo"
                                            className="w-full h-full object-contain object-center"
                                        />
                                    </i>
                                </div>
                                telegram
                            </Link>
                            <Link href="https://www.instagram.com/okirikiriofc" target="_blank" className="bg-white rounded-[8px] flex justify-center items-center p-[12px] font-medium leading-[100%] text-black capitalize min-w-full sm:min-w-[210px] mr-0 sm:mr-[16px] mb-[6px] text-sm lg:text-base xl:text-lg">
                                <div className="clearfix">
                                    <i className="block w-[24px] h-[24px] overflow-hidden mr-[10px]">
                                        <img
                                            src="/images/instagram.svg"
                                            alt="Okirikiri Logo"
                                            className="w-full h-full object-contain object-center"
                                        />
                                    </i>
                                </div>
                                Instagram
                            </Link>
                            <Link href="https://www.tiktok.com/@okirikiriofc" target="_blank" className="bg-white rounded-[8px] flex justify-center items-center p-[12px] font-medium leading-[100%] text-black capitalize min-w-full sm:min-w-[210px] mr-0 sm:mr-[16px] mb-[6px] text-sm lg:text-base xl:text-lg">
                                <div className="clearfix">
                                    <i className="block w-[24px] h-[24px] overflow-hidden mr-[10px]">
                                        <img
                                            src="/images/tiktok.svg"
                                            alt="Okirikiri Logo"
                                            className="w-full h-full object-contain object-center"
                                        />
                                    </i>
                                </div>
                                Tiktok
                            </Link>
                            <Link href="https://x.com/Okirikiriofc" target="_blank" className="bg-white rounded-[8px] flex justify-center items-center p-[12px] font-medium leading-[100%] text-black capitalize min-w-full sm:min-w-[210px] mr-0 sm:mr-[16px] mb-[6px] text-sm lg:text-base xl:text-lg">
                                <div className="clearfix">
                                    <i className="block w-[24px] h-[24px] overflow-hidden mr-[10px]">
                                        <img
                                            src="/images/x-twitter.svg"
                                            alt="Okirikiri Logo"
                                            className="w-full h-full object-contain object-center"
                                        />
                                    </i>
                                </div>
                                X
                            </Link>
                        </div>
                    </div>
                    <div className="absolute top-[20px] right-[20px] w-[58px] h-[68px] overflow-hidden">
                        <img
                            src="/images/diamond-shape-icon.svg"
                            alt="Okirikiri Logo"
                            className="w-full h-full object-contain object-center"
                        />
                    </div>
                </div>
                <div
                    className="flex items-stretch flex-col md:flex-row rounded-[30px] overflow-hidden h-full mb-[70px]"
                    id="charity"
                >
                    <div className="w-full md:w-1/2 bg-[#F8F8F9] p-[20px] sm:p-[30px] md:p-[40px] lg:p-[50px] xl:p-[60px] flex flex-col justify-center">
                        <div className="w-full h-[175px] overflow-hidden mb-[24px]">
                            <img
                                src="/images/contact-logo.png"
                                alt="Okirikiri Logo"
                                className="w-full h-full object-contain object-center"
                            />
                        </div>
                        <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl mb-[14px] leading-[32px] sm:leading-[36px] md:leading-[40px] lg:leading-[44px] xl:leading-[48px] font-semibold text-black text-left">Do you run or support a non-profit?</h3>
                        <p className="font-normal text-sm sm:text-base leading-[100%] sm:leading-[150%] text-black text-left">
                            Submit your project through the Charity section—OKIRIKIRI is happy to support verified humanitarian initiatives.
                        </p>
                    </div>
                    <ContectUsForm />
                </div>
                <NewsLatter />
            </section>
        </>
    );
}
