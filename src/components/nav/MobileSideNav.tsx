"use client"

import Link from "next/link";
import { Modal as MuiModal } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import Logo from "@/components/layout-components/Logo";
import LogoSrc from "../../public-assets/logo/Logo1.svg"
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { closeMobileNav } from "@/lib/redux/slices/mobileNavSlice";
import { motion, AnimatePresence } from "framer-motion";
import { navItems as NavItems } from "@/components-data/nav-data"

export default function MobileSidebarNav({ navItems }: { navItems: typeof NavItems }) {
    const pathName = usePathname()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { isOpen } = useAppSelector(store => store.mobileNav)
    const [showModal, setShowModal] = useState(false)
    const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null)

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
        setExpandedDropdown(null)
        dispatch(closeMobileNav())
    }

    const handleAnimationComplete = (variant: string) => {
        if (variant === "closed") {
            setShowModal(false)
            setExpandedDropdown(null)
        }
    }

    // Handle navigation with proper cleanup
    const handleNavigation = (path: string, event?: React.MouseEvent) => {
        if (event) {
            event.preventDefault()
            event.stopPropagation()
        }
        
        // Close dropdown and nav
        setExpandedDropdown(null)
        dispatch(closeMobileNav())
        
        // Navigate after a small delay to ensure modal closes
        setTimeout(() => {
            router.push(path)
        }, 100)
    }

    // Handle dropdown toggle
    const handleDropdownToggle = (itemName: string, event: React.MouseEvent) => {
        event.preventDefault()
        event.stopPropagation()
        
        setExpandedDropdown(prev => prev === itemName ? null : itemName)
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

    const dropdownVariants = {
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        },
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    }

    return (
        <MuiModal 
            open={showModal} 
            onClose={handleClose}
            sx={{ 
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(3px)',
                zIndex: 1300
            }}
            disableEnforceFocus
            disableAutoFocus
            disableRestoreFocus
        >
            <AnimatePresence
                onExitComplete={() => {
                    setShowModal(false)
                }}
            >
                {isOpen && (
                    <motion.nav 
                        className="focus:outline-none outline-none fixed left-0 top-0 h-screen overflow-y-auto w-[80%] max-w-[320px] text-primary-dark_slate font-medium bg-white shadow-lg drop-shadow-md text-sm p-4 flex justify-between flex-col z-[1400]"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        <div>
                            <div className="flex justify-between items-center mb-8">
                                <Logo src={LogoSrc} className="w-32" />
                                <button 
                                    onClick={handleClose}
                                    className="p-2 rounded-full hover:bg-gray-100 touch-manipulation"
                                    type="button"
                                >
                                    <Icon icon="heroicons:x-mark" width="24" height="24" />
                                </button>
                            </div>
                            
                            <ul className="flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <li key={item.name} className="w-full">
                                        {item.hasDropdown ? (
                                            <div className="w-full">
                                                <button
                                                    onClick={(e) => handleDropdownToggle(item.name, e)}
                                                    className={`${
                                                        pathName === item.path ||
                                                        pathName.startsWith(item.path + "/")
                                                            ? "bg-gray-100 text-primary-deepBlack font-medium"
                                                            : "text-primary-dark_slate"
                                                    } w-full flex items-center justify-between px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation`}
                                                    type="button"
                                                >
                                                    <span>{item.name}</span>
                                                    <Icon
                                                        icon="cuida:caret-down-outline"
                                                        width="20"
                                                        height="20"
                                                        className={`transform transition-transform ${
                                                            expandedDropdown === item.name ? 'rotate-180' : ''
                                                        }`}
                                                    />
                                                </button>
                                                
                                                <AnimatePresence>
                                                    {expandedDropdown === item.name && (
                                                        <motion.div
                                                            initial="closed"
                                                            animate="open"
                                                            exit="closed"
                                                            variants={dropdownVariants}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="ml-4 mt-2 space-y-1">
                                                                {item.dropdownItems?.map((dropdownItem) => (
                                                                    <button
                                                                        key={dropdownItem.path}
                                                                        onClick={(e) => handleNavigation(dropdownItem.path, e)}
                                                                        className={`${
                                                                            pathName === dropdownItem.path
                                                                                ? "bg-gray-100 text-primary-deepBlack font-medium"
                                                                                : "text-primary-dark_slate"
                                                                        } w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation`}
                                                                        type="button"
                                                                    >
                                                                        {dropdownItem.name}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={(e) => handleNavigation(item.path, e)}
                                                className={`${
                                                    pathName === item.path
                                                        ? "bg-gray-100 text-primary-deepBlack font-medium"
                                                        : "text-primary-dark_slate"
                                                } w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors touch-manipulation`}
                                                type="button"
                                            >
                                                {item.name}
                                            </button>
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