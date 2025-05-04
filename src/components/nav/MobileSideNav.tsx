"use client"

import Link from "next/link";
import { Modal as MuiModal } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Logo from "@/components/layout-components/Logo";
import LogoSrc from "../../public-assets/logo/Logo1.svg"
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { closeMobileNav } from "@/lib/redux/slices/mobileNavSlice";
import { motion, AnimatePresence } from "framer-motion";
import { mobileNavItems } from "@/components-data/mobile-nav-data";

export default function MobileSidebarNav({ navItems }:{ navItems: typeof mobileNavItems }) {
    const pathName = usePathname()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { isOpen } = useAppSelector(store => store.mobileNav)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setShowModal(true)
        }
    }, [isOpen])

    const handleClose = () => {
        dispatch(closeMobileNav())
    }

    const handleAnimationComplete = (variant: string) => {
        if (variant === "closed") {
            setShowModal(false)
        }
    }
    const sidebarVariants = {
        open: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        },
        closed: {
            x: "-100%",
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 30
            }
        }
    }

    return (
        <MuiModal 
            open={showModal} 
            onClose={handleClose}
            sx={{ 
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(3px)'
            }}
            disableEnforceFocus
            disableAutoFocus
        >
            <AnimatePresence
                onExitComplete={() => {
                    setShowModal(false)
                }}
            >
                {isOpen && (
                    <motion.nav 
                        className="focus:outline-none outline-none fixed left-0 h-screen overflow-y-auto w-[80%] max-w-[320px] text-primary-dark_slate font-medium bg-white shadow-lg drop-shadow-md text-sm p-4 flex justify-between flex-col"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        <div>
                            <div className="flex justify-between items-center">
                                <Logo src={LogoSrc} className="w-32" />
                                <button 
                                    onClick={handleClose}
                                    className="p-2 rounded-full hover:bg-gray-100"
                                >
                                    <Icon icon="heroicons:x-mark" width="24" height="24" />
                                </button>
                            </div>
                            
                            <ul className="flex mt-8 flex-col gap-2">
                                {navItems.map((item) => (
                                    item.hasDropdown ? (
                                        <DropdownMenu key={item.name}>
                                            <DropdownMenuTrigger 
                                                className={`${pathName === item.path ? "bg-gray-100 text-primary-deepBlack font-medium" : ""} relative flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors`}
                                            >
                                                <span>{item.name}</span>
                                                <Icon icon="cuida:caret-down-outline" width="20" height="20" />
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent 
                                                className="z-[9999] w-full" 
                                                sideOffset={5}
                                                align="start"
                                                forceMount
                                            >
                                                {item.dropdownItems && item.dropdownItems.map((dropdownItem, i) => (
                                                    <React.Fragment key={dropdownItem.name}>
                                                        <DropdownMenuItem 
                                                            onClick={() => {
                                                                router.push(dropdownItem.path)
                                                                dispatch(closeMobileNav())
                                                            }}
                                                        >
                                                            {dropdownItem.name}
                                                        </DropdownMenuItem>
                                                        {i < item.dropdownItems.length - 1 && <DropdownMenuSeparator />}
                                                    </React.Fragment>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    ) : (
                                        <li key={item.name} className="block">
                                            <Link
                                                href={item.path}
                                                className={`${pathName === item.path ? "bg-gray-100 text-primary-deepBlack font-medium" : "text-primary-dark_slate"} flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors w-full`}
                                                onClick={() => isOpen && dispatch(closeMobileNav())}
                                            >
                                                {item.name}
                                            </Link>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-200">
                            <div className="flex items-center gap-3 px-4 py-2">
                                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                                    <Icon icon="heroicons:user" width="16" height="16" />
                                </div>
                                <div>
                                    <Link href="/auth/login" className="block cursor-pointer">
                                        <p className="text-sm font-medium">Account</p>
                                        <p className="text-xs text-gray-500">Sign in or register</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </MuiModal>
    )
}