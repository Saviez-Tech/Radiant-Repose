"use server"

import { cookies } from "next/headers";
import { ProductFormValues } from "./schemas/addProduct.schema";
import { revalidatePath } from "next/cache";
import { handleApiError } from "./lib/helperFns/handleApiErrors";

type FetchProductResult = {
  product?: ScannedProduct;
  errorMessage?: string;
  status?: number;
}

export const fetchProductByBarcodeAction = async (
  barcode: string
): Promise<FetchProductResult> => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/barcode/${barcode}`)
    
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


export async function LoginHandler(email: string, password: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: email, password })
    })

    
    if (!response.ok) {
      console.log(response)
      let errorMessage;
      errorMessage = response.status === 401 || response.status === 404
        ? "Invalid credentials. Please try again."
        : "Failed to login. Please check your network or try again later.";
      throw new Error(errorMessage)
    }

    const data = await response.json()
    
    const { id, username, group, auth_token } = data;
    
    if (!auth_token) {
      throw new Error("Authentication token not received from server.")
    }
    
    const userData = JSON.stringify({ id, username, group, auth_token })
    
    // Set auth token in cookies for 24 hours
    const cookieStore = await cookies()
     cookieStore.set("user_session", userData, {
      maxAge: 60 * 60 * 24 
    })
    
    return { id, username, group, success: true }
  } catch (error) {
    console.error("Login error:", error)

    if (error instanceof Error) {
      throw new Error(error.message)
    }
    throw new Error("An unexpected error occurred.")
  }
}


interface BackendProductPayload {
  name: string;
  image: File | null;
  category: string;
  description: string;
  price: string;
  stock_quantity: number;
  barcode: string;
  branch: number
}

export async function addProductHandler(productDetails: ProductFormValues) {
  try {

    // Transform the form values to match the expected backend structure
    const transformedData: BackendProductPayload = {
      name: productDetails.productName,
      image: productDetails.image || null,
      category: productDetails.category,
      description: productDetails.description,
      price: productDetails.unitPrice,
      stock_quantity: parseInt(productDetails.quantityInStock, 10),
      barcode: productDetails.barcode,
      branch: 1
    }

    // Create a new FormData instance
    const formData = new FormData()
    
    // Add each field to the FormData
    Object.entries(transformedData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (key === 'stock_quantity') {
          formData.append(key, value.toString())
        } else {
          formData.append(key, value)
        }
      }
    })

    const cookieStore = await cookies()
    const cookieValue = cookieStore.get("user_session")?.value;
    const { auth_token } = cookieValue ? JSON.parse(cookieValue) : "";

    console.log(auth_token)
    const response = await fetch(`https://radiantrepose-backend.onrender.com/api/admin/products/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${auth_token}`,
      },
      body: formData,
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(handleApiError(errorData))
    }

    const data = await response.json()
    
    revalidatePath('/admin/product-management/luxury-collection')
    
    return { success: true, data }

  } catch (error) {
    console.log(error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unknown error occurred' 
    }
  }
}