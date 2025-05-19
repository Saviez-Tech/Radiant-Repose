import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export type serviceCardProps = {
    title: string;
    description: string;
    img: string
    time: string
};
export default function ServicesCard({description, img, time, title}: serviceCardProps) {
  return (
    <div className="bg-white md:p-6 p-4 flex gap-4 rounded-lg">
      <div className="md:size-[51px] size-[32px] rounded-full bg-[#990000]/5 flex flex-col items-center justify-center flex-shrink-0">
        <Image
          src={img}
          alt="Spa"
          width={300}
          height={300}
          className="md:size-[39px]  size-[24px]"
        />
      </div>
      <div className="flex flex-col md:gap-5 gap-3">
        <p className="font-bold md:text-xl text-lg">{title}</p>
        <p className="md:text-base text-sm">
          {description}
        </p>
        <div className="flex justify-between">
           <div className="flex gap-2 items-center">
             <Image
              src="/icons/timer.svg"
              alt="timer"
              width={300}
              height={300}
              className="w-[17px] h-[[19px]"
            />
             <p className="md:text-base text-sm">{time}</p>
           </div>
           <Link href="#"  className="text-primary-darkRed flex items-center italic md:text-base text-sm">Book Service <LuArrowRight /></Link>
        </div>
      </div>
    </div>
  );
}
