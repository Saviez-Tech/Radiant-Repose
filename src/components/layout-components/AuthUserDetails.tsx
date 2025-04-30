"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { rubik } from "@/fonts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Icon } from "@iconify/react/dist/iconify.js"
import AuthUserDetailsSkeletonLoader from "../loaders/AuthUserDetailsSkeletonLoader"
import { useAppSelector } from "@/lib/redux/hooks"
import { useEffect, useState } from "react"

export default function AuthUserDetails() {
  // Use local state to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false)
  
  const { emailOrUsername, id: userID } = useAppSelector(store => store.authUser)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return <AuthUserDetailsSkeletonLoader />
  }
  
  return (
    userID ? (
      <div className="flex items-center gap-2">
        <Avatar className="flex-shrink-0">
          <AvatarImage src="/icons/user.svg" />
          <AvatarFallback className="uppercase">{emailOrUsername?.slice(0, 2)}</AvatarFallback>
        </Avatar>
        <div className={`flex-shrink w-3/5 ${rubik.className}`}>
          <p className="truncate capitalize text-[.83rem] font-normal">{emailOrUsername}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-2 focus:ring-darkbg-primary-darkRed-400">
            <Icon icon="radix-icons:caret-sort" width="30" height="30" aria-label="open" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-primary-dark_slate py-3">
            <DropdownMenuItem className="cursor-pointer">
              <Icon icon="qlementine-icons:user-16" width="40" height="40" aria-hidden="true" className="text-darkbg-primary-darkRed-500 block" />
              <span>Switch Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Icon icon="solar:logout-2-outline" width="40" height="40" aria-hidden="true" className="text-darkbg-primary-darkRed-500 block" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ) : (
      <AuthUserDetailsSkeletonLoader />
    )
  )
}