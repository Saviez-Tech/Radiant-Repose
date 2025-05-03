interface IAuthUser {
    id: string | null;
    emailOrUsername: string | null;
    group: "Administrator" | "Worker" | null;
}

enum ProductType {
    BAGS = "bags",
    SHOES = "shoes",
    JEWELRY = "jewelry",
    PERFUMES = "perfumes"
}

export type Product = {
    id: string;
    name: string;
    price: number;
    image_url: string;
    description?: string;
    stock_quantity: number;
    barcode?: string;
    category?: "luxury-collection" | "spa-section" | "pharmacy";
    productType: ProductType;
    branch?: number
}

interface ScannedProduct extends Product {
    quantity: number;
    piecesLeft: number;
    barCode: string;
    category: "luxury-collection" | "spa-section" | "pharmacy";
}

interface ScannedProduct extends Product {
    totalPrice: number;
}

interface Transaction extends Product {
    time: string;
    date: string;
    amount: string;
    balance: string;
}