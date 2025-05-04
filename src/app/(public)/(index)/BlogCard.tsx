import { LucideArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type BlogCardProps = {
  id: number;
  title: string;
  description: string;
  date: string;
  author: string;
  authorImage: string;
  imageUrl: string;
  role: string;
};

export default function BlogCard({
  title,
  description,
  date,
  author,
  authorImage,
  imageUrl,
  role,
}: BlogCardProps) {
  return (
    <div className="bg-white  w-full rounded-xl overflow-hidden shadow-md">
      <div className="relative h-56 w-full">
        <Image src={imageUrl} alt={title} fill className="object-cover" />
      </div>

      <div className="px-5 py-2 text-left space-y-2 md:space-y-4 relative">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-full overflow-hidden">
              <Image
                src={authorImage}
                alt={author}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col text-start">
              <span className="font-medium">{author}</span>
              <span className="text-gray-500 text-xs">{role}</span>
            </div>
          </div>

          <span className="text-white px-2 py-1.5  bg-primary-yellow text-xs font-semibold whitespace-nowrap absolute -top-4 right-0">
            {date}
          </span>
        </div>

        <h3 className="font-semibold text-base md:text-lg text-primary-deepBlack">{title}</h3>
        <p className="text-primary-dark_gray text-sm">{description}</p>

        <Link
          href="#"
          className="btn-gradient px-2 md:px-4 py-1 md:py-3 flex items-center max-md:text-sm gap-2 w-fit hover:bg-red-700 transition"
        >
          Read more
          <LucideArrowRight />
        </Link>
      </div>
    </div>
  );
}
