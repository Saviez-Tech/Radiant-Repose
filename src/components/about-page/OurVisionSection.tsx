"use client"

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  {
    id: 1,
    src: "/images/radiant-repose-public-img1.png",
    alt: "Girl receiving a massage"
  },
  {
    id: 2,
    src: "/images/radiant-repose-public-img2.jpg",
    alt: "Set of gold rings"
  },
  {
    id: 3,
    src: "/images/radiant-repose-public-img3.jpg",
    alt: "Handbag"
  },
  {
    id: 4,
    src: "/images/radiant-repose-public-img4.png",
    alt: "Pedicure session"
  }
]

export default function OurVisionSection() {

    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        const checkScreen = () => {
        setIsDesktop(window.innerWidth >= 1024)
        }

        checkScreen()
        window.addEventListener("resize", checkScreen);
        return () => window.removeEventListener("resize", checkScreen)
    }, [])

    return (
        <section className="glob-px pt-14 pb-8 md:flex gap-16 justify-between">
            <div className="">
                <h2 className="text-primary-deepBlack font-semibold whitespace-nowrap text-4xl">
                Our <span className="text-primary-darkRed">Vision</span>
                </h2>
            </div>
            <div className="">
                <p className="text-sm text-primary-base_color2 mt-2 mb-6">
                To become Nigeria’s leading destination for holistic wellness, luxury self-care, and pharmaceutical services by providing a seamless and informative digital experience.
                </p>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <motion.div
                        key={image.id}
                        className="overflow-hidden rounded-2xl shadow-md relative"
                        animate={isDesktop ? { opacity: [0.8, 1, 0.8] } : false}
                        transition={
                            isDesktop
                            ? {
                                duration: 3,
                                ease: "easeInOut",
                                repeat: Infinity,
                                delay: index * 0.75,
                                }
                            : {}
                        }
                    >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={600}
                        className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1D0C04] to-transparent" />
                    </motion.div>
                ))}
                </div>
            </div>
        </section>
    )
}
