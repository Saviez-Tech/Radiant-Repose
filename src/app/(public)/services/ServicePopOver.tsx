import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";
import PriceRangeDialog from "./PriceRangePopOver";
import { useWindowSize } from "react-use";

export default function ServicePopOver({
  children,
  from,
  to,
  setFrom,
  setTo,
}: {
  children: ReactNode;
  from: number;
  to?: number;
   setFrom: (value: number) => void;
  setTo?: (value?: number) => void;  
}) {
  const { width } = useWindowSize();

  return (
    <div>
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent
          align={width < 768 ? "end" : "start"}
          className="w-[250px] mt-2"
        >
          <div className="flex flex-col">
            <div className="flex justify-between items-center border-b border-[#5B5B5B1A]/10 py-2 px-4">
              <button className="text-[#5B5B5B] text-base">Price Range</button>
              <PriceRangeDialog setFrom={setFrom} setTo={setTo} from={from} to={to}>
                <ChevronDown color="#5B5B5B" size={20} />
              </PriceRangeDialog>
            </div>
            <button className="text-[#5B5B5B] text-base border-b border-[#5B5B5B1A]/10 py-2 px-4 text-start">
              Ratings
            </button>
            <button className="text-[#5B5B5B] text-base text-start py-2 px-4">
              Product Brand
            </button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
