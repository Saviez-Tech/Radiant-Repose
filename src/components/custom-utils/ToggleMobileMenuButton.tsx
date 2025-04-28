"use client"

import { useEffect } from "react"
import UseWindowSize from "./UseWindowSize"
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks"
import { closeMobileNav, toggleMobileNav } from "@/lib/redux/slices/mobileNavSlice"
import { Menu } from "lucide-react"


export default function ToggleMobileMenuButton() {

    const { width } = UseWindowSize()
    const { isOpen } = useAppSelector(store => store.mobileNav)
    const dispatch = useAppDispatch()
    
    useEffect(() => {
      if (width >= 1024 && isOpen) {
        dispatch(closeMobileNav())
      }
    }, [width, isOpen])

    const handleToggleMobileNav = () => {
      dispatch(toggleMobileNav())
    }

    return (
        <button onClick={handleToggleMobileNav} className="lg:hidden">
            <Menu className="text-primary-darkRed" size={37} />
        </button>
    )
}