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

<<<<<<< HEAD
interface Transaction extends Product {
=======
type Branch = {
    id: number,
    name: string,
    location: string,
    contact_number: string
}

type DateFilter = "day" | "week" | "month";

interface Staff {
    id: string;
    name: string;
    user: string;
    username: string;
    phone_number: string;
    branch: Branch;
    status: 'Active' | 'Inactive';
    address: string;
}

// Admin Dashboard Area Components Data
type SalesSummaryData = {
    [category in ProductType]?: {
      total_quantity_sold: number;
      total_amount_made: number;
    }
}  

type StatData = {
    total_goods_sold: number,
    total_price: number
    low_stock: number
}

interface SaleRecord {
    id: number;
    product: Product;
    quantity: number;
    price_at_sale: string;
    transaction: {
        id: number;
        staff: Staff;
        timestamp: string;
        subtotal: string;
        discount: string;
        customer_name: string;
        customer_contact: string;
    }
}
 
// For an array of sales:
type SalesRecordList = SaleRecord[]

// Legacy Transaction type - keeping for reference or compatibility
interface Transaction {
    id: string;
    barcode: string;
    name: string;
    image_url: string;
    quantity: number;
    price: number;
    date: string;
>>>>>>> 3be884f8127a07cb321a1d9a1d2efda9821ed40c
    time: string;
    date: string;
    amount: string;
<<<<<<< HEAD
    balance: string;
=======
    staff: Staff;
    subtotal: string;
    discount: string;
    customer_name: string;
    customer_contact: string;
}
 
type SalePayload = {
    subtotal: number;
    discount: number;
    customer_name: string;
    customer_contact: string;
    scanned_items: {
      product_id: string;
      quantity: number;
    }[]
}
 
type AppPageError = {
  error: Error & { digest?: string },
  reset: () => void
>>>>>>> 3be884f8127a07cb321a1d9a1d2efda9821ed40c
}