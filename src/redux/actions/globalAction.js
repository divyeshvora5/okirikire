import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast as Toast } from "react-toastify";
import {
    delay,
    fromWei,
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
    getfeeBasisPoints,
} from "@/contracts";
import { CONTRACT_ADDRESS, OKIRIKIRE_DEPOLOY_BLOCKNUMBER, PATH_WITH_LEVEL, PLATFORM_FEE } from "@/utils/constants";
import { Contract } from "ethers";
import OkirikiriV2 from "@/abi/OkirikiriV2.json";
import { ZERO_ADDRESS } from "thirdweb";

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

            console.log('donationPrice', donationPrice)

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
            console.log('tokenApproval', tokenApproval)
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
        { path, inMarco = false, wallet, chain, signMessage, withdrawamount },
        { getState, rejectWithValue, dispatch },
    ) => {
        let sign_toast_id, toast_id;
        try {
            const { global } = getState();
            const { userBalances, completedLevel, walletDetails } = global;
            const { account, chainId } = walletDetails || {};

            const userBalance = Math.min(withdrawamount, userBalances?.[path] || 0);
            const userCompletedLevel = completedLevel?.[path] || 0;

            console.log('userBalance', userBalance)

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

            const feeData = await getfeeBasisPoints({ wallet, chain });

            const withdrawAmount = inMarco
                ? getWithdrawableBalance(userBalance, userCompletedLevel, (feeData.data?.fee / 100) || PLATFORM_FEE)
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

            const feeData = await getfeeBasisPoints({ wallet, chain });

            const withdrawAmount = inMarco
                ? getWithdrawableBalance(userBalance, userCompletedLevel, (feeData.data?.fee / 100) || PLATFORM_FEE)
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

        const [result1, result2] = await Promise.all([
            getUserBalance({ wallet, path: 0, chain }),
            getUserBalance({ wallet, path: 1, chain })
        ])
        console.log('result', result)
        if (result.success) {
            return {
                miniBalance: result1?.data,
                standardBalance: result2?.data
            }
        }
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


//** Get Completed Levels Action */
export const getFeeAction = createAsyncThunk(
    "global/getFeeAction",
    async ({ wallet, chain }, { rejectWithValue }) => {
        try {
            const result = await getfeeBasisPoints({ wallet, chain });

            if (result.success) return result.data?.fee;
            else
                return rejectWithValue(
                    result.message || "Failed to fetch fee",
                );
        } catch (err) {
            console.log('err', err)
            return rejectWithValue(err?.message)
        }
    },
);

export const getLevelDataAction = createAsyncThunk(
    "global/getLevelDataAction",
    async ({ library, account, chain, wallet }, { rejectWithValue, getState }) => {
        const completeData = {}
        try {

            if (!library || !account || !chain || !wallet) {
                return rejectWithValue("Invalid params details")
            };

            const contract = new Contract(CONTRACT_ADDRESS.okirikiriv2, OkirikiriV2, library)
            if (!contract) {
                return rejectWithValue("Contract initialization faield!")
            }

            const state = getState();
            const { globalPath } =
                state.global;

            const eventFilter = contract.filters.Donation(account);
            const eventFilterMasterReciver = contract.filters.Donation(null, null, null, null, null, account, null);


            const [events, eventMasterReciver, leveldata1, leveldata2, leveldata3, leveldata4, currentLevel] = await Promise.all([
                contract.queryFilter(eventFilter, OKIRIKIRE_DEPOLOY_BLOCKNUMBER, "latest"),
                contract.queryFilter(eventFilterMasterReciver, OKIRIKIRE_DEPOLOY_BLOCKNUMBER, "latest"),
                getPathDetails({ path: globalPath, chain, level: "0" }),
                getPathDetails({ path: globalPath, chain, level: "1" }),
                getPathDetails({ path: globalPath, chain, level: "2" }),
                getPathDetails({ path: globalPath, chain, level: "3" }),
                getCurrentUserLevel({ wallet, path: globalPath, chain })
            ])

            console.log('eventMasterReciver', eventMasterReciver)

            if (leveldata1?.success) {
                completeData["0"] = {
                    donationRecived: leveldata1?.data?.resultArr[4],
                    totalDoner: (leveldata1?.data?.resultArr[3] === 0 && leveldata1?.data?.resultArr[0]?.toLowerCase() === ZERO_ADDRESS)
                        ? 0
                        : leveldata1?.data?.resultArr[3] + 1,
                    donetionCount: leveldata1?.data?.resultArr[1],
                    head: leveldata1?.data?.resultArr[2],
                    levelDataMasterReciver: leveldata1?.data?.resultArr[0]
                }
            }

            if (leveldata2?.success) {
                completeData["1"] = {
                    donationRecived: leveldata2?.data?.resultArr[4],
                    totalDoner: (leveldata2?.data?.resultArr[3] === 0 && leveldata2?.data?.resultArr[0]?.toLowerCase() === ZERO_ADDRESS)
                        ? 0
                        : leveldata2?.data?.resultArr[3] + 1,
                    donetionCount: leveldata2?.data?.resultArr[1],
                    head: leveldata2?.data?.resultArr[2],
                    levelDataMasterReciver: leveldata2?.data?.resultArr[0]

                }
            }

            if (leveldata3?.success) {
                completeData["2"] = {
                    donationRecived: leveldata3?.data?.resultArr[4],
                    totalDoner: (leveldata3?.data?.resultArr[3] === 0 && leveldata3?.data?.resultArr[0]?.toLowerCase() === ZERO_ADDRESS)
                        ? 0
                        : leveldata3?.data?.resultArr[3] + 1,
                    donetionCount: leveldata3?.data?.resultArr[1],
                    head: leveldata3?.data?.resultArr[2],
                    levelDataMasterReciver: leveldata3?.data?.resultArr[0]

                }
            }

            if (leveldata4?.success) {
                completeData["3"] = {
                    donationRecived: leveldata4?.data?.resultArr[4],
                    totalDoner: (leveldata4?.data?.resultArr[3] === 0 && leveldata4?.data?.resultArr[0]?.toLowerCase() === ZERO_ADDRESS)
                        ? 0
                        : leveldata4?.data?.resultArr[3] + 1,
                    donetionCount: leveldata4?.data?.resultArr[1],
                    head: leveldata4?.data?.resultArr[2],
                    levelDataMasterReciver: leveldata4?.data?.resultArr[0]

                }
            }

            const data = events.map((event) => {
                const args = event.args
                const blockNumber = event.blockNumber
                return {
                    doner: args[0]?.toLowerCase(),
                    path: Number(args[1]),
                    level: Number(args[2]),
                    donationIndex: Number(args[3]),
                    amount: +fromWei(Number(args[4])),
                    masterReciver: args[5]?.toLowerCase(),
                    blockNumber
                }
            })

            const masterReciverEventsData = eventMasterReciver.map((event) => {
                const args = event.args
                const blockNumber = event.blockNumber

                return {
                    doner: args[0]?.toLowerCase(),
                    path: Number(args[1]),
                    level: Number(args[2]),
                    donationIndex: Number(args[3]),
                    amount: +fromWei(Number(args[4])),
                    masterReciver: args[5]?.toLowerCase(),
                    blockNumber
                }
            })

            return {
                currentUserLevel: currentLevel?.success ? currentLevel?.data : {},
                eventData: data,
                masterReciverEventsData,
                completeData
            }
        } catch (err) {
            console.log('err', err)
            return rejectWithValue(err.message);
        }
    },
)


export const getUserHistoryAction = createAsyncThunk(
    "global/getUserHistoryAction",
    async ({ library, account, chain, wallet }, { rejectWithValue, getState }) => {
        try {
            console.log("call")
            if (!library || !account || !chain || !wallet) {
                return rejectWithValue("Invalid params details")
            };

            const contract = new Contract(CONTRACT_ADDRESS.okirikiriv2, OkirikiriV2, library)
            if (!contract) {
                return rejectWithValue("Contract initialization faield!")
            }

            const state = getState();
            const { globalPath } =
                state.global;


            // event Withdrawal(
            //         address indexed user,
            //         Path path,
            //         uint256 amount,
            //         uint256 fee,
            //         bool inMarco,
            //         uint256 netAmount
            //     );

            //             event UserExit(
            //     address indexed user,
            //     Path path,
            //     uint256 withdrawnAmount,
            //     bool inMarco,
            //     uint256 timestamp
            // );

            const donationFilter = contract.filters.Donation(null, null, null, null, null, account, null);
            const withDrawalFilter = contract.filters.Withdrawal(account);
            const exitFilter = contract.filters.UserExit(account)


            const [donationEvents, WithdrawlEvents, exitEventData] = await Promise.all([
                contract.queryFilter(donationFilter, OKIRIKIRE_DEPOLOY_BLOCKNUMBER, "latest"),
                contract.queryFilter(withDrawalFilter, OKIRIKIRE_DEPOLOY_BLOCKNUMBER, "latest"),
                contract.queryFilter(exitFilter, OKIRIKIRE_DEPOLOY_BLOCKNUMBER, "latest"),
            ])

            const donationData = donationEvents.map((event) => {
                const args = event.args
                const blockNumber = event.blockNumber
                return {

                    type: "Donation",
                    doner: args[0],
                    amount: +fromWei(Number(args[4])),
                    path: Number(args[1]),
                    level: Number(args[2]),
                    date: Number(args[6]),
                    transactionHash: event.transactionHash,
                    blockNumber

                }
            })


            const withdrawData = WithdrawlEvents.map((event) => {
                const args = event.args
                const blockNumber = event.blockNumber
                return {

                    type: "Withdrawal",
                    amount: +fromWei(Number(args[5])),
                    fee: +fromWei(Number(args[3])),
                    date: Number(args[6]),
                    transactionHash: event.transactionHash,
                    blockNumber

                }
            })


            const exitData = exitEventData.map((event) => {
                const args = event.args
                const blockNumber = event.blockNumber
                return {

                    type: "Exit",
                    date: Number(args[4]),
                    Path: Number(args[2]),
                    transactionHash: event.transactionHash,
                    blockNumber

                }
            })

            const combinedData = [...donationData, ...withdrawData, ...exitData];
            const events = combinedData.sort((a, b) => b.date - a.date);

            console.log('events', events)

            const donationTotal = events
                .filter(event => event.type === "Donation")
                .reduce((sum, event) => sum + event.amount, 0);

            const withdrawalTotal = events
                .filter(event => event.type === "Withdrawal")
                .reduce((sum, event) => sum + event.amount, 0);

            const withdrawalFeesTotal = events
                .filter(event => event.type === "Withdrawal")
                .reduce((sum, event) => sum + event.fee, 0);

            return {
                history: events,
                totalDonation: donationTotal,
                totalWithDraw: withdrawalTotal,
                totalFeePaid: withdrawalFeesTotal
            }
        } catch (err) {
            console.log('err', err)
            return rejectWithValue(err.message);
        }
    },
)