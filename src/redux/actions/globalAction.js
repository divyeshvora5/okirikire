import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast as Toast } from "react-toastify";
import {
    delay,
    getWithdrawableBalance,
    validateNetwork,
} from "@/utils/helpers";
import {
    donateToPath,
    withdrawFromPath,
    exitFromPath,
    getPathDetails,
    getUserBalance,
    getCurrentUserLevel,
    advanceToNextLevel,
    approveToken,
    getCompletedLevels,
} from "@/contracts";
import { PATH_WITH_LEVEL } from "@/utils/constants";

//** Error Handlers */
const handleContractResponse = (toastId, result, successMsg, errorMsg) => {
    Toast.dismiss(toastId);
    if (result.success) {
        Toast.success(successMsg);
        return result;
    } else {
        Toast.error(result.message || errorMsg);
        // console.log(result);
        return result;
    }
};

const handleCatchError = (actionName = "Error", error) => {
    const message = error?.message || "Something went wrong";
    Toast.error(message);
    // console.log(actionName, error);
    return;
};

//** Donate Action */
export const donateAction = createAsyncThunk(
    "global/donateAction",
    async (
        { path, wallet, chain, signMessage },
        { getState, rejectWithValue, dispatch },
    ) => {
        let sign_toast_id, approval_toast_id, donate_toast_id;
        try {
            const { global } = getState();
            const { account, chainId } = global.walletDetails;

            const donationPrice =
                PATH_WITH_LEVEL?.[path]?.level?.[0]?.entryAmount || 0;

            const validate = validateNetwork(account, chain?.id);
            if (!validate.status) {
                Toast.error(validate.message);
                return rejectWithValue(validate.message);
            }

            sign_toast_id = Toast.loading("Signing...");
            const message = `I want to donate to path ${path}:${account.toLowerCase()}:${chainId}`;
            const signature = await signMessage({ message });

            if (!signature) {
                Toast.dismiss(sign_toast_id);
                Toast.error("Signing failed!");
                return rejectWithValue("Signing failed");
            }

            Toast.dismiss(sign_toast_id);
            approval_toast_id = Toast.loading(
                "Checking and Approving Tokens...",
            );

            const tokenApproval = await approveToken({
                path,
                wallet,
                chain,
                amount: donationPrice,
            });
            await delay(2000); // To show approval toast
            Toast.dismiss(approval_toast_id);
            if (!tokenApproval.success) {
                Toast.error(tokenApproval.message || "Token approval failed");
                return rejectWithValue(
                    tokenApproval.message || "Token approval failed",
                );
            }
            donate_toast_id = Toast.loading("Processing donation...");

            const result = await donateToPath({
                path,
                chain,
                wallet,
                amount: donationPrice,
            });

            const handledResult = handleContractResponse(
                donate_toast_id,
                result,
                "Donation successful!",
                "Donation failed",
            );

            if (handledResult.success) {
                dispatch(getPathDetailsAction({ path, chain }));
                dispatch(getCurrentUserLevelAction({ wallet, path, chain }));
                dispatch(getUserBalanceAction({ wallet, path, chain }));
            }

            return handledResult;
        } catch (error) {
            Toast.dismiss(sign_toast_id);
            Toast.dismiss(approval_toast_id);
            Toast.dismiss(donate_toast_id);
            handleCatchError("donateAction error:", error);
            return rejectWithValue(error.message || "Error during donation");
        }
    },
);

