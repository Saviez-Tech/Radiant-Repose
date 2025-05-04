"use client"

import Logo from "./Logo";
import LogoSrc from "../../public-assets/logo/Logo1.svg"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { closeMobileNav, toggleMobileNav } from "@/lib/redux/slices/mobileNavSlice";
import { useEffect } from "react";
import { Menu } from "lucide-react";
import UseWindowSize from "../custom-utils/UseWindowSize";
import { mobileNavItems } from "@/components-data/mobile-nav-data";
import MobileSidebarNav from "../nav/MobileSideNav";

export default function Header(){

    const pathName = usePathname()
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


    useEffect(() => {
        if (width >= 1024 && isOpen) {
            dispatch(closeMobileNav())
        }
    },[pathName])
    
    const navItems = [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about-us" },
        { name: "Our Services", path: "/services", hasDropdown: true },
        { name: "Location", path: "/location" },
        { name: "FAQs", path: "/faqs" },
        { name: "Blog", path: "/blog" },
        { name: "Contact Us", path: "/contact-us" }
    ]


    
    return(
        !pathName.startsWith("/auth") && 
        !pathName.startsWith("/pos") && 
        !pathName.startsWith("/cart-monitor") && 
        !pathName.startsWith("/admin") &&
        <div className="h-28 flex justify-center items-center absolute w-full top-0 left-0 z-40">
            <div className="glob-px flex items-center justify-between w-full">
                <Logo src={LogoSrc} width={190} height={150} />
                <nav className="hidden lg:block">
                    <ul className="flex items-center gap-6">
                        {navItems.map((item) => (
                            <li key={item.name} className="inline-block text-sm">
                                <Link 
                                    href={item.path}
                                    className={`${pathName === item.path ? 'text-primary-deepBlack font-medium' : 'text-primary-dark_slate'} hover:text-gray-700 transition-colors flex items-center`}
                                >
                                    {item.name}
                                    {item.hasDropdown && (
                                        <Icon icon="cuida:caret-down-outline" width="20" height="20" />
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <MobileSidebarNav navItems={mobileNavItems} />
                <button 
                    className="lg:hidden"
                    onClick={handleToggleMobileNav}
                    aria-label="Toggle mobile navigation"
                    aria-expanded={isOpen ? "true" : "false"}
                    aria-controls="homepage-mobile-nav"
                >
                    <Menu className="text-primary-deepBlack" size={35} />
                </button>
            </div>
        </div>
    )
}