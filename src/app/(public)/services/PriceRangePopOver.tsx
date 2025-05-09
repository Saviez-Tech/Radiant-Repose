
"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Close } from "@radix-ui/react-popover";
import { ReactNode } from "react";
import { IoIosClose } from "react-icons/io";
import {useWindowSize } from 'react-use'

export default function PriceRangeDialog({
  children,
}: {
  children: ReactNode;
}) {
  const { width } = useWindowSize()

  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent
        align={width < 768 ? "end" : "start"}
        className="flex flex-col gap-3 max-md:w-[200px]"
      >
        <div className="flex justify-between items-center">
          <p className="text-base">
            price <span className="font-semibold">(N)</span>
          </p>
          <Close className="max-md:hidden">
            <IoIosClose className="text-xl text-[#5B5B5B80]/50" />
          </Close>
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex flex-col">
            <p>From:</p>
            <input
              type="number"
              className="border border-[#5B5B5B80]/50 rounded-md p-2 w-full
                        focus:border-primary-darkRed focus:text-primary-darkRed focus:outline-none"
              placeholder="0.00"
            />
          </div>
          <div className="flex flex-col">
            <p>To:</p>
            <input
              type="number"
              className="border border-[#5B5B5B80]/50 rounded-md p-2 w-full
                        focus:border-primary-darkRed focus:text-primary-darkRed focus:outline-none"
              placeholder="0.00"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
