"use client"

import Link from "next/link";
import LogoSrc from "../../../public-assets/logo/Logo1.svg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../../ui/dropdown-menu";
import { LayoutDashboard } from "lucide-react";
import Logo from "../../layout-components/Logo";
import { Analytics, BagIcon } from "../../Svg";
import { rubik } from "@/fonts";


function AdminDashboardSideNav() {

    const pathName = usePathname()

    const isActiveRoute = (route: string) => {
        if(pathName === "/admin/dashboard") return route === pathName;
        
        const routeSegment = route.split('/')[2]
        return pathName.split("/")[2].startsWith(routeSegment)
    }

    return (
        <nav className="hidden w-[250px] h-full text-primary-dark_slate font-medium bg-primary-light_peach text-sm p-4 py-7 lg:flex justify-between flex-col gap-20">
            <div>
                <Logo src={LogoSrc} width={170} />

                <ul className="flex mt-7 flex-col gap-4">
                    {[
                        { href: "/admin/dashboard", label: "Dashboard", icon: <LayoutDashboard className={`${isActiveRoute("/admin/dashboard") ? "stroke-white" : "stroke-primary-dark_slate" } fill-transparent`} size={20} /> },
                        { href: "/admin/product-management", label: "Product Management", icon: <BagIcon className={`${isActiveRoute("/admin/product-management") ? "stroke-white" : "stroke-primary-dark_slate" } fill-transparent`} /> },
                        { href: "/admin/staff-onboarding", label: "Staff Onboarding", icon: <Icon icon="mingcute:user-2-line" width="25" height="25" className={`${isActiveRoute("/admin/staff-onboarding") ? "text-white" : "text-primary-dark_slate" } fill-transparent`} /> },
                        { href: "/admin/staff-analysis", label: "Staff Analysis", icon: <Analytics className={`${isActiveRoute("/admin/staff-analysis") ? "stroke-white" : "stroke-primary-dark_slate" } fill-transparent`} /> },
                        { href: "/admin/payment-tracking", label: "Payment Tracking", icon: <Icon icon="uil:wallet" width="24" height="24" className={`${isActiveRoute("/admin/payment-tracking") ? "text-white" : "text-primary-dark_slate" } fill-transparent`} /> },
                    ].map(({ href, label, icon }) => {
                        const isActive = isActiveRoute(href)
                        return (
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
        </nav>
    )
}

export default AdminDashboardSideNav;