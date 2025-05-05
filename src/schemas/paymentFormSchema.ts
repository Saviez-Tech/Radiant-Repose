import { z } from "zod";

export const paymentFormSchema = z.object({
    cardNumber: z.string().min(1, "Card number is required"),
    cardName: z.string().min(1, "Card name is required"),
    expirationDate: z.string().min(1, "Expiration date is required"),
    cvv: z.string().min(1, "CVV is required"),
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    zipCode: z.string().min(1, "Zip code is required"),
})

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;