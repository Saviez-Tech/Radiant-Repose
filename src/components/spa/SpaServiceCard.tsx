import { X } from "lucide-react";
import Image from "next/image";
import { DollarSquare, TimeIcon } from "../Svg";
import { dm_mono } from "@/fonts";
import { Skeleton } from "../ui/skeleton";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { Divider } from "@mui/material";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useSpaCart } from "@/hooks/useSpaCart";

export default function SpaServiceCard({ service, isSelected }: { service: SpaService, isSelected: boolean }) {
  
   const {removeItem, addItem} = useSpaCart() 

    return (
        <div  
            tabIndex={0}
            className={`
            ${isSelected ? "ring-2 ring-red-500" : "ring-0"} 
            relative max-w-60 pb-2 bg-white cursor-pointer rounded-2xl overflow-hidden shadow-md border border-gray-200 outline-none
        `}
        >
            
        <div className="relative">
            <p className="absolute bottom-4 left-3 z-10 rounded-3xl flex items-center gap-1 py-2 px-3 bg-primary-base_color1 text-[10px] md:text-xs font-medium text-brand-primary-light_black">
                <TimeIcon className="size-4" />
                <span className="text-[9px] md:text-[10px] text-primary-dark_ash_slate">30 mins</span>
            </p>
            <div className="relative h-40 flex-shrink-0">
            {
                service.image?.length ?
                <Image
                    // src={service.image}
                    src="/images/static/bag4.png"
                    alt={service.name}
                    fill
                    className="object-cover"
                />
                :
                <Skeleton className="w-full h-full" />
            }
            </div>
        
            <button 
                onClick={(e) => {
                    e.stopPropagation()
                    removeItem(service.id.toString())
                }} 
                className={`${isSelected ? "block" : "hidden"} absolute top-0 right-0 bg-primary-red rounded-lg p-1 text-primary-base_color1`}
            >
                <X size={16} />
            </button>
        </div>
        
        <div className="py-2 px-3">
            <div className="flex justify-between items-center">
                <div className="flex-grow">
                    <h3 className="text-xs md:text-sm font-semibold capitalize">{service.name}</h3>
                    <p className="text-primary-dark_gray/50 text-[9px] md:text-[11px] line-clamp-2">{service.description}</p>
                </div>
            </div>
        
            <div className="flex justify-between flex-wrap gap-4 items-center text-primary-dark_gray my-3">
                <div className="flex items-center">
                    <DollarSquare className="size-5" />
                    <span className={`${dm_mono.className} text-sm font-light ml-1`}>{formatNaira(service.price,false,true)}</span>
                </div>

                <span className="text-[10px] break-words">[<span className="font-semibold">In-Store Payment</span> Only]</span>
            </div>

            <Divider />
            
            {
                isSelected ?
                <i className="text-xs text-primary-yellow mx-auto mt-3 block w-fit">Service Selected</i>
                :
                <button onClick={() => addItem(service)} className="text-primary-darkRed mt-3 flex items-center text-xs">
                    <i>Select Service</i>
                    <Icon icon="formkit:arrowright" width="16" height="9" />
                </button>
            }
        </div>
        </div>
    )
}