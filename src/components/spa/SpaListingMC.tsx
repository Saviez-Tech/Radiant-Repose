"use client";

import { useState } from "react";
import { SpaServiceFilter } from "./SpaServiceFilter";
import SpaServiceCard from "./SpaServiceCard";
import Scalffold from "../custom-utils/Scalffold";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSpaCart } from "@/hooks/useSpaCart";

type SpaService = {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  image: string;
};

export default function SpaListingMC({ data }: { data: SpaService[] }) {
  const [filteredServices, setFilteredServices] = useState<SpaService[]>(data);
  const [searchValue, setSearchValue] = useState("");
  const { items: selectedServices, addItem } = useSpaCart()

  const displayedServices = searchValue 
    ? filteredServices.filter(service => 
        service.name.toLowerCase().includes(searchValue.toLowerCase()) || 
        service.description.toLowerCase().includes(searchValue.toLowerCase())
      )
    : filteredServices;

  const handleFilterChange = (newFilteredServices: SpaService[]) => {
    setFilteredServices(newFilteredServices);
  };

  const router = useRouter();

  return (
    <Scalffold>
      <div className="app-container">
        <hr className="w-full bg-primary-dark_gray/50 h-[1px]" />
        <div className="flex justify-between items-center flex-wrap my-10 gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-primary-deepBlack">
            Spa Services
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative h-fit">
              <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </span>
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full cursor-pointer pl-4 pr-10 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-800/70 text-sm focus:border-none text-gray-700 min-w-[250px]"
                placeholder="Search services..."
                aria-label="Search services input"
              />
              {searchValue && (
                <button
                  onClick={() => setSearchValue("")}
                  className="absolute inset-y-0 right-10 flex items-center text-gray-400 hover:text-gray-600"
                  aria-label="Clear input"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                </button>
              )}
            </div>
            <SpaServiceFilter
              services={data}
              onFilterChange={handleFilterChange}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] pb-8">
          {displayedServices.map((service) => (
            <SpaServiceCard
              key={service.id}
              service={service}
              isSelected={selectedServices.some((v) => v.id === service.id)}
            />
          ))}
        </div>

        <div className="mt-14 flex justify-center flex-col gap-4 items-center">
          <p
            className={`${
              selectedServices.length
                ? "text-primary-dark_slate"
                : "text-primary-dark_gray/50"
            } text-sm uppercase font-semibold`}
          >
            Confirm Selection
          </p>
          <button
            onClick={() => {
              selectedServices.forEach((v) => addItem(v));
              toast.success(
                `Item${selectedServices.length > 1 ? "s" : ""} Added`
              );
              router.push("/services/spa/checkout");
            }}
            disabled={!selectedServices.length}
            className="bg-primary-red text-primary-base_color1 disabled:bg-primary-dark_gray/10 disabled:text-primary-dark_gray/25 rounded-3xl py-3 px-10 text-sm mb-3"
          >
            Proceed
          </button>
        </div>
      </div>
    </Scalffold>
  );
}
