"use server"

type FetchProductResult = {
  product?: ScannedProduct;
  errorMessage?: string;
  status?: number;
}

export const fetchProductByBarcodeAction = async (
  barcode: string
): Promise<FetchProductResult> => {
  try {
    const response = await fetch(`/api/products/barcode/${barcode}`)
    
    if (!response.ok) {
      if (response.status === 404) {
        return {
          errorMessage: "Product not found",
          status: 404,
        }
      }
      
      return {
        errorMessage: "Failed to fetch product",
        status: response.status,
      }
    }
    
    const product = await response.json()
    return {
      product,
      status: 200,
    }
  } catch (err) {
    console.error("Error fetching product:", err)
    return {
      errorMessage: "An unexpected error occurred. Please try again.",
      status: 500,
    }
  }
}