import Link from "next/link";
import BlogCard from "./BlogCard";


export default function Blog() {
  return (
    <section className=" bg-white">
      <div className="app-container py-16">
        <h2 className="text-3xl font-bold text-center mb-6">
          Read from our exclusive blog
        </h2>
        <p className="text-center max-w-2xl mx-auto text-gray-600 mb-10">
          Discover expert tips, wellness insights, and the latest in luxury self-care — curated to help you live radiantly every day.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} {...blog} />
          ))}
        </div>

        <div className="text-center mt-6">
          <Link href="#" className="text-primary-red font-semibold inline-flex items-center gap-2">
            See more articles →
          </Link>
        </div>
      </div>
    </section>
  );
}

const blogs= [
    {
      id: 1,
      title: "Choosing the perfect spa treatment for your skin.",
      description: "Understanding spa services for the best tailored experience.",
      date: "April 5th, 2025",
      author: "Dominick Lopez",
      authorImage: "/images/spa.png",
      imageUrl: "/images/spa.png",
      role: "Spa",
    },
    {
      id: 2,
      title: "How to set the Richard Mille Rolex local-time",
      description: "Displaying local and standard times of watches made easy.",
      date: "March 9th, 2025",
      author: "Dominick Lopez",
      authorImage: "/images/spa.png",
      imageUrl: "/images/watch.png",
        role: "Expert",
    },
    {
      id: 3,
      title: "Choosing the perfect spa treatment for your skin.",
      description: "Understanding spa services for the best tailored experience.",
      date: "March 8th, 2025",
      author: "Dominick Lopez",
      authorImage: "/images/spa.png",
      imageUrl: "/images/spa.png",
      role: "Spa Expert",
    },
  ];
