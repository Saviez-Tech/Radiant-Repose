import { z } from "zod";

export const SpaCheckoutSchema = z.object({
      full_name: z.string().min(1, "Full name is required"),
      phone: z.string().min(1, "Phone number is required"),
      date:z.string().min(1, "Date is required"),
      time: z.string().min(1, "Time is required"),
      note: z.string().min(1, "Note is required"),
      scheduling: z.string().min(1, "Scheduling is required"),
})

export type SpaCheckoutFormValues = z.infer<typeof SpaCheckoutSchema>;