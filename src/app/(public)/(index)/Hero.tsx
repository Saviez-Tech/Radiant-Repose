import ExploreBtn from "@/components/buttons/ExploreBtn";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="space-for-header relative w-full min-h-[600px] overflow-x-clip bg-gradient-to-br from-[white] to-[#e8cab9]">
      <Image
        src="/images/logo2.png"
        alt="Logo"
        width={750}
        height={620}
        className=" absolute right-0 top-0 aspect-[742/660] max-w-[742px] w-1/2 object-contain object-bottom-left  translate-y-[-20%] translate-x-[15%]"
      />
      <div className="app-container py-12">
        <div className=" mx-auto grid md:grid-cols-2 max-md:gap-6">
          <div className="space-y-6 pt-8">
            <h1 className="text-2xl md:text-[2.5rem] text-primary-deepBlack font-semibold">
              Your Premier Destination <br />
              for <span className="text-primary-darkRed">Wellness, Beauty</span>
              <br />
              and <span className="text-primary-darkRed">Luxury.</span>
            </h1>
            <p className="md:text-lg text-base">
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
            <ExploreBtn />

            {/* Stats */}
            <div className="flex gap-12 pt-8">
              <div>
                <h3 className="md:text-3xl text-lg font-bold">280+</h3>
                <p className="text-sm truncate ">Spa Sessions</p>
              </div>
              <div>
                <h3 className=" md:text-3xl font-bold text-lg">720+</h3>
                <p className="text-sm truncate">Happy Clients</p>
              </div>
              <div>
                <h3 className="md:text-3xl font-bold text-lg">3400+</h3>
                <p className="text-sm truncate">Luxury Items</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 md:-mt-20 mt-0">
            <div className="flex flex-col pt-40 gap-4">
              <div className="relative w-full md:aspect-[167/227] aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/spa.png"
                  alt="Hero"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r w-full h-full from-[#D9D9D900] to-primary-deepBlack opacity-70"></div>
              </div>
              <div className="relative w-full md:aspect-[167/227] aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/fw.png"
                  alt="Hero"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r w-full h-full from-[#D9D9D900] to-primary-deepBlack opacity-70"></div>
              </div>
            </div>
            <div className="flex flex-col pt-16 gap-4">
              <div className="relative w-full md:aspect-[167/227] aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/rings.png"
                  alt="Hero"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r w-full h-full from-[#D9D9D900] to-primary-deepBlack opacity-70"></div>
              </div>
              <div className="relative w-full md:aspect-[167/227] aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/ce.png"
                  alt="Hero"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r w-full h-full from-[#D9D9D900] to-primary-deepBlack opacity-70"></div>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="relative w-full md:aspect-[167/227] aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/dhvs.png"
                  alt="Hero"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r w-full h-full from-[#D9D9D900] to-primary-deepBlack opacity-70"></div>
              </div>
              <div className="relative w-full md:aspect-[167/227] aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/bag.png"
                  alt="Hero"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r w-full h-full from-[#D9D9D900] to-primary-deepBlack opacity-70"></div>
              </div>
              <div className="relative w-full md:aspect-[167/227] aspect-[4/5] rounded-3xl overflow-hidden">
                <Image
                  src="/images/watch.png"
                  alt="Hero"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r w-full h-full from-[#D9D9D900] to-primary-deepBlack opacity-70"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" h-40">

      </div>
    </section>
  );
}
