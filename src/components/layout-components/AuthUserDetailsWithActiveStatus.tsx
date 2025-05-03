"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import AuthUserDetailsSkeletonLoader from "../loaders/AuthUserDetailsSkeletonLoader"
import { useAppSelector } from "@/lib/redux/hooks"
import { useEffect, useState } from "react"

export default function AuthUserDetailsWithActiveStatus(){
    
    // Use local state to prevent hydration mismatch
    const [isMounted, setIsMounted] = useState(false)
    
    const { emailOrUsername, name, id: userID, group } = useAppSelector(store => store.authUser)
    
    useEffect(() => {
        setIsMounted(true)
    }, [])
    
    if (!isMounted) {
        return <AuthUserDetailsSkeletonLoader />
    }
  
    return (
        <div className="flex items-center gap-2">
            <div className="relative w-fit">
                <Avatar>
                    <AvatarImage src="/icons/user.svg" />
                    <AvatarFallback className="uppercase">{name ? name?.slice(0,2) : emailOrUsername?.slice(0,2)}</AvatarFallback>
                </Avatar>

                <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-green-500 ring-2 ring-white animate-ping" />
                <span className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div>
                <p className="truncate text-sm text-primary-deepBlack capitalize font-medium">{emailOrUsername}</p>
                <p className="text-xs">{group?.toLowerCase() === "worker" ? `Staff/Cashier ${userID}` : "Admin"}</p>
            </div>
        </div>
    )
}