'use client';

import { Icon } from "@iconify/react/dist/iconify.js";
import { useRouter } from "next/navigation";

export default function AddNewProductBtn() {

    const router = useRouter()

    return (
        <button
        onClick={() => router.push("/admin/product-management/new-product")}
        className="w-fit h-12 group bg-gradient-to-r from-[#990000] to-[#FF0000] hover:from-[#b30000] hover:to-[#cc0000]
                    active:scale-95 text-white font-medium text-sm p-3 rounded-lg inline-flex items-center gap-2
                    transition-all duration-300 shadow-md hover:shadow-lg"
        >
        <Icon icon="basil:add-solid" width="24" height="24" />
        Add New Product
        </button>
    )
}
