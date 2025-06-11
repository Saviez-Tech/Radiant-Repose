"use client"

import { storeLocation } from "@/components-data/store-locations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppSelector } from "@/lib/redux/hooks";
import { Dispatch, SetStateAction } from "react";



export default function AdminStoreLocationsSelect({ selectedStore, setSelectedStore }:{ selectedStore: string, setSelectedStore: Dispatch<SetStateAction<string>>}){

    const { branches } = useAppSelector(store => store.storeBranches)

    return(
        <Select 
            value={selectedStore}
            onValueChange={(value) => setSelectedStore(value)}
        >
            <SelectTrigger className="bg-white max-w-full w-[70%] md:w-auto border text-xs border-gray-300 rounded">
                <SelectValue placeholder="Target Store" />
            </SelectTrigger>
            <SelectContent>
                {
                    branches.map((v,i) => (
                        <SelectItem key={i} value={v.id.toString()}>{v.name}, {v.location}</SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}