"use client"

import Link from "next/link";
import LogoSrc from "../../public-assets/Logo/Logo1.svg"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LayoutDashboard } from "lucide-react";
import Logo from "../layout-components/Logo";
import { ReceiptIcon } from "../Svg";
import { rubik } from "@/fonts";


function DashboardDesktopSideNav() {

    const pathName = usePathname()

    const isActiveRoute = (route: string) => {
        if (route === "/dashboard") {
            return pathName === "/dashboard" || pathName.startsWith("/dashboard/categories")
        }
        return pathName.startsWith(route)
    }

    return (
        <nav className="hidden w-[250px] h-full text-primary-dark_slate font-medium bg-primary-light_peach text-sm p-4 py-7 lg:flex justify-between flex-col gap-20">
            <div>
                <Logo src={LogoSrc} width={170} />

                <ul className="flex mt-7 flex-col gap-5">
                    {[
                        { href: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className={`${isActiveRoute("/dashboard") ? "stroke-white" : "stroke-primary-dark_slate" } fill-transparent`} size={20} /> },
                        { href: "/dashboard/transaction-history", label: "Transaction History", icon: <ReceiptIcon className={`${isActiveRoute("/dashboard/transaction-history") ? "stroke-white" : "stroke-primary-dark_slate" } fill-transparent`} /> },
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

export default DashboardDesktopSideNav;