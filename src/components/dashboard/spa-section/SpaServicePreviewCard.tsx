import { markServiceDone } from "@/actions/product.server";
import { TimeIcon } from "@/components/Svg";
import Image from "next/image";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from "react-hot-toast";

export default function SpaServicePreviewCard({ 
  id,
  service_duration, 
  service_name, 
  status, 
  service_description 
}: ServiceListVerificationData){

    const [currentStatus, setCurrentStatus] = useState(status)
    const [isLoading, setIsLoading] = useState(false)

    const handleStatusChange = async (newStatus: string) => {
        if (newStatus === "Done" && currentStatus === "Pending") {
        setIsLoading(true)
        
        const result = await markServiceDone(id)
        
        if (result.success) {
            setCurrentStatus("Done")
        } else {
            setCurrentStatus("Pending")
            toast.error(result.error || "An unexpected error occurred")
        }
        
        setIsLoading(false)
        }
    }

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between border border-gray-100 p-2 rounded-2xl">
                <div className="flex items-center space-x-4 border-e border-e-gray-300 border-dashed pe-4 me-4">
                    <div className="relative flex-grow-0">
                        <Image
                            width={76}
                            height={71}
                            src="/images/static/spa-placeholder.svg"
                            alt={service_name}
                            className="rounded-2xl object-cover h-20 w-20"
                        />
                        <div className="absolute text-primary-dark_slate text-[8px] bottom-3 shadow-md -left-6 bg-primary-base_color1 px-1 py-[6px] rounded-full flex items-center space-x-1">
                            <TimeIcon className="w-3 h-3" />
                            <span className='whitespace-nowrap'>{service_duration} Minutes</span>
                        </div>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-semibold text-primary-base_color2 text-sm mb-1 capitalize">{service_name}</h3>
                        <p className="text-primary-dark_gray/50 text-xs leading-relaxed">
                            {service_description}
                        </p>
                    </div>
                </div>
                
                <div className="flex flex-col items-center space-y-2">
                    <span className="text-sm font-medium text-gray-700">Status</span>
                    <Select 
                        value={currentStatus} 
                        onValueChange={handleStatusChange}
                        disabled={isLoading || currentStatus === "Done"}
                    >
                    <SelectTrigger className={`max-w-full text-xs text-center rounded-2xl focus:outline-none focus:ring-0 relative ${
                        currentStatus === "Pending" 
                        ? "bg-primary-dark_gray/15 text-primary-dark_gray/60" 
                        : "bg-[#33CC33]/15 text-[#33CC33]"
                    } ${isLoading ? "opacity-75" : ""}`}>
                        {isLoading ? (
                        <div className="flex items-center justify-center">
                            <div className="w-3 h-3 border-2 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        ) : (
                            <SelectValue placeholder="" className='text-center' />
                        )}
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Done">
                            <span className="text-green-700">Done</span>
                        </SelectItem>
                        <SelectItem value="Pending">
                            <span className="text-gray-600">Pending</span>
                        </SelectItem>
                    </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}