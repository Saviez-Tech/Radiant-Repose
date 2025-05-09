import { missionPoints } from "@/components-data/about-page";

export default function OurMissionSection(){
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
                {/* Will soon be replaced with an actual image. */}
                <div className="rounded-3xl max-w-full w-96 h-[22em] bg-primary-darkRed mx-auto"></div>
            </div>
        </section>
    )
}