//** Withdraw Action */
export const withdrawAction = createAsyncThunk(
    "global/withdrawAction",
    async (
        { path, inMarco = false, wallet, chain, signMessage },
        { getState, rejectWithValue, dispatch },
    ) => {
        let sign_toast_id, toast_id;
        try {
            const { global } = getState();
            const { userBalances, completedLevel, walletDetails } = global;
            const { account, chainId } = walletDetails || {};

            const userBalance = userBalances?.[path] || "0";
            const userCompletedLevel = completedLevel?.[path] || 0;

            const validate = validateNetwork(account, chain?.id);
            if (!validate.status) {
                Toast.error(validate.message);
                return rejectWithValue(validate.message);
            }

            sign_toast_id = Toast.loading("Signing...");
            const message = `I want to withdraw:${account.toLowerCase()}:${path}:${userBalance}:${chainId}`;
            const signature = await signMessage({ message });

            if (!signature) {
                Toast.dismiss(sign_toast_id);
                Toast.error("Signing failed");
                return rejectWithValue("Signing failed");
            }

            Toast.dismiss(sign_toast_id);
            toast_id = Toast.loading("Processing withdrawal...");

            const withdrawAmount = inMarco
                ? getWithdrawableBalance(userBalance, userCompletedLevel)
                : 0;

            const result = await withdrawFromPath({
                path,
                amount: userBalance,
                chain,
                wallet,
                inMarco,
                withdrawAmount,
            });

            const handledResult = handleContractResponse(
                toast_id,
                result,
                "Withdrawal successful!",
                "Withdrawal failed",
            );

            if (handledResult.success) {
                dispatch(getUserBalanceAction({ wallet, path, chain }));
            }
            return handledResult;
        } catch (error) {
            Toast.dismiss(sign_toast_id);
            Toast.dismiss(toast_id);
            handleCatchError("withdrawAction error:", error);
            return rejectWithValue(error.message || "Error during withdrawal");
        }
    },
);

//** Exit Action */
export const exitAction = createAsyncThunk(
    "global/exitAction",
    async (
        { path, wallet, chain, signMessage, inMarco = false },
        { getState, rejectWithValue, dispatch },
    ) => {
        let sign_toast_id, toast_id;
        try {
            const state = getState();
            const { userBalances, completedLevel, walletDetails } =
                state.global;
            const { account, chainId } = walletDetails || {};

            const userBalance = userBalances?.[path] || "0";
            const userCompletedLevel = completedLevel?.[path] || 0;

            const validate = validateNetwork(account, chain?.id);
            if (!validate.status) {
                Toast.error(validate.message);
                return rejectWithValue(validate.message);
            }

            sign_toast_id = Toast.loading("Signing...");
            const message = `I want to exit from path ${path}:${account.toLowerCase()}:${chainId}`;
            const signature = await signMessage({ message });

            if (!signature) {
                Toast.dismiss(sign_toast_id);
                Toast.error("Signing failed");
                return rejectWithValue("Signing failed");
            }

            Toast.dismiss(sign_toast_id);
            toast_id = Toast.loading("Processing exit...");

            const withdrawAmount = inMarco
                ? getWithdrawableBalance(userBalance, userCompletedLevel)
                : 0;

            const result = await exitFromPath({
                path,
                chain,
                wallet,
                inMarco,
                withdrawAmount,
            });

            const handledResult = handleContractResponse(
                toast_id,
                result,
                "Exit successful!",
                "Exit failed",
            );

            if (handledResult.success) {
                dispatch(getCurrentUserLevelAction({ wallet, path, chain }));
                dispatch(getUserBalanceAction({ wallet, path, chain }));
            }

            return handledResult;
        } catch (error) {
            Toast.dismiss(sign_toast_id);
            Toast.dismiss(toast_id);
            handleCatchError("exitAction error:", error);
            return rejectWithValue(error.message || "Error during exit");
        }
    },
);

