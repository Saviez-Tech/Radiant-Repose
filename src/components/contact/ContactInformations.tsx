import { ArrowRight } from "lucide-react";
import Link from "next/link";



export default function ContactInformations() {
    return (
        <section className="flex flex-col gap-8 w-full max-md:px-4">
            <h2 className="text-primary-deepBlack md:text-2xl text-xl font-bold w-full">Branches & Contact Information</h2>
            {contactInfos.map((info, index) => (
                <div key={index} className="flex flex-col gap-2">
                    <h3 className="md:text-lg text-base font-semibold">{info.address}</h3>
                    <p className="md:text-base text-sm">{info.services}</p>
                    <p className="md:text-base text-sm">{info.phone}</p>
                    <Link href={"#"} className="text-primary-darkRed font-semibold inline-flex items-center gap-2 max-md:text-base">Get Directions <ArrowRight /></Link>
                </div>
            ))}

        </section>
    );
}

const contactInfos = [
    {
        address: "Varoyal Plaza, Opp Royal Spring Palm Suite, Akachi Road, Owerri, Imo State.",
        services: "Pharmacy | Spa | Luxury Retail",
        phone: "+234(0)916 0666 820",
    },
    {
        address: "Plot 421 Aminu Kano Crescent, Wuse II, Abuja, FCT.",
        services: "Pharmacy | Spa | Luxury Retail",
        phone: "+234(0)809 8765 432",
    },
    {
        address: "No. 17 Adebayo Osibanjo Street, Lekki Phase 1, Lagos.",
        services: "Pharmacy | Spa | Luxury Retail",
        phone: "+234(0)916 0666 820",
    },
];

