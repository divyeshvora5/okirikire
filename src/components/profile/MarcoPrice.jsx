"use client"

import { getMarcoPrice } from '@/contracts';
import { useActiveWeb3React } from '@/hooks/useActiveWeb3React';
import React, { useEffect, useState } from 'react'

const MarcoPrice = () => {

    const { chain } = useActiveWeb3React()
    const [fetching, setFetching] = useState(false);
    const [marcoAmount, setMarcoAmount] = useState();



    useEffect(() => {
        if (!chain) return;
        (async () => {
            try {
                setFetching(true)
                const tknAmount = await getMarcoPrice({ chain });
                setMarcoAmount(tknAmount)
            } catch (err) {
                console.log('err', err)
                setMarcoAmount(0)
            } finally {
                setFetching(false)
            }
        })()
    }, [chain])
    return (
        <p className="flex items-center justify-between w-full font-medium text-[16px] sm:text-[17px] md:text-[18px] lg:text-[19px] xl:text-[20px] leading-[100%] sm:leading-[120%] md:leading-[130%] lg:leading-[140%] xl:leading-[150%] text-black mb-[18px] flex-wrap">Price: <span>{fetching ? "fetching..." : `${marcoAmount} USDT PER MARCO`}</span></p>
    )
}

export default MarcoPrice