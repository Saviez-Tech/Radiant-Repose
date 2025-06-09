"use client"

import { verifyServiceCode } from "@/actions/product.server"
import ErrorPara from "@/components/custom-utils/ErrorPara"
import SpaServicePreviewCard from "@/components/dashboard/spa-section/SpaServicePreviewCard"
import { FormEvent, useState } from "react"

export default function Page(){

    const [code,setCode] = useState<string | null>(null)
    const [foundServices,setFoundServices] = useState<ServiceListVerificationData[]>([
  {
    id: 43,
    service_name: "Facial Treatment",
    service_image: null,
    service_description: "A deep relaxing facial treatment that makes you want more",
    service_price: "29999.98",
    service_duration: 50,
    quantity: 1,
    price_at_sale: "29999.98",
    status: "Pending",
    transaction: 15,
    product: null,
    service: 2
  },
  {
    id: 44,
    service_name: "Swedish Massage",
    service_image: "https://example.com/swedish-massage.jpg",
    service_description: "Full body Swedish massage for ultimate relaxation and stress relief",
    service_price: "45000.00",
    service_duration: 90,
    quantity: 1,
    price_at_sale: "42000.00",
    status: "Done",
    transaction: 16,
    product: 5,
    service: 3
  },
  {
    id: 45,
    service_name: "Manicure & Pedicure",
    service_image: null,
    service_description: "Professional nail care service including cleaning, shaping, and polish",
    service_price: "15000.00",
    service_duration: 60,
    quantity: 2,
    price_at_sale: "28000.00",
    status: "Pending",
    transaction: 17,
    product: null,
    service: 4
  },
  {
    id: 46,
    service_name: "Hot Stone Therapy",
    service_image: "https://example.com/hot-stone.jpg",
    service_description: "Therapeutic massage using heated stones to relieve tension and promote healing",
    service_price: "55000.00",
    service_duration: 75,
    quantity: 1,
    price_at_sale: "55000.00",
    status: "Done",
    transaction: 18,
    product: 8,
    service: 5
  },
  {
    id: 47,
    service_name: "Hair Styling",
    service_image: "https://example.com/hair-styling.jpg",
    service_description: "Complete hair styling service including wash, cut, and styling",
    service_price: "25000.00",
    service_duration: 120,
    quantity: 1,
    price_at_sale: "22500.00",
    status: "Pending",
    transaction: 19,
    product: 12,
    service: 6
  },
  {
    id: 48,
    service_name: "Body Scrub",
    service_image: null,
    service_description: "Exfoliating body treatment to remove dead skin and rejuvenate",
    service_price: "18000.00",
    service_duration: 45,
    quantity: 1,
    price_at_sale: "18000.00",
    status: "Done",
    transaction: 20,
    product: null,
    service: 7
  },
  {
    id: 49,
    service_name: "Aromatherapy Session",
    service_image: "https://example.com/aromatherapy.jpg",
    service_description: "Relaxing aromatherapy session with essential oils and calming music",
    service_price: "32000.00",
    service_duration: 60,
    quantity: 1,
    price_at_sale: "30000.00",
    status: "Pending",
    transaction: 21,
    product: 3,
    service: 8
  },
  {
    id: 50,
    service_name: "Deep Tissue Massage",
    service_image: null,
    service_description: "Intensive massage targeting deep muscle layers for pain relief",
    service_price: "48000.00",
    service_duration: 90,
    quantity: 1,
    price_at_sale: "48000.00",
    status: "Done",
    transaction: 22,
    product: null,
    service: 9
  }
])
    const [searchError,setSearchError] = useState<string | null>(null)

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { success, data, error } = await verifyServiceCode(code!)

        if (!success && error){
            setSearchError(error)
            return;
        }

        setFoundServices(data)
    }

    return (
        <main className="min-h-screen h-full flex flex-col justify-center items-center">
            {
                foundServices.length ?
                <div className="max-w-md w-full mx-auto p-6 bg-white">
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <h2 className="text-lg font-medium text-primary-deepBlack mb-3">
                            Unique Code
                        </h2>

                        <div>
                            {
                                searchError && 
                                <ErrorPara errorText={searchError} />
                            }
                            <input
                                type="text"
                                value={code ?? ""}
                                onChange={(e) => {
                                    setCode(e.target.value)
                                    setSearchError(null)
                                }}
                                placeholder="Enter Unique Code here"
                                className="w-full text-sm px-4 py-4 border border-gray-300 rounded-lg bg-gray-50 placeholder-primary-dark_gray/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-primary-red hover:bg-red-600 text-primary-base_color1 font-semibold py-4 px-6 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                        Continue
                        </button>
                    </form>
                </div>
                :
                <div className="h-full w-full my-20 xl:px-20">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-primary-deepBlack">Selected Services</h2>
                        <p className="text-lg font-semibold text-primary-deepBlack uppercase">SPA-BOOK-20256090-1234</p>
                    </div>

                    <div className="mt-12 grid grid-cols-1 xl:grid-cols-2 gap-6">
                        {
                            foundServices.map(v => (
                                <SpaServicePreviewCard key={v.id} {...v} />
                            ))
                        }
                    </div>
                </div>
            }
        </main>
    )
}