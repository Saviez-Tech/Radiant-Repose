import { z } from "zod";

export const productFormSchema = z.object({
  productSection: z.string().min(1, "Product section is required"),
  productName: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  barcode: z.string({
    required_error: "Barcode is required"
  }).min(5, "Barcode must be at least 5 characters"),
  unitPrice: z.string()
    .min(1, "Unit price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Price must contain only numbers (with optional decimal point)"),
  quantityInStock: z.string().min(1, "Quantity is required"),
  description: z.string().min(1, "Description is required"),
  image: z.instanceof(File).optional(),
})

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const editProductFormSchema = z.object({
  image: z.instanceof(File).optional(),
  productName: z.string().min(1, "Product name is required"),
  unitPrice: z.string()
    .min(1, "Unit price is required")
    .regex(/^\d+(\.\d{1,2})?$/, "Price must contain only numbers (with optional decimal point)"),
})

export type EditProductFormValues = z.infer<typeof editProductFormSchema>;

export const productFormSchemaWithParsedPrice = productFormSchema.transform((data) => ({
  ...data,
  unitPrice: data.unitPrice ? parseFloat(data.unitPrice) : 0,
}))