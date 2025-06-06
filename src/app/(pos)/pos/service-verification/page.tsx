"use client"

import SpaServicePreviewCard from "@/components/dashboard/spa-section/SpaServicePreviewCard"
import { FormEvent, useState } from "react"

export default function Page(){

    const [code,setCode] = useState<string | null>(null)
    const [foundServices,setFoundServices] = useState<SpaService[]>([])

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
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
                            <input
                                type="text"
                                value={code ?? ""}
                                onChange={(e) => setCode(e.target.value)}
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
                        <SpaServicePreviewCard />
                    </div>
                </div>
            }
        </main>
    )
}