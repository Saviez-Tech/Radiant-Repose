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

type ServiceFilterProps = {
  services: SpaService[];
  onFilterChange: (filteredServices: SpaService[]) => void;
}

export function SpaServiceFilter({ services, onFilterChange }: ServiceFilterProps) {
  const [selectedType, setSelectedType] = useState("all")

  const extractServiceType = (service: SpaService): string => {
    // If type already exists, use it
    if (service.type) {
      return service.type.toLowerCase()
    }

    const name = service.name.toLowerCase()
    const description = service.description.toLowerCase()
    const combined = `${name} ${description}`;
    const typeKeywords = {
      massage: ['massage', 'deep tissue', 'swedish', 'hot stone', 'aromatherapy', 'reflexology'],
      facial: ['facial', 'face', 'skin care', 'cleansing', 'exfoliation', 'anti-aging'],
      body: ['body wrap', 'body scrub', 'body treatment', 'salt scrub', 'mud wrap'],
      manicure: ['manicure', 'nail care', 'nail treatment', 'hand care'],
      pedicure: ['pedicure', 'foot care', 'foot treatment', 'foot massage'],
      waxing: ['waxing', 'hair removal', 'brazilian', 'bikini'],
      therapy: ['therapy', 'therapeutic', 'rehabilitation', 'healing'],
      wellness: ['wellness', 'relaxation', 'meditation', 'yoga'],
      beauty: ['beauty', 'makeup', 'eyebrow', 'eyelash', 'tinting'],
      sauna: ['sauna', 'steam', 'hot room', 'infrared']
    }

    for (const [type, keywords] of Object.entries(typeKeywords)) {
      if (keywords.some(keyword => combined.includes(keyword))) {
        return type;
      }
    }

    const nameWords = name.split(' ').filter(word => word.length > 2)
    if (nameWords.length > 0) {
      return nameWords[0];
    }

    return 'other';
  }

  const servicesWithTypes = services.map(service => ({
    ...service,
    extractedType: extractServiceType(service)
  }))

  const serviceTypes = ["all", ...Array.from(new Set(servicesWithTypes.map(service => service.extractedType)))];

  const handleFilterChange = (value: string) => {
    setSelectedType(value)
    
    const filteredServices = value === "all"
      ? services
      : services.filter(service => extractServiceType(service) === value.toLowerCase())
    
    onFilterChange(filteredServices)
  }

  const formatTypeName = (type: string): string => {
    if (type === "all") return "All Spa Services"
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  return (
    <Select value={selectedType} onValueChange={handleFilterChange}>
      <SelectTrigger className="max-w-[13em] h-12">
        <SelectValue placeholder="Filter by service type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {serviceTypes.map((type, i) => (
            <SelectItem key={i} value={type}>
              {formatTypeName(type)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}