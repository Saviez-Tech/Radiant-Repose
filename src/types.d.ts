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
    totalPrice: number;
}

interface Transaction extends Product {
    quantity: number;
    time: string;
    date: string;
    amount: string;
    balance: string;
}


type Branch = {
    id: number,
    name: string,
    location: string,
    contact_number: string
}


type TimeFilterType = 'today' | 'yesterday' | 'lastWeek' | 'lastMonth' | 'annual';

interface Staff {
    id: string;
    name: string;
    user: number;
    phone_number: string;
    branch: Branch;
    status: 'Active' | 'Inactive';
    address: string,
}

interface AdminTransaction extends Product {
    quantity: number;
    time: string;
    date: string;
    amount: string;
    staff: Staff;
}

type AppPageError = {
  error: Error & { digest?: string },
  reset: () => void
}