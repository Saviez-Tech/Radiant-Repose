"use client"

import Link from "next/link";
import LogoSrc from "../../../public-assets/logo/Logo1.svg";
import { usePathname, useRouter } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DropdownMenu, DropdownMenuItem, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuSeparator } from "../../ui/dropdown-menu";
import { LayoutDashboard } from "lucide-react";
import Logo from "../../layout-components/Logo";
import { Analytics, BagIcon } from "../../Svg";
import { productManagementSections } from "@/components-data/productsManagementSectionsLinkData";
import React from "react";
import AuthUserDetails from "@/components/layout-components/AuthUserDetails";


function AdminDashboardSideNav() {

    const pathName = usePathname()
    const router = useRouter()

    const isActiveRoute = (route: string) => {
        if (!pathName) return false;

        if (pathName === "/admin/dashboard") return route === pathName;

        const routeSegment = route.split('/')[2];
        const currentSegment = pathName.split('/')[2];

        return currentSegment?.startsWith(routeSegment) ?? false;
    }


    return (
        <nav className="hidden w-[250px] h-full text-primary-dark_slate font-medium bg-primary-light_peach text-sm p-4 py-7 lg:flex justify-between flex-col gap-20">
            <div>
                <Logo src={LogoSrc} width={170} />

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
                                        productManagementSections.map(({ href: categoryHref, label: categoryLabel },i) => {
                                            return (
                                                <React.Fragment key={categoryHref}>
                                                    <DropdownMenuItem onClick={() => router.push(`${href}/${categoryHref}`)}>
                                                        {categoryLabel}
                                                    </DropdownMenuItem>
                                                    {
                                                        i < productManagementSections.length - 1 && <DropdownMenuSeparator />
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
            <AuthUserDetails />
        </nav>
    )
}

export default AdminDashboardSideNav;