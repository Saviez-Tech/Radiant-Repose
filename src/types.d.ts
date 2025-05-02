interface IAuthUser {
    id: string | null;
    emailOrUsername: string | null;
    name: string | null,
    group: "Administrator" | "Worker" | null;
}

enum ProductType {
    BAGS = "bags",
    SHOES = "shoes",
    JEWELRY = "jewelry",
    PERFUMES = "perfumes"
}

type Product = {
    id: string;
    name: string;
    price: number;
    image_url: string;
    description?: string;
    stock_quantity: number;
    barcode: string;
    section: "luxury-collection" | "spa-section" | "pharmacy";
    category: ProductType;
    branch: number
}

interface ScannedProduct extends Product {
    quantity: number;
    totalPrice: number;
}

type Branch = {
    id: number,
    name: string,
    location: string,
    contact_number: string
}


type DateFilter = "day" | "week" | "month" ;


interface Staff {
    id: string;
    name: string;
    user: string;
    username: string;
    phone_number: string;
    branch: Branch;
    status: 'Active' | 'Inactive';
    address: string,
}


// Admin Dashboard Area Components Data
type SalesSummaryData = {
    [category: ProductType]: {
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
    staff: Staff;
    subtotal: string;
    discount: string;
    customer_name: string;
    customer_contact: string;
    date: string;
    scanned_items: ScannedProduct[]
}
  
// For an array of sales:
type SalesRecordList = SaleRecord[]


interface Transaction {
    id: string;
    barcode: string;
    name: string;
    image_url: string;
    quantity: number;
    price: number;
    date: string;
    time: string;
    amount: string;
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
}