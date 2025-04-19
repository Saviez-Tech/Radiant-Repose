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
        <div className=" mx-auto grid md:grid-cols-2">
          <div className="space-y-6 pt-8">
            <h1 className="text-4xl md:text-[2.5rem] text-primary-deepBlack font-semibold">
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
            <ExploreBtn />

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

          <div className="grid grid-cols-3 gap-4 -mt-20">
            <div className="flex flex-col pt-40 gap-4">
              <div className="relative w-full aspect-[167/227] rounded-3xl overflow-hidden">
                <Image
                  src="/images/spa.png"
                  alt="Hero"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r w-full h-full from-[#D9D9D900] to-primary-deepBlack opacity-70"></div>
              </div>
              <div className="relative w-full aspect-[167/227] rounded-3xl overflow-hidden">
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
              <div className="relative w-full aspect-[167/227] rounded-3xl overflow-hidden">
                <Image
                  src="/images/rings.png"
                  alt="Hero"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r w-full h-full from-[#D9D9D900] to-primary-deepBlack opacity-70"></div>
              </div>
              <div className="relative w-full aspect-[167/227] rounded-3xl overflow-hidden">
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
              <div className="relative w-full aspect-[167/227] rounded-3xl overflow-hidden">
                <Image
                  src="/images/dhvs.png"
                  alt="Hero"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r w-full h-full from-[#D9D9D900] to-primary-deepBlack opacity-70"></div>
              </div>
              <div className="relative w-full aspect-[167/227] rounded-3xl overflow-hidden">
                <Image
                  src="/images/bag.png"
                  alt="Hero"
                  width={300}
                  height={300}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-r w-full h-full from-[#D9D9D900] to-primary-deepBlack opacity-70"></div>
              </div>
              <div className="relative w-full aspect-[167/227] rounded-3xl overflow-hidden">
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
    </section>
  );
}
