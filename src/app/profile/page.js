"use client"
import { Button } from "@/components/ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import LevelsDetailes from "@/components/profile/LevelsDetailsd";
import WithdrawFundModel from "@/components/profile/WithdrawFundModel";
import { MINI_PATH, STANDARD_PATH } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect, useRef, useState } from "react";
import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { getLevelDataAction } from "@/redux/actions/globalAction";
import NewsLatter from "@/components/home/NewsLatter";
import { globalState, setGlobalPath } from "@/redux/reducer/globalSlice"
import ExitModel from "@/components/profile/ExitModel";
import NextLeveModel from "@/components/profile/NextLeveModel";
import CircleAnimation from "@/components/home/CircleAnimation";
import { cn } from "@/lib/utils";

export default function Profile() {

    const { library, account, chain, wallet, signMessage } = useActiveWeb3React();
    const { currentUserLevel, completedLevel, globalPath, contractLoading } = useSelector(globalState);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [showBtn, setShowBtn] = useState(false)
    const [sAlert, setShowAlert] = useState(false)



    useEffect(() => {
        if (!library || !account || !chain || !wallet || globalPath === null || globalPath === undefined) return;
        dispatch(getLevelDataAction({ library, account, chain, wallet }))
    }, [library, account, chain, wallet, globalPath])


    const handlePathChange = useCallback((newPath) => {
        if (contractLoading || globalPath === newPath) return;
        dispatch(setGlobalPath(newPath));
    }, [contractLoading, globalPath, dispatch]);


    const isShowButtons = () =>
        (currentUserLevel[globalPath] !== null && completedLevel[globalPath] !== null) && completedLevel[globalPath] > 0
            ? currentUserLevel[globalPath] === completedLevel[globalPath]
            : false

    useEffect(() => {
        setShowBtn(isShowButtons())
        setShowAlert(isShowButtons())
    }, [currentUserLevel, completedLevel, globalPath, account])



    const modelRef = useRef(null);

    const handleClickOutside = (e) => {
        if (modelRef.current && modelRef.current.contains(e.target)) {
            setOpen(false);
        }
    };



    return (
        <>
            <section className="pt-[50px] md:pt-[60px] lg:pt-[70px] xl:pt-[80px] pb-[50px] sm:pb-[80px] md:pb-[100px] lg:pb-[110px] xl:pb-[120px] px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
                <div className="flex justify-center items-center flex-col">
                    <h2 className="text-[24px] sm:text-[26px] md:text-[28px] lg:text-[30px] xl:text-[32px] leading-[100%] uppercase text-center font-medium tracking-[1px] mb-[30px]">Welcome to your profile</h2>
                    <div className="w-[200px] sm:w-[260px] md:w-[320px] h-[auto] overflow-hidden mb-[10px]">
                        <img
                            src="/images/okirikiri-banner-image.png"
                            alt="Okirikiri Logo"
                            className="w-full h-full object-contain object-center"
                        />
                    </div>
                    <p className="max-w-[870px] w-full text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[22px] sm:leading-[26px] md:leading-[30px] lg:leading-[34px] xl:leading-[38px] tracking-[1px] text-center text-black">
                        You have selected the {globalPath === MINI_PATH ? "Mini Path (Donation 25 USDT)" : "Standard Path (Donation 250 USDT)"}
                    </p>
                </div>
                <div className="flex items-center m-0 sm:m-[-12px] w-full mt-[30px]">
                    <div className="max-w-1/2 basis-1/2 p-[12px]">
                        <Button
                            onClick={handlePathChange.bind(null, MINI_PATH)}
                            disabled={contractLoading}
                            className={
                                cn("w-full text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl  tracking-[1px] rounded-[100px] font-normal cursor-pointer flex items-center justify-center text-center py-4 min-h-[50px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[80px]",
                                    globalPath === MINI_PATH ? "text-black bg-[#F3F0F0] hover:bg-gray-400 hover:text-white" : "text-white bg-black"
                                )}
                        >
                            Mini Path
                        </Button>
                    </div>
                    <div className="max-w-1/2 basis-1/2 p-[12px]">
                        <Button
                            onClick={handlePathChange.bind(null, STANDARD_PATH)}
                            disabled={contractLoading}
                            className={cn("w-full text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white tracking-[1px] rounded-[100px] font-normal cursor-pointer flex items-center justify-center text-center py-4 min-h-[50px] sm:min-h-[60px] md:min-h-[70px] lg:min-h-[80px]",
                                globalPath === STANDARD_PATH ? "text-black bg-[#F3F0F0] hover:bg-gray-400 hover:text-white" : "text-white bg-black"
                            )}
                        >
                            Standard Path
                        </Button>
                    </div>
                </div>
            </section>
            <section className="pb-[60px] px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
                <h3 className="font-bold text-base md:text-lg lg:text-xl xl:text-2xl leading-[100%] tracking-[1px] uppercase text-center mb-[30px] lg:mb-[40px] xl:mb-[50px]">Your Current Level Details</h3>
                <div className="flex items-center flex-col xl:flex-row mb-[70px]">
                    <div className="w-full xl:w-1/2 mb-[30px] xl:mb-0">
                        <div className="w-full h-[280px] sm:h-[570px] xl:h-[650px] overflow-hidden">
                            <CircleAnimation />
                        </div>
                    </div>
                    <div className="flex-1 px-[15px] sm:px-0  w-full sm:w-unset">
                        <div className="okiri-accordion-main-div">
                            <LevelsDetailes />
                            {account &&
                                <div className="flex items-center jusitfy-between w-full mt-[40px] flex-col sm:flex-row">
                                    {showBtn && <NextLeveModel />}
                                    <AlertDialog open={open} onOpenChange={setOpen} className="okiri-modal-wrapper">
                                        <AlertDialogTrigger asChild>
                                            <Button className="bg-black text-white font-semibold leading-[100%] text-xl rounded-[100px] min-h-[44px] min-w-[200px] mb-[20px] sm:mb-0 mr-0 sm:mr-[24px] cursor-pointer">Withdraw</Button>
                                        </AlertDialogTrigger>
                                        <WithdrawFundModel setOpen={setOpen} />
                                    </AlertDialog>
                                    {showBtn && <ExitModel />}

                                    {/**Notification */}
                                    <AlertDialog open={sAlert} onOpenChange={setShowAlert} className="okiri-modal-wrapper">
                                        <AlertDialogContent onClick={handleClickOutside} ref={modelRef} className="okiri-modal-content-div congrats-modal-content-wrapper">
                                        <AlertDialogHeader className="okiri-modal-header-div okiri-modal-without-border-div">
                                            <AlertDialogCancel className="close-modal-btn congrats-close-modal-wrapper">
                                                <img
                                                    src="/images/close-icon.svg"
                                                    alt="Okirikiri Logo"
                                                    className="w-full h-full object-contain object-center"
                                                />
                                            </AlertDialogCancel>
                                        </AlertDialogHeader>
                                            <div className="px-5 pt-10 pb-5 m-auto">
                                                <h3 className="text-base md:text-lg lg:text-xl xl:text-2xl mb-[30px] text-center font-bold text-black">🎉 CONGRATULATIONS! You've completed this level!</h3>
                                                <h4 className="text-sm md:text-base lg:text-lg xl:text-xl mb-[30px] text-center font-semibold text-black">⚠️ ACTION REQUIRED!</h4>
                                                <h5 className="text-sm md:text-base lg:text-lg xl:text-xl text-center font-semibold text-black">💰 Decide whether to withdraw your funds or move on to the next level as soon as possible!</h5>
                                            </div>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            }
                        </div>
                    </div>
                </div>

                <NewsLatter />
            </section>

        </>
    );
}
