import Scaffold from "@/components/custom-utils/Scalffold";
import ServicesCard, { serviceCardProps } from "./ServicesCard";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function Services() {
  return (
    <div className="[&_.space-for-header]:pt-0 md:*:mb-6">

    <Scaffold>
      <section className="bg-[#FFAE001A]/10 py-12 app-container">
        <div className="flex- flex-col text-center">
          <h3 className="font-semibold md:text-3xl text-2xl mb-3">
            Our Spa Services at Radiant Repose
          </h3>
          <p className="md:text-lg text-base">We believe self-care is a luxury you deserve.</p>
          <p className="md:text-lg text-base">
            Our Spa services are crafted to help you relax, recharge and
            rejuvenate.
          </p>
        </div>
        <div className="grid md:grid-cols-2 py-12 gap-5 mb-5">
          {servicesData.map((v, i) => (
            <ServicesCard key={i} {...v} />
        ))}
        </div>
        <Link
          href="#"
          className="text-primary-darkRed mb-4 text-base flex items-center gap-2 justify-center mx-auto w-fit"
          >
          See Full Services
          <LuArrowRight />
        </Link>
      </section>
    </Scaffold>
    </div>
  );
}

const servicesData: serviceCardProps[] = [
  {
    title: "Full Body Massage",
    description:
      "A deeply relaxing massage that eases tension, improves circulation and revitalizes the body.",
    img: "/icons/massage.svg",
    time: "30 Minutes",
  },
  {
    title: "Aromatherapy Massage",
    description:
      "Combines gentle pressure with essential oils to calm the mind and soothe the senses",
    img: "/icons/services2.svg",
    time: "60 Minutes",
  },
  {
    title: "Deep Tissue Massage",
    description:
      "Targets deeper muscle layers to relieve chronic pain, stiffness and tension.",
    img: "/icons/services3.svg",
    time: "40 Minutes",
  },
  {
    title: "Hot Stone Therapy",
    description:
      "Smooth, heated stones to melt away stress and promote deep relaxation.",
    img: "/icons/services4.svg",
    time: "30 Minutes",
  },
  {
    title: "Express facial Treatment",
    description:
      "A quick yet effective cleanse, exfoliation and hydration for glowing skin.",
    img: "/icons/services6.svg",
    time: "30 Minutes",
  },
  {
    title: "Foot Reflexology",
    description:
      "Focused pressure-point therapy used to restore balance and improve overall wellness",
    img: "/icons/services7.svg",
    time: "40 Minutes",
  },
];
