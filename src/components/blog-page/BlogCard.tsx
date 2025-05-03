import Image from "next/image";
import ReadMoreBtn from "../buttons/ReadMoreBtn";

export default function BlogCard({ blogData }:{ blogData: BlogPost }) {
  return (
    <div className="max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow">
      <div className="relative h-36 w-full">
        <div className="absolute inset-0 bg-gray-900 rounded-b-xl overflow-hidden">
          <Image
            src={blogData.image} 
            alt={blogData.imageAlt || "Blog Image"} 
            className="h-full w-full object-cover opacity-70"
            width={400}
            height={400}
          />
        </div>
        
        <div className="absolute -bottom-4 right-0 bg-primary-yellow px-4 py-2 text-primary-base_color1 text-xs">
          {blogData.date}
        </div>
      </div>
      
      {/* Author info */}
      <div className="border-b border-gray-200 pt-5 pb-2 px-3 text-primary-deepBlack">
        <div className="flex items-center">
          <Image
            src={blogData.author.avatar}
            alt={blogData.author.name}
            width={50}
            height={50}
            className="mr-3 h-10 w-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-xs">{blogData.author.name}</h3>
            <p className="text-[9px]">{blogData.author.role}</p>
          </div>
        </div>
      </div>
      
      <div className="px-3 pt-2 pb-4 text-primary-deepBlack">
        <h2 className="mb-2 text-sm font-medium">{blogData.title}</h2>
        <p className="mb-2 text-primary-dark_gray text-xs">
          {blogData.description.slice(0,45)}...
        </p>
        
        <ReadMoreBtn slug={blogData.id} />
      </div>
    </div>
  )
}