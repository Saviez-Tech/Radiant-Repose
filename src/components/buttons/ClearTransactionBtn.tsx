"use client"

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useState } from "react";
import DestructiveActionPrompt from "../modals/DestructiveActionPrompt";
import DestructiveActionPromptSuccess from "../modals/DestructiveActionPromptSuccess";
import Image from "next/image";
import { fulFillSaleHandler } from "@/actions/product.server";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ClearTransactionBtn({ orderID }:{ orderID: string }) {

    const [showConfirmModal,setShowConfirmModal] = useState(false)
    const [showSuccessModal,setShowSuccessModal] = useState(false)
    const router = useRouter()
    const [processing, setProcessing] = useState(false)


    const onCancelAction = async () => {
        setShowConfirmModal(false)
    }

    const handleConfirmClear = async () => {
        setProcessing(true)
        const { success, error } = await fulFillSaleHandler(orderID)

        if (success){
            setShowConfirmModal(false)
            setShowSuccessModal(true)
            toast.success("Transaction cleared successfully")
            router.push("/admin/pending-order/")
        }
        else {
            toast.error(error || "An error occurred")
        }

        setProcessing(false)
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

            <DestructiveActionPrompt processing={processing} open={showConfirmModal} description="Clear this transaction" onCancel={onCancelAction} onConfirm={handleConfirmClear} />
            <DestructiveActionPromptSuccess onClose={() => setShowSuccessModal(false)} open={showSuccessModal}>
                <Image src="/icons/cleared-transaction-success.svg" alt="success" width={110} height={110} />
                <div className="text-center">
                <p className="text-sm font-bold text-primary-midGray mt-2 mb-1">Transaction Cleared!</p>
                <span className="font-light text-xs text-[#424F4A]">&apos;Customers pending order&apos; has been cleared.</span>
                </div>
            </DestructiveActionPromptSuccess>
        </>
    )
}