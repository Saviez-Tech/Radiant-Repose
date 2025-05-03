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
        
        <div className="absolute bottom-0 right-0 bg-yellow-500 px-4 py-2 text-white">
          {blogData.date}
        </div>
      </div>
      
      {/* Author info */}
      <div className="border-b border-gray-200 p-4">
        <div className="flex items-center">
          <Image
            src={blogData.author.avatar}
            alt={blogData.author.name}
            className="mr-3 h-10 w-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-bold text-gray-800">{blogData.author.name}</h3>
            <p className="text-sm text-gray-600">{blogData.author.role}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h2 className="mb-3 text-2xl font-bold text-gray-800">{blogData.title}</h2>
        <p className="mb-4 text-gray-600">
          {blogData.description.slice(0,20)}
        </p>
        
        <ReadMoreBtn />
      </div>
    </div>
  )
}