import { createSlice } from "@reduxjs/toolkit";
import {
    advanceToNextLevelAction,
    donateAction,
    exitAction,
    getCompletedLevelsAction,
    getCurrentUserLevelAction,
    getFeeAction,
    getLevelDataAction,
    getPathDetailsAction,
    getUserBalanceAction,
    withdrawAction,
} from "../actions/globalAction";
import { DEFAULT_PATH, MINI_PATH, STANDARD_PATH } from "@/utils/constants";


export const LEVELDATA_LOADING_STATE = {
    INITIAL: "INITIAL",
    PENDING: "PENDING",
    COMPLETED: "COMPLETED",
    REJECTED: "REJECTED"
}

const createLevelData = () => ({
    currentMasterReceiver: null,
    donationCount: null,
    head: null,
    tail: null,
});

const createUserState = () => ({
    [MINI_PATH]: 0,
    [STANDARD_PATH]: 0,
});

const createLevelState = () => ({
    [MINI_PATH]: null,
    [STANDARD_PATH]: null,
});

const createPathDetailsState = () => ({
    [MINI_PATH]: createLevelData(),
    [STANDARD_PATH]: createLevelData(),
});

const createCompletedLevelsState = () => ({
    [MINI_PATH]: null,
    [STANDARD_PATH]: null,
});

const initialState = {
    loading: false,
    contractLoading: false,
    error: null,
    chainId: null,
    account: null,
    globalPath: DEFAULT_PATH,
    walletDetails: {
        chainId: null,
        account: null,
        status: null,
    },

    // Path Details
    isPathDetailsLoading: false,
    pathDetails: createPathDetailsState(),

    // Current Level
    isCurrentUserLevelLoading: false,
    currentUserLevel: createLevelState(),

    // Balances
    isUserBalancesLoading: false,
    userBalances: createUserState(),

    //Completed Levels
    isCompletedLevelsLoading: false,
    completedLevel: createCompletedLevelsState(),

    //getleveldata
    levelData: {},
    levelDataFetchState: LEVELDATA_LOADING_STATE.INITIAL,

    fee: null,


    withdrawTokenSelect: "USDT",


    selectedLevelNo: null,
    levelDonationCount: null

};

