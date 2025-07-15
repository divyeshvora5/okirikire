import OkirikiriV2 from "@/abi/OkirikiriV2.json";
import ERC20 from "@/abi/ERC20.json";
import DEXRouter from "@/abi/DEXRouter.json";
import {
    getContract,
    toWei,
    prepareContractCall,
    sendAndConfirmTransaction,
    readContract,
    resolveMethod,
} from "thirdweb";
import { CONTRACT_ADDRESS, USDT_TOKEN_DECIMALS } from "@/utils/constants";
import { delay, fromWei, getSlippageAmount } from "@/utils/helpers";
import { client } from "@/utils/walletPrefrences";

const returnObject = (success = false, message = "", data = null) => ({
    success,
    message,
    data,
});

const getOkirikiriV2Contract = (chain) => {
    return getContract({
        client: client,
        chain,
        address: CONTRACT_ADDRESS.okirikiriv2,
        abi: OkirikiriV2,
    });
};

const prepareSlippageParams = async ({
    withdrawAmount,
    inMarco,
    path,
    isExit = false,
    chain,
}) => {
    if (!inMarco) return isExit ? [path, false, 0] : [null, path, false, 0];

    const routerContract = getContract({
        client,
        chain,
        address: CONTRACT_ADDRESS.SwapRouter,
        abi: DEXRouter,
    });

    if (!routerContract) {
        throw new Error("Router contract not found");
    }

    const result = await readContract({
        contract: routerContract,
        method: resolveMethod("getAmountsOut"),
        params: [
            withdrawAmount,
            [CONTRACT_ADDRESS.USDT, CONTRACT_ADDRESS.Marco],
        ],
    });

    if (!result || !result.length) {
        throw new Error("Failed to get marco amounts out");
    }

    const marcoAmount = result[result.length - 1];
    const slippageAmount = getSlippageAmount(marcoAmount);

    return isExit
        ? [path, true, slippageAmount]
        : [null, path, true, slippageAmount];
};

//** Token Approval Contract Call */
export const approveToken = async ({ wallet, chain, amount }) => {
    try {
        const tokenContract = getContract({
            client: client,
            chain,
            address: CONTRACT_ADDRESS.USDT,
            abi: ERC20,
        });
        if (!tokenContract)
            return returnObject(false, "Token contract not found");

        const result = await readContract({
            contract: tokenContract,
            method: resolveMethod("allowance"),
            params: [wallet.address, CONTRACT_ADDRESS.okirikiriv2],
        });

        const allowedAmount = Number(
            fromWei(Number(result), USDT_TOKEN_DECIMALS),
        );

        const amountToApprove = Number(amount) - allowedAmount;
        if (amountToApprove <= 0) {
            return returnObject(true, "No additional approval needed");
        }

        const parsedAmount = toWei(
            amountToApprove.toString(),
            USDT_TOKEN_DECIMALS,
        );

        const approveTx = prepareContractCall({
            contract: tokenContract,
            method: "approve",
            params: [CONTRACT_ADDRESS.okirikiriv2, parsedAmount],
        });
        const approval = await sendAndConfirmTransaction({
            transaction: approveTx,
            account: wallet,
        });
        if (approval.status !== "success") {
            return returnObject(false, "Token approval failed");
        }
        return returnObject(true, "Token approved successfully");
    } catch (error) {
        console.log("approveToken error:", error);
        const message = error.message?.includes("insufficient funds")
            ? "Insufficient funds!"
            : error.message?.includes("User denied transaction")
              ? "Token approval Denied"
              : "Something went wrong while approving token";
        return returnObject(false, message);
    }
};

//** Donate Contract Call */
export const donateToPath = async ({ path, wallet, chain }) => {
    try {
        const contract = getOkirikiriV2Contract(chain);

        if (!contract) {
            return returnObject(false, "Donation contract not found");
        }

        const donateTx = prepareContractCall({
            contract: contract,
            method: "donate",
            params: [path],
        });

        const result = await sendAndConfirmTransaction({
            transaction: donateTx,
            account: wallet,
        });

        if (result.status === "success") {
            console.log("txResult:", result);
            await delay(2000);
            return returnObject(true, "Donation successful");
        }

        return returnObject(false, "Donation transaction failed");
    } catch (error) {
        console.log("donateToPath error:", error);
        const message = error.message?.includes("insufficient funds")
            ? "Insufficient funds!"
            : error.message?.includes("User has already entered this path")
              ? "You have already entered this path"
              : "Something went wrong while donating";
        return returnObject(false, message);
    }
};

//** Withdraw Contract Call */
export const withdrawFromPath = async ({
    path,
    amount,
    wallet,
    chain,
    inMarco = false,
    withdrawAmount = 0,
}) => {
    try {
        const parsedAmount = toWei(
            amount?.toString() || "0",
            USDT_TOKEN_DECIMALS,
        );

        let [_, resolvedPath, useMarco, slippage] = await prepareSlippageParams(
            {
                withdrawAmount,
                inMarco,
                path,
                isExit: false,
                chain,
            },
        ).catch((error) => {
            return [null, path, false, 0];
        });

        const PARAMS = [parsedAmount, resolvedPath, useMarco, slippage];

        const contract = getOkirikiriV2Contract(chain);
        if (!contract)
            return returnObject(false, "Withdraw contract not found");

        const tx = prepareContractCall({
            contract,
            method: "withdraw",
            params: PARAMS,
        });

        const result = await sendAndConfirmTransaction({
            transaction: tx,
            account: wallet,
        });

        if (result.status === "success") {
            console.log("txResult:", result);
            await delay(2000);
            return returnObject(true, "Withdrawal successful");
        }

        return returnObject(false, "Withdrawal transaction failed");
    } catch (error) {
        console.log("withdrawFromPath error:", error);
        const message = error.message?.includes("Insufficient balance")
            ? "Insufficient balance"
            : "Something went wrong while withdrawal";
        return returnObject(false, message);
    }
};

