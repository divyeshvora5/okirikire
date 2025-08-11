"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
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
import Link from "next/link";
import NewsLatter from "@/components/home/NewsLatter";
import History from "@/components/History/History"
import { useSelector } from "react-redux"
import { globalState } from "@/redux/reducer/globalSlice"

const HistoryPage = () => {

    const { userHistory, contractLoading } = useSelector(globalState);


    return (
        <div>
            <section className="pt-[40px] md:pt-[50px] lg:pt-[60px] pb-[40px] px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
                <div className="okiri-transaction-section-main-div mb-[60px]">
                    <div className="transaction-header-div flex justify-between mb-[30px] sm:mb-[40px] md:mb-[50px] lg:mb-[60px] flex-col sm:flex-row">
                        <div className="mb-[20px] sm:mb-0">
                            <h3 className="font-semibold text-black leading-[100%] text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] font-sfpro mb-[10px]">TRANSACTION STATEMENT</h3>
                            <p className="text-[#818181] leading-[100%] text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px]">Complete history of your transactions</p>
                        </div>
                        {/* <span className="text-sfpro text-[#CD1A1A] font-semibold px-[20px] py-[15px] leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] text-base sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px] flex justify-center items-center bg-[#F8F8F8] level-span-wrapper rounded-[8px] max-w-[fit-content]">Level : 02</span> */}
                    </div>
                    <div className="flex items-center m-[-12px] mb-[40px] flex-wrap">
                        <div className="basis-[100%] sm:basis-[50%] lg:basis-[33.33%] max-w-[100%] sm:max-w-[50%] lg:max-w-[33.33%] p-[12px] ">
                            <div className="transaction-box-div p-[15px] md:p-[16px] lg:p-[18px] xl:p-[20px] min-h-[90px] sm:min-h-[110px] lg:min-h-[130px] flex justify-between flex-col h-[100%]">
                                <div className="flex items-center justify-between">
                                    <p className="text-black font-semibold text-sm md:text-base lg:text-lg leading-[100%]">Total Donations Received</p>
                                    <div className="clearfix">
                                        <div className="w-[24px] h-[auto] overflow-hidden">
                                            <img
                                                src="/images/dollar-sign.svg"
                                                alt="Okirikiri Logo"
                                                className="w-full h-full object-contain object-center"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="text-[#00A63E] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">{userHistory?.totalDonation !== null ? `$${userHistory?.totalDonation}` : `$0`}</h4>
                            </div>
                        </div>
                        <div className="basis-[100%] sm:basis-[50%] lg:basis-[33.33%] max-w-[100%] sm:max-w-[50%] lg:max-w-[33.33%] p-[12px] ">
                            <div className="transaction-box-div p-[15px] md:p-[16px] lg:p-[18px] xl:p-[20px] min-h-[90px] sm:min-h-[110px] lg:min-h-[130px] flex justify-between flex-col h-[100%]">
                                <div className="flex items-center justify-between">
                                    <p className="text-black font-semibold text-sm md:text-base lg:text-lg leading-[100%]">Total Withdrawn</p>
                                    <div className="clearfix">
                                        <div className="w-[24px] h-[auto] overflow-hidden">
                                            <img
                                                src="/images/trending-down.svg"
                                                alt="Okirikiri Logo"
                                                className="w-full h-full object-contain object-center"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="text-black text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">{userHistory?.totalWithDraw !== null ? `$${userHistory?.totalWithDraw}` : `$0`}</h4>
                            </div>
                        </div>
                        <div className="basis-[100%] sm:basis-[50%] lg:basis-[33.33%] max-w-[100%] sm:max-w-[50%] lg:max-w-[33.33%] p-[12px] ">
                            <div className="transaction-box-div p-[15px] md:p-[16px] lg:p-[18px] xl:p-[20px] min-h-[90px] sm:min-h-[110px] lg:min-h-[130px] flex justify-between flex-col h-[100%]">
                                <div className="flex items-center justify-between">
                                    <p className="text-black font-semibold text-sm md:text-base lg:text-lg leading-[100%]">Total Fees Paid</p>
                                    <div className="clearfix">
                                        <div className="w-[24px] h-[auto] overflow-hidden">
                                            <img
                                                src="/images/trending-up.svg"
                                                alt="Okirikiri Logo"
                                                className="w-full h-full object-contain object-center"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <h4 className="text-black text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-bold">{userHistory?.totalFeePaid !== null ? `$${userHistory?.totalFeePaid}` : `$0`}</h4>
                            </div>
                        </div>
                    </div>

                   
                    <History />
                </div>
                <NewsLatter />
            </section>
        </div>
    )
}

export default HistoryPage