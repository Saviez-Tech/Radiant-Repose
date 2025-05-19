"use client"

import Link from "next/link";
import { Modal as MuiModal } from "@mui/material";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "@/components/layout-components/Logo";
import LogoSrc from "../../public-assets/logo/Logo1.svg"
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { closeMobileNav } from "@/lib/redux/slices/mobileNavSlice";
import { motion, AnimatePresence } from "framer-motion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { navItems as NavItems } from "@/components-data/nav-data"

export default function MobileSidebarNav({ navItems }:{ navItems: typeof NavItems }) {
    const pathName = usePathname()
    const dispatch = useAppDispatch()
    const { isOpen } = useAppSelector(store => store.mobileNav)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (isOpen) {
            setShowModal(true)
        }
    }, [isOpen])


    useEffect(() => {
        if (isOpen) {
            dispatch(closeMobileNav())
        }
    }, [pathName])

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
                                    <li key={item.name} className={`${pathName === item.path ? "bg-gray-100 text-primary-deepBlack font-medium" : ""} relative flex items-center justify-between w-full px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors`}>
                                        {item.hasDropdown ? (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <div
                                                    className={`${
                                                        pathName === item.path ||
                                                        pathName.startsWith(item.path + "/")
                                                        ? "text-primary-deepBlack font-medium"
                                                        : "text-primary-dark_slate"
                                                    } hover:text-gray-700 transition-colors flex items-center cursor-pointer`}
                                                    >
                                                    {item.name}
                                                    <Icon
                                                        icon="cuida:caret-down-outline"
                                                        width="20"
                                                        height="20"
                                                    />
                                                    </div>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent className="w-48 z-[9999]" align="start">
                                                    {item.dropdownItems?.map((dropdownItem) => (
                                                    <DropdownMenuItem key={dropdownItem.path} asChild>
                                                        <Link
                                                            href={dropdownItem.path}
                                                            className={`${pathName === item.path ? "bg-gray-100 text-primary-deepBlack" : "text-primary-dark_slate"} flex items-center px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors w-full`}
                                                        >
                                                        {dropdownItem.name}
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        ) : (
                                            <Link
                                                href={item.path}
                                                className={`${
                                                    pathName === item.path
                                                    ? "text-primary-deepBlack font-medium"
                                                    : "text-primary-dark_slate"
                                                } hover:text-primary-text_stone_color transition-colors flex items-center`}
                                            >
                                            {item.name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.nav>
                )}
            </AnimatePresence>
        </MuiModal>
    )
}