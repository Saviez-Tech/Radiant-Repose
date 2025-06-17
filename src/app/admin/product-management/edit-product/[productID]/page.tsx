import ProductForm from "@/components/dashboard/admin-dashboard-components/ProductForm";

// Default Values will be gotten from making a query to the database using the barcode from the URL
// to get the product details and then passing it to the ProductForm component as defaultValues.

interface IProps {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>,
    params: Promise<{productID: string }>
}

export default async function Page({ params, searchParams }: IProps){

    const { productID } = (await (params))
    const { branch } = (await (searchParams))

    return (
        <main className="w-full pt-10">
            <h1 className="text-xl font-medium text-primary-dark_gray my-4">Edit Product</h1>
            <ProductForm 
                productID={productID}
                branch={branch as string}
                formActionType="edit"
             />
        </main>
    )
}