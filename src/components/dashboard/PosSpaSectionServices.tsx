"use client"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { addService } from "@/lib/redux/slices/spaPosSlice";
import { Radio } from "@mui/material";
import { red } from "@mui/material/colors";



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

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return null;
    }

    return (
        <div className="grid justify-items-start grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6 py-8">
            {services.map((service) => {
                return (
                    <ServiceRadioButton service={service} key={service.id} />
                )
            })}
        </div>
    )
}

export default PosSpaSectionServices;