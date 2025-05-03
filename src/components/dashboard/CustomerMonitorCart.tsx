"use client"

import { dm_mono } from "@/fonts";
import { calculateCartItemTotal, calculateCartTotal, calculateCartTotalWithDiscountAndBalance } from "@/lib/helperFns/calculateTotal";
import { useAppSelector } from "@/lib/redux/hooks";
import { useEffect, useState } from "react";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Logo from "../layout-components/Logo";
import LogoSrc from "../../public-assets/logo/Logo1.svg"
import { useRouter } from "next/navigation";


// This component represents a single item in the customer's cart display
const CustomerCartItem = ({ item, isLastItem = false }: { item: ScannedProduct, isLastItem?: boolean }) => {
  const { name, price, quantity } = item;
  const itemRef = isLastItem ? { ref: (el: HTMLDivElement) => {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }} : {};
  
  return (
    <motion.div 
      {...itemRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center justify-between py-2 border-b border-gray-100 text-[#1F1F1F]"
    >
      <div className="flex-grow">
        <div className="flex justify-between mb-1">
          <h3 className="text-xs font-semibold truncate">{name}</h3>
          <span className="text-xs font-medium text-orange-500">x{quantity}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={`${dm_mono.className} text-xs text-gray-600`}>{formatNaira(price, false)}</span>
          <span className={`${dm_mono.className} text-xs font-medium`}>{formatNaira(calculateCartItemTotal(price, quantity), false)}</span>
        </div>
      </div>
    </motion.div>
  )
}

// This component shows the "Just Added" indicator when a new item is scanned
const JustAddedIndicator = ({ itemName }: { itemName: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md shadow-md"
    >
      <div className="flex flex-col">
        <span className="text-xs font-bold">Just Added</span>
        <span className="text-xs truncate max-w-56">{itemName}</span>
      </div>
    </motion.div>
  )
}



// Main Component
export default function CustomerMonitorCart() {
  
  const { scannedItems, orderNumber } = useAppSelector(store => store.posFlow)
  const [lastAddedItem, setLastAddedItem] = useState<string | null>(null)

  const router = useRouter()

  // Track the last added item to show the "Just Added" indicator
  useEffect(() => {
    if (scannedItems.length > 0) {
      const newItem = scannedItems[scannedItems.length - 1];
      setLastAddedItem(newItem.name)
      
      const timer = setTimeout(() => {
        setLastAddedItem(null)
      }, 2000)
      
      return () => clearTimeout(timer)
    }
  }, [scannedItems.length])


  useEffect(() => {
    if (scannedItems.length && orderNumber) {
      router.replace(`/cart-monitor?order=${orderNumber}`);
    } else {
      router.replace(`/cart-monitor`);
    }
  },[scannedItems.length,orderNumber])


  if (!scannedItems || scannedItems.length === 0) {
    return (
      <div className="w-full bg-white rounded-xl shadow-md p-4 flex flex-col items-center justify-center min-h-[300px]">
        <div className="text-center flex justify-center items-center flex-col">
          <h2 className="text-lg font-bold text-gray-800 mb-2">Your Cart is Empty</h2>
          <Image src="/icons/empty-cart.svg" alt="empty cart" width={70} height={70} />
          <p className="text-xs text-gray-500">Items will appear here when scanned</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full rounded-xl p-4 relative">
      <AnimatePresence>
        {lastAddedItem && <JustAddedIndicator itemName={lastAddedItem} />}
      </AnimatePresence>
      
      <Logo src={LogoSrc} width={160} height={130} />
      <div className="flex justify-between items-center border-b border-gray-200 pb-2 mt-4 mb-2">
        <h2 className="font-bold text-[#111719]">Your Purchase</h2>
        <span className="bg-red-100 text-primary-darkRed text-sm font-medium px-2 py-0.5 rounded">Order #{orderNumber}</span>
      </div>
      
      <div className="flex flex-row">
        <div className="w-[60%] max-h-[80vh] overflow-y-auto pr-2 pe-4 mb-2">
          {scannedItems.map((item, index) => (
            <CustomerCartItem 
              key={item.id} 
              item={item} 
              isLastItem={index === scannedItems.length - 1}
            />
          ))}
        </div>

        <div className={`${dm_mono.className} w-[40%] pl-2 text-[#1F1F1F] text-sm`}>
          <div className="flex justify-between py-1">
            <span className="">Subtotal</span>
            <span className="">{formatNaira(calculateCartTotal(scannedItems), true)}</span>
          </div>
          
          <div className="flex justify-between py-1">
            <span className="">Discount</span>
            <span className="">--</span>
          </div>
          
          <div className="flex justify-between py-1">
            <span className="">Amount Paid</span>
            <span className="">--</span>
          </div>
          
          <div className="flex justify-between py-1">
            <span className="">Balance</span>
            <span className="">--</span>
          </div>
          
          <div className="border-t-2 border-dotted border-gray-300 my-1"></div>
          
          <div className="flex justify-between py-1 bg-gray-50 px-2 rounded-md">
            <span className="font-medium text-sm">Total</span>
            <span className="font-medium text-sm">{formatNaira(calculateCartTotalWithDiscountAndBalance(scannedItems,0,0), true)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}