"use client"

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import DestructiveActionPrompt from "../modals/DestructiveActionPrompt";
import DestructiveActionPromptSuccess from "../modals/DestructiveActionPromptSuccess";
import Image from "next/image";
import { useAppDispatch } from "@/lib/redux/hooks";
import { clearScannedItems } from "@/lib/redux/slices/luxuryPosFlowSlice";

export default function POSClearTransactionBtn(){

    const [showConfirmModal,setShowConfirmModal] = useState(false)
    const [showSuccessModal,setShowSuccessModal] = useState(false)
    const dispatch = useAppDispatch()


    const onCancelAction = async () => {
        setShowConfirmModal(false)
    }

    const handleConfirmClear = () => {
        dispatch(clearScannedItems())
        setShowConfirmModal(false)
        setShowConfirmModal(true)
    }
    
    return (
        <>
            <Button 
                onClick={() => setShowConfirmModal(true)}
                className="bg-primary-red mt-14 text-primary-base_color1 flex items-center gap-1 text-sm h-10 font-medium rounded-md py-2 px-6 flex-1 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-200"
            >
                <span>Clear Transaction</span>
                <X className="ml-2" size={16} />
            </Button>

            <DestructiveActionPrompt processing={false} open={showConfirmModal} description="Clear this transaction" onCancel={onCancelAction} onConfirm={handleConfirmClear} />
            <DestructiveActionPromptSuccess onClose={() => setShowSuccessModal(false)} open={showSuccessModal}>
                <Image src="/icons/cleared-transaction-success.svg" alt="success" width={110} height={110} />
                <div className="text-center">
                <p className="text-sm font-bold text-primary-midGray mt-2 mb-1">Transaction Cleared!</p>
                <span className="font-light text-xs text-[#424F4A]">‘Scanned Items’ has been cleared.</span>
                </div>
            </DestructiveActionPromptSuccess>
        </>
    )
}