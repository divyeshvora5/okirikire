'use client'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { Label } from "../ui/label";
import { API_ROUTE } from "@/utils/constants";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import Loader from "../Loader";

const formSchema = z.object({
    email: z.string().nonempty('email is required').email(),
    tearms: z.boolean(),
}).strict();


const NewsLatter = () => {

    const [loading, setLoading] = useState(false)

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            tearms: false,
        },
    });

    const { watch } = form;
    const termsChecked = watch("tearms"); // Watch the "tearms" field


    const submit = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post(API_ROUTE.NEWSLETTER, values, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (data?.status) {
                toast.success(data?.message)
            } else {
                toast.error(data?.message)
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                return toast.error(err.response.data?.message)
            }
            toast.error(err?.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="flex flex-col lg:flex-row items-center bg-[#F8F8F8] rounded-[30px] p-[24px]">
                <div className="w-full lg:w-1/2 mb-[20px] lg:mb-0">
                    <h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] font-bold leading-[30px] sm:leading-[35px] md:leading-[40px] lg:leading-[45px] xl:leading-[50px] tracking-[0.32px] uppercase mb-[4px]">Subscribe to the Okiriki Newsletter</h3>
                    <p className="font-normal text-sm sm:text-base leading-[20px] sm:leading-[22px] md:leading-[24px] lg:leading-[26px] xl:leading-[28px] text-[#818181]">Subscribe and level up your inbox with curated content.</p>
                </div>
                <div className="flex-1 justify-end flex flex-col">
                    <div className="relative mb-[12px]">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormControl>
                                        <Input className="okiri-black-bg-input-wrapper" type="email" placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            disabled={(!termsChecked || loading)}
                            className="absolute top-[8px] right-[8px] min-h-[54px] min-w-[110px] sm:min-w-[130px] md:min-w-[150px] lg:min-w-[170px] xl:min-w-[190px] text-black bg-white text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[22px] leading-[100%] rounded-[50px] send-msg-btn-wrapper"
                        >
                            {loading ? <Loader /> : "Subscribe"}
                        </Button>
                    </div>
                    <div className="flex items-center gap-3">
                        <FormField
                            control={form.control}
                            name="tearms"
                            render={({ field }) => (
                                <FormItem className="flex items-center space-x-2">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            disabled={loading}
                                            onCheckedChange={field.onChange}
                                            className="okiri-checkbox-wrapper"
                                        />
                                    </FormControl>
                                    <Label htmlFor="terms" className="text-[10px] leading-[16px] font-medium tracking-[0.32px] text-black">OPT-IN I agree to receive emails and/or SMS text messages with the understanding that I may easily opt-out from these communications at any time after signing up.</Label>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>
    )
}

export default NewsLatter
