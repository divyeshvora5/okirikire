import OkirikiriV2 from "@/abi/OkirikiriV2.json";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useActiveWeb3React } from "./useActiveWeb3React";
import { Contract } from "ethers";
import { CONTRACT_ADDRESS, OKIRIKIRE_DEPOLOY_BLOCKNUMBER } from "@/utils/constants";
import { fromWei } from "@/utils/helpers";
import { getCurrentUserLevel, getPathDetails } from "@/contracts";
import { ZERO_ADDRESS } from "thirdweb";

export const INITIALIZE_STATE = {
    NOTINITIALIZED: "NOTINITIALIZED",
    INITIALIZED: "INITIALIZED"
}

export const useLevelInfo = ({ path = "0" }) => {

    const { library, account, chain, wallet } = useActiveWeb3React()
    const [eventData, setEventData] = useState([])
    const [allLevelData, setAllLevalData] = useState({})
    const [initailze, setInitialized] = useState(INITIALIZE_STATE.NOTINITIALIZED)
    const [currentUserLevel, setCurrentUserLevel] = useState({})

    const contract = useMemo(() => {
        if (!library) return null;
        return new Contract(CONTRACT_ADDRESS.okirikiriv2, OkirikiriV2, library)
    }, [library])



    const getEventData = useCallback(async () => {
        if (!contract || !account) return null;
        try {
            const eventFilter = contract.filters.Donation(account); // Filtering by connected wallet address

            const [events, leveldata1, leveldata2, leveldata3, leveldata4, currentLevel] = await Promise.all([
                contract.queryFilter(eventFilter, OKIRIKIRE_DEPOLOY_BLOCKNUMBER, "latest"),
                getPathDetails({ path, chain, level: "0" }),
                getPathDetails({ path, chain, level: "1" }),
                getPathDetails({ path, chain, level: "2" }),
                getPathDetails({ path, chain, level: "3" }),
                getCurrentUserLevel({ wallet, path, chain })
            ])

            console.log("leveldata2", leveldata2)

            const completeData = {}

            if (leveldata1?.success) {
                completeData["0"] = {
                    donationRecived: leveldata1?.data?.resultArr[4],
                    totalDoner: (leveldata1?.data?.resultArr[3] === 0 && leveldata1?.data?.resultArr[0]?.toLowerCase() === ZERO_ADDRESS)
                        ? 0
                        : leveldata1?.data?.resultArr[3] + 1,
                    donetionCount: leveldata1?.data?.resultArr[1]
                }
            }

            if (leveldata2?.success) {
                completeData["1"] = {
                    donationRecived: leveldata2?.data?.resultArr[4],
                    totalDoner: (leveldata2?.data?.resultArr[3] === 0 && leveldata2?.data?.resultArr[0]?.toLowerCase() === ZERO_ADDRESS)
                        ? 0
                        : leveldata2?.data?.resultArr[3] + 1,
                    donetionCount: leveldata2?.data?.resultArr[1]
                }
            }

            if (leveldata3?.success) {
                completeData["2"] = {
                    donationRecived: leveldata3?.data?.resultArr[4],
                    totalDoner: (leveldata3?.data?.resultArr[3] === 0 && leveldata3?.data?.resultArr[0]?.toLowerCase() === ZERO_ADDRESS)
                        ? 0
                        : leveldata3?.data?.resultArr[3] + 1,
                    donetionCount: leveldata3?.data?.resultArr[1]
                }
            }

            if (leveldata4?.success) {
                completeData["3"] = {
                    donationRecived: leveldata4?.data?.resultArr[4],
                    totalDoner: (leveldata4?.data?.resultArr[3] === 0 && leveldata4?.data?.resultArr[0]?.toLowerCase() === ZERO_ADDRESS)
                        ? 0
                        : leveldata4?.data?.resultArr[3] + 1,
                    donetionCount: leveldata4?.data?.resultArr[1]
                }
            }

            if (currentLevel?.success) {
                setCurrentUserLevel(currentLevel?.data);
            }

            setAllLevalData(completeData);


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
            if (data?.length) {
                setEventData(data)
                console.log('eventData', eventData)
            }
        } catch (err) {
            console.log('err', err)
        }
        setInitialized(INITIALIZE_STATE.INITIALIZED)
        return true;
    }, [contract, account, chain, wallet, path])


    useEffect(() => {
        getEventData()
    }, [getEventData])


    const getLevelData = (level = 0) => {
        if (!eventData.length) return {};
        const levelData = eventData.filter(ele => (ele?.level === level && ele?.path === path))

        if (levelData.length > 1) {
            const sortedData = levelData.sort((a, b) => b.blockNumber - a.blockNumber);

            return {
                yourDonnerNo: (sortedData[0]?.donationIndex === 0 && sortedData[0].masterReciver === account?.toLowerCase())
                    ? sortedData[0]?.donationIndex + 1
                    : 0,
                ...allLevelData[level]
            }

        }


        return {
            yourDonnerNo: (levelData[0]?.donationIndex === 0 && levelData[0].masterReciver === account?.toLowerCase())
                ? levelData[0]?.donationIndex + 1
                : 0,
            ...allLevelData[level],
        }
    }


    return { getLevelData, initailze, currentUserLevel }

}