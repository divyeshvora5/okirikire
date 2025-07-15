"use client";

import OkirikiriV2 from "@/abi/OkirikiriV2.json";
import ERC20 from "@/abi/ERC20.json";
import DEXRouter from "@/abi/DEXRouter.json";
import { MINI_PATH, PATH_WITH_LEVEL, STANDARD_PATH } from "@/utils/constants";
import { useActiveWeb3React } from "@/hooks/useActiveWeb3React";
import { useDispatch, useSelector } from "react-redux";
import {
    advanceToNextLevelAction,
    donateAction,
    exitAction,
    withdrawAction,
} from "@/redux/actions/globalAction";
import { globalState, setGlobalPath } from "@/redux/reducer/globalSlice";
import { useCallback, useEffect, useMemo } from "react";

const BannerSection = () => {
    //** Hooks */
    const dispatch = useDispatch();
    const { wallet, chain, signMessage } = useActiveWeb3React();
    const { contractLoading, globalPath } = useSelector(globalState);

    const pathName = useMemo(() => {
        return PATH_WITH_LEVEL[globalPath]?.name || "";
    }, [globalPath]);

    //** Handlers */
    const handleDonate = useCallback(
        (path = MINI_PATH) => {
            if (contractLoading) return;
            dispatch(
                donateAction({
                    path: path,
                    wallet,
                    chain,
                    signMessage,
                }),
            );
        },
        [contractLoading, dispatch, wallet, chain, signMessage],
    );

    const handleWithdraw = useCallback(() => {
        if (contractLoading) return;
        dispatch(
            withdrawAction({
                path: globalPath,
                inMarco: false,
                wallet,
                chain,
                signMessage,
            }),
        );
    }, [contractLoading, dispatch, globalPath, wallet, chain, signMessage]);

    const handleExit = useCallback(() => {
        if (contractLoading) return;
        dispatch(
            exitAction({
                path: globalPath,
                inMarco: false,
                wallet,
                chain,
                signMessage,
            }),
        );
    }, [contractLoading, dispatch, globalPath, wallet, chain, signMessage]);

    const handleAdvanceToNextLevel = useCallback(() => {
        if (contractLoading) return;
        dispatch(
            advanceToNextLevelAction({
                path: globalPath,
                wallet,
                chain,
                signMessage,
            }),
        );
    }, [contractLoading, dispatch, globalPath, wallet, chain, signMessage]);

    const handlePathChange = useCallback(() => {
        if (contractLoading) return;
        const newPath = globalPath === MINI_PATH ? STANDARD_PATH : MINI_PATH;
        dispatch(setGlobalPath(newPath));
    }, [contractLoading, globalPath, dispatch]);

    //** Effects */

    // useEffect(() => {
    //     const okirikiriFunctions = OkirikiriV2.filter(
    //         (item) => item.type === "function",
    //     );
    //     const ERC20Functions = ERC20.filter((item) => item.type === "function");
    //     const DEXRouterFunctions = DEXRouter.filter(
    //         (item) => item.type === "function",
    //     );
    //     console.log("🚀 ~ OkirikiriV2:", okirikiriFunctions);
    //     console.log("🚀 ~ ERC20Functions:", ERC20Functions);
    //     console.log("🚀 ~ useEffect ~ DEXRouterFunctions:", DEXRouterFunctions);
    // }, []);

    return (
        <>
            <section className="flex flex-col items-center text-center px-4 py-20 max-w-3xl mx-auto">
                <h2 className="text-sm tracking-widest uppercase mb-4">
                    A new concept starts now
                </h2>
                <h1 className="text-4xl font-bold font-handwriting mb-4">
                    Okirikiri - {pathName}
                </h1>
                <p className="text-gray-700 mb-6">
                    The revolutionary and decentralized protocol of a democratic
                    circular economy based on voluntary donations that can solve
                    the problem of poverty in the world.
                </p>
                <p className="mb-6 font-medium uppercase tracking-wide">
                    Reserve your spot in the Okirikiri process
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        className="bg-black text-white px-6 py-3 rounded-full text-sm hover:cursor-pointer"
                        onClick={(e) => handleDonate(MINI_PATH)}
                        disabled={contractLoading}
                    >
                        DONATION NOW 25 USDT{" "}
                        <span className="text-xs ml-1">(Mini Path)</span>
                    </button>
                    <button
                        className="bg-black text-white px-6 py-3 rounded-full text-sm hover:cursor-pointer"
                        onClick={(e) => handleDonate(STANDARD_PATH)}
                        disabled={contractLoading}
                    >
                        DONATION NOW 250 USDT{" "}
                        <span className="text-xs ml-1">(Standard Path)</span>
                    </button>

                    {/* Buttons for testing purposes */}

                    {/* <button
                        className="bg-black text-white px-6 py-3 rounded-full text-sm hover:cursor-pointer"
                        onClick={() => handleWithdraw()}
                        disabled={contractLoading}
                    >
                        Withdraw
                    </button>
                    <button
                        className="bg-black text-white px-6 py-3 rounded-full text-sm hover:cursor-pointer"
                        onClick={() => handleExit()}
                        disabled={contractLoading}
                    >
                        Exit
                    </button>
                    <button
                        className="bg-black text-white px-6 py-3 rounded-full text-sm hover:cursor-pointer"
                        onClick={() => handlePathChange()}
                        disabled={contractLoading}
                    >
                        Change Path
                    </button>
                    <button
                        className="bg-black text-white px-6 py-3 rounded-full text-sm hover:cursor-pointer"
                        onClick={() => handleAdvanceToNextLevel()}
                        disabled={contractLoading}
                    >
                        advanceToNextLevel
                    </button> */}
                </div>
            </section>
        </>
    );
};

export default BannerSection;
