interface IAuthUser {
    id: string | null;
    emailOrUsername: string | null;
    group: "Administrator" | "Worker" | null;
    name: string | null,
    branch?: string | null
}

interface StoreBranch {
    id: number;
    name: string;
    location: string;
    contact_number: string;
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
    category?: "luxury-collection" | "spa-section" | "pharmacy" | string;
    productType: ProductType | string;
    barcode: string;
    branch?: number
}

interface SelectedProduct extends Product {
    barcode: string;
    quantity: number;
    totalPrice: number;
}

interface ScannedProduct extends Product {
    barcode: string;
    quantity: number;
    totalPrice: number;
}

type Branch = {
    id: number,
    name: string,
    location: string,
    contact_number: string
}

type DateFilter = "year" | "week" | "month" | "custom";

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
        staff: number;
        timestamp: string;
        subtotal: string;
        discount: string;
        customer_name: string;
        customer_contact: string;
    }
}

interface SaleRecordForSpa {
    id: number;
    transaction_code: string;
    barcode: string | null;
    image_url: string | null;
    transaction_time: string;
    staff: string;
    product_name: string;
    service_name: string | null;
    quantity: number;
    price_at_sale: string;
}
 
// For an array of sales:
type SalesRecordList = SaleRecord[]
type SalesRecordForSpaList = SaleRecordForSpa[]

// Legacy Transaction type - keeping for reference or compatibility
interface Transaction {
    id: string;
    barcode: string;
    name: string;
    image_url: string;
    quantity: number;
    price: number;
    date: string;
    time: string;
    date: string;
    amount: string;
    staff: number;
    subtotal: string;
    discount: string;
    customer_name: string;
    customer_contact: string;
}

interface SpaTransaction {
    id: string;
    transaction_code: string;
    barcode: string | null;
    product_name: string | null;
    service_name: string | null;
    quantity: number;
    price_at_sale: string;
    staff: string;
    image_url: string | null;
    time: string;
    date: string;
    transaction_time: string;
}
 
type SalePayload = {
    subtotal: number;
    discount: number;
    customer_name: string;
    customer_contact: string;
    scanned_items: {
      product_id?: number;
      service_id?: number;
      quantity: number;
    }[]
}




interface OrderList {
  full_name: string;
  email: string;
  id: string;
  phone: string;
  street_address: string;
  zip_code: string;
  city: string;
  state: string;
  country: string;
}

interface OrderListDetailProducts { price_at_sale: string, quantity: number, product: ScannedProduct }

interface OrderListDetail {
    id: string,
    customer: OrderList,
    products: OrderListDetailProducts[]
}

 
type AppPageError = {
  error: Error & { digest?: string },
  reset: () => void
}

type SingleBookingDetail = {
  id: number;
  service: {
    id: number;
    name: string;
    description: string;
    price: string;
    image: string;
    type?: string;
  };
  time: string;
  code?: string
};

type BookingDetails = {
  id: number;
  customer_name: string;
  customer_phone: string;
  created_at: string;
  booked_services: SingleBookingDetail[];
}