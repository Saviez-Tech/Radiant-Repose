import { blogData } from "@/components-data/blog-data";
import BlogCard from "@/components/blog-page/BlogCard";

export default function RelatedBlogs() {
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-primary-base_color2 md:text-2xl text-lg font-semibold">
                        Related Topics & Articles
                      </h2>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        {blogData.slice(0, 4).map((v, i) => (
                          <BlogCard key={i} blogData={v} />
                        ))}
                      </div>
        </div>
    );
}