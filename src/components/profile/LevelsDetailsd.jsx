"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { useDispatch, useSelector } from 'react-redux'
import { globalState, LEVELDATA_LOADING_STATE, levelWiseDataAction, setLevelDonationCount, setSelectedLevel } from '@/redux/reducer/globalSlice'
import { useEffect, useState } from 'react'
import { useActiveWeb3React } from '@/hooks/useActiveWeb3React'
import { geMasterReciverData, getLevelData } from '@/utils/helpers'


const LevelInfo = ({
    levelName = "Level - 01",
    levelNo,
}) => {

    const { account } = useActiveWeb3React()
    const { levelData, globalPath, selectedLevelNo, fee } = useSelector(globalState);
    const [masterReciverData, setMasterReciverData] = useState({})


    const dispatch = useDispatch()

    const [data, setData] = useState({})

    console.log('levelData', levelData)

    useEffect(() => {
        if (!levelData?.completeData || !account) return;
        setData(getLevelData({
            level: levelNo,
            path: globalPath,
            data: levelData,
            account,
            fee
        }))
        setMasterReciverData(geMasterReciverData({
            level: levelNo,
            path: globalPath,
            data: levelData
        }))

    }, [levelData, levelNo, globalPath, account, fee]);

    console.log('globalPath', globalPath)



    useEffect(() => {
        if (selectedLevelNo === null, !levelData?.completeData || !account) return;
        const result = getLevelData({
            level: Number(selectedLevelNo),
            path: globalPath,
            data: levelData,
            account,
            fee
        });


        if (result) {
            dispatch(setLevelDonationCount(result?.donetionCount || 0))
        }

    }, [selectedLevelNo, levelData, account, fee])


    return (
        <>
            {/* {levelNo <= currentUserLevelNo && */}
            <AccordionItem value={levelNo?.toString()} className="accordion-item-div">
                <AccordionTrigger className="accordion-title-div">{levelName}</AccordionTrigger>
                <AccordionContent className="flex flex-col pb-[15px]">
                    <div className="mb-[20px] relative">
                        <h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] leading-[100%] tracking-[1px] font-normal text-black">Donations Received:<span className="font-medium">${masterReciverData?.totalAmount || 0}</span></h3>
                        <div className="h-[2px] mt-[20px] bg-[#F3F0F0] relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-black animate-grow-left-to-right-loop"></div>
                        </div>
                    </div>
                    <div className="mb-[20px] relative">
                        <h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] leading-[100%] tracking-[1px] font-normal text-black">You are Donor # :<span className="font-medium">{data?.yourDonnerNo || 0}</span></h3>
                        <div className="h-[2px] mt-[20px] bg-[#F3F0F0] relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-black animate-grow-left-to-right-loop"></div>
                        </div>
                    </div>
                    <div className="mb-[20px] relative">
                        <h3 className="text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px] xl:text-[26px] leading-[100%] tracking-[1px] font-normal text-black">Total Okirikiri Donors:<span className="font-medium">{data?.remainingDonner || 0}</span></h3>
                        <div className="h-[2px] mt-[20px] bg-[#F3F0F0] relative overflow-hidden">
                            <div className="absolute top-0 left-0 h-full bg-black animate-grow-left-to-right-loop"></div>
                        </div>
                    </div>
                </AccordionContent>
            </AccordionItem>
            {/* } */}
        </>
    )
}

const LevelsDetailes = () => {

    const { levelDataFetchState } = useSelector(globalState);
    const dispatch = useDispatch();

    const setLevelNo = (level) => {
        dispatch(setSelectedLevel(level))
    }

    return (
        <Accordion
            onValueChange={setLevelNo}
            type="single"
            collapsible
            className="w-full accordion-inner-div"
            defaultValue="item-1"
        >
            {levelDataFetchState === LEVELDATA_LOADING_STATE.COMPLETED && <>

                {Array.from({ length: 4 }, (item, index) => (
                    <LevelInfo
                        key={index}
                        levelName={`Level - 0${index + 1}`}
                        levelNo={index}
                    />
                ))}
            </>
            }
        </Accordion>
    )
}

export default LevelsDetailes