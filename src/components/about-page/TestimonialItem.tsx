import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

type IProps = {
  avatar: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  prev: () => void;
  next: () => void;
}

export default function TestimonialItem({ avatar, name, location, prev, next, text, rating }: IProps) {
  
  return (
    <div className="pb-10 md:pb-0">
      <p className="text-gray-500 text-sm mb-4 h-32 overflow-y-auto">{text}</p>
      <div className="flex items-center justify-between">
        <div className="flex flex-col md:flex-row justify-between w-full gap-6">
          <div className="flex items-center gap-3">
            <Image
              src={avatar}
              alt={name}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <div>
              <h4 className="font-bold text-sm text-primary-deepBlack">{name}</h4>
              <p className="text-sm text-gray-400">{location}</p>
              <div className="flex gap-[1px] mt-1 text-[#FFAE00]">
                {[...Array(rating)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <button
                onClick={prev}
                className="border-2 border-primary-yellow rounded-full w-10 h-10 flex items-center justify-center text-primary-yellow 
                            hover:bg-yellow-600 hover:border-none hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-yellow/50 transition"
                >
                <FaChevronLeft />
            </button>

            <button
                onClick={next}
                className="bg-primary-yellow text-white rounded-full w-10 h-10 flex items-center justify-center 
                            hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500/50 transition"
                >
                <FaChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
