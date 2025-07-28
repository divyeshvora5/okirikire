'use client'

import { useDispatch, useSelector } from "react-redux"
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button"
import TokenSelectForm from "./TokenSelectForm"
import { globalState } from "@/redux/reducer/globalSlice"
import Loader from "../Loader"
import { exitAction } from "@/redux/actions/globalAction"
import { useActiveWeb3React } from "@/hooks/useActiveWeb3React"
import { useCallback, useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"
import { SLIPPAGE_CONSTANT } from "@/utils/constants"
import { getMacroAmountOutWithSlipage, getMarcoPrice } from "@/contracts"
import MarcoPrice from "./MarcoPrice"


const UsdtDetails = () => {

    const { contractLoading, isUserBalancesLoading, userBalances, fee, globalPath, completedLevel, withdrawTokenSelect } = useSelector(globalState);

    const [feeVal, setFeeValue] = useState()

    //  usdtForm.setValue("fees", amount / fee)


    useEffect(() => {
        if (userBalances[globalPath] === null || userBalances[globalPath] === undefined) return;

        if (userBalances[globalPath] <= 0) {
            return setFeeValue(0)
        }
        setFeeValue(userBalances[globalPath] / fee)

    }, [userBalances, globalPath])

    return (
        <div className="px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
            {/* Withdraw Amount Field */}
            <div className="mb-[20px]">
                <label className="text-sm md:text-md lg:text-lg xl:text-xl font-medium mb-[16px] text-black leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] block">
                    Enter withdraw amount:
                </label>
                <div className="relative">
                    <Input
                        className="okiri-withdraw-input-wrapper"
                        type="number"
                        placeholder="Enter amount"
                        value={userBalances[globalPath]}
                        disabled={true}
                    />
                    <p className="absolute top-0 right-[20px] bottom-0 m-auto flex justify-center items-center font-medium leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] text-sm md:text-md lg:text-lg xl:text-xl text-black">
                        USDT
                    </p>
                </div>
            </div>

            {/* Fees Field */}
            <div>
                <label className="text-sm md:text-md lg:text-lg xl:text-xl font-medium mb-[16px] text-black leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] block">
                    Fees:
                </label>
                <div className="relative">
                    <Input
                        disabled={true}
                        className="okiri-withdraw-input-wrapper okiri-grey-input"
                        type="number"
                        value={feeVal}
                        placeholder="Enter fees"
                    />
                    <p className="absolute top-0 right-[20px] bottom-0 m-auto flex justify-center items-center font-medium leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] text-sm md:text-md lg:text-lg xl:text-xl text-black">
                        USDT
                    </p>
                </div>
            </div>
        </div>
    )
}

const MarcoDetails = () => {

    const { wallet, chain, signMessage } = useActiveWeb3React()
    const { userBalances, fee, globalPath } = useSelector(globalState);

    const [slippage, setSlipage] = useState(SLIPPAGE_CONSTANT);
    const [to, setTo] = useState();
    const [feeDeduction, setFeeDEduction] = useState();
    const [minimumRecived, setMinimumRecived] = useState(0)
    const [addSlipage, setAddSlipage] = useState(false)

    const [marcoAmount, setMarcoAmount] = useState();
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);



    const calculateAmount = async (balance) => {
        try {
            if (balance === 0) return;
            setLoading(true)
            const result = await getMacroAmountOutWithSlipage({
                withdrawAmount: balance,
                fee,
                chain,
                slippage: slippage
            })

            setMinimumRecived(result?.slippageAmount)
            setFeeDEduction(balance * (fee / 100))
            setTo(result?.finalAmount)
        } catch (err) {
            console.log('err', err)
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        if (userBalances[globalPath] === null || userBalances[globalPath] === undefined) return;

        if (userBalances[globalPath] <= 0) {
            setMinimumRecived(0);
            setFeeDEduction(0);
            setTo(0);
            return;
        }
        calculateAmount(userBalances[globalPath]);
    }, [userBalances, globalPath])



    useEffect(() => {
        if (userBalances[globalPath] === null || userBalances[globalPath] === undefined) return;

        const timer = setTimeout(() => {
            calculateAmount(userBalances[globalPath])
        }, 800);


        return () => clearTimeout(timer)
    }, [slippage, userBalances[globalPath]])


    useEffect(() => {
        if (!chain) return;
        (async () => {
            try {
                setFetching(true)
                const tknAmount = await getMarcoPrice({ chain });
                setMarcoAmount(tknAmount)
            } catch (err) {
                console.log('err', err)
                setMarcoAmount(0)
            } finally {
                setFetching(false)
            }
        })()
    }, [chain])

    return (
        <div className="px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
            <div className="mb-[20px]">

                <label className="text-sm md:text-md lg:text-lg xl:text-xl font-medium mb-[16px] text-black leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] block">From</label>
                <div className="relative">
                    <Input
                        disabled={true}
                        className="okiri-withdraw-input-wrapper"
                        type="number"
                        placeholder="Enter amount"
                        value={userBalances[globalPath]}
                    />
                    <p className="absolute top-0 right-[20px] bottom-0 m-auto flex justify-center items-center font-medium leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] text-sm md:text-md lg:text-lg xl:text-xl text-black">USDT</p>
                </div>
            </div>
            <div className="mb-[20px]">
                <label className="text-sm md:text-md lg:text-lg xl:text-xl font-medium mb-[16px] text-black leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] block">To(Estimated)</label>
                <div className="relative">
                    <Input
                        disabled={true}
                        value={to}
                        className="okiri-withdraw-input-wrapper"
                        type="number"
                    />
                    <p className="absolute top-0 right-[20px] bottom-0 m-auto flex justify-center items-center font-medium leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] text-sm md:text-md lg:text-lg xl:text-xl text-black">MARCO</p>
                </div>
            </div>
            <div className="mb-[20px]">
                <label className="text-sm md:text-md lg:text-lg xl:text-xl font-medium mb-[16px] text-black leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] block">Fees:</label>
                <div className="relative">

                    <Input
                        disabled={true}
                        value={feeDeduction}
                        className="okiri-withdraw-input-wrapper okiri-grey-input"
                        type="number"
                    />
                    <p className="absolute top-0 right-[20px] bottom-0 m-auto flex justify-center items-center font-medium leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] text-sm md:text-md lg:text-lg xl:text-xl text-black">USDT</p>
                </div>
            </div>
            <div className="">
                <div className="">
                    <MarcoPrice />
                    <p className="flex items-center justify-between w-full font-medium text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] text-black mb-[18px] flex-wrap">Slippage Tolerance: <span className="flex items-center">
                        {addSlipage &&
                            <Input
                                className="max-w-[50px] bg-[#F5F5F5] border rounded-[12px] border-[#979FCE4D]"
                                value={slippage}
                                onChange={(e) => setSlipage(e.target.value)}
                            />}
                        {!addSlipage && `${slippage}%`}
                        <Button
                            type="button"
                            onClick={() => setAddSlipage(!addSlipage)}
                            className="w-[30px] h-[30px] ml-[6px] block overflow-hidden bg-[transparent] p-0 cursor-pointer edit-pencil-btn-wrapper"
                        >
                            {!addSlipage && <img
                                src="/images/edit-pencil-grey-icon.svg"
                                alt="Okirikiri Logo"
                                className="w-full h-full object-contain object-center"
                            />}
                            {addSlipage && <img
                                src="/images/close-grey-btn-icon.svg"
                                alt="Okirikiri Logo"
                                className="w-full h-full object-contain object-center"
                            />}


                        </Button></span></p>
                    <p className="flex items-center justify-between w-full font-medium text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] text-black mb-[18px] flex-wrap" >Minimum Received: <span>{loading ? "calculating..." : `${minimumRecived}  MARCO`}</span></p>
                </div>
            </div>
        </div>
    )
}

