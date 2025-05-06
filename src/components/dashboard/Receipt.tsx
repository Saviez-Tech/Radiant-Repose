"use client"

import { dm_mono } from "@/fonts";
import logoSrc from "../../public-assets/logo/Logo1.svg"
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { formatDate } from "date-fns";
import { calculateCartItemTotal } from "@/lib/helperFns/calculateTotal";
import Logo from "../layout-components/Logo";

const ReceiptItem = ({ item }: { item: Partial<ScannedProduct> }) => {
  const { name, price, quantity } = item;
  
  return (
    <div className="flex items-center py-3 border-b border-gray-100 text-[#000000]">
      <div className="flex-grow">
        <div className="flex justify-between">
          <h3 className="text-xs font-semibold truncate pb-1">{name}</h3>
          <span className="text-xs font-semibold">{quantity}x</span>
        </div>
        <p className={`${dm_mono.className} text-xs font-medium`}>Price: {formatNaira(price || 0, false)}</p>
        <div className="flex justify-between items-center">
          <span className={`${dm_mono.className} text-xs font-medium`}>{formatNaira(calculateCartItemTotal(price || 0, quantity || 0), false)}</span>
        </div>
      </div>
    </div>
  )
}

interface ReceiptProps {
  orderNumber: string;
  scannedItems: Partial<ScannedProduct>[];
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
  customerName = "",
  total,
  subTotal,
  cashierName = ""
}: ReceiptProps) {
    
  return (
    <div className="w-[270px] pt-6 flex flex-col bg-white print:w-full">
      <div className="flex justify-center mb-4">
        <Logo src={logoSrc} width={100} height={100} />
      </div>
      
      <div className="text-center mb-4">
        <h2 className="text-sm font-semibold text-[#000000] print:text-black">Receipt #{orderNumber}</h2>
        <p className="text-xs font-medium text-[#000000] print:text-black">{formatDate(date,'MMM d, yyyy')}</p>
        {customerName && <p className="text-xs font-medium text-[#000000] print:text-black">Customer: {customerName}</p>}
      </div>
      
      <div className="space-y-0">
        {scannedItems.map(item => (
          <ReceiptItem key={item.id} item={item} />
        ))}
      </div>

      <div className={`${dm_mono.className} mb-6 mt-8 text-[#000000] print:text-black text-xs`}>
        <div className="flex justify-between py-2">
          <span className="font-medium">Subtotal</span>
          <span className="font-medium">{subTotal}</span>
        </div>
        
        <div className="flex justify-between py-2">
          <span className="font-medium">Discount</span>
          <span className="font-medium">{discount ? formatNaira(discount, true) : '--'}</span>
        </div>
        
        <div className="flex justify-between py-2">
          <span className="font-medium">Balance</span>
          <span className="font-medium">--</span>
        </div>
        
        <div className="border-t-2 border-dotted border-gray-900 my-2"></div>
        
        <div className="flex justify-between py-2">
          <span className="font-semibold text-base">Total</span>
          <span className="font-semibold text-base">{total}</span>
        </div>
      </div>

      <div className="text-center text-xs font-medium text-[#000000] print:text-black mt-4 mb-6">
        {cashierName && <p className="mb-1">Served by: {cashierName}</p>}
        <p className="font-semibold">Thank you for your purchase!</p>
        <p className="mt-2">**Customer Copy**</p>
      </div>
    </div>
  )
}