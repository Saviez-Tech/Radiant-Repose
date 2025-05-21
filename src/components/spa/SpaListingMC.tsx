"use client"

import { useEffect, useState } from "react"
import { SpaServiceFilter } from "./SpaServiceFilter"
import SpaServiceCard from "./SpaServiceCard"
import Scalffold from "../custom-utils/Scalffold"
import { usePathname } from "next/navigation"
import { useAppDispatch } from "@/lib/redux/hooks"
import { addService, clearCart, clearSelections, selectSelectedServices } from "@/lib/redux/slices/spaCartSlice"
import { useSelector } from "react-redux"
import toast from "react-hot-toast"

type SpaService = {
  id: number,
  name: string,
  description: string,
  price: number,
  type: string,
  image: string
}

export default function SpaListingMC({ data }: { data: SpaService[] }) {

    const pathName = usePathname()
    const dispatch = useAppDispatch()
    const [filteredServices, setFilteredServices] = useState<SpaService[]>(data)

    const selectedServices = useSelector(selectSelectedServices)

    const handleFilterChange = (newFilteredServices: SpaService[]) => {
        setFilteredServices(newFilteredServices)
    }

    useEffect(() => {
        if (!pathName.match("/spa/listing")){
            dispatch(clearSelections())
            dispatch(clearCart())
        }
    },[pathName])

    return (
        <Scalffold>
            <div className="app-container">
                <hr className="w-full bg-primary-dark_gray/50 h-[1px]" />
                <div className="flex justify-between items-center flex-wrap my-10">
                    <h1 className="text-2xl md:text-3xl font-semibold text-primary-deepBlack">Spa Services</h1>
                    <SpaServiceFilter services={data} onFilterChange={handleFilterChange} />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] pb-8">
                    {filteredServices.map((service) => (
                        <SpaServiceCard key={service.id} service={service} isSelected={selectedServices.some(v => v.id === service.id)} />
                    ))}
                </div>


                <div className="mt-14 flex justify-center flex-col gap-4 items-center">
                    <p className={`${selectedServices.length ? "text-primary-dark_slate" : "text-primary-dark_gray/50"} text-sm uppercase font-semibold`}>Confirm Selection</p>
                    <button onClick={() => {
                        selectedServices.forEach(v => dispatch(addService(v)))
                        toast.success(`Item${selectedServices.length > 1 ? "s" : ""} Added`)
                    }} disabled={!selectedServices.length} className="bg-primary-red text-primary-base_color1 disabled:bg-primary-dark_gray/10 disabled:text-primary-dark_gray/25 rounded-3xl py-3 px-10 text-sm">Proceed</button>
                </div>
            </div>
        </Scalffold>
    )
}