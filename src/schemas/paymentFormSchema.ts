import { z } from "zod";

export const paymentFormSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  street_address: z.string().min(1, "Address is required"),
  zip_code: z.string().min(1, "Zip code is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  order: z.string().min(1, "Order is required"),
});

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;
