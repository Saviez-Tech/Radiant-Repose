"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export type ServiceCardProps = {
  title: string;
  description: string;
  className: string;
  img: string;
  slug: string;
}

export default function ServiceCard({
  className: bgColor, 
  description,
  img, 
  title, 
  slug,
}: ServiceCardProps) {
  const router = useRouter()


  return (


    <div className="group relative">
      <div className={cn(
        "rounded-2xl relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02]", 
        bgColor
      )}>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2 text-primary-darkRed group-hover:text-opacity-80 transition-colors">
            {title}
          </h3>
          <p className="text-sm font-semibold group-hover:text-opacity-80 transition-colors">
            {description}
          </p>
        </div>
        <div className="relative w-full">
          <Image 
            className="w-full h-[343px] !object-contain object-right-top transition-transform duration-300 group-hover:scale-105" 
            alt="Pattern" 
            src={img} 
            width={250} 
            height={250} 
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-center">
        <button
          onClick={() => router.push(slug)}
          className={cn(
            "inline-flex items-center absolute bottom-12 left-4 gap-2 px-4 text-sm py-3 rounded-full",
            "bg-primary-yellow hover:bg-orange-400 active:bg-orange-400",
            "text-white font-medium text-sm",
            "transition-all duration-200 ease-in-out",
            "hover:shadow-lg hover:scale-105 active:scale-95",
            "focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          )}
        >
          Get Started
          <ArrowRight 
            size={16} 
            className="transition-transform duration-200 group-hover:translate-x-1" 
          />
        </button>
      </div>
    </div>
  )
}