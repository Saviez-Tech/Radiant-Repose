"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";



export default function TimeFrameSelect({ timeFilter, setTimeFilter }: { timeFilter: DateFilter, setTimeFilter: Dispatch<SetStateAction<DateFilter>>}){
    return (
        <Select 
            value={timeFilter}
            onValueChange={(value: string) => setTimeFilter(value as DateFilter)}
            >
            <SelectTrigger className="w-fit bg-white border border-gray-300 rounded">
                <SelectValue placeholder="Select Filter" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">Week</SelectItem>
                <SelectItem value="month">Month</SelectItem>
            </SelectContent>
        </Select>
    )
}