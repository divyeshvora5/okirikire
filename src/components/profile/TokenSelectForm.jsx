import React, { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormMessage } from '../ui/form'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import { useDispatch, useSelector } from 'react-redux'
import { globalState, setWithDrawTokenSelectAction } from '@/redux/reducer/globalSlice'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'


const formSchema = z.object({
    token: z.enum(["USDT", "MARCO"], {
        required_error: "You need to select a token type.",
    }),
})


const TokenSelectForm = () => {

    const { withdrawTokenSelect } = useSelector(globalState);
    const dispatch = useDispatch()


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            token: withdrawTokenSelect
        }
    })

    const { watch } = form;
    const tockenCheck = watch("token");


    useEffect(() => {
        if (!tockenCheck) return;
        dispatch(setWithDrawTokenSelectAction(tockenCheck))
    }, [tockenCheck])


    return (
        <Form {...form}>
            <form>
                <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex justify-between items-center"
                                >
                                    <div className="flex items-center gap-3">
                                        <FormItem className="flex items-center gap-3">
                                            <FormControl>
                                                <RadioGroupItem value="USDT" id="r1" className="radio-btn-wrapper" />
                                            </FormControl>
                                            <Label htmlFor="r1" className="text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] font-semibold leading-[100%] tracking-[1px] text-black uppercase">USDT</Label>
                                        </FormItem>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <FormItem className="flex items-center gap-3">
                                            <FormControl>
                                                <RadioGroupItem value="MARCO" id="r2" className="radio-btn-wrapper" />
                                            </FormControl>
                                            <Label htmlFor="r2" className="text-[16px] md:text-[20px] lg:text-[24px] xl:text-[28px] font-semibold leading-[100%] tracking-[1px] text-black uppercase">MARCO</Label>
                                        </FormItem>
                                    </div>

                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}

export default TokenSelectForm