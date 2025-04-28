"use client"

import Link from "next/link";
import LogoSrc from "../../../public-assets/logo/Logo1.svg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Modal as MuiModal } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { LayoutDashboard } from "lucide-react";
import Logo from "@/components/layout-components/Logo";
import { Analytics, BagIcon } from "@/components/Svg";
import { productManagementCategories } from "@/components-data/productsManagementCategoriesLinkData";
import React, { useEffect, useState } from "react";
import { rubik } from "@/fonts";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { closeMobileNav } from "@/lib/redux/slices/mobileNavSlice";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminMobileSidebar() {
    const pathName = usePathname()
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { isOpen } = useAppSelector(store => store.mobileNav)
    const [showModal, setShowModal] = useState(false)

    // Control modal visibility based on isOpen state
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

    const isActiveRoute = (route: string) => {
        if (!pathName) return false;

        if (pathName === "/admin/dashboard") return route === pathName;

        const routeSegment = route.split('/')[2];
        const currentSegment = pathName.split('/')[2]

        return currentSegment?.startsWith(routeSegment) ?? false;
    }

    // Sidebar animation variants
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
        >
            <AnimatePresence
                onExitComplete={() => {
                    setShowModal(false)
                }}
            >
                {isOpen && (
                    <motion.nav 
                        className="focus:outline-none outline-none fixed left-0 h-screen overflow-y-auto w-[21em] text-[#444444] font-medium bg-primary-light_peach shadow-lg drop-shadow-md text-sm p-4 flex justify-between flex-col gap-20"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={sidebarVariants}
                        onAnimationComplete={handleAnimationComplete}
                    >
                        <div>
                            <Logo src={LogoSrc} className="w-32" />
                            <ul className="flex mt-7 flex-col gap-4">
                                {[
                                    { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className={`${isActiveRoute("/admin/dashboard") ? "stroke-white" : "stroke-primary-dark_slate" } fill-transparent`} size={20} /> },
                                    { href: "/admin/product-management", label: "Product Management", icon: <BagIcon className={`${isActiveRoute("/admin/product-management") ? "stroke-white" : "stroke-primary-dark_slate" } fill-transparent`} /> },
                                    { href: "/admin/staff-management", label: "Staff Management", icon: <Icon icon="mingcute:user-2-line" width="25" height="25" className={`${isActiveRoute("/admin/staff-management") ? "text-white" : "text-primary-dark_slate" } fill-transparent`} /> },
                                    { href: "/admin/staff-analysis", label: "Staff Analysis", icon: <Analytics className={`${isActiveRoute("/admin/staff-analysis") ? "stroke-white" : "stroke-primary-dark_slate" } fill-transparent`} /> },
                                    { href: "/admin/payment-tracking", label: "Payment Tracking", icon: <Icon icon="uil:wallet" width="24" height="24" className={`${isActiveRoute("/admin/payment-tracking") ? "text-white" : "text-primary-dark_slate" } fill-transparent`} /> },
                                ].map(({ href, label, icon }) => {
                                    const isActive = isActiveRoute(href)
                                    return (
                                        href === "/admin/product-management" ?
                                        <DropdownMenu key={href}>
                                            <DropdownMenuTrigger 
                                                className={`${isActive ? "bg-primary-darkRed text-primary-base_color1 hover:bg-primary-darkRed hover:text-primary-base_color1" : "hover:bg-red-200"} relative flex items-center gap-2 pe-3 min-h-12 ps-2 py-2 rounded-lg focus:outline-none transition ease-in-out duration-200`}>
                                                {icon}
                                                <span>{label}</span>
                                                {isActive && <Icon icon="basil:caret-right-outline" width="26" height="26" className="absolute top-0 bottom-0 my-auto -right-1" />}
                                            </DropdownMenuTrigger>

                                            <DropdownMenuContent>
                                                {
                                                    productManagementCategories.map(({ href: categoryHref, label: categoryLabel },i) => {
                                                        return (
                                                            <React.Fragment key={categoryHref}>
                                                                <DropdownMenuItem onClick={() => router.push(`${href}/${categoryHref}`)}>
                                                                    {categoryLabel}
                                                                </DropdownMenuItem>
                                                                {
                                                                    i < productManagementCategories.length - 1 && <DropdownMenuSeparator />
                                                                }
                                                            </React.Fragment>
                                                        )
                                                })}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                        :
                                        <li key={href} className="inline-block">
                                            <Link
                                            className={`${isActive ? "bg-primary-darkRed text-primary-base_color1 hover:bg-primary-darkRed hover:text-primary-base_color1" : "hover:bg-red-200"} relative flex items-center gap-2 pe-3 min-h-12 ps-2 py-2 rounded-lg transition ease-in-out duration-200`}
                                            href={href}
                                            onClick={() => isOpen && dispatch(closeMobileNav())}
                                            >
                                            {icon}
                                            <span>{label}</span>
                                            {isActive && <Icon icon="basil:caret-right-outline" width="26" height="26" className="absolute top-0 bottom-0 my-auto -right-1" />}
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="flex justify-between items-center gap-3">
                            <Avatar className="flex-shrink-0">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <div className={`flex-shrink w-3/5 ${rubik.className}`}>
                                <p className="truncate font-normal">John Doe</p>
                                <p className="truncate text-[.83rem] font-normal">johndoepenny@gmail.com</p>
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
                    </motion.nav>
                )}
            </AnimatePresence>
        </MuiModal>
    )
}