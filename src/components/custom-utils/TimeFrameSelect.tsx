"use client"
import { useState, useEffect } from "react";
import { format, isToday, isYesterday, parse } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dispatch, SetStateAction } from "react";
import { poppins } from "@/fonts";

// Import UI components for select dropdown
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Import utility functions for date handling
const stringToDate = (dateStr: string): Date => {
  try {
    return parse(dateStr, 'yyyy-M-d', new Date())
  } catch {
    return new Date()
  }
}

const dateToString = (date: Date): string => {
  return format(date, 'yyyy-M-d')
}

type TimeFrameType = | 'week' | 'month' | 'year' | 'custom';

export default function TimeFrameSelect({
  timeFilter,
  setTimeFilter,
  setCustomDateRange
}: {
  timeFilter: string,
  setTimeFilter: Dispatch<SetStateAction<string>>,
  customDateRange?: { from: Date; to?: Date },
  setCustomDateRange?: Dispatch<SetStateAction<{ from: Date; to?: Date }>>,
}) {

  // State for selected timeframe type (week, month)
  const [timeFrameType, setTimeFrameType] = useState<TimeFrameType>((timeFilter === "week" || timeFilter === "month" || timeFilter === "year") ? timeFilter : "custom")
  
  // Initialize date from the timeFilter string
  const [date, setDate] = useState<Date>(() => {
    return stringToDate(timeFilter)
  });

  const [disabledDatePicker,setDisabledDatePicker] = useState((timeFilter === "week" || timeFilter === "month" || timeFilter === "year") ? true : false)

  // For client-side rendering only
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
 
  // Get formatted display text with special handling for today and yesterday
  const getDisplayText = () => {
    if (timeFilter !== "week" && timeFilter !== "month" && timeFilter !== "year"){
      const selectedDate = stringToDate(timeFilter)
  
      const formattedDate = format(selectedDate, "MMM d, yyyy")
  
      let specialText = "";
      if (isToday(selectedDate)) {
      specialText = " (Today)";
      } else if (isYesterday(selectedDate)) {
      specialText = " (Yesterday)";
      }
  
      return formattedDate + specialText;
    }
    else {
      return timeFilter;
    }
  }
 
  // Handle date selection
  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setDate(newDate)
     
      // Update customDateRange if setter is provided
      if (setCustomDateRange) {
        setCustomDateRange({ from: newDate })
      }
     
      // Set timeFilter in the required 'yyyy-M-d' format
      const formattedDateString = dateToString(newDate)
      setTimeFilter(formattedDateString)
    }
  }

  // Handle time frame type change
  const handleTimeFrameTypeChange = (value: string) => {
    setTimeFrameType(value as TimeFrameType)

    setDisabledDatePicker((value === "week" || value === "month" || value === "year") ? true : false)
    
    // Update date range based on the new time frame type
    if (value === 'week') {
      setTimeFilter(value)
    } else if (value === 'month') {
      setTimeFilter(value)
    }else if (value === 'year') {
      setTimeFilter(value)
    }
  }
 
  // Update date when timeFilter changes externally
  useEffect(() => {
    setDate((timeFilter === "week" || timeFilter === "month" || timeFilter === "year") ? new Date() : stringToDate(timeFilter))
  }, [timeFilter]);

  if (!mounted) {
    return <div className="flex items-center gap-4">
      <div className="h-10 w-32 rounded-md border border-input px-3 py-2 text-sm">Loading...</div>
      <div className="h-10 w-44 rounded-md border border-input px-3 py-2 text-sm">Loading...</div>
    </div>;
  }
 
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="flex flex-col gap-4">
        <Select value={timeFrameType} onValueChange={handleTimeFrameTypeChange}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Week</SelectItem>
            <SelectItem value="month">Month</SelectItem>
            <SelectItem value="year">Year</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
        
        <DatePicker
          value={date}
          onChange={handleDateChange}
          className={`${poppins.className}`}
          format="MMM d, yyyy"
          disabled={disabledDatePicker}
          label={getDisplayText()}
        />
      </div>
    </LocalizationProvider>
  );
}