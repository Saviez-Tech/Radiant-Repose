"use client"

import { useAppDispatch } from "@/lib/redux/hooks";
import { setAuthUser } from "@/lib/redux/slices/authUserSlice";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthUserPersistor({ persistedUserData }:{ persistedUserData: { id: string, username: string, group: "Administrator" | "Worker" } | null }){

    const dispatch = useAppDispatch()
    const pathName = usePathname()
    const router = useRouter()

    useEffect(() => {
        if (persistedUserData && persistedUserData.id && persistedUserData.username){
            dispatch(setAuthUser({
                id: persistedUserData.id,
                emailOrUsername: persistedUserData.username,
                group: persistedUserData.group
            }))

            if (persistedUserData.group === "Administrator" && !pathName.startsWith("/admin")){
                router.push("/admin")
            }
        }
    },[persistedUserData?.id,persistedUserData?.username])

    return null;
}