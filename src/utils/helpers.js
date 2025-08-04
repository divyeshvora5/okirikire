import BigNumber from "bignumber.js";
import {
    CHAIN_NAME,
    CONTRACT_ADDRESS,
    OKIRIKIRE_DEPOLOY_BLOCKNUMBER,
    OKIRIKIRI_CHAIN_ID,
    PLATFORM_FEE,
    SLIPPAGE_CONSTANT,
} from "./constants";
import { Contract } from "ethers";
import OkirikiriV2 from "@/abi/OkirikiriV2.json";

BigNumber.config({ EXPONENTIAL_AT: 1e9 });

export const CountParser = (value, fixTo = 2, length = 1) => {
    const numberValue = Number(value);
    if (isNaN(numberValue) || numberValue === 0) return 0;
    if (numberValue >= 1000000000) {
        let formatted = (numberValue / 1000000000).toFixed(length);
        return formatted + "B";
    } else if (numberValue >= 1000000) {
        let formatted = (numberValue / 1000000).toFixed(length);
        if (formatted >= 1000) formatted = 999.9;
        return formatted + "M";
    } else if (numberValue >= 1000) {
        let formatted = (numberValue / 1000).toFixed(length);
        if (formatted >= 1000) formatted = 999.9;
        return formatted + "k";
    } else {
        return Number.isInteger(numberValue)
            ? numberValue
            : Number(numberValue.toFixed(fixTo));
    }
};

export const getWithdrawableBalance = (amount = 0, completedLevel = 0, fee) => {
    console.log({
        amount,
        completedLevel,
        fee
    })
    const weiAmount = new BigNumber(toWei(amount));

    if (weiAmount.isNaN() || weiAmount.lte(0)) {
        return new BigNumber(0).toFixed(0);
    }

    const feesFactor = 1 - fee / 100;

    const result =
        completedLevel < 4 ? weiAmount.multipliedBy(feesFactor) : weiAmount;

    return result.toFixed(0);
};

export const getSlippageAmount = (amount = 0, slippage = SLIPPAGE_CONSTANT) => {
    const calculatedslippage = 1 - (slippage / 100);


    if (amount === 0 || amount === "0") {
        return new BigNumber(0).toFixed(0);
    }
    return new BigNumber(amount).multipliedBy(calculatedslippage).toFixed(0);
};

export const fixDecimal = (value, fixTo = 5) => {
    if (Number.isInteger(value)) {
        return value;
    } else {
        return Number(value.toFixed(fixTo));
    }
};

export const toWei = (amount, decimals = 18) => {
    try {
        if (!amount) {
            return new BigNumber(0).toString();
        }
        return new BigNumber(amount)
            .multipliedBy(new BigNumber(10).exponentiatedBy(decimals))
            .toFixed(0)
            .toString();
    } catch (error) {
        console.log("exeption in toWei , ", error);
        return null;
    }
};

export const fromWei = (amount, decimals = 18) => {
    try {
        if (!amount || +amount <= 0) {
            return new BigNumber(0).toString();
        }

        return new BigNumber(amount)
            .div(new BigNumber(10).exponentiatedBy(decimals))
            .toString();
    } catch (error) {
        console.log("exeption in fromWei ", error);
        return null;
    }
};

export const usdParser = (amount, min = 2, max = 6) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        currencyDisplay: "narrowSymbol",
        minimumFractionDigits: min,
        maximumFractionDigits: max,
    }).format(amount);

export const shortenText = (text, startLength = 4, endLength = 3) => {
    if (text.length <= startLength + endLength) {
        return text;
    }
    const start = text.slice(0, startLength);
    const end = text.slice(-endLength);
    return `${start}...${end}`;
};

export const validateNetwork = (
    account,
    chainId,
    reqChainId = OKIRIKIRI_CHAIN_ID,
) => {
    if (!account) {
        return {
            status: false,
            message: "Please connect your wallet",
        };
    }

    if (chainId !== reqChainId) {
        return {
            status: false,
            message: `Please switch to ${CHAIN_NAME[reqChainId]}`,
        };
    }

    return {
        status: true,
        message: null,
    };
};

export const getRandom = (from = 0, to = 100) => {
    let x = Math.floor(Math.random() * (to - from + 1) + from);
    return x;
};

export const copyToClipboard = (text) => {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    // Toast.success("Copied");
};

export const delay = (ms = 5000) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};

export function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }
    return text;
}

export const convertSecondsToDate = (seconds) => {
    if (!seconds) return;
    const date = new Date(+seconds * 1000);
    return date;
};

export const toTitleCase = (text) => {
    if (!text || !isNaN(text)) return text;
    return text
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[^a-zA-Z0-9]+/g, " ")
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, (char) => char.toUpperCase());
};

//** Storage */

export const saveStorageData = (key, value) => {
    try {
        window.localStorage.setItem(key, value);
    } catch (error) {
        console.log("error", error);
    }
};

export const getStorageData = (key) => {
    try {
        if (typeof window === "undefined") return;
        const localData = window.localStorage.getItem(key);
        return localData;
    } catch (error) {
        console.log("error", error);
    }
};

