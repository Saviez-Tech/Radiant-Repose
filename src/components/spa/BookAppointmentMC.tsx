"use client"

import { useState } from "react"
import { SpaServiceFilter } from "./SpaServiceFilter"
import SpaServiceCard from "./SpaServiceCard"
import Scalffold from "../custom-utils/Scalffold"

type SpaService = {
  id: number,
  name: string,
  description: string,
  price: number,
  type: string,
  image: string
}

export default function BookAppointmentMC({ data }: { data: SpaService[] }) {
    const [filteredServices, setFilteredServices] = useState<SpaService[]>(data)

    const handleFilterChange = (newFilteredServices: SpaService[]) => {
        setFilteredServices(newFilteredServices)
    }

    return (
        <Scalffold>
            <div className="app-container">
                <hr className="w-full bg-primary-dark_gray/50 h-[1px]" />
                <div className="flex justify-between items-center flex-wrap my-10">
                    <h1 className="text-2xl md:text-3xl font-semibold text-primary-deepBlack">Book Appointment</h1>
                    <SpaServiceFilter services={data} onFilterChange={handleFilterChange} />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] pb-8">
                    {filteredServices.map((service) => (
                        <SpaServiceCard key={service.id} service={service} isSelected />
                    ))}
                </div>

            </div>
        </Scalffold>
    )
}