const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        setWalletDetails: (state, { payload }) => {
            state.walletDetails = {
                account: payload.account,
                chainId: payload.chainId,
                status: payload.status,
            };
            state.account = payload.account;
            state.chainId = payload.chainId;
        },
        setChainId: (state, { payload }) => {
            state.walletDetails.chainId = payload;
        },
        setGlobalPath: (state, { payload }) => {
            state.globalPath = payload;
        },
        resetGlobalStates: (state) => {
            state.pathDetails = createPathDetailsState();
            state.currentUserLevel = createLevelState();
            state.userBalances = createUserState();
            state.completedLevel = createCompletedLevelsState();
        },
        setWithDrawTokenSelectAction: (state, { payload }) => {
            state.withdrawTokenSelect = payload
        },
        setSelectedLevel: (state, { payload }) => {
            state.selectedLevelNo = payload;
        },
        setLevelDonationCount: (state, { payload }) => {
            state.levelDonationCount = payload
        }
    },
    extraReducers: (builder) => {
        builder

            //** Donate Action */
            .addCase(donateAction.pending, (state) => {
                state.contractLoading = true;
            })
            .addCase(donateAction.fulfilled, (state) => {
                state.contractLoading = false;
            })
            .addCase(donateAction.rejected, (state, { payload }) => {
                state.contractLoading = false;
                // state.error = payload;
            })

            //** Withdraw Action */
            .addCase(withdrawAction.pending, (state) => {
                state.contractLoading = true;
            })
            .addCase(withdrawAction.fulfilled, (state) => {
                state.contractLoading = false;
            })
            .addCase(withdrawAction.rejected, (state, { payload }) => {
                state.contractLoading = false;
                // state.error = payload;
            })

            //** Exit Action */
            .addCase(exitAction.pending, (state) => {
                state.contractLoading = true;
            })
            .addCase(exitAction.fulfilled, (state) => {
                state.contractLoading = false;
            })
            .addCase(exitAction.rejected, (state, { payload }) => {
                state.contractLoading = false;
                // state.error = payload;
            })

            //** Advance To Next Level Action */
            .addCase(advanceToNextLevelAction.pending, (state) => {
                state.contractLoading = true;
            })
            .addCase(advanceToNextLevelAction.fulfilled, (state) => {
                state.contractLoading = false;
            })
            .addCase(
                advanceToNextLevelAction.rejected,
                (state, { payload }) => {
                    state.contractLoading = false;
                    // state.error = payload;
                },
            )

            //** Get Path Details Action */
            .addCase(getPathDetailsAction.pending, (state) => {
                state.isPathDetailsLoading = true;
            })
            .addCase(getPathDetailsAction.fulfilled, (state, { payload }) => {
                state.isPathDetailsLoading = false;
                const { path, resultArr } = payload;

                state.pathDetails[path] = {
                    currentMasterReceiver: resultArr[0],
                    donationCount: resultArr[1],
                    head: resultArr[2],
                    tail: resultArr[3],
                };
            })
            .addCase(getPathDetailsAction.rejected, (state, { payload }) => {
                state.isPathDetailsLoading = false;
            })

            //** Get User Balance */
            .addCase(getUserBalanceAction.pending, (state) => {
                state.isUserBalancesLoading = true;
            })
            .addCase(getUserBalanceAction.fulfilled, (state, { payload }) => {
                state.isUserBalancesLoading = false;
                
                state.userBalances["0"] = payload?.miniBalance?.balance;
                state.userBalances["1"] = payload?.standardBalance?.balance;
            
            })
            .addCase(getUserBalanceAction.rejected, (state, { payload }) => {
                state.isUserBalancesLoading = false;
            })

            //** Get Current User Level */
            .addCase(getCurrentUserLevelAction.pending, (state) => {
                state.isCurrentUserLevelLoading = true;
            })
            .addCase(
                getCurrentUserLevelAction.fulfilled,
                (state, { payload }) => {
                    state.isCurrentUserLevelLoading = false;
                    const { path, level } = payload;
                    state.currentUserLevel[path] = level;
                },
            )
            .addCase(
                getCurrentUserLevelAction.rejected,
                (state, { payload }) => {
                    state.isCurrentUserLevelLoading = false;
                },
            )

            //** Get Completed Levels */
            .addCase(getCompletedLevelsAction.pending, (state) => {
                state.isCompletedLevelsLoading = true;
            })
            .addCase(
                getCompletedLevelsAction.fulfilled,
                (state, { payload }) => {
                    state.isCompletedLevelsLoading = false;
                    const { path, level } = payload;
                    state.completedLevel[path] = level;
                },
            )
            .addCase(
                getCompletedLevelsAction.rejected,
                (state, { payload }) => {
                    state.isCompletedLevelsLoading = false;
                },
            )

            //getLeveldataAction
            .addCase(
                getLevelDataAction.pending,
                (state) => {
                    state.levelDataFetchState = LEVELDATA_LOADING_STATE.PENDING;
                }
            )
            .addCase(
                getLevelDataAction.fulfilled,
                (state, { payload }) => {
                    state.levelData = payload;
                    state.levelDataFetchState = LEVELDATA_LOADING_STATE.COMPLETED;
                },
            )
            .addCase(
                getLevelDataAction.rejected,
                (state, { payload }) => {
                    state.isCompletedLevelsLoading = LEVELDATA_LOADING_STATE.REJECTED;
                },
            )

            //getfee

            .addCase(
                getFeeAction.pending,
                (state) => {
                    state.contractLoading = true;
                }
            )
            .addCase(
                getFeeAction.fulfilled,
                (state, { payload }) => {
                    state.contractLoading = false;
                    state.fee = payload / 100;
                },
            )
            .addCase(
                getFeeAction.rejected,
                (state, { payload }) => {
                    state.contractLoading = false;
                },
            )

    },
});

export const globalState = (state) => state.global;

export const {
    setWalletDetails,
    setChainId,
    setGlobalPath,
    resetGlobalStates,
    setWithDrawTokenSelectAction,
    setSelectedLevel,
    setLevelDonationCount
} = globalSlice.actions;

export const globalReducer = globalSlice.reducer;
