"use client"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addService } from "@/lib/redux/slices/spaPosSlice";
import { Radio } from "@mui/material";
import { red } from "@mui/material/colors";
import { SpaServiceFilter } from "../spa/SpaServiceFilter";
import SpinnerLoader from "../loaders/SpinnerLoader";
import SpaServicePageHeaderSection from "./spa-section/SpaServicePageHeaderSection";
import { searchBookingCode } from "@/actions/services.server";
import { clearCart } from "@/store/spaCartSlice";
import PosSpaOnlineCodeFound from "./PosSpaOnlineCodeFound";
import toast from "react-hot-toast";



function ServiceRadioButton({ service }:{ service: SpaService }) {

    const isAdded = useAppSelector((state) =>
        state.spaPosFlow.addedServices.some((s) => s.id === service.id)
    )

    const dispatch = useAppDispatch()

    return (
        <div key={service.id} className="flex flex-row-reverse items-center w-fit gap-1">
            <label 
                htmlFor={`spa-service-${service.id}`} 
                className={`${!isAdded ? "text-[#ACACAC]" : "text-[#0A0D13]"} text-sm cursor-pointer font-medium capitalize`}
            >
                {service.name}
            </label>
            <Radio
                checked={isAdded}
                onChange={() => dispatch(addService(service))}
                value={service.id}
                id={`spa-service-${service.id}`}
                name={`${service.name} radio button`}
                size="small"
                sx={{
                    color: isAdded ? red[800] : "#ACACAC",
                    '&.Mui-checked': {
                        color: red[600],
                    },
                }}
            />
        </div>
    )
}

function PosSpaSectionServices({ services }: { services: SpaService[] }) {

    const [isClient, setIsClient] = useState(false)
    const [filteredServices,setFilteredServices] = useState<SpaService[]>(services)
    const [searchValue, setSearchValue] = useState<string | null>(null)
    const [isSearching, setIsSearching] = useState(false)
    const [searchError, setSearchError] = useState<string | null>(null)
    const [bookingData, setBookingData] = useState<SingleBookingDetail[]>([])
    const [showBookingConfirmation, setShowBookingConfirmation] = useState(false)
    const dispatch = useAppDispatch()

    const handleLookUp = async() => {
        setIsSearching(true)
        const { data, status, errorMessage } = await searchBookingCode(searchValue!)


        if (status !== 200 && status !== 404) {
            toast.error(errorMessage || "An error occurred while searching for the booking code.")
            setIsSearching(false)
            return;
        }else if (status === 404) {
            setSearchError("Booking not found")
            setIsSearching(false)
            return;
        }
        else {
            dispatch(clearCart())
            setBookingData(data)

            if (data.length){
                data.forEach((item) => {
                    dispatch(addService({
                        id: item.service.id,
                        name: item.service.image,
                        price: item.service.price ? Number(item.service.price) : 0,
                        description: item.service.description,
                        type: item.service.type || "",
                        image: item.service.image || "",
                    }))
                })
            }

            setShowBookingConfirmation(true)
        }
        setIsSearching(false)
    }

    useEffect(() => {
        if (searchValue && searchValue.trim().length === 20 && !isSearching) {
            handleLookUp()
        }
    },[searchValue])


    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null;
    }

    let content;
    
    
    if (isSearching) {
        content = (
            <div className="py-16">
                <SpinnerLoader />
            </div>
        )
    } else if (searchError) {
        content = (
            <div className="flex w-full h-full justify-center items-center flex-col mt-8">
                <div className="bg-[url('/images/barcode-no-found-item.svg')] w-[25em] h-[25em] bg-contain bg-center bg-no-repeat"></div>
                <p role="alert" className="text-[#111719] font-medium text-center">
                    Booking not found! <br /> Check Unique Reference Code and try again.
                </p>
            </div>
        )
    } else if (showBookingConfirmation) {
        content = (
            <PosSpaOnlineCodeFound 
                bookingData={bookingData} 
                handleClearBookingData={() => {
                    setBookingData([])
                    setShowBookingConfirmation(false)
                    setSearchValue("")
                    setSearchError(null)
                }} 
            />
        )
    } else if (services.length === 0) {
        content = (
            <div className="text-center py-8 text-gray-500">
                No spa services available
            </div>
        )
    } else if (filteredServices.length === 0) {
        content = (
            <div className="text-center py-8 text-gray-500">
                No spa services match the selected filter
            </div>
        )
    } else {
        content = (
            <div className="grid justify-items-start grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6 mt-6">
                {filteredServices.map((service) => (
                    <ServiceRadioButton service={service} key={service.id} />
                ))}
            </div>
        )
    }

    return (
        <div className="py-8">
            <SpaServicePageHeaderSection 
                searchValue={searchValue} 
                handleClearSearch={() => {
                    setSearchValue("")
                    setSearchError(null)
                }} 
                handleSearchChange={(v) => {
                    setSearchValue(v)
                    setSearchError(null)
                }} 
            />
            <SpaServiceFilter services={services} onFilterChange={(v) => setFilteredServices(v)} />
            {content}
        </div>
    )
}

export default PosSpaSectionServices;