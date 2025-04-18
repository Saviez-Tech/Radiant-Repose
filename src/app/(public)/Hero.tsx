import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function Hero() {
  return (
    <section className="relative w-full  min-h-[600px] overflow-x-clip">
      <Image
        src="/images/logo2.png"
        alt="Logo"
        width={750}
        height={620}
        className=" absolute right-0 top-0 aspect-[742/660] max-w-[742px] w-1/2 object-contain object-bottom-left  translate-y-[-20%] translate-x-[15%]"
      />
      <div className="app-container py-12">
        <div className=" mx-auto grid md:grid-cols-2">
          <div className="space-y-6 pt-8">
            <h1 className="text-4xl text-primary-deepBlack font-bold">
              Your Premier Destination <br />
              for <span className="text-primary-darkRed">Wellness, Beauty</span>
              <br />
              and <span className="text-primary-darkRed">Luxury.</span>
            </h1>
            <p className="text-lg">
              Explore our{" "}
              <span className="font-semibold text-primary-deepBlack">
                Pharmacy, Spa
              </span>{" "}
              and{" "}
              <span className="font-semibold text-primary-deepBlack">
                Luxury
              </span>{" "}
              collections
              <br />
              across Nigeria.
            </p>
            <Link href="" className=" btn btn-gradient !px-6 !py-3.5">
              Explore Now
              <LuArrowRight />
            </Link>

            {/* Stats */}
            <div className="flex gap-12 pt-8">
              <div>
                <h3 className="text-3xl font-bold">280+</h3>
                <p className="text-sm">Spa Sessions</p>
              </div>
              <div>
                <h3 className=" text-3xl font-bold">720+</h3>
                <p className="text-sm">Happy Clients</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold">3400+</h3>
                <p className="text-sm">Luxury Items</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 -mt-24">  
            <div className="flex flex-col pt-40  gap-4">
              <Image
                src="/images/spa.png"
                alt="Hero"
                width={300}
                height={300}
                className="object-cover w-full aspect-[167/227] rounded-3xl"
              />
              <Image
                src="/images/spa.png"
                alt="Hero"
                width={300}
                height={300}
                className="object-cover w-full aspect-[167/227] rounded-3xl"
              />
            </div>
            <div className="flex flex-col pt-16 gap-4 ">
              <Image
                src="/images/rings.png"
                alt="Hero"
                width={300}
                height={300}
                className="object-cover w-full aspect-[167/227] rounded-3xl"
              />
              <Image
                src="/images/fw.png"
                alt="Hero"
                width={300}
                height={300}
                className="object-cover w-full aspect-[167/227] rounded-3xl"
              />
            </div>
           
            <div className="flex flex-col gap-4">
              <Image
                 src="/images/dhvs.png"
                alt="Hero"
                width={300}
                height={300}
                className="object-cover w-full aspect-[167/227] rounded-3xl"
              />
               <Image
                src="/images/ce.png"
                alt="Hero"
                width={300}
                height={300}
                className="object-cover w-full aspect-[167/227] rounded-3xl"
              />
               <Image
                src="/images/ce.png"
                alt="Hero"
                width={300}
                height={300}
                className="object-cover w-full aspect-[167/227] rounded-3xl"
              />
            </div>
           
          </div>
        </div>
      </div>
    </section>
  );
}
