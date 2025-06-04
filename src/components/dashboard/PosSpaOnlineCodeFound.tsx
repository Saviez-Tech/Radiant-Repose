"use client"

import { formatDateTime } from "@/lib/helperFns/formatDate";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

function PosSpaOnlineCodeFound({ bookingData, handleClearBookingData }: { bookingData: SingleBookingDetail[], handleClearBookingData: () => void }) {

    const { date, time } = bookingData.length ? formatDateTime(bookingData[0].time) : { date: "", time: ""}
    const router = useRouter()

    return (
        <div className="flex justify-center items-center mt-16 flex-col max-w-full bg-primary-base_color1 -mb-36 z-10 relative">
            <span className="text-8xl block text-center">🎉</span>
            <div className="text-center px-16">
                <p id="aria-labelledby" className="text-xl font-bold text-primary-midGray mt-2 mb-1">Booking Confirmation Successful!</p>
                <span className="font-light text-sm text-[#424F4A]">Appointment booked for <strong className="font-bold">{date}</strong> at <strong className="font-bold">{time}</strong> has been confirmed successsfully</span>
            </div>

            <div className="self-start flex mt-20 gap-4">
                <button
                    className={`
                        flex items-center gap-2 px-4 py-3 rounded-full border-2 font-medium text-sm
                        transition-all duration-200 ease-in-out bg-primary-base_color1 border-primary-red
                    `}
                    onClick={() => {
                        handleClearBookingData()
                        router.push('/pos/spa-section/services')
                    }}
                    >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Add more</span>
                </button>

                <button
                    className={`
                        flex items-center gap-2 px-4 py-3 rounded-full font-medium text-sm
                        transition-all duration-200 ease-in-out
                        bg-primary-red text-primary-base_color1 hover:bg-red-600 hover:drop-shadow-md focus:bg-red-700
                    `}
                    onClick={() => router.push('/pos/spa/section/summary')}
                    >
                    <span>Proceed</span>
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}

export default PosSpaOnlineCodeFound;