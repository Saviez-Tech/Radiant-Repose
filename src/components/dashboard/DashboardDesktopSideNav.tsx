"use client"
import Link from "next/link";
import LogoSrc from "../../public-assets/logo/Logo1.svg"
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react/dist/iconify.js";
import { LayoutDashboard } from "lucide-react";
import Logo from "../layout-components/Logo";
import { ReceiptIcon } from "../Svg";
import AuthUserDetails from "../layout-components/AuthUserDetails";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { OpenCustomerMonitor } from "../buttons/OpenCustomerMonitor";

function DashboardDesktopSideNav({ sessionUserID }:{ sessionUserID: string }) {
    const pathName = usePathname()
    const isActiveRoute = (route: string) => {
        if (route === "/pos") {
            return pathName === "/pos" || pathName.startsWith("/pos/categories")
        }
        return pathName.startsWith(route)
    }

    // Check if any dashboard routes are active
    const isDashboardActive = pathName.startsWith("/pos/luxury") || pathName.startsWith("/pos/spa-section")

    return (
        <nav className="w-[250px] h-full text-primary-dark_slate font-medium bg-primary-light_peach text-sm p-4 py-7 flex justify-between flex-col gap-20">
            <div>
                <Logo src={LogoSrc} width={170} />
                <ul className="flex mt-7 flex-col gap-5">
                    {/* Dashboard Dropdown */}
                    <li className="inline-block">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button
                                    className={`${isDashboardActive ? "bg-primary-darkRed text-primary-base_color1 hover:bg-primary-darkRed hover:text-primary-base_color1" : "hover:bg-red-200"} relative flex items-center w-full pe-3 min-h-12 ps-2 py-2 rounded-lg transition ease-in-out duration-200 focus:outline-none focus:ring-0`}
                                >
                                    <div className="flex items-center gap-2">
                                        <LayoutDashboard className={`${isDashboardActive ? "stroke-white" : "stroke-primary-dark_slate" } fill-transparent`} size={20} />
                                        <span>Dashboard</span>
                                    </div>
                                    {isDashboardActive && <Icon icon="basil:caret-right-outline" width="26" height="26" className="absolute top-0 bottom-0 my-auto -right-1" />}
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48">
                                <DropdownMenuItem asChild>
                                    <Link href="/pos/luxury" className={`w-full cursor-pointer ${pathName.startsWith("/pos/luxury") ? "bg-red-100" : ""}`}>
                                        Luxury
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href="/pos/spa-section" className={`w-full cursor-pointer ${pathName.startsWith("/pos/spa-section") ? "bg-red-100" : ""}`}>
                                        Spa Section
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </li>

                    {/* Transaction History Link */}
                    <li className="inline-block">
                        <Link
                            className={`${isActiveRoute("/pos/transaction-history") ? "bg-primary-darkRed text-primary-base_color1 hover:bg-primary-darkRed hover:text-primary-base_color1" : "hover:bg-red-200"} relative flex items-center gap-2 pe-3 min-h-12 ps-2 py-2 rounded-lg transition ease-in-out duration-200`}
                            href={`/pos/transaction-history/${sessionUserID}`}
                        >
                            <ReceiptIcon className={`${isActiveRoute("/pos/transaction-history") ? "stroke-white" : "stroke-primary-dark_slate" } fill-transparent`} />
                            <span>Transaction History</span>
                            {isActiveRoute("/pos/transaction-history") && <Icon icon="basil:caret-right-outline" width="26" height="26" className="absolute top-0 bottom-0 my-auto -right-1" />}
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="space-y-6">
                <AuthUserDetails />
                <OpenCustomerMonitor />
            </div>
        </nav>
    )
}

export default DashboardDesktopSideNav;