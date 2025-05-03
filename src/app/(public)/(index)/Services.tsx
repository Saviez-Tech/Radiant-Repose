import ServiceCard from "./ServiceCard";

export default function ServicesSection() {
  return (
    <section className=" app-container relative bg-[#FFAE001A]/10 w-full px-4 pb-12 md:pb-16">
      <div className=" relative mx-auto bg-primary-darkRed rounded-3xl px-8 pt-12 shadow-xl -top-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="md:text-3xl text-xl font-bold text-white">
              Still skeptical? <br /> Here&apos;s why you should choose us.
            </h2>
          </div>
          <div className="md:text-right text-sm">
            <p className="text-white/90">
              Ready to experience true luxury and care? With Radiant Repose,
              it&apos;s within your reach!
            </p>
          </div>
        </div>
        <div className="relative md:h-[400px] pt-6  ">
          <div className="grid grid-cols-1 md:grid-cols-3 left-0 gap-4 relative md:absolute  md:h-[460px] w-full  ">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}


const services = [
  {
    title: "Spa session",
    description:
      "Relax and rejuvenate with our premium spa treatments and therapies.",
    className: "bg-[#FFFFAA]",
    img: "/icons/spa.svg",
  },
  {
    title: "Luxury Collection",
    description:
      "Experience our exclusive luxury products and premium services.",
    className: "bg-[#FF0000] !text-white [&_h3]:text-white",
    img: "/icons/luxury.svg",
  },
  {
    title: "Wellness Care",
    description:
      "Comprehensive wellness programs designed for your health and comfort.",
    className: "bg-white",
    img: "/icons/phamacy.svg",
  },
]
