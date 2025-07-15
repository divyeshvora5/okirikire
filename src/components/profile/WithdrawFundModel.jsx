"use client"

import { AlertDialogContent } from '../ui/alert-dialog'
import { useSelector } from 'react-redux'
import { globalState } from '@/redux/reducer/globalSlice'
import MarcoForm from './MarcoForm'
import UsdtForm from './UsdtForm'



const WithdrawFundModel = ({ setOpen }) => {

    const { withdrawTokenSelect } = useSelector(globalState);

    return (
        <AlertDialogContent className="okiri-modal-content-div">
            {withdrawTokenSelect === "USDT" && <UsdtForm setOpen={setOpen} />}
            {withdrawTokenSelect === "MARCO" && <MarcoForm />}
        </AlertDialogContent>
    )
}

export default WithdrawFundModel