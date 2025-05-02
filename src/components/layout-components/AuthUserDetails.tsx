"use client"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { rubik } from "@/fonts"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Icon } from "@iconify/react/dist/iconify.js"
import AuthUserDetailsSkeletonLoader from "../loaders/AuthUserDetailsSkeletonLoader"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { useEffect, useState } from "react"
import logoutHandler from "@/actions/auth.server"
import toast from "react-hot-toast"
import { setAuthUser } from "@/lib/redux/slices/authUserSlice"
import { usePathname, useRouter } from "next/navigation"

export default function AuthUserDetails() {
  // Use local state to prevent hydration mismatch
  const [isMounted, setIsMounted] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const pathName = usePathname()
  
  const { emailOrUsername, name, id: userID } = useAppSelector(store => store.authUser)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])


  const handleLogout = async() => {
    const { success, data, errorMessage } = await logoutHandler()

    if (success){
      toast.success(data || "Logout Successful")
      dispatch(setAuthUser({
        emailOrUsername: null,
        group: null,
        name: null,
        id: null
      }))

      router.push(`/auth/login?redirect=${pathName}`)
    }else {
      toast.error(errorMessage || "Failed To Logout")
    }
  }
  
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
          <p className="truncate capitalize text-[.83rem] font-medium">{name}</p>
          <p className="truncate capitalize text-[.83rem] font-normal">{emailOrUsername}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none focus:ring-2 focus:ring-darkbg-primary-darkRed-400">
            <Icon icon="radix-icons:caret-sort" width="30" height="30" aria-label="open" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="text-primary-dark_slate py-3">
            <DropdownMenuItem className="text-xs border-b pb-2">
              <span>{emailOrUsername}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-primary-darkRed font-medium bg-red-50/50">
              <Icon icon="solar:logout-2-outline" width="40" height="40" aria-hidden="true" className="text-primary-darkRed block" />
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