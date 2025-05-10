import { blogData } from "@/components-data/blog-data";
import BlogCard from "@/components/blog-page/BlogCard";
import BlogPageForm from "@/components/blog-page/BlogPageInput";

export default function Page(){
    return (
        <main className="space-for-header bg-gradient-to-tr from-[#ffffff] to-[#ffefe6db]">
            <section className="glob-px">
                <hr className="w-full h-[1px] bg-stone-300 block" />
                <div className="mt-10 md:mt-14">
                    <div className="md:flex space-y-8 justify-between items-start w-full relative">
                        <div className="md:w-7/12 text-primary-deepBlack text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl font-bold mb-4">Read from our exclusive blog</h1>
                            <p className="text-sm md:text-base leading-relaxed">
                                Discover expert tips, wellness insights, and the latest in luxury self-care — curated to help you live radiantly every day.
                            </p>
                        </div>
                        
                        <div className="w-full md:w-96 flex flex-col justify-center">
                            <p className="text-center md:text-right mb-1 text-sm">Find article using <span className="font-semibold">&quot;Specific Keywords&quot;</span></p>
                            <BlogPageForm />
                        </div>                        
                    </div>
                </div>

                <div className="py-14 grid xs:grid-cols-1 grid-cols-2 md:grid-cols-3 gap-4 gap-y-6 md:gap-y-8 lg:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]">
                    {
                        blogData.map((v,i) => (
                            <BlogCard blogData={v} key={i} />
                        ))
                    }
                </div>
            </section>
        </main>
    )
}