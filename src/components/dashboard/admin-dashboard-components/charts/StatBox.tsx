import { bricolage_grotesque } from "@/fonts";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { ReactNode } from "react";

interface IProps {
  stat:  'total_goods_sold' | 'total_price' | 'low_stock',
  label: string,
  value: number,
  icon: ReactNode
}

const StatBox = ({ 
  stat, 
  value, 
  label,
  icon : Icon 
}: IProps) => {

  const getStatusColor = (stat: 'total_goods_sold' | 'total_price' | 'low_stock') => {
    switch (stat.toLowerCase()) {
      case 'total_goods_sold':
        return 'text-green-500';
      case 'total_price':
        return 'text-[#B56EF9]';
      case 'low_stock':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }

  return (
    <div className="flex flex-col text-[#212121] w-full min-w-0 shadow justify-center py-4 px-3 bg-primary-base_color1 rounded-xl">
      <div className="flex justify-between items-center gap-2 mb-2">
        <span className="font-medium capitalize text-sm md:text-lg truncate">{label}</span>
        {Icon && (
          <span className={getStatusColor(stat)}>
            {Icon}
          </span>
        )}
      </div>
      <span className={`${bricolage_grotesque.className} text-2xl md:text-4xl font-semibold break-words`}>
        {stat === "total_price" ? formatNaira(value,false) : value}
      </span>
    </div>
  )
}


export default StatBox;