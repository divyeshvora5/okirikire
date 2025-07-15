import "./globals.css";
import Layout from "@/components/layout/Layout";
import ToastComponent from "@/components/layout/ToastComponent";
import localFont from "next/font/local"
import "react-toastify/dist/ReactToastify.css";


export const sfProDisplayFont = localFont({
    src: [
        {
            path: "../../public/fonts/SFProDisplay-Black.woff2",
            weight: "900",
            style: 'normal',
        },
        {
            path: "../../public/fonts/SFProDisplay-BlackItalic.woff2",
            weight: "900",
            style: 'italic',
        },
        {
            path: "../../public/fonts/SFProDisplay-Bold.woff2",
            weight: "bold",
            style: 'normal',
        },
        {
            path: "../../public/fonts/SFProDisplay-BoldItalic.woff2",
            weight: "bold",
            style: 'italic',
        },
        {
            path: "../../public/fonts/SFProDisplay-Heavy.woff2",
            weight: "900",
            style: 'normal',
        },
        {
            path: "../../public/fonts/SFProDisplay-HeavyItalic.woff2",
            weight: "900",
            style: 'italic',
        },
        {
            path: "../../public/fonts/SFProDisplay-Light.woff2",
            weight: "300",
            style: 'normal',
        },
        {
            path: "../../public/fonts/SFProDisplay-LightItalic.woff2",
            weight: "300",
            style: 'italic',
        },
        {
            path: "../../public/fonts/SFProDisplay-Medium.woff2",
            weight: "500",
            style: 'normal',
        },
        {
            path: "../../public/fonts/SFProDisplay-MediumItalic.woff2",
            weight: "500",
            style: 'italic',
        },
        {
            path: "../../public/fonts/SFProDisplay-Regular.woff2",
            weight: "normal",
            style: 'normal',
        },    
        {
            path: "../../public/fonts/SFProDisplay-RegularItalic.woff2",
            weight: "normal",
            style: 'italic',
        },  
        {
            path: "../../public/fonts/SFProDisplay-Semibold.woff2",
            weight: "600",
            style: 'normal',
        },  
        {
            path: "../../public/fonts/SFProDisplay-SemiboldItalic.woff2",
            weight: "600",
            style: 'italic',
        },   
        {
            path: "../../public/fonts/SFProDisplay-Thin.woff2",
            weight: "100",
            style: 'normal',
        },
        {
            path: "../../public/fonts/SFProDisplay-ThinItalic.woff2",
            weight: "100",
            style: 'italic',
        },
        {
            path: "../../public/fonts/SFProDisplay-Ultralight.woff2",
            weight: "100",
            style: 'normal',
        },  
        {
            path: "../../public/fonts/SFProDisplay-UltralightItalic.woff2",
            weight: "100",
            style: 'italic',
        },    
    ],
    variable: "--font-sfpro"
})

export const metadata = {
    title: "Okirikiri",
    description: "Life Changer",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${sfProDisplayFont.variable} ${sfProDisplayFont.className} antialiased`}
            >
                <ToastComponent />
                <Layout>{children}</Layout>
            </body>
        </html>
    );
}
