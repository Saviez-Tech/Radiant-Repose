export const blogData: BlogPost[] = [
    {
      id: "1",
      title: "How to Stay on Track Without Stress",
      description: "Discover pharmacy tools and techniques that simplify your daily medication routine.",
      image: "/images/spa2.png",
      date: "April 29, 2025",
      author: {
        name: "Dominica Lopez",
        avatar:  "/images/demo-user1.png",
        role: "Spa Expert",
      },
      category: "Wellness"
    },
    {
      id: "2",
      title: "5 Morning Habits for Better Productivity",
      description: "Learn the essential morning rituals that can transform your entire day and boost your focus.",
      image:  "/images/heroimg1.png",
      date: "April 25, 2025",
      author: {
        name: "Marcus Chen",
        avatar:  "/images/demo-user1.png",
        role: "Productivity Coach",
      },
      category: "Lifestyle"
    },
    {
      id: "3",
      title: "The Ultimate Guide to Digital Detox",
      description: "Practical steps to reduce screen time and reconnect with the world around you.",
      image:  "/images/heroimg1.png",
      date: "April 20, 2025",
      author: {
        name: "Sarah Johnson",
        avatar:  "/images/demo-user1.png",
        role: "Mental Health Specialist",
      },
      category: "Health"
    },
    {
      id: "4",
      title: "Mastering Mindfulness in a Busy World",
      description: "Simple techniques to incorporate mindfulness into your daily routine even with a packed schedule.",
      image:  "/images/heroimg1.png",
      date: "April 18, 2025",
      author: {
        name: "David Park",
        avatar:  "/images/demo-user1.png",
        role: "Meditation Expert",
      },
      category: "Wellness"
    },
    {
      id: "5",
      title: "Smart Home Gadgets That Actually Save Time",
      description: "A curated list of technology that delivers on the promise of making your life easier.",
      image:  "/images/heroimg1.png",
      date: "April 15, 2025",
      author: {
        name: "Tanya Reeves",
        avatar:  "/images/demo-user1.png",
        role: "Tech Reviewer",
      },
      category: "Technology"
    },
    {
      id: "6",
      title: "The Science of Better Sleep",
      description: "Research-backed methods to improve your sleep quality and wake up refreshed every morning.",
      image:  "/images/heroimg1.png",
      date: "April 10, 2025",
      author: {
        name: "Robert Nolan",
        avatar:  "/images/demo-user1.png",
        role: "Sleep Researcher",
      },
      category: "Health"
    }
]

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