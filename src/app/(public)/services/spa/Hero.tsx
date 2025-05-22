import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function Hero() {
  return (
    <section className="relative lg:-mt-14 py-32 w-full flex items-center justify-center text-white bg-[url('/images/spa-hero-bg.png')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 z-10 bg-[#00000099]/60"></div>
      <div className="relative text-center px-4 flex flex-col gap-5 z-20">
        <div className="max-w-[600px] mx-auto">
          <h1 className="text-3xl md:text-5xl mb-4 md:leading-[1.2em]">
            Rejuvenate your Body. Elevate your mind.
          </h1>
          <p className="text-white text-base md:text-lg mb-8">
            Explore our Personalized Spa Services across Nigeria
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/services/spa/listing"
            className="btn btn-yellow !px-5 !py-3 max-md:w-fit flex items-center gap-2"
          >
            Explore Spa Services
            <LuArrowRight />
          </Link>
          <Link
            href="/services/spa/listing/"
            className="btn btn-gradient !px-5 !py-3 max-md:w-fit flex items-center gap-2"
          >
            Book an Appointment
            <LuArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
