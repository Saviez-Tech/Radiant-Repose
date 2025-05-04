import { bricolage_grotesque } from "@/fonts";
import { ReactNode } from "react";

interface IProps {
    status:  'completed' | 'ongoing' | 'cancelled',
    value: number,
    icon: ReactNode
}

const StatusBox = ({ 
  status, 
  value, 
  icon : Icon 
}: IProps) => {

  const getStatusColor = (status: 'completed' | 'ongoing' | 'cancelled') => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'text-green-500';
      case 'ongoing':
        return 'text-[#B56EF9]';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }

  return (
    <div className="flex flex-col text-[#212121] w-full min-w-0 shadow justify-center py-4 px-5 bg-primary-base_color1 rounded-xl">
      <div className="flex justify-between items-center gap-2 mb-2">
        <span className="font-medium capitalize text-sm md:text-lg truncate">{status}</span>
        {Icon && (
          <span className={getStatusColor(status)}>
            {Icon}
          </span>
        )}
      </div>
      <span className={`${bricolage_grotesque.className} text-2xl md:text-4xl font-semibold break-words truncate`}>
        {value.toString().padStart(3, '0')}
      </span>
    </div>
  )
}


export default StatusBox;