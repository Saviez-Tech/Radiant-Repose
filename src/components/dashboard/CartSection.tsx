"use client"

import { X, Plus, Minus, Loader2 } from "lucide-react";
import Image from "next/image";
import { dm_mono } from "@/fonts";
import { calculateCartItemTotal, calculateCartTotal, calculateCartTotalWithDiscountAndBalance } from "@/lib/helperFns/calculateTotal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import DestructiveActionPrompt from "../modals/DestructiveActionPrompt";
import DestructiveActionPromptSuccess from "../modals/DestructiveActionPromptSuccess";
import { useEffect, useState } from "react";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { usePathname } from "next/navigation";
import { clearScannedItems, decrementItemQuantity, incrementItemQuantity, manageOrderNumber, removeScannedItem } from "@/lib/redux/slices/posFlowSlice";
import { addSaleHandler } from "@/actions/product.server";
import toast from "react-hot-toast";
import ReceiptPrinter from "@/lib/ReceiptPrinter";


const CartItem = ({ item }: { item: ScannedProduct }) => {

  const { image_url, name, price, quantity, barcode } = item;
  const dispatch = useAppDispatch()
  
  return (
    <div className="flex items-center py-3 border-b border-gray-100 text-[#1F1F1F]">
      <div className="w-14 h-14 rounded-xl overflow-hidden mr-4">
        <Image src={image_url} alt={name} width={40} height={40} className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="text-xs font-semibold truncate">{name}</h3>
          <button className="text-red-500" onClick={() => dispatch(removeScannedItem(item.barcode || ""))}>
            <X size={16} />
          </button>
        </div>
        <p className={`${dm_mono.className} text-xs my-1`}>Price: {formatNaira(price,false)}</p>
        <div className="flex justify-between items-center">
          <span className={`${dm_mono.className} text-xs font-medium`}>{formatNaira(calculateCartItemTotal(price,quantity),false)}</span>
          <div className="flex items-center gap-4">
            <button onClick={() => dispatch(decrementItemQuantity(barcode!))} className="text-gray-500">
              <Minus size={13} />
            </button>
            <span className="text-xs">{quantity}</span>
            <button onClick={() => dispatch(incrementItemQuantity(barcode!))} className="text-gray-500">
              <Plus size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}




export default function CartSection() {

  const { scannedItems, orderNumber } = useAppSelector(store => store.posFlow)
  const { name } = useAppSelector(store => store.authUser)
  const [showConfirmModal,setShowConfirmModal] = useState(false)
  const [showSuccessModal,setShowSuccessModal] = useState(false)
  const [isProcessing,setIsProcessing] = useState(false)
  const [print,setPrint] = useState(false)
  const pathName = usePathname()
  const dispatch = useAppDispatch()

  const onConfirmCancelTransaction = async() => {
    dispatch(clearScannedItems())
    setShowConfirmModal(false)
  }

  const onCancelAction = async () => {
    setShowConfirmModal(false)
  }

  const handleClose = () => {
    dispatch(clearScannedItems())
    setPrint(false)
  }

  const handleCompleteSale = async() => {
    setIsProcessing(true)
    const { success, error } = await addSaleHandler({
      customer_contact: "",
      customer_name: "",
      discount: 0,
      scanned_items: scannedItems.map(v => ({ product_id: v.id, quantity: v.quantity })),
      subtotal: calculateCartTotal(scannedItems)
    })

    if(success){
      setPrint(true)
      toast.success("Sale Proccessed Successfully")
    }else{
      toast.error(error || "Error Processing Sale")
    }

    setIsProcessing(false)
  }

  useEffect(() => {
    dispatch(manageOrderNumber())
  },[scannedItems.length])

  return (
    !pathName.startsWith("/pos/categories")
    ?
    null
    :
    <div className={`w-[270px] pt-6 flex flex-col ${scannedItems && scannedItems.length ? "justify-between" : "justify-center items-center"}`}>
      {
        scannedItems && scannedItems.length ?

        <>
          <div>
            <h2 className="text-sm font-medium text-[#111719] mb-4">Order {orderNumber}</h2>
            
            <div className="space-y-0">
              {scannedItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>

          <div className="">
            <div className={`${dm_mono.className} mb-6 mt-16 text-[#1F1F1F] text-xs`}>
              <div className="flex justify-between py-2">
                <span className="">Subtotal</span>
                <span className="">{formatNaira(calculateCartTotal(scannedItems), true)}</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="">Discount</span>
                <span className="">--</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="">Amount Paid</span>
                <span className="">--</span>
              </div>
              
              <div className="flex justify-between py-2">
                <span className="">Balance</span>
                <span className="">--</span>
              </div>
              
              <div className="border-t-2 border-dotted border-gray-500 my-2"></div>
              
              <div className="flex justify-between py-2">
                <span className="font-medium text-base">Total</span>
                <span className="font-medium text-base">{formatNaira(calculateCartTotalWithDiscountAndBalance(scannedItems,0,0), true)}</span>
              </div>

              <div className="flex flex-wrap gap-4 mt-5">
                <button 
                  onClick={() => setShowConfirmModal(true)}
                  className="bg-red-600 text-primary-base_color1 text-sm h-10 font-medium rounded-md py-2 px-6 flex-1 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-200"
                >
                  Cancel Transaction
                </button>
                
                <button
                  onClick={handleCompleteSale} 
                  disabled={isProcessing}
                  className="bg-green-500 disabled:cursor-pointer flex justify-center items-center gap-1 text-primary-base_color1 text-sm h-10 font-medium rounded-md py-2 px-6 flex-1 hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none transition-all duration-200"
                >
                  {
                    !isProcessing && !print ?
                    "Save & Print Transaction"
                    :
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing...
                    </> 
                  }
                </button>
              </div>
            </div>
          </div>


          {/* Printer Lib */}
          <ReceiptPrinter 
            date={new Date().toISOString()}
            orderNumber={orderNumber || ""}
            print={print}
            setPrint={setPrint}
            handleClose={handleClose}
            scannedItems={scannedItems}
            subTotal={calculateCartTotal(scannedItems)}
            total={calculateCartTotalWithDiscountAndBalance(scannedItems,0,0)}
            amountPaid={0}
            cashierName={name || ""}
            customerName=""
            discount={0}
          />

          <DestructiveActionPrompt processing={false} open={showConfirmModal} description="cancel this transaction" onCancel={onCancelAction} onConfirm={onConfirmCancelTransaction} />
          <DestructiveActionPromptSuccess onClose={() => setShowSuccessModal(false)} open={showSuccessModal}>
            <Image src="/icons/cancelled-transaction-success.svg" alt="success" width={110} height={110} />
            <div className="text-center">
              <p className="text-sm font-bold text-primary-midGray mt-2 mb-1">Transaction Cancelled!</p>
              <span className="font-light text-xs text-[#424F4A]">Ongoing transaction has been cancelled.</span>
            </div>
          </DestructiveActionPromptSuccess>
        </>
        :
        <p role="alert" className="text-center font-medium text-sm">No Transcation yet</p>
      }
    </div>
  )
}