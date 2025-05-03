// const blogData: BlogPost[] = [
//     {
//       id: "1",
//       title: "How to Stay on Track Without Stress",
//       description: "Discover pharmacy tools and techniques that simplify your daily medication routine.",
//       image: "/images/blog/pharmacy-tools.jpg",
//       date: "April 29, 2025",
//       author: {
//         name: "Dominica Lopez",
//         role: "Spa Expert",
//         avatar: "/images/authors/dominica-lopez.jpg"
//       },
//       category: "Wellness"
//     },
//     {
//       id: "2",
//       title: "5 Morning Habits for Better Productivity",
//       description: "Learn the essential morning rituals that can transform your entire day and boost your focus.",
//       image: "/images/blog/morning-habits.jpg",
//       date: "April 25, 2025",
//       author: {
//         name: "Marcus Chen",
//         role: "Productivity Coach",
//         avatar: "/images/authors/marcus-chen.jpg"
//       },
//       category: "Lifestyle"
//     },
//     {
//       id: "3",
//       title: "The Ultimate Guide to Digital Detox",
//       description: "Practical steps to reduce screen time and reconnect with the world around you.",
//       image: "/images/blog/digital-detox.jpg",
//       date: "April 20, 2025",
//       author: {
//         name: "Sarah Johnson",
//         role: "Mental Health Specialist",
//         avatar: "/images/authors/sarah-johnson.jpg"
//       },
//       category: "Health"
//     },
//     {
//       id: "4",
//       title: "Mastering Mindfulness in a Busy World",
//       description: "Simple techniques to incorporate mindfulness into your daily routine even with a packed schedule.",
//       image: "/images/blog/mindfulness.jpg",
//       date: "April 18, 2025",
//       author: {
//         name: "David Park",
//         role: "Meditation Expert",
//         avatar: "/images/authors/david-park.jpg"
//       },
//       category: "Wellness"
//     },
//     {
//       id: "5",
//       title: "Smart Home Gadgets That Actually Save Time",
//       description: "A curated list of technology that delivers on the promise of making your life easier.",
//       image: "/images/blog/smart-home.jpg",
//       date: "April 15, 2025",
//       author: {
//         name: "Tanya Reeves",
//         role: "Tech Reviewer",
//         avatar: "/images/authors/tanya-reeves.jpg"
//       },
//       category: "Technology"
//     },
//     {
//       id: "6",
//       title: "The Science of Better Sleep",
//       description: "Research-backed methods to improve your sleep quality and wake up refreshed every morning.",
//       image: "/images/blog/better-sleep.jpg",
//       date: "April 10, 2025",
//       author: {
//         name: "Robert Nolan",
//         role: "Sleep Researcher",
//         avatar: "/images/authors/robert-nolan.jpg"
//       },
//       category: "Health"
//     }
// ]

import BlogPageForm from "@/components/blog-page/BlogPageInput";

export default function Page(){
    return (
        <main>
            <section>
                <div>
                    <div className="flex w-full bg-gradient-to-r from-amber-50 to-amber-100 relative">
                        <div className="w-7/12 p-8 pl-6">
                            <h1 className="text-3xl font-bold text-gray-900 mb-4">Read from our exclusive blog</h1>
                            <p className="text-gray-700 leading-relaxed">
                                Discover expert tips, wellness insights, and the latest in luxury self-care — curated to help you live radiantly every day.
                            </p>
                        </div>
                        
                        <div className="w-5/12 p-8 flex flex-col justify-center">
                            <p className="text-right mb-2 text-gray-800 font-medium">Find article using &quot;Specific Keywords&quot;</p>
                            <BlogPageForm />
                        </div>
                        
                        <div className="absolute right-1/3 top-0 bottom-0 w-0.5 bg-blue-500"></div>
                    </div>
                </div>
            </section>
        </main>
    )
}