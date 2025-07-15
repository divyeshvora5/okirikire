"use client";
import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ClientProviders from "./ClientProviders";
import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { useDispatch, useSelector } from "react-redux";
import {
    globalState,
    resetGlobalStates,
    setWalletDetails,
} from "@/redux/reducer/globalSlice";
import { removeStorageData, saveStorageData } from "@/utils/helpers";
import {
    getCompletedLevelsAction,
    getCurrentUserLevelAction,
    getPathDetailsAction,
    getUserBalanceAction,
} from "@/redux/actions/globalAction";

const WalletSync = () => {
    const { account, chainId, status, wallet, chain, deactivate } =
        useActiveWeb3React();
    const { globalPath } = useSelector(globalState);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!chain) {
            dispatch(resetGlobalStates());
            return;
        }
        dispatch(getPathDetailsAction({ path: globalPath, chain }));
    }, [chain, globalPath]);

    useEffect(() => {
        if (!wallet?.address || !chain) return;
        dispatch(getUserBalanceAction({ wallet, path: globalPath, chain }));
        dispatch(
            getCurrentUserLevelAction({ wallet, path: globalPath, chain }),
        );
        dispatch(getCompletedLevelsAction({ wallet, path: globalPath, chain }));
    }, [wallet?.address, chain, globalPath]);

    useEffect(() => {
        if (status === "connecting") return;
        if (status === "connected" && account && chainId) {
            try {
                dispatch(
                    setWalletDetails({
                        account: account?.toLowerCase(),
                        chainId: chainId,
                        status: "connected",
                    }),
                );
                saveStorageData("connectedWallet", wallet?.address);
            } catch (err) {
                console.log("err", err);
            }
        } else {
            dispatch(
                setWalletDetails({
                    account: null,
                    chainId: null,
                    status: "disconnected",
                }),
            );
            removeStorageData("connectedWallet");
        }
    }, [chainId, account]);
    return null;
};

const Layout = ({ children }) => {
    return (
        <ClientProviders>
            <WalletSync />
            <Header />
            <main className="min-h-screen bg-white text-black">{children}</main>
            <Footer />
        </ClientProviders>
    );
};

export default Layout;