export const removeStorageData = (key) => {
    try {
        window.localStorage.removeItem(key);
    } catch (error) {
        console.log("error", error);
    }
};

export const updateData = (key, value) => {
    try {
        removeStorageData(key);
        saveStorageData(key, value);
    } catch (error) {
        console.log("error", error);
    }
};

export const removeAll = () => {
    try {
        window.localStorage.clear();
    } catch (error) {
        console.log("error", error);
    }
};



export const getAmountWithFeeDedected = (amount = 0, fee = PLATFORM_FEE) => {
    const weiAmount = new BigNumber(toWei(amount));

    if (weiAmount.isNaN() || weiAmount.lte(0)) {
        return new BigNumber(0).toFixed(0);
    }

    const feesFactor = 1 - fee / 100;

    const result = weiAmount.multipliedBy(feesFactor)

    return result.toFixed(0);
};



export const getLevelData = ({ level, path, data, account, fee }) => {
    // if (!data?.eventData?.length) return {
    //     donationRecived: 0,
    //     donetionCount: 0, //inner cercle
    //     totalDoner: 0,
    //     yourDonnerNo: 0
    // };

    console.log('data?.completeData[level]', data?.completeData[level])
    const d = data.eventData.filter(ele => (Number(ele?.level) === Number(level) && ele?.path === path))
    if (d.length > 1) {
        const sortedData = d.sort((a, b) => b.blockNumber - a.blockNumber);


        return {
            // yourDonnerNo: (sortedData[0]?.donationIndex === 0 && sortedData[0].masterReciver === account?.toLowerCase()) || (sortedData[0]?.donationIndex > 0)
            yourDonnerNo: sortedData?.length
                ? sortedData[0]?.donationIndex + 1
                : 0,
            ...data?.completeData[level],
            donationRecived: isFinite(data?.completeData[level]?.donationRecived - (data?.completeData[level]?.donationRecived * (fee / 100)))
                ? data?.completeData[level]?.donationRecived - (data?.completeData[level]?.donationRecived * (fee / 100))
                : 0,
            remainingDonner: (data?.completeData[level]?.head < sortedData[0]?.donationIndex)
                ? (((sortedData[0]?.donationIndex - 1) - data?.completeData[level]?.head) * 9) + (9 - data?.completeData[level]?.donetionCount)
                : 0

            // donetionCount
        }

    }

    return {
        // yourDonnerNo: (d[0]?.donationIndex === 0 && d[0].masterReciver === account?.toLowerCase()) || (d[0]?.donationIndex > 0)
        yourDonnerNo: d?.length
            ? d[0]?.donationIndex + 1
            : 0,
        ...data?.completeData[level],
        donationRecived: isFinite(data?.completeData[level]?.donationRecived - (data?.completeData[level]?.donationRecived * (fee / 100)))
            ? data?.completeData[level]?.donationRecived - (data?.completeData[level]?.donationRecived * (fee / 100))
            : 0,
        remainingDonner: (data?.completeData[level]?.head < d[0]?.donationIndex)
            ? (((d[0]?.donationIndex - 1) - data?.completeData[level]?.head) * 9) + (9 - data?.completeData[level]?.donetionCount)
            : 0
    }


}



export const geMasterReciverData = ({ level, path, data }) => {

    const masterLevelData = data?.masterReciverEventsData?.filter(ele => (Number(ele?.level) === Number(level) && ele?.path === path))
    console.log({ level, path })
    const d = data?.masterReciverEventsData?.filter(ele => (Number(ele?.level) === Number(level) && ele?.path === path))

    const totalAmount = d.reduce((sum, donation) => sum + donation.amount, 0);

    return {
        totalAmount,
        masterLevelData
    }

}


export const getDonationNumber = async ({ level, path, data, provider, account }) => {
    try {

        const contract = new Contract(CONTRACT_ADDRESS.okirikiriv2, OkirikiriV2, provider)

        const eventData = data.eventData.filter(ele => (Number(ele?.level) === Number(level) && ele?.path === path))
        if (eventData?.length > 0) {
            const sortedMasterData = eventData.sort((a, b) => b.donationIndex - a.donationIndex)


            if (sortedMasterData[0]?.masterReciver === data?.completeData[level]?.levelDataMasterReciver?.toLowerCase()) {


                const eventFilterMasterReciver = contract.filters.Donation(null, null, null, null, null, sortedMasterData[0]?.masterReciver);

                const result = await contract.queryFilter(eventFilterMasterReciver, OKIRIKIRE_DEPOLOY_BLOCKNUMBER, "latest");

                const masterReciverEventsData = result.map((event) => {
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
                })?.filter(ele => (Number(ele?.level) === Number(level) && ele?.path === path))?.sort((a, b) => a.donationIndex - b.donationIndex)
                console.log('masterReciverEventsData*******', masterReciverEventsData)

                const firstMatchingIndex = masterReciverEventsData.findIndex((ele) => ele.doner === account?.toLowerCase());


                return firstMatchingIndex + 1

            }


        }


        return 0
    } catch (err) {
        console.log('err', err)


        return 0
    }

}