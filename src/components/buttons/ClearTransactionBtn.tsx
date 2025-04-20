"use client"

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function ClearTransactionBtn(){
    return (
        <Button 
            className="bg-primary-red mt-14 text-primary-base_color1 flex items-center gap-1 text-sm h-10 font-medium rounded-md py-2 px-6 flex-1 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-200"
        >
            <span>Clear Transaction</span>
            <X className="ml-2" size={16} />
        </Button>
    )
}