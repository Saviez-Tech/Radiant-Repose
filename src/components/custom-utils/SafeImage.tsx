"use client"

import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

interface SafeImageProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
}

const isValidImageUrl = (url: string) => {
  if (!url) return false
  try {
    new URL(url)
    return /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url)
  } catch {
    return false
  }
}


const CustomSafeImage = ({ src, alt, ...props }:SafeImageProps) => {

  
  if (!src) {
    return <div className="w-10 h-10 bg-gray-200 rounded" />
  }
  
  return (
    !isValidImageUrl(src) ?
    <Skeleton className="w-14 h-14 rounded-xl" />
    :
    <Image
      {...props}
      src={src}
      alt={alt}
    />
  )
}


export default CustomSafeImage;