const ExitModel = () => {

    const dispatch = useDispatch();
    const { wallet, chain, signMessage } = useActiveWeb3React()
    const { contractLoading, isUserBalancesLoading, userBalances, fee, globalPath, completedLevel, withdrawTokenSelect } = useSelector(globalState);

    const [open, setOpen] = useState(false);


    const modelRef = useRef(null);

    const handleClickOutside = (e) => {
        if (modelRef.current && modelRef.current.contains(e.target)) {
            setOpen(false);
        }
    };


    const handleExit = useCallback(async () => {
        if (contractLoading) return;
        const result = await dispatch(
            exitAction({
                path: globalPath,
                inMarco: withdrawTokenSelect === "MARCO",
                wallet,
                chain,
                signMessage,
            }),
        );
        if (result.type === "global/exitAction/fulfilled") {
            setOpen(false)
        }
    }, [contractLoading, dispatch, globalPath, wallet, chain, signMessage, withdrawTokenSelect]);

    return (
        <AlertDialog open={open} onOpenChange={setOpen} className="okiri-modal-wrapper okiri-small-modal-wrapper">
            <AlertDialogTrigger asChild>
                <Button className="bg-[#CD1A1A] text-white font-semibold leading-[100%] text-xl rounded-[100px] min-h-[44px] min-w-[200px] cursor-pointer">Exit</Button>
            </AlertDialogTrigger>
            <AlertDialogContent ref={modelRef} onClick={handleClickOutside} className="okiri-modal-content-div">
                <div>
                    <AlertDialogHeader className="okiri-modal-header-div">
                        <AlertDialogTitle>
                            <h3 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] xl:text-[38px] leading-[100%] tracking-[1px] font-medium text-center text-black ">
                                Exit Level
                            </h3>
                        </AlertDialogTitle>
                        <AlertDialogCancel className="close-modal-btn">
                            <img
                                src="/images/close-icon.svg"
                                alt="Okirikiri Logo"
                                className="w-full h-full object-contain object-center"
                            />
                        </AlertDialogCancel>
                    </AlertDialogHeader>
                    <div className="okiri-modal-body">
                        <div className="bg-[#F2F2F2] rounded-[14px] m-auto">
                            <div className="py-[30px] balance-border-div mb-[30px]">
                                <h4 className="font-medium text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] leading-[100%] tracking-[1px] text-black text-center">
                                    Available Balance:-
                                    <span className="font-semibold">
                                        {isUserBalancesLoading ? "fetching..." : `${userBalances[globalPath]} USDT`}
                                    </span>
                                </h4>
                            </div>
                            <div className="pb-[40px]">
                                <h4 className="font-medium text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] leading-[100%] tracking-[1px] text-black text-center mb-[40px]">
                                    Select any one option for exit level
                                </h4>
                                <div className="px-[40px] sm:px-[60px] md:px-[80px] lg:px-[100px] xl:px-[120px] mb-[45px]">
                                    <TokenSelectForm />
                                </div>
                                {withdrawTokenSelect === "USDT" && <UsdtDetails />}
                                {withdrawTokenSelect === "MARCO" && <MarcoDetails />}

                            </div>
                        </div>
                    </div>
                    <AlertDialogFooter className="okiri-footer-wrapper px-[20px] sm:px-0">
                        <Button
                            type="button"
                            onClick={handleExit}
                            className="min-w-[200px] min-h-[52px] bg-black text-white font-semibold text-xl leading-[100%] rounded-[100px] cursor-pointer border-0"
                            disabled={contractLoading}
                        >
                            {contractLoading ? <Loader color='white' /> : 'Exit'}
                        </Button>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default ExitModel