'use client'
import { useCallback, useRef, useState } from "react";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux";
import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { globalState } from "@/redux/reducer/globalSlice";
import { advanceToNextLevelAction } from "@/redux/actions/globalAction";
import Loader from "../Loader";

const NextLeveModel = () => {


    const dispatch = useDispatch();
    const { wallet, chain, signMessage } = useActiveWeb3React();
    const { contractLoading, globalPath } = useSelector(globalState);

    const [open, setOpen] = useState(false);

    const modelRef = useRef(null);

    const handleClickOutside = (e) => {
        if (modelRef.current && modelRef.current.contains(e.target)) {
            setOpen(false);
        }
    };


    const handleAdvanceToNextLevel = useCallback(async () => {
        if (contractLoading) return;
        const result = await dispatch(
            advanceToNextLevelAction({
                path: globalPath,
                wallet,
                chain,
                signMessage,
            }),
        );
        if (result.type === "global/advanceToNextLevelAction/fulfilled") {
            setOpen(false)
        }
    }, [contractLoading, dispatch, globalPath, wallet, chain, signMessage]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen} className="okiri-modal-wrapper okiri-small-modal-wrapper">
            <AlertDialogTrigger asChild>
                <Button className="bg-black text-white font-semibold leading-[100%] text-xl rounded-[100px] min-h-[44px] min-w-[200px] mb-[20px] sm:mb-0 mr-0 sm:mr-[24px] cursor-pointer">Next Level</Button>
            </AlertDialogTrigger>
            <AlertDialogContent ref={modelRef} onClick={handleClickOutside} className="okiri-small-modal-content-div">
                <AlertDialogHeader className="okiri-modal-header-div">
                    <h3 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] xl:text-[38px] leading-[100%] tracking-[1px] font-medium text-center text-black ">
                        Next Level
                    </h3>
                    <AlertDialogCancel className="close-modal-btn">
                        <img
                            src="/images/close-icon.svg"
                            alt="Okirikiri Logo"
                            className="w-full h-full object-contain object-center"
                        />
                    </AlertDialogCancel>
                </AlertDialogHeader>
                <div className="py-[20px]">
                    <h4 className="font-normal text-base xl:text-lg text-black text-center text-[22px] sm:text-[24px] md:text-[26px] lg:text-[28px] xl:text-[30px]">Want to upgrade to next level?</h4>
                </div>
                <AlertDialogFooter className="okiri-small-footer-wrapper">
                    <Button
                        onClick={handleAdvanceToNextLevel}
                        type="button"
                        disabled={contractLoading}
                        className="min-w-[200px] min-h-[52px] bg-black text-white font-semibold text-sm md:text-md lg:text-lg xl:text-xl leading-[100%] rounded-[100px] cursor-pointer border-0"
                    >
                        {contractLoading ? <Loader color='white' /> : 'Next'}
                    </Button>
                    <Button
                        type="button"
                        disabled={contractLoading}
                        onClick={() => setOpen(false)}
                        className="bg-[#CD1A1A] text-white font-semibold leading-[100%] text-sm md:text-md lg:text-lg xl:text-xl rounded-[100px] min-h-[44px] min-w-[200px] cursor-pointer min-h-[52px]">Cancle</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default NextLeveModel