//** Exit Contract Call */
export const exitFromPath = async ({
    path,
    wallet,
    chain,
    inMarco = false,
    withdrawAmount = 0,
}) => {
    try {
        const PARAMS = await prepareSlippageParams({
            withdrawAmount,
            inMarco,
            path,
            isExit: true,
            chain,
        }).catch((error) => {
            return [path, false, 0];
        });

        const contract = getOkirikiriV2Contract(chain);
        if (!contract) return returnObject(false, "Exit contract not found");

        const tx = prepareContractCall({
            contract,
            method: "exit",
            params: PARAMS,
        });

        const result = await sendAndConfirmTransaction({
            transaction: tx,
            account: wallet,
        });

        if (result.status === "success") {
            console.log("txResult:", result);
            await delay(2000);
            return returnObject(true, "Exit successful");
        }

        return returnObject(false, "Exit transaction failed");
    } catch (error) {
        console.log("exitFromPath error:", error);
        const message = error.message?.includes("Must complete current level")
            ? "Complete the current level before exiting"
            : "Something went wrong while exiting";
        return returnObject(false, message);
    }
};

//** Advance To Next Level Contract Call */
export const advanceToNextLevel = async ({
    path,
    wallet,
    chain,
    signMessage,
}) => {
    try {
        const contract = getOkirikiriV2Contract(chain);
        if (!contract) return returnObject(false, "Advance contract not found");
        const transaction = prepareContractCall({
            contract: contract,
            method: "advanceToNextLevel",
            params: [path],
        });
        const result = await sendAndConfirmTransaction({
            transaction: transaction,
            account: wallet,
        });
        if (result.status === "success") {
            console.log("txResult:", result);
            await delay(2000);
            return returnObject(true, "Advanced to next level successfully");
        }
        return returnObject(false, "Advance to next level transaction failed");
    } catch (error) {
        console.log("advanceToNextLevel error:", error);
        const message = error.message?.includes(
            "Must complete current level first",
        )
            ? "Complete the current level before Moving to next level"
            : error.message?.includes("Insufficient balance")
              ? "Insufficient balance"
              : "Something went wrong while Moving to next level";
        return returnObject(false, message);
    }
};

//** Path Details Contract Call */
export const getPathDetails = async ({ path, chain }) => {
    try {
        const contract = getOkirikiriV2Contract(chain);

        if (!contract) return returnObject(false, "Contract not found");

        const result = await readContract({
            contract: contract,
            method: resolveMethod("levels"),
            params: [path, "0"],
        });
        if (result?.length) {
            return returnObject(true, "Path details fetched.", {
                path,
                resultArr: [
                    result[0],
                    Number(result[1]),
                    Number(result[2]),
                    Number(result[3]),
                ],
            });
        }
        return returnObject(false, "No path details found");
    } catch (error) {
        console.log("getPathDetails error:", error);
        return returnObject(
            false,
            "Something went wrong while fetching path details",
        );
    }
};

//** Get User Balance Contract Call */
export const getUserBalance = async ({ wallet, path, chain }) => {
    try {
        if (!wallet?.address) return returnObject(false, "No wallet connected");

        const contract = getOkirikiriV2Contract(chain);

        if (!contract) return returnObject(false, "Contract not found");

        const result = await readContract({
            contract: contract,
            method: resolveMethod("balances"),
            params: [wallet.address, path],
        });

        return returnObject(true, "Balance fetched", {
            path,
            balance: Number(fromWei(Number(result), USDT_TOKEN_DECIMALS)),
        });
    } catch (error) {
        console.log("getUserBalance error:", error);
        return returnObject(false, "Error fetching user balance");
    }
};

//** Get User Level Contract Call */
export const getCurrentUserLevel = async ({ wallet, path, chain }) => {
    try {
        if (!wallet?.address) return returnObject(false, "No wallet connected");

        const contract = getOkirikiriV2Contract(chain);

        if (!contract) return returnObject(false, "Contract not found");

        const result = await readContract({
            contract: contract,
            method: resolveMethod("currentLevel"),
            params: [wallet.address, path],
        });

        return returnObject(true, "Current level fetched", {
            path,
            level: Number(result),
        });
    } catch (error) {
        console.log("getCurrentUserLevel error:", error);
        return returnObject(false, "Error fetching current user level");
    }
};

//** Get Completed Levels Contract Call */
export const getCompletedLevels = async ({ wallet, path, chain }) => {
    try {
        if (!wallet?.address) return returnObject(false, "No wallet connected");

        const contract = getOkirikiriV2Contract(chain);

        if (!contract) return returnObject(false, "Contract not found");

        const result = await readContract({
            contract: contract,
            method: resolveMethod("completedLevels"),
            params: [wallet.address, path],
        });

        return returnObject(true, "Completed levels fetched", {
            path,
            level: Number(result),
        });
    } catch (error) {
        console.log("getCompletedLevels error:", error);
        return returnObject(false, "Error fetching completed levels");
    }
};
