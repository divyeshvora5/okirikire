"use client"

import { AlertDialogContent } from '../ui/alert-dialog'
import { useSelector } from 'react-redux'
import { globalState } from '@/redux/reducer/globalSlice'
import MarcoForm from './MarcoForm'
import UsdtForm from './UsdtForm'
import { useRef } from 'react'



const WithdrawFundModel = ({ setOpen }) => {

    const { withdrawTokenSelect } = useSelector(globalState);

    const modelRef = useRef(null);

    const handleClickOutside = (e) => {
        if (modelRef.current && modelRef.current.contains(e.target)) {
            setOpen(false);
        }
    };

    return (
        <AlertDialogContent onClick={handleClickOutside} ref={modelRef} className="okiri-modal-content-div">
            {withdrawTokenSelect === "USDT" && <UsdtForm setOpen={setOpen} />}
            {withdrawTokenSelect === "MARCO" && <MarcoForm setOpen={setOpen} />}
        </AlertDialogContent>
    )
}

export default WithdrawFundModel