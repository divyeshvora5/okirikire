'use client'

import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import Loader from "../Loader";
import axios, { AxiosError } from "axios";
import { API_ROUTE } from "@/utils/constants";
import { toast } from "react-toastify";



const formSchema = z.object({
    name: z
        .string()
        .nonempty({ message: "name must be required" }),
    email: z.string().min(2, {
        message: "email must be at least 2 characters.",
    }).email(),
    message: z.string().nonempty({ message: "message must be required" }),
})

const ContectUsForm = () => {


    const [loading, setLoading] = useState(false)


    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    })

    const submit = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post(API_ROUTE.GOOGLE_SHEET, values, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (data?.success) {
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
            <form onSubmit={form.handleSubmit(submit)} className="flex-1 bg-black py-[20px] sm:py-[30px] md:py-[40px] lg:py-[50px] xl:py-[60px] pl-[20px] sm:pl-[30px] md:pl-[40px] lg:pl-[50px] xl:pl-[70px] pr-[20px] sm:pr-[35px] md:pr-[55px] lg:pr-[75px] xl:pr-[95px]">
                <div className="mb-[40px]">
                    <Label className="text-sm sm:text-base font-medium mb-[18px] text-white leading-[16px] md:leading-[18px] lg:leading-[20px] xl:leading-[22px] block">Full Name</Label>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormControl>
                                    <Input className="okiri-input-wrapper" placeholder="Enter your name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="mb-[40px]">
                    <Label className="text-sm sm:text-base font-medium mb-[18px] text-white leading-[16px] md:leading-[18px] lg:leading-[20px] xl:leading-[22px] block">Email Address</Label>
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormControl>
                                    <Input className="okiri-input-wrapper" type="email" placeholder="Your email address in here" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="mb-[50px]">
                    <Label className="text-sm sm:text-base font-medium mb-[18px] text-white leading-[16px] md:leading-[18px] lg:leading-[20px] xl:leading-[22px] block">Messages</Label>
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem className="">
                                <FormControl>
                                    <Textarea className="okiri-input-wrapper text-area-wrapper" placeholder="Write your messages in here"  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex justify-end">
                    <Button
                        disabled={loading}
                        className="min-w-[205px] bg-white text-black font-semibold rounded-[100px] text-sm sm:text-base capitalize min-h-[56px] send-msg-btn-wrapper"
                        type="submit"
                    >
                        {loading ? <Loader /> : "Send message"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default ContectUsForm