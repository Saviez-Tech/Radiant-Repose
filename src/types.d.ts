type Product = {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
    totalPrice: number;
    piecesLeft: number;
}

export type AppPageError = {
  error: Error & { digest?: string },
  reset: () => void
}