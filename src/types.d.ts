type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    desc?: string;
    piecesLeft: number;
    barCode: string;
    category: "luxury-collection" | "spa-section" | "pharmacy";
}

interface ScannedProduct extends Product {
    quantity: number;
    totalPrice: number;
}

interface Transaction extends Product {
    time: string;
    date: string;
    amount: string;
    balance: string;
}

type AppPageError = {
  error: Error & { digest?: string },
  reset: () => void
}