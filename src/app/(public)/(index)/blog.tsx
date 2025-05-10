import Link from "next/link";
import { LucideArrowRight } from "lucide-react";
import BlogCard from "@/components/blog-page/BlogCard";
import { blogData } from "@/components-data/blog-data";

export default function Blog() {
  return (
    <section className=" bg-white">
      <div className="app-container py-16">
        <h2 className="text-3xl font-bold text-center mb-6">
          Read from our exclusive blog
        </h2>
        <p className="text-center max-w-2xl mx-auto text-primary-deepBlack mb-10">
          Discover expert tips, wellness insights, and the latest in luxury
          self-care — curated to help you live radiantly every day.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 max-w-[950px] mx-auto">
          {blogData.slice(0, 3).map((v, i) => (
            <BlogCard blogData={v} key={i} />
          ))}
        </div>

        <div className="text-center mt-6">
          <Link
            href="/blog"
            className="text-primary-darkRed font-semibold inline-flex items-center gap-2"
          >
            See more articles <LucideArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}


