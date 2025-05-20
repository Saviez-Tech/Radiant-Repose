import { dm_mono } from "@/fonts";
import { formatNaira } from "@/lib/helperFns/formatNumber";
import { useAppDispatch } from "@/lib/redux/hooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Divider } from "@mui/material";
import Image from "next/image";
import { DollarSquare, TimeIcon } from "../Svg";
import { Skeleton } from "../ui/skeleton";
import Link from "next/link";

export default function SpaServicesListingCard({
  service,
}: {
  service: SpaService;
}) {
  const dispatch = useAppDispatch();
  const handleCardClick = () => {};

  return (
    <div
      tabIndex={0}
      onClick={handleCardClick}
      className={`      relative max-w-60 pb-2 bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 outline-none
        `}
    >
      <div className="relative">
        {/* <p className="absolute bottom-8 left-3 z-10 rounded-3xl flex items-center gap-1 py-2 px-3 bg-primary-base_color1 text-[10px] md:text-xs font-medium text-brand-primary-light_black">
          <TimeIcon className="size-4" />
          <span className="text-[9px] md:text-[10px] text-primary-dark_ash_slate">
            30 mins
          </span>
        </p> */}
        <div className="relative h-40 flex-shrink-0">
          {service.image?.length ? (
            <Image
              // src={service.image}
              src="/images/static/bag4.png"
              alt={service.name}
              fill
              className="object-cover"
            />
          ) : (
            <Skeleton className="w-full h-full" />
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
         
        >
        </button>
      </div>

      <div className="py-2 px-3">
        <div className="flex justify-between items-center">
          <div className="flex-grow overflow-hidden">
            <h3 className="text-xs md:text-sm font-semibold capitalize">
              {service.name}
            </h3>
            <p className="text-primary-dark_gray/50 text-[9px] md:text-[11px] line-clamp-2 h-8">
              {service.description}
            </p>
          </div>
        </div>

        <div className="flex justify-between gap-4 items-center text-primary-dark_gray my-3">
          <div className="flex items-center">
            <DollarSquare className="size-5" />
            <span className={`${dm_mono.className} text-sm font-light ml-1`}>
              {formatNaira(service.price, false, true)}
            </span>
          </div>

          <span className="text-[10px] break-words">
            [<span className="font-semibold">In-Store Payment</span> Only]
          </span>
        </div>

        <Divider />

       <button className="text-primary-darkRed mt-3 flex items-center text-xs gap-2">
            <Link href="/services/spa/appointments/book-appointment"><i>Add to Appointment</i></Link>
            <Icon icon="formkit:arrowright" width="16" height="9" />
          </button>
      </div>
    </div>
  );
}
