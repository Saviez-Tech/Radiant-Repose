export const navItems = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
    {
        name: "Our Services",
        path: "/services",
        hasDropdown: true,
        dropdownItems: [
        { name: "Luxury", path: "/services/luxury" },
        { name: "Spa", path: "/services/spa" },
        { name: "Pharmacy", path: "/services/pharmacy" },
        ],
    },
    { name: "Location", path: "/location" },
    { name: "FAQs", path: "/faqs" },
    { name: "Blog", path: "/blog" },
    { name: "Contact Us", path: "/contact-us" },
]