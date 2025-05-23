import { formatNaira } from "@/lib/helperFns/formatNumber";


export default function BookingSummaryCard({ services }: { services: SpaService }) {
  return (
    <div className="flex flex-col divide-y">
        <div className="flex items-start gap-3 py-4">
          <div className="relative w-[60px] h-[60px] flex-shrink-0 rounded-2xl overflow-hidden shadow-md">
            <img src={services.image || "/placeholder.svg"} alt={services.name} className="w-full h-full object-cover" />
            {/* <div className="absolute bottom-1 left-1 bg-white text-[10px] font-medium px-1.5 py-0.5 rounded-full shadow">
              30 mins
            </div> */}
          </div>

          <div className="flex-1 flex flex-col justify-center">
            <p className="md:text-sm text-xs font-semibold text-black">{services.name}</p>
            <p className="md:text-xs text-[10px] text-gray-600 leading-tight mt-0.5">
              {services.description}
            </p>
          </div>

          <div className="flex flex-col items-end justify-between text-right">
            <div>
              <p className="md:text-xs text-[10px] text-gray-600">Date</p>
              <p className="md:text-sm text-xs font-semibold text-primary-darkRed">{formatNaira(services.price)}</p>
            </div>
            <div>
              <p className="md:text-xs text-[10px] text-gray-600">time</p>
              <p className="md:text-sm text-xs font-semibold text-primary-darkRed">{formatNaira(services.price)}</p>
            </div>
          </div>
        </div>
      
    </div>
  )
}