//** Advance To Next Level Action */
export const advanceToNextLevelAction = createAsyncThunk(
    "global/advanceToNextLevelAction",
    async (
        { path, wallet, chain, signMessage },
        { getState, rejectWithValue, dispatch },
    ) => {
        let sign_toast_id, approval_toast_id, toast_id;
        try {
            const { global } = getState();
            const { account, chainId } = global.walletDetails;
            const { currentUserLevel, userBalances } = global;

            const validate = validateNetwork(account, chain?.id);
            if (!validate.status) {
                Toast.error(validate.message);
                return rejectWithValue(validate.message);
            }

            sign_toast_id = Toast.loading("Signing...");
            const message = `I want to move to next level ${path}:${account.toLowerCase()}:${chainId}`;
            const signature = await signMessage({ message });

            if (!signature) {
                Toast.dismiss(sign_toast_id);
                Toast.error("Signing failed");
                return rejectWithValue("Signing failed");
            }

            Toast.dismiss(sign_toast_id);
            const currentLevel = currentUserLevel?.[path] || 0;

            if (currentLevel > 3 || currentLevel === 0) {
                Toast.dismiss(toast_id);
                Toast.error("You cannot advance to next level");
                return rejectWithValue("Invalid current level");
            }

            const userBalance = userBalances?.[path] || 0;
            const nextLevelEntryAmount =
                PATH_WITH_LEVEL?.[path]?.level?.[currentLevel]?.entryAmount ||
                0;

            if (Number(userBalance) < nextLevelEntryAmount) {
                approval_toast_id = Toast.loading(
                    "Checking and Approving Tokens for next level...",
                );
                const approvalResult = await approveToken({
                    path,
                    wallet,
                    chain,
                    amount: nextLevelEntryAmount - userBalance,
                });
                await delay(2000); // To show approval toast
                Toast.dismiss(approval_toast_id);
                if (!approvalResult.success) {
                    Toast.error(
                        approvalResult.message ||
                            "Token approval for next level failed",
                    );
                    return rejectWithValue(
                        approvalResult.message ||
                            "Token approval for next level failed",
                    );
                }
            }

            toast_id = Toast.loading("Processing Next Level...");

            const result = await advanceToNextLevel({ path, chain, wallet });

            const handledResult = handleContractResponse(
                toast_id,
                result,
                "Move to Next Level successful!",
                "Move to next level failed",
            );

            if (handledResult.success) {
                dispatch(getPathDetailsAction({ path, chain }));
                dispatch(getCurrentUserLevelAction({ wallet, path, chain }));
                dispatch(getUserBalanceAction({ wallet, path, chain }));
            }

            return handledResult;
        } catch (error) {
            Toast.dismiss(sign_toast_id);
            Toast.dismiss(approval_toast_id);
            Toast.dismiss(toast_id);
            handleCatchError("advanceToNextLevelAction error:", error);
            return rejectWithValue(error.message || "Error during next level");
        }
    },
);

//** Get Path Details Action */
export const getPathDetailsAction = createAsyncThunk(
    "global/getPathDetailsAction",
    async ({ path, chain }, { rejectWithValue }) => {
        const result = await getPathDetails({ path, chain });
        if (result.success) return result.data;
        else
            return rejectWithValue(
                result.message || "Failed to fetch path details",
            );
    },
);

//** Get User Balance Action */
export const getUserBalanceAction = createAsyncThunk(
    "global/getUserBalanceAction",
    async ({ wallet, path, chain }, { rejectWithValue }) => {
        const result = await getUserBalance({ wallet, path, chain });
        if (result.success) return result.data;
        else
            return rejectWithValue(
                result.message || "Failed to fetch user balance",
            );
    },
);

//** Get Current User Level Action */
export const getCurrentUserLevelAction = createAsyncThunk(
    "global/getCurrentUserLevelAction",
    async ({ wallet, path, chain }, { rejectWithValue }) => {
        const result = await getCurrentUserLevel({ wallet, path, chain });
        if (result.success) return result.data;
        else
            return rejectWithValue(
                result.message || "Failed to fetch user level",
            );
    },
);

//** Get Completed Levels Action */
export const getCompletedLevelsAction = createAsyncThunk(
    "global/getCompletedLevelsAction",
    async ({ wallet, path, chain }, { rejectWithValue }) => {
        const result = await getCompletedLevels({ wallet, path, chain });
        if (result.success) return result.data;
        else
            return rejectWithValue(
                result.message || "Failed to fetch completed levels",
            );
    },
);
