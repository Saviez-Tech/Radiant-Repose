"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import ErrorPara from "./ErrorPara";

type DatePickerInputProps = {
  label: string;
  name: string;
  placeholder?: string;
  error?: string;
  variant?: "solid" | "transparent";
};

export function DatePicker({
  label,
  name,
  placeholder = "Select Preferred Date",
  error,
  variant = "solid",
}: DatePickerInputProps) {
  const [date, setDate] = React.useState<Date>();

  const baseStyles = cn(
    "rounded-md w-full text-sm py-3 px-3 h-12 text-left",
    "disabled:cursor-not-allowed focus:outline-none focus:outline-[1.5px] focus:outline-stone-400",
    variant === "transparent"
      ? "bg-transparent border border-[#ACACAC]"
      : "bg-white border border-gray-300",
    error && "border-red-500 focus:ring-red-500"
  );

  return (
    <div className="space-y-1 w-full">
      <Label htmlFor={name} className="font-medium text-primary-dark_gray">
        {label}
      </Label>
      <Popover>
        <PopoverTrigger asChild>
          <div className={cn(baseStyles, !date && "text-muted-foreground", "flex items-center gap-2")}>
            <CalendarIcon className="h-4 w-4 text-primary-dark_gray" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      {error && <ErrorPara errorText={error} />}
    </div>
  );
}
