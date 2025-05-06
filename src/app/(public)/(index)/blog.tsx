import Link from "next/link";
import { LucideArrowRight } from "lucide-react";
import BlogCard from "@/components/blog-page/BlogCard";

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
          {blogs.map((v, i) => (
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

const blogs: BlogPost[] = [
  {
    id: "1",
    title: "How to Stay on Track Without Stress",
    description:
      "Discover pharmacy tools and techniques that simplify your daily medication routine.",
    image: "/images/heroimg2.png",
    date: "April 29, 2025",
    author: {
      name: "Dominica Lopez",
      avatar: "/images/demo-user1.png",
      role: "Spa Expert",
    },
    category: "Wellness",
  },
  {
    id: "2",
    title: "5 Morning Habits for Better Productivity",
    description:
      "Learn the essential morning rituals that can transform your entire day and boost your focus.",
    image: "/images/heroimg5.jpg",
    date: "April 25, 2025",
    author: {
      name: "Marcus Chen",
      avatar: "/images/demo-user1.png",
      role: "Productivity Coach",
    },
    category: "Lifestyle",
  },
  {
    id: "3",
    title: "The Ultimate Guide to Digital Detox",
    description:
      "Practical steps to reduce screen time and reconnect with the world around you.",
    image: "/images/heroimg1.png",
    date: "April 20, 2025",
    author: {
      name: "Sarah Johnson",
      avatar: "/images/demo-user1.png",
      role: "Mental Health Specialist",
    },
    category: "Health",
  },
];
