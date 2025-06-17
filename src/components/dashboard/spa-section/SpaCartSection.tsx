"use client"

import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { dm_mono } from "@/fonts";
import { calculateCartItemTotal, calculateGrandTotal } from "@/lib/helperFns/calculateTotal";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import DestructiveActionPrompt from "../../modals/DestructiveActionPrompt";
import DestructiveActionPromptSuccess from "../../modals/DestructiveActionPromptSuccess";
import { useEffect, useState } from "react";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { usePathname } from "next/navigation";
import { clearAll, decrementProductQuantity, incrementProductQuantity, manageOrderNumber, removeScannedProduct, removeService } from "@/lib/redux/slices/spaPosSlice";
import ReceiptPrinter from "@/lib/ReceiptPrinter";
import CustomSafeImage from "@/components/custom-utils/SafeImage";

const SpaCartItem = ({ item }: { item: ScannedProduct }) => {
  const { image_url, name, price, quantity, barcode } = item;
  const dispatch = useAppDispatch()
  
  return (
    <div className="flex items-center py-3 border-b border-gray-100 text-[#1F1F1F]">
      <div className="w-14 h-14 rounded-xl overflow-hidden mr-4">
        <CustomSafeImage src={image_url || "/images/static/spa-placeholder.svg"} alt={name} width={40} height={40} className="w-full h-full object-cover"  />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="text-xs font-semibold truncate capitalize">{name}</h3>
          <button className="text-red-500" onClick={() => dispatch(removeScannedProduct(item.barcode || ""))}>
            <X size={16} />
          </button>
        </div>
        <p className={`${dm_mono.className} text-xs my-1`}>Price: {formatNaira(price,true)}</p>
        <div className="flex justify-between items-center">
          <span className={`${dm_mono.className} text-xs font-medium`}>{formatNaira(calculateCartItemTotal(price,quantity),true)}</span>
          <div className="flex items-center gap-4">
            <button onClick={() => dispatch(decrementProductQuantity(barcode!))} className="text-gray-500">
              <Minus size={13} />
            </button>
            <span className="text-xs">{quantity}</span>
            <button onClick={() => dispatch(incrementProductQuantity(barcode!))} className="text-gray-500">
              <Plus size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const SpaServiceItem = ({ service }: { service: SpaService }) => {
  const { image, name, price, id } = service;
  const dispatch = useAppDispatch()
  
  return (
    <div className="flex items-center py-3 border-b border-gray-100 text-[#1F1F1F]">
      <div className="w-14 h-14 rounded-xl overflow-hidden mr-4">
        <CustomSafeImage src={image} alt={name} width={40} height={40} className="w-full h-full object-cover"  />
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="text-xs font-semibold truncate capitalize">{name}</h3>
          <button className="text-red-500" onClick={() => dispatch(removeService(id))}>
            <X size={16} />
          </button>
        </div>
        <p className={`${dm_mono.className} text-xs my-1`}>Price: {formatNaira(price,true)}</p>
        <div className="flex justify-between items-center">
          <span className={`${dm_mono.className} text-xs font-medium`}>{formatNaira(price,true)}</span>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Service</span>
        </div>
      </div>
    </div>
  )
}

export default function SpaCartSection() {
  const { addedServices, scannedProducts, orderNumber } = useAppSelector(store => store.spaPosFlow)
  const { name } = useAppSelector(store => store.authUser)
  const [showConfirmModal,setShowConfirmModal] = useState(false)
  const [showSuccessModal,setShowSuccessModal] = useState(false)
  const [print,setPrint] = useState(false)
  const pathName = usePathname()
  const dispatch = useAppDispatch()

  const hasItems = scannedProducts.length > 0 || addedServices.length > 0;
  
  // Use the proper calculation function from helpers
  const grandTotal = calculateGrandTotal(scannedProducts, addedServices);

  const onConfirmCancelTransaction = async() => {
    dispatch(clearAll())
    setShowConfirmModal(false)
  }

  const onCancelAction = async () => {
    setShowConfirmModal(false)
  }

  const handleClose = () => {
    dispatch(clearAll())
    setPrint(false)
  }

  useEffect(() => {
    dispatch(manageOrderNumber())
  },[scannedProducts.length, addedServices.length])

  return (
    !pathName.startsWith("/pos")
    ?
    null
    :
    pathName.startsWith("/pos") && !pathName.match("/luxury") && !pathName.includes("/service-verification") && !pathName.includes("/transaction-history")
    ?
    <div className={`w-[270px] pt-6 flex flex-col ${hasItems ? "justify-between" : "justify-center items-center"}`}>
      {
        hasItems ?
        <>
          <div>
            <h2 className="text-sm font-medium text-[#111719] mb-4">Order {orderNumber}</h2>
            
            <div className="space-y-0">
              {/* Render Products First */}
              {scannedProducts.map(item => (
                <SpaCartItem key={item.id} item={item} />
              ))}
              
              {/* Render Services Below Products */}
              {addedServices.map(service => (
                <SpaServiceItem key={service.id} service={service} />
              ))}
            </div>
          </div>

          <div className="">
            <div className={`${dm_mono.className} mb-6 mt-16 text-[#1F1F1F] text-xs`}>
              <div className="flex justify-between py-2">
                <span className="">Subtotal</span>
                <span className="">{formatNaira(grandTotal, true)}</span>
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
                <span className="font-medium text-base">{formatNaira(grandTotal, true)}</span>
              </div>

              <div className="flex flex-wrap gap-4 mt-5">
                <button 
                  onClick={() => setShowConfirmModal(true)}
                  className="bg-red-600 text-primary-base_color1 text-sm h-10 font-medium rounded-md py-2 px-6 flex-1 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-200"
                >
                  Cancel Transaction
                </button>
              </div>
            </div>
          </div>

          {/* Printer Lib */}
          <ReceiptPrinter 
            date={new Date().toISOString()}
            orderNumber={orderNumber || ""}
            print={print}
            printFor="spa"
            setPrint={setPrint}
            handleClose={handleClose}
            scannedItems={scannedProducts}
            services={addedServices}
            subTotal={grandTotal}
            total={grandTotal}
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
        <p role="alert" className="text-center font-medium text-sm">No Transaction yet</p>
      }
    </div>
    :
    null
  )
}