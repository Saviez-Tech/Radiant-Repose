import Image from 'next/image';
import { Icon } from '@iconify/react';
import { inter } from '@/fonts';
import Link from 'next/link';

function PendingOrderCard(props: OrderList){
    
  return (
    <div className={`${inter.className} w-[98%] relative mx-auto hover:scale-[1.02] duration-200 ease-in-out bg-primary-base_color1 drop-shadow-md border border-gray-50 rounded-xl p-4 py-8 md:p-4 pb-14 md:pb-12 shadow-sm text-[#8E95A9]`}>
      <div className={`${inter.className} flex flex-col gap-3`}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full aspect-square overflow-hidden bg-gray-100">
            <Image
              src="/icons/customer.svg"
              alt={props.full_name}
              width={48}
              height={48}
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div>
            <h3 className="text-[#1C2A53] text-sm font-semibold">{props.full_name}</h3>
            <p className="text-sm text-[#8E95A9]">{props.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Icon 
              icon="tdesign:location" 
              className="w-5 h-5 flex-shrink-0 text-[#8E95A9]"
          />
          <div>
              <p className="text-sm font-semibold text-[#1C2A53]">Location</p>
              <p className="text-sm text-[#8E95A9]">{props.street_address}, {props.city}, {props.state}, {props.country}</p>
          </div>
        </div>
      </div>
      <div className='right-3 absolute bottom-3'>
        <Link 
          href={`pending-order/${props.id}`}
          className="text-primary-darkRed text-[13px] font-semibold hover:text-red-600 transition-colors flex items-center"
        >
          View Order
          <Icon icon="tabler:caret-right-filled" width="24" height="24" />
        </Link>
      </div>
    </div>
  )
}

export default PendingOrderCard;