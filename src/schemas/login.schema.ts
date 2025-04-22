import { z } from "zod";

export const loginSchema = z.object({
  phoneOrEmail: z
    .string()
    .nonempty({ message: "Enter your email or phone number" }),
  password: z
    .string()
})
  
export type LoginAccountFormData = z.infer<typeof loginSchema>