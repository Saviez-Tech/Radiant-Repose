"use client"

import { Icon } from "@iconify/react/dist/iconify.js";

export default function ExportDataBtn(){
    return (
        <button
            aria-label="export data"
            className="text-xs text-primary-dark_gray border rounded-md shadow-md shadow-orange-200/50  p-2 flex flex-row-reverse gap-1 font-semibold items-center hover:bg-gray-100 transition-colors"
            >
            <span className="hidden md:inline-block">Export Sales Data</span>
            <Icon icon="material-symbols:download-rounded" width="24" height="24" className="text-primary-darkRed" />
        </button>
    )
}