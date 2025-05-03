'use client';

import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

export default function ReadMoreBtn({ slug }:{ slug: string }) {

  const router = useRouter()

  return (
    <button
      onClick={() => router.push(`/blog/posts/${slug}`)}
      className="group bg-gradient-to-r from-[#990000] to-[#FF0000] hover:from-[#b30000] hover:to-[#cc0000]
                 active:scale-95 text-white text-xs font-medium px-3 py-2 rounded-lg inline-flex items-center gap-2
                 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      Read More
      <span
        className="inline-block"
      >
        <FaArrowRight className="text-xs group-hover:text-white" />
      </span>
    </button>
  )
}
