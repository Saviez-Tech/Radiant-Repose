import { features } from "@/components-data/about-page";
import { DollarCircle } from "../Svg";

export default function HowItWorks(){
    return  (
        <div className="w-full pt-20 pb-28 glob-px" style={{
            background: "linear-gradient(35deg, #ffdbcd 0%, #FEF6E4 50%, #FFEFE6 100%)"
           }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-semibold text-primary-deepBlack mb-4">How Radiant Repose works</h2>
                    <p className="text-primary-deepBlack max-w-3xl mx-auto">
                    In order to serve you better,<br />
                    here&apos;s a detailed breakdown on how we integrate pharmacy, beauty, and luxury
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {features.map((feature) => (
                    <div key={feature.id} className="flex gap-4">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                                <DollarCircle />
                            </div>
                        </div>
                        <div>
                            <h3 className="md:text-lg font-bold text-primary-base_color2 mb-2">{feature.heading}</h3>
                            <p className="text-sm lg:text-base">{feature.text}</p>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    )
}