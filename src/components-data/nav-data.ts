export interface NavItem {
    name: string;
    path: string;
    hasDropdown?: boolean;
    dropdownItems?: { name: string; path: string }[];
}

export const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    {
        name: "Products",
        path: "/services/luxury",
    },
    // { name: "Location", path: "/location" },
    { name: "FAQs", path: "/faqs" },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact-us" },
]