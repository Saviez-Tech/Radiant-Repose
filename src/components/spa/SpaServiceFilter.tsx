"use client"

import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type SpaService = {
  id: number,
  name: string,
  description: string,
  price: number,
  type: string,
  image: string
}

type ServiceFilterProps = {
  services: SpaService[];
  onFilterChange: (filteredServices: SpaService[]) => void;
}

export function SpaServiceFilter({ services, onFilterChange }: ServiceFilterProps) {
  const [selectedType, setSelectedType] = useState<string>("all")

  const serviceTypes = ["all", ...Array.from(new Set(services.map(service => service.type)))]

  const handleFilterChange = (value: string) => {
    setSelectedType(value)
    
    const filteredServices = value === "all" 
      ? services 
      : services.filter(service => service.type === value)
    
    onFilterChange(filteredServices)
  }

  return (
    <div className="max-w-full w-fit mb-6">
      <Select value={selectedType} onValueChange={handleFilterChange}>
        <SelectTrigger className="bg-primary-base_color1 text-primary-deepBlack">
          <SelectValue placeholder="All Spa Services" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {serviceTypes.map((type,i) => (
              <SelectItem key={i} value={type} className="capitalize text-primary-dark_gray text-[13px] cursor-pointer">
                {type === "all" ? "All Spa Services" : type}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}