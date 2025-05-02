"use client"

import { storeLocation } from "@/components-data/store-locations";
import StaffForm from "@/components/dashboard/admin-dashboard-components/StaffForm";
import { useAppSelector } from "@/lib/redux/hooks";


// There is no provision to get single staff data (yet), so we will handle this use global state
export default function Page(){

    const { staffToEdit } = useAppSelector(store => store.editStaff)

    return (
        <main className="w-full pt-20 max-md:pt-28">
            <h1 className="text-xl font-medium text-primary-dark_gray">Edit Staff</h1>
            <p className="text-sm mt-10 text-green-700 font-semibold">Only Complete Fields You Wish to Update</p>
            <StaffForm  
                defaultValues={
                {
                    address: staffToEdit?.address || "",
                    AssignedLocation: staffToEdit?.branch.id.toString() || storeLocation[0].branch.toString(),
                    confirmPassword: "",
                    password: "",
                    fullName: staffToEdit?.name || "",
                    emailOrUsername: staffToEdit?.username || "",
                    phoneNumber: staffToEdit?.phone_number || ""
                }} 
                formActionType="edit" 
                staffID={staffToEdit?.id!}
            />
        </main>
    )
}