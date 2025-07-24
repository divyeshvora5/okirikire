"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog"
import TokenSelectForm from "./TokenSelectForm"
import { Button } from "../ui/button"
import { useDispatch, useSelector } from "react-redux"
import { globalState } from "@/redux/reducer/globalSlice"
import { useCallback, useEffect, useState } from "react"
import { getMacroAmountOutWithSlipage, getMarcoPrice } from "@/contracts"
import { useActiveWeb3React } from "@/hooks/useActiveWeb3React"
import { SLIPPAGE_CONSTANT } from "@/utils/constants"
import { withdrawAction } from "@/redux/actions/globalAction"
import Loader from "../Loader"
import { toast } from "react-toastify"
import MarcoPrice from "./MarcoPrice"

const marcoSchema = z.object({
    amount: z.string()
        .regex(/^\d*\.?\d+$/, "Must be a valid number"),  // Make the field required

    // slippage: z.string(),
    // feeDeduction: z.string(),
    // to: z.string()
})

const MarcoForm = ({ setOpen }) => {

    const { chain, signMessage, wallet } = useActiveWeb3React()
    const { contractLoading, isUserBalancesLoading, userBalances, fee, globalPath, completedLevel } = useSelector(globalState);
    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false);
    const [minimumRecived, setMinimumRecived] = useState(0)

    const [to, setTo] = useState()
    const [feeDeduction, setFeeDEduction] = useState()
    const [slippage, setSlipage] = useState(SLIPPAGE_CONSTANT)

    const [addSlipage, setAddSlipage] = useState(false)

    const marcoForm = useForm({
        resolver: zodResolver(marcoSchema),
        defaultValues: {
            amount: '',
        }
    })


    const { watch } = marcoForm;
    const amountIn = watch("amount")



    const calculateValues = async () => {
        return setTimeout(async () => {
            try {
                setLoading(true)
                const result = await getMacroAmountOutWithSlipage({
                    withdrawAmount: amountIn,
                    fee,
                    chain,
                    slippage: slippage
                })
                setMinimumRecived(result?.slippageAmount)
                setFeeDEduction(amountIn * (fee / 100))
                setTo(result?.finalAmount)
                console.log('getMacroAmountOutWithSlipage', result)
            } catch (err) {
                console.log('err', err)
            } finally {
                setLoading(false)
            }
        }, 800)
    }


    useEffect(() => {
        if (amountIn === null || !chain) return;
        if (amountIn === "" || amountIn === " ") {
            setFeeDEduction("")
            return setMinimumRecived(0)
        }
        const timer = calculateValues()

        return () => {
            clearTimeout(timer)
        }
    }, [amountIn, chain, fee, marcoForm])


    useEffect(() => {
        if (amountIn === null || !chain) return;
        if (amountIn === "" || amountIn === " " || slippage === "" || slippage === " ") {
            setFeeDEduction("")
            return setMinimumRecived(0)
        }

        const timer = calculateValues();

        return () => clearTimeout(timer)
    }, [slippage, userBalances[globalPath]])



    const handleWithdraw = useCallback(async (withdrawamount) => {
        if (contractLoading) return;
        return await dispatch(
            withdrawAction({
                path: globalPath,
                inMarco: true,
                wallet,
                chain,
                signMessage,
                withdrawamount
            }),
        );
    }, [contractLoading, dispatch, globalPath, wallet, chain, signMessage]);





    const onSubmit = async (values) => {

        if (userBalances[globalPath] < Number(values.amount)) {
            return toast.error("You don't have a enough balance")
        }

        if (!values.amount) return;
        const result = await handleWithdraw(values.amount);
        console.log('result', result);
        if (result.type === "global/withdrawAction/fulfilled") {
            marcoForm.reset()
            setOpen(false)
        }
    }

    return (
        <Form {...marcoForm}>
            <form onSubmit={marcoForm.handleSubmit(onSubmit)}>
                <AlertDialogHeader className="okiri-modal-header-div">
                    <h3 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] xl:text-[38px] leading-[100%] tracking-[1px] font-medium text-center text-black ">Withdraw Funds</h3>
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
                            {userBalances[globalPath] <= 0 && <p className="text-center py-5">⚠️ Withdrawal will be available once all 9 donation slots are filled.</p>}
                            <h4 className="font-medium text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] leading-[100%] tracking-[1px] text-black text-center">
                                Available Balance:- <span className="font-semibold">
                                    {isUserBalancesLoading ? "fetching..." : `${userBalances[globalPath]} USDT`}
                                </span>
                            </h4>
                        </div>
                        <div className="pb-[40px]">
                            <h4 className="font-medium text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] leading-[100%] tracking-[1px] text-black text-center mb-[40px]">Select any one option for withdraw</h4>
                            <div className="px-[40px] sm:px-[60px] md:px-[80px] lg:px-[100px] xl:px-[120px] mb-[45px]">
                                <TokenSelectForm />
                            </div>

                            <div className="px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
                                <div className="mb-[20px]">

                                    <label className="text-sm md:text-md lg:text-lg xl:text-xl font-medium mb-[16px] text-black leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] block">From</label>
                                    <div className="relative">
                                        <FormField
                                            control={marcoForm.control}
                                            name="amount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="okiri-withdraw-input-wrapper"
                                                            type="number"
                                                            placeholder="Enter amount"
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
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
                        </div>
                    </div>
                </div>
                <AlertDialogFooter className="okiri-footer-wrapper px-[20px] sm:px-0 ">
                    <Button
                        disabled={contractLoading || userBalances[globalPath] <= 0}
                        type="submit"
                        className="min-w-[200px] min-h-[52px] bg-black text-white font-semibold text-sm md:text-md lg:text-lg xl:text-xl leading-[100%] rounded-[100px] cursor-pointer border-0"
                    >
                        {contractLoading ? <Loader color='white' /> : 'Withdraw'}
                    </Button>
                </AlertDialogFooter>
            </form>
        </Form>
    )
}

export default MarcoForm