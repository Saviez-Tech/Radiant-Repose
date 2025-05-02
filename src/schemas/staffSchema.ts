import { z } from "zod";
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