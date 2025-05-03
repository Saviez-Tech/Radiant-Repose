"use client"

import { dm_mono } from "@/fonts";
import logoSrc from "../../public-assets/logo/Logo1.svg"
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { formatDate } from "date-fns";
import { calculateCartItemTotal } from "@/lib/helperFns/calculateTotal";
import Logo from "../layout-components/Logo";

const ReceiptItem = ({ item }: { item: ScannedProduct }) => {
  const { name, price, quantity } = item;
  
  return (
    <div className="flex items-center py-3 border-b border-gray-100 text-[#1F1F1F]">
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="text-xs font-semibold truncate pb-1">{name}</h3>
          <span className="text-xs">{quantity}x</span>
        </div>
        <p className={`${dm_mono.className} text-xs`}>Price: {formatNaira(price, false)}</p>
        <div className="flex justify-between items-center">
          <span className={`${dm_mono.className} text-xs font-medium`}>{formatNaira(calculateCartItemTotal(price, quantity), false)}</span>
        </div>
      </div>
    </div>
  )
}

interface ReceiptProps {
  orderNumber: string;
  scannedItems: ScannedProduct[];
  date: string;
  discount?: number;
  amountPaid?: number;
  customerName?: string;
  cashierName?: string;
  total: string;
  subTotal: string;
}

export default function Receipt({ 
  orderNumber, 
  scannedItems, 
  date, 
  discount = 0,
  amountPaid = 0,
  customerName = "",
  total,
  subTotal,
  cashierName = ""
}: ReceiptProps) {
    
  return (
    <div className="w-[270px] pt-6 flex flex-col bg-white">
      <div className="flex justify-center mb-4">
        <Logo src={logoSrc} width={100} height={100} />
      </div>
      
      <div className="text-center mb-4">
        <h2 className="text-sm font-medium text-[#111719]">Receipt #{orderNumber}</h2>
        <p className="text-xs text-gray-500">{formatDate(date,'MMM d, yyyy')}</p>
        {customerName && <p className="text-xs text-gray-500">Customer: {customerName}</p>}
      </div>
      
      <div className="space-y-0">
        {scannedItems.map(item => (
          <ReceiptItem key={item.id} item={item} />
        ))}
      </div>

      <div className={`${dm_mono.className} mb-6 mt-8 text-[#1F1F1F] text-xs`}>
        <div className="flex justify-between py-2">
          <span className="">Subtotal</span>
          <span className="">{subTotal}</span>
        </div>
        
        <div className="flex justify-between py-2">
          <span className="">Discount</span>
          <span className="">{discount ? formatNaira(discount, true) : '--'}</span>
        </div>
        
        <div className="flex justify-between py-2">
          <span className="">Balance</span>
          <span className="">--</span>
        </div>
        
        <div className="border-t-2 border-dotted border-gray-500 my-2"></div>
        
        <div className="flex justify-between py-2">
          <span className="font-medium text-base">Total</span>
          <span className="font-medium text-base">{total}</span>
        </div>
      </div>

      {/* Footer section */}
      <div className="text-center text-xs text-gray-500 mt-4 mb-6">
        {cashierName && <p className="mb-1">Served by: {cashierName}</p>}
        <p>Thank you for your purchase!</p>
      </div>
    </div>
  )
}