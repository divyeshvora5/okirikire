import axios from "axios";

const API_URL = "https://api.mailerlite.com/api/v2/subscribers"

export async function POST(req) {
    try {

        const { email } = await req.json()

        const { data } = await axios.post(API_URL, {
            email
        }, {
            headers: {
                'content-type': "application/json",
                'x-mailerlite-apikey': process.env.NEXT_PUBLIC_MAILERLITE_API_KEY
            }
        })

        if (data?.email) {
            return Response.json({
                status: true,
                message: "Subscribe successfuliy",
                data: data?.email
            })
        }
        console.log(
            "Subscription successful (email_address):",
            data?.email
        );

        return Response.json({
            status: false,
            message: "Somthing went wrong!",
            data: null
        })
    } catch (err) {

        return Response.json({
            status: false,
            message: "Somthing went wrong!",
            data: null
        })
    }
}


