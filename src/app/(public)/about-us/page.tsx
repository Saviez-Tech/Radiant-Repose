import CTASection from "@/components/about-page/CTASection";
import HowItWorks from "@/components/about-page/HowItWorks";
import OurMissionSection from "@/components/about-page/OurMissionSection";
import OurVisionSection from "@/components/about-page/OurVisionSection";
import TestimonialSection from "@/components/about-page/TestimonialSection";
import Image from "next/image";

export default function Page(){
    return (
        <main className="bg-gradient-to-tr from-[#ffffff] to-[#ffefe6db]">
            <hr className="w-full bg-gray-300 h-[1px]" />
            <Image
                src="/images/logo2.png"
                alt="Logo"
                width={750}
                height={620}
                className=" absolute w-60 md:w-[26em] top-0 right-0"
            />
            <h1 className="sr-only">About Us</h1>
            <OurVisionSection />
            <OurMissionSection />
            <HowItWorks />
            <TestimonialSection />
            <CTASection />
        </main>
    )
}