import BlogCard from "@/components/blog-page/BlogCard";
import Scalffold from "@/components/custom-utils/Scalffold";
import Image from "next/image";
import RelatedBlogs from "./RelatedBlogs";
import { blogData } from "../page";



export default function Page() {
    const blog = blogData[0]
  return (
    <Scalffold>
      <main className="app-container py-16 grid md:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4 col-span-2">
          <div className="relative rounded-xl w-full aspect-[707/470]">
            <img
              src={blog.image}
              alt="Radiant repose blog"
              className="absolute inset-0 w-full h-full object-contain rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#990000] to-[#D9D9D900] rounded-xl" />
            <div className="absolute bottom-2 right-0 bg-primary-yellow px-4 py-2 text-white font-medium">
              {blog.date}
            </div>
          </div>

          <div className="flex items-center px-3 text-primary-deepBlack">
            <Image
              src={blog.author.avatar}
              alt="radiant repose blog"
              width={50}
              height={50}
              className="mr-3 h-10 w-10 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold md:text-base text-sm">{blog.author.name}</h3>
              <p className="text-[9px] md:text-sm">{blog.author.role}</p>
            </div>
          </div>

          <h1 className="text-primary-base_color2 md:text-4xl text-2xl font-semibold">
            Choosing the perfect Spa treatment for your skin.
          </h1>

          <p className="text-sm md:text-base leading-relaxed">
            {blog.description}
          </p>
        </div>

        <div className="flex flex-col col-span-1  w-full">
          <RelatedBlogs />
        </div>
      </main>
    </Scalffold>
  );
}



