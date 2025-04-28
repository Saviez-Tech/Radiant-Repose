"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";



export default function TimeFrameSelect({ timeFilter, setTimeFilter }: { timeFilter: TimeFilterType, setTimeFilter: Dispatch<SetStateAction<TimeFilterType>>}){
    return (
        <Select 
            defaultValue="lastWeek"
            onValueChange={(value: string) => setTimeFilter(value as TimeFilterType)}
            >
            <SelectTrigger className="w-fit bg-white border border-gray-300 rounded">
                <SelectValue placeholder="Last Week" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="lastWeek">Last Week</SelectItem>
                <SelectItem value="lastMonth">Last Month</SelectItem>
                <SelectItem value="annual">Annual</SelectItem>
            </SelectContent>
        </Select>
    )
}