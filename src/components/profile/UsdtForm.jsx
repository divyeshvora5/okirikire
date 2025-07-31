'use client'

import { useActiveWeb3React } from "@/hooks/useActiveWeb3React"
import { getUserBalanceAction, withdrawAction } from "@/redux/actions/globalAction"
import { globalState, setGlobalPath } from "@/redux/reducer/globalSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCallback, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import z from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { AlertDialogCancel, AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog"
import TokenSelectForm from "./TokenSelectForm"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Loader from "../Loader"
import { toast } from "react-toastify"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Label } from "../ui/label"
import { MINI_PATH, STANDARD_PATH } from "@/utils/constants"

const usdtSchema = z.object({
    withdrawAmount: z.string()
        .regex(/^\d*\.?\d+$/, "Must be a valid number"),  // Make the field required
})

const UsdtForm = ({ setOpen }) => {


    const { chain, wallet, signMessage } = useActiveWeb3React()
    const dispatch = useDispatch()
    const { contractLoading, isUserBalancesLoading, userBalances, fee, globalPath, completedLevel } = useSelector(globalState);


    const handlePathChange = useCallback((newPath) => {
        if (contractLoading || globalPath === newPath) return;
        dispatch(setGlobalPath(newPath));
    }, [contractLoading, globalPath, dispatch]);


    const totalBalance = useMemo(() => {
        return userBalances[0] + userBalances[1]
    }, [userBalances[0] + userBalances[1]])

    useEffect(() => {

        if (!wallet || !chain || !globalPath?.toString()) return;
        dispatch(getUserBalanceAction({ wallet, path: globalPath, chain }));
    }, [wallet, globalPath, chain])


    console.log('userBalances', userBalances)


    const usdtForm = useForm({
        resolver: zodResolver(usdtSchema),
        defaultValues: {
            withdrawAmount: null,

        }
    })


    const setUsdtFeeValue = (e) => {
        const amount = +e.target.value;
        usdtForm.setValue("fees", amount / fee)
    }




    const handleWithdrawUsdt = useCallback(async (withdrawamount) => {
        if (contractLoading) return;
        return await dispatch(
            withdrawAction({
                path: globalPath,
                inMarco: false,
                wallet,
                chain,
                signMessage,
                withdrawamount
            }),
        );
    }, [contractLoading, dispatch, globalPath, wallet, chain, signMessage]);






    const onUsdtSubmit = async (values) => {
        if (userBalances[globalPath] < Number(values.withdrawAmount)) {
            return toast.error("You don't have a enough balance")
        }
        const result = await handleWithdrawUsdt(values.withdrawAmount);
        if (result.type === "global/withdrawAction/fulfilled") {
            usdtForm.reset()
            setOpen(false)
        }
    }


    return (

        <Form {...usdtForm}>
            <form onSubmit={usdtForm.handleSubmit(onUsdtSubmit)}>
                <AlertDialogHeader className="okiri-modal-header-div">
                    <h3 className="text-[22px] sm:text-[26px] md:text-[30px] lg:text-[34px] xl:text-[38px] leading-[100%] tracking-[1px] font-medium text-center text-black ">
                        Withdraw Funds
                    </h3>
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
                            {/* {userBalances[globalPath] <= 0 && <p className="text-center py-5">⚠️ Withdrawal will be available once all 9 donation slots are filled.</p>} */}

                            <h4 className="font-medium text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] leading-[100%] tracking-[1px] text-black text-center">
                                Total Balance :
                                <span className="font-semibold">
                                    {isUserBalancesLoading ? "fetching..." : ` ${isFinite(totalBalance) ? totalBalance : 0} USDT`}
                                </span>
                            </h4>
                        </div>

                        <h4 className="font-medium text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] leading-[100%] tracking-[1px] text-black text-center mb-[30px]">
                            Select path for withdraw
                        </h4>

                        <div className="px-[35px] py-[20px] sm:px-[60px] md:px-[80px] lg:px-[100px] xl:px-[120px] mb-[45px]">
                            <RadioGroup
                                onValueChange={(e) => handlePathChange(e)}
                                defaultValue={globalPath}
                                className="flex justify-between items-center"
                            >
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value={MINI_PATH} id="r1" className="radio-btn-wrapper" />
                                    <Label htmlFor="r1" className="text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] font-semibold leading-[100%] tracking-[1px] text-black uppercase">Mini</Label>

                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value={STANDARD_PATH} id="r2" className="radio-btn-wrapper" />
                                    <Label htmlFor="r2" className="text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] font-semibold leading-[100%] tracking-[1px] text-black uppercase">Standard</Label>

                                </div>

                            </RadioGroup>
                        </div>
                        <div className="py-[30px] mb-[30px] balance-border-div">

                            <h4 className="font-medium text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] leading-[100%] tracking-[1px] text-black text-center">
                                {globalPath === 0 ? "Mini Path" : "Standard"} Balance :
                                <span className="font-semibold">
                                    {isUserBalancesLoading ? "fetching..." : ` ${userBalances[globalPath]} USDT`}
                                </span>
                            </h4>
                        </div>
                        <div className="pb-[40px]">
                            <h4 className="font-medium text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] leading-[100%] tracking-[1px] text-black text-center mb-[40px]">
                                Select any one option for withdraw
                            </h4>
                            <div className="px-[40px] sm:px-[60px] md:px-[80px] lg:px-[100px] xl:px-[120px] mb-[45px]">
                                <TokenSelectForm />
                            </div>

                            <div className="px-[20px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px]">
                                {/* Withdraw Amount Field */}
                                <div className="mb-[20px]">
                                    <label className="text-sm md:text-md lg:text-lg xl:text-xl font-medium mb-[16px] text-black leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] block">
                                        Enter withdraw amount:
                                    </label>
                                    <div className="relative">
                                        <FormField
                                            control={usdtForm.control}
                                            name="withdrawAmount"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            className="okiri-withdraw-input-wrapper"
                                                            type="number"
                                                            placeholder="Enter amount"
                                                            onChange={(e) => {
                                                                field.onChange(e)
                                                                setUsdtFeeValue(e)
                                                            }}
                                                            onBlur={(e) => {
                                                                field.onBlur(e)
                                                                setUsdtFeeValue(e)
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
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
                                        <FormField
                                            control={usdtForm.control}
                                            name="fees"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            disabled={true}
                                                            {...field}
                                                            className="okiri-withdraw-input-wrapper okiri-grey-input"
                                                            type="number"
                                                            placeholder=""
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <p className="absolute top-0 right-[20px] bottom-0 m-auto flex justify-center items-center font-medium leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] text-sm md:text-md lg:text-lg xl:text-xl text-black">
                                            USDT
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AlertDialogFooter className="okiri-footer-wrapper px-[20px] sm:px-0">
                    <Button
                        type="submit"
                        className="min-w-[200px] min-h-[52px] bg-black text-white font-semibold text-xl leading-[100%] rounded-[100px] cursor-pointer border-0"
                        disabled={contractLoading || userBalances[globalPath] <= 0}
                    >
                        {contractLoading ? <Loader color='white' /> : 'Withdraw'}
                    </Button>
                </AlertDialogFooter>
            </form >
        </Form >
    )
}

export default UsdtForm