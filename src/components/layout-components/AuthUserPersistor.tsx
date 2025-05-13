"use client"

import { fetchStoreBranches } from "@/actions/auth.server";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { setAuthUser } from "@/lib/redux/slices/authUserSlice";
import { clearProductToEdit } from "@/lib/redux/slices/editProductSlice";
import { clearStaffToEdit } from "@/lib/redux/slices/editStaffSlice";
import { setBranches } from "@/lib/redux/slices/storeBranchesSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function AuthUserPersistor({ persistedUserData }:{ persistedUserData: { id: string, username: string, branch?: string, group: "Administrator" | "Worker", name: string } | null }){

    const dispatch = useAppDispatch()
    const pathName = usePathname()
    const { staffToEdit } = useAppSelector(store => store.editStaff)
    const { branches } = useAppSelector(store => store.storeBranches)
    const { productToEdit } = useAppSelector(store => store.editProduct)
    const router = useRouter()


    const fetchBranchesClientHandler = async() => {
        const { data, success } = await fetchStoreBranches()

        if (!success){
            toast.error("Failed To Fetch Stores")
        }

        dispatch(setBranches(data))
    }

    useEffect(() => {
        if (persistedUserData && persistedUserData.id && persistedUserData.username){
            dispatch(setAuthUser({
                id: persistedUserData.id,
                emailOrUsername: persistedUserData.username,
                group: persistedUserData.group,
                name: persistedUserData.name,
                branch: persistedUserData.branch
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
        if (pathName.startsWith("/admin/product-management/edit-product") && productToEdit){
            dispatch(clearProductToEdit())
        }

        if (pathName.startsWith("/admin") && !branches.length){
            fetchBranchesClientHandler()
        }
    },[pathName])

    return null;
}