"use client";
import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { removeStorageData, shortenText } from "@/utils/helpers";
import { client, SUPPORTED_CHAINS, wallets } from "@/utils/walletPrefrences";
import Link from "next/link";
import React, { useCallback } from "react";
import { bscTestnet } from "thirdweb/chains";
import { ConnectButton, lightTheme } from "thirdweb/react";
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react';
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const Header = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { account, chainId, active, deactivate } = useActiveWeb3React();
    const [activePage, setActivePage] = useState("")
    const [open, setOpen] = useState(false)
    const pathName = usePathname();

    console.log('pathName', pathName)

    const handleOpen = (name, isOpen = false) => {
        setActivePage(name)
        setOpen(isOpen)
    }



    const handleDisconnect = useCallback(async () => {
        if (active) {
            await deactivate();
            removeStorageData("connectedWallet");
        }
    }, [active, deactivate]);
    return (
        <header className="w-full flex justify-between items-center px-[15px] sm:px-[30px] md:px-[40px] lg:px-[50px] xl:px-[60px] bg-[#FAFAFF] sticky top-0 z-10 okiri-header-wrapper min-h-[62px] lg:min-h-[unset]">
            <div className="flex items-center">
                <Link href="/" className="w-[135px] h-[auto] overflow-hidden">
                    <img
                        src="/images/logo.png"
                        alt="Okirikiri Logo"
                        className="w-full h-full object-contain object-center"
                    />
                </Link>
            </div>
            {pathName === "/profile" && <nav className="hidden lg:flex">
                <Link href="/#about" onClick={() => setActivePage("about")} className={cn("block font-normal text-base tracking-[1px] text-black mr-[25px] py-5 relative okiri-menu-wrapper", activePage === "about" ? "active-menu" : "")}>About</Link>
                <Link href="/#how-it-works" onClick={() => setActivePage("how-it-works")} className={cn("block font-normal text-base tracking-[1px] text-black mr-[25px] py-5 relative okiri-menu-wrapper", activePage === "how-it-works" ? "active-menu" : "")}>How It Works</Link>
                <Link href="/profile" onClick={() => setActivePage("profile")} className={cn("block font-normal text-base tracking-[1px] text-black mr-[25px] py-5 relative okiri-menu-wrapper", activePage === "profile" ? "active-menu" : "")}>Profile</Link>
                <Link href="/#community" onClick={() => setActivePage("community")} className={cn("block font-normal text-base tracking-[1px] text-black mr-[25px] py-5 relative okiri-menu-wrapper", activePage === "community" ? "active-menu" : "")}>Community</Link>
                <Link href="/#charity" onClick={() => setActivePage("charity")} className={cn("block font-normal text-base tracking-[1px] text-black mr-[25px] py-5 relative okiri-menu-wrapper", activePage === "charity" ? "active-menu" : "")}>Charity</Link>
                <Link href="/#faq" onClick={() => setActivePage("faq")} className={cn("block font-normal text-base tracking-[1px] text-black py-5 relative okiri-menu-wrapper", activePage === "faq" ? "active-menu" : "")}>Faq</Link>
            </nav>}
            {pathName !== "/profile" && <nav className="hidden lg:flex">
                <Link href="#about" onClick={() => setActivePage("about")} className={cn("block font-normal text-base tracking-[1px] text-black mr-[25px] py-5 relative okiri-menu-wrapper", activePage === "about" ? "active-menu" : "")}>About</Link>
                <Link href="#how-it-works" onClick={() => setActivePage("how-it-works")} className={cn("block font-normal text-base tracking-[1px] text-black mr-[25px] py-5 relative okiri-menu-wrapper", activePage === "how-it-works" ? "active-menu" : "")}>How It Works</Link>
                <Link href="/profile" onClick={() => setActivePage("profile")} className={cn("block font-normal text-base tracking-[1px] text-black mr-[25px] py-5 relative okiri-menu-wrapper", activePage === "profile" ? "active-menu" : "")}>Profile</Link>
                <Link href="#community" onClick={() => setActivePage("community")} className={cn("block font-normal text-base tracking-[1px] text-black mr-[25px] py-5 relative okiri-menu-wrapper", activePage === "community" ? "active-menu" : "")}>Community</Link>
                <Link href="#charity" onClick={() => setActivePage("charity")} className={cn("block font-normal text-base tracking-[1px] text-black mr-[25px] py-5 relative okiri-menu-wrapper", activePage === "charity" ? "active-menu" : "")}>Charity</Link>
                <Link href="#faq" onClick={() => setActivePage("faq")} className={cn("block font-normal text-base tracking-[1px] text-black py-5 relative okiri-menu-wrapper", activePage === "faq" ? "active-menu" : "")}>Faq</Link>
            </nav>}
            {(isMobileMenuOpen && pathName === "/profile") && open && (
                <div className="absolute top-full left-0 w-full h-[100vh] bg-[#FAFAFF] flex flex-col items-center shadow-md z-50">
                    <Link href="/#about" onClick={() => handleOpen("about")} className="py-2 block font-normal text-base tracking-[1px] text-black">About</Link>
                    <Link href="/#how-it-works" onClick={() => handleOpen("how-it-works")} className="py-2 block font-normal text-base tracking-[1px] text-black">How It Works</Link>
                    <Link href="/profile" onClick={() => handleOpen("profile")} className="py-2 block font-normal text-base tracking-[1px] text-black">Profile</Link>
                    <Link href="/#community" onClick={() => handleOpen("community")} className="py-2 block font-normal text-base tracking-[1px] text-black">Community</Link>
                    <Link href="/#charity" onClick={() => handleOpen("charity")} className="py-2 block font-normal text-base tracking-[1px] text-black">Charity</Link>
                    <Link href="/#faq" onClick={() => handleOpen("faq")} className="py-2 block font-normal text-base tracking-[1px] text-black">Faq</Link>
                </div>
            )}
            {(isMobileMenuOpen && pathName !=="/profile") && open && (
                <div className="absolute top-full left-0 w-full h-[100vh] bg-[#FAFAFF] flex flex-col items-center shadow-md z-50">
                    <Link href="#about" onClick={() => handleOpen("about")} className="py-2 block font-normal text-base tracking-[1px] text-black">About</Link>
                    <Link href="#how-it-works" onClick={() => handleOpen("how-it-works")} className="py-2 block font-normal text-base tracking-[1px] text-black">How It Works</Link>
                    <Link href="/profile" onClick={() => handleOpen("profile")} className="py-2 block font-normal text-base tracking-[1px] text-black">Profile</Link>
                    <Link href="#community" onClick={() => handleOpen("community")} className="py-2 block font-normal text-base tracking-[1px] text-black">Community</Link>
                    <Link href="#charity" onClick={() => handleOpen("charity")} className="py-2 block font-normal text-base tracking-[1px] text-black">Charity</Link>
                    <Link href="#faq" onClick={() => handleOpen("faq")} className="py-2 block font-normal text-base tracking-[1px] text-black">Faq</Link>
                </div>
            )}
            <div className="flex items-center flex-row-reverse">
                <button
                    className="lg:hidden text-black ml-[20px] cursor-pointer"
                    onClick={() =>{ 
                        setIsMobileMenuOpen(!isMobileMenuOpen)
                        setOpen(true)
                    }}
                >
                    {(isMobileMenuOpen && open) ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
                {!active ? (
                    <ConnectButton
                        client={client}
                        wallets={wallets}
                        chain={bscTestnet}
                        chains={SUPPORTED_CHAINS}
                        showAllWallets={false}
                        connectButton={{
                            style: {
                                minWidth: "160px",
                                height: "unset",
                                borderRadius: "20px",
                                fontSize: "16px",
                                letterSpacing: "1px",
                                padding: "9px 14px",
                            }
                        }}
                        theme={lightTheme({
                            colors: {
                                primaryButtonText: "#ffffff",
                                accentText: "#000",
                                accentButtonBg: "#000",
                                primaryButtonBg: "#000",
                            },
                        })}
                        connectModal={{
                            showThirdwebBranding: false
                        }}
                        
                    />
                ) : (
                    <button
                        className="bg-black text-white px-4 py-1 rounded-full text-base max-w-[160px] tracking-[1px]"
                        onClick={handleDisconnect}
                    >
                        {shortenText(account || "", 6, 4)}
                    </button>
                )}
                {/* <Button className="min-w-[160px] text-base text-white tracking-[1px] rounded-[20px] font-normal cursor-pointer flex items-center justify-center text-center">
                    Connect Wallet
                </Button> */}
            </div>
        </header>
    );
};

export default Header;
