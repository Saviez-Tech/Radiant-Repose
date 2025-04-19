"use client"

import Image from "next/image"
import { FaArrowRight } from "react-icons/fa"

export default function CTASection() {
    return (
        <section className="relative lg:-mt-14 py-32 w-full flex items-center justify-center text-white">
            <Image
                src="/images/closeup-businessman-using-mobile-phone.png"
                alt=""
                aria-label="hidden"
                fill
                className="object-cover absolute w-full z-10"
                priority
            />
            <div style={{ background: "rgba(153, 0, 0, 0.3)"}} className="absolute inset-0 z-10"></div>

            <div className="relative z-20 text-center px-4 max-w-3xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 md:leading-[1.2em]">
                Use a creative copy here <br /> as <span className="text-white/90">CTA Header</span>
                </h2>
                <p className="text-white/80 text-sm md:text-base mb-8">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur t in voluptate velit esser.
                </p>
                <button className="bg-gradient-to-r from-[#990000] to-[#FF0000] hover:bg-red-800 text-white font-medium px-6 py-3 rounded-lg inline-flex items-center gap-2 transition">
                Explore Now <FaArrowRight className="text-sm" />
                </button>
            </div>
        </section>
    )
}
