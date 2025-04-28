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
    image: string;
    desc?: string;
    piecesLeft: number;
    barCode: string;
    category: "luxury-collection" | "spa-section" | "pharmacy";
    productType: ProductType;
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


type TimeFilterType = 'today' | 'yesterday' | 'lastWeek' | 'lastMonth' | 'annual';

interface Staff {
    id: string;
    name: string;
    staffId: string;
    phoneNumber: string;
    storeLocation: string;
    status: 'Active' | 'Inactive';
    avatar?: string;
    regDate: string //Date string
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