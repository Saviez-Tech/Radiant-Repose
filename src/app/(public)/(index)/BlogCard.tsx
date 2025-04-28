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
};

export default function BlogCard({
  title,
  description,
  date,
  author,
  authorImage,
  imageUrl,
}: BlogCardProps) {
  return (
    <div className="bg-white aspect-[293/415] w-full rounded-xl overflow-hidden shadow-md">
      <div className="relative h-56 w-full">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5 text-left space-y-4">
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
            <span className="font-medium">{author}</span>
          </div>
          <span className="text-primary-yellow px-2 py-0.5 rounded-md bg-[#FFAE001A] text-xs font-semibold whitespace-nowrap">
            {date}
          </span>
        </div>

        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>

        <Link
          href="#"
          className="btn-gradient px-4 py-3 flex items-center gap-2 w-fit hover:bg-red-700 transition"
        >
          Read more
          <LucideArrowRight />
        </Link>
      </div>
    </div>
  );
}
