import { missionPoints } from "@/components-data/about-page";
import Image from "next/image";

export default function OurMissionSection() {
    return (
        <section className="bg-primary-light_amber/10 mt-16 glob-px py-14 md:flex justify-between items-center gap-20">
            <div className="md:w-2/4">
                <h2 className="text-primary-deepBlack font-semibold text-4xl mb-6">Our <span className="text-primary-darkRed">Mission</span></h2>
                <ul className="space-y-3 mb-5 md:mb-0">
                    {missionPoints.map((point) => (
                        <li key={point.key} className="flex items-baseline gap-2 text-sm md:text-base">
                            <span className="text-black">•</span>
                            <div>
                                <span className="mr-1">{point.prefix}</span>
                                <span className="font-bold text-black">{point.boldText} </span>
                                <span className="text-black">{point.normalText}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <Image
                    src="/images/aboutis2.jpg"
                    alt="About Us"
                    width={492}
                    height={212}
                    className="rounded-3xl w-full max-w-[42rem] h-[22rem] object-contain mx-auto"
                />
            </div>
        </section>
    )
}