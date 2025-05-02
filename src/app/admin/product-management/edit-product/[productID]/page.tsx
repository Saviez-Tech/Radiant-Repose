import ProductForm from "@/components/dashboard/admin-dashboard-components/ProductForm";

// Default Values will be gotten from making a query to the database using the barcode from the URL
// to get the product details and then passing it to the ProductForm component as defaultValues.
export default async function Page({ params }:{ params: Promise<{productID: string }>}){

    const { productID } = (await (params));

    return (
        <main className="">
            <h1 className="text-xl font-medium text-primary-dark_gray my-4">Edit Product</h1>
            <ProductForm 
                productID={productID}
                formActionType="edit"
             />
        </main>
    )
}