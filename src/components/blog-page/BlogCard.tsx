import Image from "next/image";
import ReadMoreBtn from "../buttons/ReadMoreBtn";

export default function BlogCard({ blogData }:{ blogData: BlogPost }) {
  return (
    <div className="max-w-md overflow-hidden rounded-lg border border-gray-200 bg-white shadow">
      <div className="relative h-64 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gray-900">
          <Image
            src={blogData.image} 
            alt={blogData.imageAlt || "Blog Image"} 
            className="h-full w-full object-cover opacity-70"
            width={400}
            height={400}
          />
        </div>
        
        {/* Cloud and wifi icons overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex w-full items-center justify-center space-x-6">
            <div className="flex flex-col items-center">
              <div className="mb-4 h-5 w-5 rounded-full bg-white/20"></div>
              <div className="h-10 w-10 rounded-full bg-white/20"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-12 h-5 w-5 rounded-full bg-white/20"></div>
              <div className="h-6 w-12 rounded-lg bg-white/20"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-8 h-5 w-5 rounded-full bg-white/20"></div>
              <div className="h-8 w-14 rounded-lg bg-white/20"></div>
            </div>
            <div className="flex flex-col items-center">
              <div className="mb-16 h-5 w-5 rounded-full bg-white/20"></div>
              <div className="h-6 w-10 rounded-lg bg-white/20"></div>
            </div>
          </div>
        </div>
        
        {/* Glowing tablet and hand */}
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-6">
          <div className="relative">
            <div className="h-4 w-36 rounded-lg bg-yellow-300 shadow-lg shadow-yellow-300/50"></div>
            <div className="absolute -top-6 right-4 h-8 w-4 rounded-full bg-gray-800"></div>
          </div>
        </div>
        
        {/* Date badge */}
        <div className="absolute bottom-0 right-0 bg-yellow-500 px-4 py-2 text-white">
          {blogData.date}
        </div>
      </div>
      
      {/* Author info */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center">
          <img 
            src="/api/placeholder/40/40" 
            alt="Dominica Lopez" 
            className="mr-3 h-10 w-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-gray-800">Dominica Lopez</h3>
            <p className="text-sm text-gray-600">Spa Expert</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h2 className="mb-3 text-2xl font-bold text-gray-800">How to Stay on Track Without Stress</h2>
        <p className="mb-4 text-gray-600">
          Discover pharmacy tools and techniques that simplify your daily medication routine.
        </p>
        
        <ReadMoreBtn />
      </div>
    </div>
  )
}