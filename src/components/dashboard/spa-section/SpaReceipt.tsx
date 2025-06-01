"use client"

import { dm_mono, poppins, roboto_mono } from "@/fonts";
import logoSrc from "../../../public-assets/logo/Logo1.svg"
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { formatDate } from "date-fns";
import Logo from "../../layout-components/Logo";
import { useAppSelector } from "@/lib/redux/hooks";

const SpaReceiptItem = ({ items }: { items: SpaService | ScannedProduct }) => {
  const quantity = 1;
  const { name, price } = items;
  const total = Number(price) * quantity;
  
  return (
    <div className="py-3 border-b border-gray-100 text-[#000000]">
      <div className="flex justify-between items-start print:text-[9px]">
        <h3 className="text-xs capitalize print:text-[9.5px] font-semibold print:font-extrabold flex-grow pr-2">{name}</h3>
        <div className="text-right">
          <span className="text-xs print:text-[9px] print:font-bold">Total</span>
        </div>
      </div>
      <div className="flex justify-between items-center print:text-[8px]">
        <div className={`${dm_mono.className} print:text-[8px] flex items-center gap-2`}>
          <span className={`${dm_mono.className} text-xs print:text-[8px] print:font-bold`}>
            Price: {formatNaira(price, false)}
          </span>
          <span className="text-xs print:text-[8px] print:font-bold ms-1">x{quantity}</span>
        </div>
        <span className={`${dm_mono.className} text-xs print:text-[8px] font-medium print:font-bold`}>
          {formatNaira(total, false)}
        </span>
      </div>
    </div>
  )
}

interface SpaReceiptProps {
  orderNumber: string;
  spaServices: SpaService[];
  scannedItems: ScannedProduct[]
  date: string;
  discount?: number;
  total: string;
  transactionCode: string | null;
  subTotal: string;
}

export default function SpaReceipt({ 
  spaServices, 
  transactionCode,
  scannedItems,
  date, 
  discount = 0,
  total,
  subTotal,
}: SpaReceiptProps) {

  const { branches } = useAppSelector(store => store.storeBranches)
  const { branch } = useAppSelector(store => store.authUser)
  const location = branches.find(v => v.id === Number(branch))
    
  return (
    <div className="w-[322px] flex flex-col p-3 bg-primary-base_color1 print:w-full">
      <div className="bg-[#FFF8EE] w-full pt-6 px-3">
        <div className="flex justify-between">
          <div className="flex justify-center mb-3">
            <Logo src={logoSrc} width={120} height={100} />
          </div>

          <div className={`${roboto_mono.className} text-right mb-4`}>
            <p className="text-xs print:text-[8px] print:font-semibold text-[#000000] print:text-black">
              {formatDate(date, 'EEE, MMM dd, yyyy')}
            </p>
            <p className="text-xs print:text-[8px] print:font-semibold text-[#000000] print:text-black">
              {formatDate(date, 'h:mm:ss a')}
            </p>
          </div>
        </div>

        <div className="text-center text-[11px] mt-3 capitalize font-normal print:font-semibold text-[#000000] print:text-black mb-4 px-2">
          <p>{location?.name}, {location?.location}</p>
        </div>

        <div className="text-center mb-4 flex items-center">
          <div className="w-[20%] border-t border-dashed border-[#1F1F1F]"></div>
          <h3 className="flex-1 text-[13px] font-bold text-[#000000] print:text-black">Transaction Receipt</h3>
          <div className="w-[20%] border-t border-dashed border-[#1F1F1F]"></div>
        </div>
        
        <div className="space-y-0 mb-4">
          {spaServices.map((service, index) => (
            <SpaReceiptItem key={service.id || index} items={service} />
          ))}
          {scannedItems.map((items, index) => (
            <SpaReceiptItem key={items.id || index} items={items} />
          ))}
        </div>

          <div className="text-center text-[#1F1F1F] mt-2 text-[6px] tracking-wide opacity-90 overflow-hidden">
          ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
          </div>

        <div className={`${dm_mono.className} mb-6 text-[#000000] print:text-black text-xs print:text-[8.5px]`}>
          <div className="flex justify-between py-2">
            <span className="print:font-bold">Subtotal</span>
            <span className="print:font-bold">{subTotal}</span>
          </div>
          
          <div className="flex justify-between py-2">
            <span className="print:font-bold">Discount</span>
            <span className="print:font-bold">{discount ? formatNaira(discount, false) : '₦0.00'}</span>
          </div>
          
          <div className="text-center text-[#1F1F1F] mt-2 text-[6px] tracking-wide opacity-90 overflow-hidden">
            ••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••
          </div>
          
          <div className="flex justify-between py-2">
            <span className="font-medium print:font-extrabold text-sm">Total</span>
            <span className="font-medium print:font-extrabold text-sm">{total}</span>
          </div>
        </div>

        <div className={`${dm_mono.className} text-center mb-4`}>
          <div className="border-2 rounded-xl border-dashed border-black p-3 h-14 mx-2">
            <p className="text-xs print:text-[8.5px] bg-[#FFF8EE] px-4 -mt-5 w-fit mx-auto font-normal text-[#000000] print:text-black mb-1">
              Unique Code
            </p>
            <p className="text-sm tracking-wide print:text-[10px] font-bold mt-2 text-[#000000] print:text-black">
              {transactionCode || 'N/A'}
            </p>
          </div>
          <p className={`text-xs print:text-[8.5px] font-normal text-[#000000] print:text-black mt-2 px-2 ${poppins.className}`}>
            Show this code to the service providers and product counter to access your purchases/services.
          </p>
        </div>
      </div>
    </div>
  )
}