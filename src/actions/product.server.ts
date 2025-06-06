"use server"

import { getUserSession } from "@/lib/helperFns/getUserSession";
import { handleApiError } from "@/lib/helperFns/handleApiErrors";
import { EditProductFormValues, ProductFormValues } from "@/schemas/addProduct.schema";
import { revalidatePath } from "next/cache";


type FetchProductResult = {
  products?: ScannedProduct[];
  errorMessage?: string;
  status?: number;
}
  
export const fetchProductAction = async (searchValue: string, productSection: "spa" | "luxury"): Promise<FetchProductResult> => {
  try {
    
    const response = 
    productSection === "luxury" ? 
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/worker/products/search/?search=${searchValue}`,{
      method: "GET",
      headers: {
        'Authorization': `Token ${await getUserSession()}`,
      },
    }) 
    :
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/worker/spa/product/?search=${searchValue}`,{
      method: "GET",
      headers: {
        'Authorization': `Token ${await getUserSession()}`,
      },
    })

    
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
    
    const data = (await response.json())


    return {
      products: (data && typeof data === "object" && data.length) ? data : [],
      status: 200,
    }
  } catch (err) {
    console.error("Error fetching product:", err)
    return {
      products: [],
      errorMessage: "An unexpected error occurred. Please try again.",
      status: 500,
    }
  }
}
  


// ADD PRODUCT
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
  
export async function addProductHandler(productDetails: ProductFormValues | EditProductFormValues) {
  try {

    // Transform the form values to match the expected backend structure
    const transformedData: BackendProductPayload = {
      name: productDetails.productName,
      price: productDetails.unitPrice,
      // For properties that only exist on ProductFormValues, check if they exist
      image: "image" in productDetails ? productDetails.image || null : null,
      category: "category" in productDetails ? productDetails.category : "",
      description: "description" in productDetails ? productDetails.description : "",
      stock_quantity: "quantityInStock" in productDetails ? parseInt(productDetails.quantityInStock, 10) : 0,
      barcode: "barcode" in productDetails ? productDetails.barcode : "",
      branch: "branch" in productDetails ? parseInt(productDetails.branch) : 1,
    }

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

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${await getUserSession()}`,
      },
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(handleApiError(data))
    }

    
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



export async function editProductHandler(productDetails: ProductFormValues | EditProductFormValues, productId: string) {
  if (!productId) {
    return {
      success: false,
      error: "Invalid Product ID"
    }
  }

  try {
    const auth_token = await getUserSession()

    const formData = new FormData()

    // Only append fields if they have values
    if (productDetails.productName) formData.append("name", productDetails.productName)
    if (productDetails.image) formData.append("image", productDetails.image)
    if (productDetails.unitPrice) formData.append("price", productDetails.unitPrice.toString())
    if (productDetails.quantityInStock) {
      const stockQuantity = parseInt(productDetails.quantityInStock, 10)
      formData.append("stock_quantity", String(stockQuantity))
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${productId}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${auth_token}`,
      },
      body: formData
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(handleApiError(errorData))
    }

    const data = await response.json()

    // Revalidate product management page
    revalidatePath("/admin/product-management/luxury-collection")

    return {
      success: true,
      data
    }
  } catch (error) {
    console.error("Error editing product:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred"
    }
  }
}




export async function deleteProductHandler(productId: string) {
  if (!productId) {
    return {
      success: false,
      error: "Invalid Product ID"
    }
  }

  try {
    const auth_token = await getUserSession()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/products/${productId}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${auth_token}`,
      }
    })

    if (!response.ok) {
      console.log(response)
      const errorData = await response.json()
      throw new Error(handleApiError(errorData))
    }

    // Revalidate product management page
    revalidatePath("/admin/product-management/luxury-collection")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error deleting product:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred"
    }
  }
}




export async function addSaleHandler(saleDetails: SalePayload, addSaleFor?: "luxury" | "spa") {
  try {
    const auth_token = await getUserSession()

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/worker/${addSaleFor === "spa" ? "spa/sales" : "sales"}/`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${auth_token}`,
      },
      body: JSON.stringify(saleDetails)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(handleApiError(errorData))
    }
    return {
      success: true,
      data: (await response.json())
    }
  } catch (error) {
    console.error("Error completing purchase", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred"
    }
  }
}



export async function fulFillSaleHandler(orderID: string){
  try {
    const auth_token = await getUserSession()

    if (!orderID) {
      return {
        success: false,
        error: "Invalid Order ID"
      }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/ecommerce/buyers/${orderID}/fulfill-orders/`, {
      method: "PATCH",
      headers: {
        Authorization: `Token ${auth_token}`,
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(handleApiError(errorData))
    }

    return {
      success: true
    }
  } catch (error) {
    console.error("Error clearing sale", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred"
    }
  }
}