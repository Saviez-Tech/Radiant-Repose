import Image from "next/image";

export default function AboutSection() {
  return (
    <section className=" bg-[#FFAE001A]/10 md:py-12">
      <div className="app-container grid gap-2 md:gap-8 md:grid-cols-2">
        <div className="lg:space-y-8 md:space-y-4 space-y-2 ">
          <h2 className=" lg:text-[38px] md:text-[22px]  text-[16px] font-semibold">
            We are only known for Excellence & Competence
          </h2>
          <p className=" md:text-xl text-base text-primary-deepBlack">
            <span className="font-semibold text-base">Radiant Repose</span> is home to one
            of the finest wellness and luxury self-care destinations in Nigeria.
            Our Excellence in these services speaks for us.
          </p>
          <div className="relative max-md:hidden z-[2]">
            <div className="w-[135%] aspect-[650/274] py-12 px-8 absolute bg-left-top top-0 left-0 md:bg-[url('/icons/services.svg')] bg-[url('/icons/responsive-services.svg')] bg-contain bg-no-repeat">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 max-md:hidden">
                {services.map((service, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2" />
                    <p className="text-sm text-gray-700">{service}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className=" relative">
          <Image
            className="aspect-[17/16]
             w-full 
             rounded-md  object-cover"
            alt="about radiant repose"
            src="/images/about-sectionimg.jpg"
            width={1000}
            height={1000}
          />

          <div className="w-[90%] md:hidden -translate-x-1/2 left-1/2  lg:aspect-[326/457] md:py-6  lg:py-12 px-8 relative -top-20 bg-top md:bg-[url('/icons/services.svg')] bg-[url('/icons/responsive-services.svg')] bg-contain bg-no-repeat">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 max-md:hidden">
              {services.map((service, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary-yellow rounded-full mt-2" />
                  <p className="text-sm text-gray-700">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const services = [
  "Spa Appointments & Treatments",
  "Pharmacy & Prescription Services",
  "Luxury Skincare & Beauty Store",
  "Health & Wellness Consultations",
  "Personalized Wellness Plans",
  "Beauty and Wellness Content",
  "Store Locator and Booking System",
  "Spa Gift Cards and Packages",
  "Holistic Therapy Sessions",
  "Self-Care Subscription Boxes",
];
