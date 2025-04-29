import { z } from "zod";

export const productFormSchema = z.object({
  productSection: z.string().min(1, "Product section is required"),
  productName: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  barcode: z.string().min(1, "Barcode is required"),
  unitPrice: z.string().min(1, "Unit price is required"),
  quantityInStock: z.string().min(1, "Quantity is required"),
  description: z.string().min(1, "Description is required"),
  image: z.instanceof(File).optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const staffFormSchema = z.object({
  AssignedLocation: z.string().min(1, "Assigned location is required"),
  fullName: z.string().min(1, "Full name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  emailAddress: z.string().optional(),
  staffPhoto: z.instanceof(File).optional(),
  password: z.string().min(1, "Password is required"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
});

export type StaffFormValues = z.infer<typeof staffFormSchema>;
