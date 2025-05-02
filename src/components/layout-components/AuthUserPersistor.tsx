"use client"

import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setAuthUser } from "@/lib/redux/slices/authUserSlice";
import { clearStaffToEdit } from "@/lib/redux/slices/editStaffSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthUserPersistor({ persistedUserData }:{ persistedUserData: { id: string, username: string, group: "Administrator" | "Worker", name: string } | null }){

    const dispatch = useAppDispatch()
    const pathName = usePathname()
    const { staffToEdit } = useAppSelector(store => store.editStaff)
    const router = useRouter()

    useEffect(() => {
        if (persistedUserData && persistedUserData.id && persistedUserData.username){
            dispatch(setAuthUser({
                id: persistedUserData.id,
                emailOrUsername: persistedUserData.username,
                group: persistedUserData.group,
                name: persistedUserData.name
            }))

            if (persistedUserData.group === "Administrator" && !pathName.startsWith("/admin")){
                router.push("/admin")
            }
        }
    },[persistedUserData?.id,persistedUserData?.username])


    useEffect(() => {
        if (pathName !== "/admin/staff-management/edit-staff" && staffToEdit){
            dispatch(clearStaffToEdit())
        }
    },[pathName])

    return null;
}