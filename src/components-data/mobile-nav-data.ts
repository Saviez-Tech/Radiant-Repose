export const mobileNavItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services", hasDropdown: true, dropdownItems: [
        { name: "Service 1", path: "/services/service-1" },
        { name: "Service 2", path: "/services/service-2" },
        { name: "Service 3", path: "/services/service-3" },
    ]},
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
]