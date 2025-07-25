"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer = () => {


    const pathName = usePathname();

    const buildPath = (name) => {
        if(pathName !== "/profile") {
            return name
        }

        return `/${name}`
    }

    return (
        <footer className="bg-[#F8F8F8] pt-[30px] pb-[15px]">
            <p className="text-sm leading-[18px] sm:leading-[20px] md:leading-[22px] font-normal text-black text-center px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
                <span className="font-medium">Disclaimer: No Investment Advice</span> The information provided on this website does not constitute investment advice, financial advice, trading advice, or any other sort of advice
                and you should not treat any of the website's content as such. Do conduct your own due diligence and consult your financial advisor before making any investment decisions.<span className="font-medium">Accuracy of Information </span>This website will strive to ensure accuracy of information listed on this website although it will not hold any responsibility for any missing or wrong information. This website provides all information as is. You understand that you are using any and all information available here at your own risk. <span className="font-medium">Non Endorsement</span> The appearance of third party advertisements and hyperlinks on this website does not constitute an endorsement, guarantee, warranty, or recommendation by . Do conduct your own due diligence before deciding to use any third party services. <span className="font-medium">Jurisdiction.</span> Cryptocurrency may be unregulated in your jurisdiction. The value of cryptocurrencies may fluctuate. Profits may be subject to capital gains or other taxes applicable in your jurisdiction
            </p>
            <div className="border-1 border-[#EDECEC] w-full mt-[30px] mb-[50px]"></div>
            <div className="flex justify-between items-start flex-wrap px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
                <div className="mr-0 mb-[18px]">
                    <Link href="/" className="w-[225px] h-[auto] overflow-hidden block">
                        <img
                            src="/images/okirikiri-footer-logo.png"
                            alt="Okirikiri Logo"
                            className="w-full h-full object-contain object-center"
                        />
                    </Link>
                    {/* <p className="text-base font-normal leading-[18px] sm:leading-[20px] md:leading-[22px] lg:leading-[24px] xl:leading-[26px] text-black max-w-[285px]">Lorem Ipsum is simply dummy text of 
                    the printing and typesetting.</p> */}
                </div>
                <div className="mr-0 mb-[18px]">
                    <h6 className="font-bold text-base md:text-lg text-black mb-[18px]">Company Links</h6>
                    <ul className="p-0 footer-menu-ul-wrapper">
                        <li className="mb-[16px]">
                            <Link href={buildPath("#about")} className="block text-sm md:text-base font-normal text-black">
                                About Us
                            </Link>
                        </li>
                        <li className="mb-[16px]">
                            <Link href={buildPath("#how-it-works")} className="block text-sm md:text-base font-normal text-black">
                                How It Works
                            </Link>
                        </li>
                        <li className="">
                            <Link href={buildPath("#community")} className="block text-sm md:text-base font-normal text-black">
                                Community
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="mr-0 mb-[18px]">
                    <h6 className="font-bold text-base md:text-lg text-black mb-[18px]">Useful Links</h6>
                    <ul className="p-0 footer-menu-ul-wrapper">
                        <li className="mb-[16px]">
                            <Link href={buildPath("#charity")} className="block text-sm md:text-base font-normal text-black">
                                Charity
                            </Link>
                        </li>
                        <li className="">
                            <Link href={buildPath("#faq")} className="block text-sm md:text-base font-normal text-black">
                                Faq
                            </Link>
                        </li>
                    </ul>
                </div>
                {/* <div className="mr-0 mb-[18px]">
                    <h6 className="font-bold text-base md:text-lg text-black mb-[18px]">Other Links</h6>
                    <ul className="p-0 footer-menu-ul-wrapper">
                        <li className="mb-[16px]">
                            <Link href="/" className="block text-sm md:text-base font-normal text-black">
                                Privacy Policy                                               
                            </Link>
                        </li>
                        <li className="">
                            <Link href="/" className="block text-sm md:text-base font-normal text-black">
                                Terms of Service    
                            </Link>
                        </li>
                    </ul>
                </div> */}
                <div className="mr-0 mb-[18px]">
                    <h6 className="font-bold text-base md:text-lg text-black mb-[18px]">Contact Info</h6>
                    <ul className="p-0 footer-menu-ul-wrapper">
                        <li className="mb-[16px]">
                            <span className="block text-base font-normal text-black">
                                hello@okirikiri.com
                            </span>
                        </li>
                        {/* <li className="">
                            <Link href="/" className="block text-sm md:text-base font-normal text-black">
                                Lorem Ipsum City, USA 
                            </Link>
                        </li> */}
                    </ul>
                </div>
            </div>
            <div className="border-1 border-[#F3F0F0] w-full my-[30px]"></div>
            <div>
                <p className="text-center text-[#818181] text-sm font-normal leading-[30px]">© 2025 OKIRIKIRI | All rights reserved</p>
            </div>
        </footer>
    );
};

export default Footer;
