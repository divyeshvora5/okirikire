"use client";
import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { removeStorageData, shortenText } from "@/utils/helpers";
import { client, SUPPORTED_CHAINS, wallets } from "@/utils/walletPrefrences";
import Link from "next/link";
import React, { useCallback } from "react";
import { bscTestnet } from "thirdweb/chains";
import { ConnectButton, lightTheme } from "thirdweb/react";

const Header = () => {
    const { account, chainId, active, deactivate } = useActiveWeb3React();

    const handleDisconnect = useCallback(async () => {
        if (active) {
            await deactivate();
            removeStorageData("connectedWallet");
        }
    }, [active, deactivate]);
    return (
        <header className="w-full flex justify-between items-center px-6 py-4  bg-[#FAFAFF]">
            <div className="flex items-center">
                <Link href="/">
                    <img
                        src="/logo.png"
                        alt="Okirikiri Logo"
                        className="ms-[60px]"
                        width={135}
                        height={46}
                    />
                </Link>
            </div>
            <nav className="hidden md:flex space-x-6 text-sm">
                <Link href="#about">About</Link>
                <Link href="#how-it-works">How It Works</Link>
                <Link href="/profile">Profile</Link>
                <Link href="#community">Community</Link>
                <Link href="#charity">Charity</Link>
                <Link href="#faq">Faq</Link>
            </nav>
            {!active ? (
                <ConnectButton
                    client={client}
                    wallets={wallets}
                    chain={bscTestnet}
                    chains={SUPPORTED_CHAINS}
                    showAllWallets={false}
                    connectButton={{
                        style: {
                            marginInlineEnd: "60px",
                            // backgroundColor: "#000",
                            borderRadius: "25px",
                        },
                    }}
                    theme={lightTheme({
                        colors: {
                            primaryButtonText: "#ffffff",
                            accentText: "#000",
                            accentButtonBg: "#000",
                            primaryButtonBg: "#000",
                        },
                    })}
                />
            ) : (
                <button
                    className="bg-black text-white px-4 py-2 rounded-full text-sm me-[60px]"
                    style={{ minWidth: "165px", height: "50px" }}
                    onClick={handleDisconnect}
                >
                    {shortenText(account || "", 6, 4)}
                </button>
            )}
        </header>
    );
};

export default Header;
