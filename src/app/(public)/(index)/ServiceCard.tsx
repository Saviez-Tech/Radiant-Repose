import { cn } from "@/lib/utils";
import Image from "next/image";
export type ServiceCardProps = {
    title: string;
    description: string;
    className: string;
    // icon: ReactNode;
    img: string;
}
export default function ServiceCard({className: bgColor, description,img, title}: ServiceCardProps) {
  return (
    <div className={cn("rounded-2xl relative overflow-hidden", bgColor)}>
      <div className=" p-6">
        <h3 className="text-2xl font-bold mb-2 text-primary-darkRed">{title}</h3>
        <p className="text-sm font-semibold">{description}</p>
      </div>
      <div className=" relative w-full">
        <Image className=" w-full h-[343px] !object-contain object-right-top" alt="Pattern" src={img} width={250} height={250} />
      </div>
    </div>
  );
}
