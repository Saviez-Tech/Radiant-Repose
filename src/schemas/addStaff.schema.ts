import { z } from "zod";

export const staffFormSchema = z.object({
    AssignedLocation: z.string().min(1, "Assigned location is required"),
    fullName: z.string().min(1, "Full name is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    emailOrUsername: z.string().min(1,"This field is required"),
    address: z.string().min(1,"Staff address is required"),
    staffPhoto: z.instanceof(File).optional(),
    password: z.string().min(1, "Password is required"),
    confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})
  
export type StaffFormValues = z.infer<typeof staffFormSchema>


export const staffEditFormSchema = z.object({
    AssignedLocation: z.string().optional(),
    fullName: z.string().optional(),
    phoneNumber: z.string().optional(),
    emailOrUsername: z.string().optional(),
    address: z.string().optional(),
    staffPhoto: z.instanceof(File).optional(),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
}).refine(
    // Only validate password match if either field is provided
    (data) => {
        // If both password fields are empty or undefined, validation passes
        if (!data.password && !data.confirmPassword) return true;
        // Otherwise, passwords must match
        return data.password === data.confirmPassword;
    },
    {
        message: "Passwords do not match",
        path: ["confirmPassword"]
    }
)

export type EditStaffFormValues = z.infer<typeof staffEditFormSchema>