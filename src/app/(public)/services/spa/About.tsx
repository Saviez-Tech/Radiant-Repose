import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import Counter from "./Counter";

export default function About() {
  return (
    <div className="  app-container py-16 flex flex-col gap-16">
      <div className="grid md:grid-cols-2 items-center gap-12">
        <Image
          src="/images/spa-about.png"
          alt="spa"
          width={1000}
          height={1000}
          loading="lazy"
          className="w-full h-full object-contain aspect-[523/512]"
        />
        <div className="flex flex-col gap-[49px]">
          <div className="flex flex-col gap-[15px]">
            <h2 className="font-semibold md:text-4xl text-2xl">
              A Sanctuary for{" "}
              <span className="text-primary-darkRed">Wellness</span> and{" "}
              <span className="text-primary-darkRed">Rejuvenation</span>
            </h2>
            <p className="md:text-lg text-base text-primary-deepBlack">
              At{" "}
              <span className="font-semibold">
                Radiant Repose Spa Service,{" "}
              </span>
              we offer a serene escape where your body, mind and soul are
              nurtured through personalized spa treatments and holistic care.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/users.svg"
                alt="spa"
                width={200}
                height={200}
                loading="lazy"
                className="md:w-12 md:h-7 w-7 h-5 object-contain"
              />
              <div className="flex flex-col">
                <p className="font-bold text-primary-deepBlack md:text-xl text-lg">
                  Customer Experience
                </p>
                <p className="md:text-lg text-sm text-primary-base_color2">
                  Designed to make you feel relaxed and completely at ease
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/radient-repose.svg"
                alt="spa"
                width={500}
                height={500}
                loading="lazy"
                className="md:w-12 mdh-9 w-7 h-6 object-contain"
              />
              <div className="flex flex-col">
                <p className="font-bold text-primary-deepBlack md:text-xl text-lg">
                  Professional Therapists
                </p>
                <p className="md:text-lg text-sm text-primary-base_color2">
                  Certified expert treatment, ensuring you’re in trusted hands
                </p>
              </div>
            </div>
          </div>
          <Link href="#" className="btn-primary w-fit !px-5 !py-3">
            View Spa Locations
            <LuArrowRight />
          </Link>
        </div>
      </div>
      <Counter />
    </div>
  );
}
