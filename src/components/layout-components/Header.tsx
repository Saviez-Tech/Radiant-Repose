"use client";

import Logo from "./Logo";
import LogoSrc from "../../public-assets/logo/Logo1.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@iconify/react";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  closeMobileNav,
  toggleMobileNav,
} from "@/lib/redux/slices/mobileNavSlice";
import { useEffect } from "react";
import { Menu } from "lucide-react";
import UseWindowSize from "../custom-utils/UseWindowSize";
import MobileSidebarNav from "../nav/MobileSideNav";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navItems } from "@/components-data/nav-data";

export default function Header() {
  const pathName = usePathname();
  const { width } = UseWindowSize();
  const { isOpen } = useAppSelector((store) => store.mobileNav);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (width >= 1024 && isOpen) {
      dispatch(closeMobileNav());
    }
  }, [width, isOpen]);

  const handleToggleMobileNav = () => {
    dispatch(toggleMobileNav());
  };

  useEffect(() => {
    if (width >= 1024 && isOpen) {
      dispatch(closeMobileNav());
    }
  }, [pathName]);


  return (
    !pathName.startsWith("/auth") &&
    !pathName.startsWith("/pos") &&
    !pathName.startsWith("/cart-monitor") &&
    !pathName.startsWith("/admin") && (
      <div className="h-28 flex justify-center items-center absolute w-full top-0 left-0 z-40">
        <div className="glob-px flex items-center justify-between w-full">
          <Logo src={LogoSrc} width={190} height={150} />
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {navItems.map((item) => (
                <li key={item.name} className="inline-block text-sm">
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
                      <DropdownMenuContent className="w-48" align="start">
                        {item.dropdownItems?.map((dropdownItem) => (
                          <DropdownMenuItem key={dropdownItem.path} asChild>
                            <Link
                              href={dropdownItem.path}
                              className="w-full hover:text-primary-text_stone_color"
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
          </nav>

          <MobileSidebarNav navItems={navItems} />
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
  );
}
