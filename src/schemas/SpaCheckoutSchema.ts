import { z } from "zod";

// Step 1: Define known fields
const knownFields = z.object({
  full_name: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone number is required"),
  date: z.string().min(1, "Date is required").optional(),
  time: z.string().min(1, "Time is required").optional(),
  note: z.string().min(1, "Note is required").optional(),
  scheduling: z.string().min(1, "Scheduling is required"),
  services: z.string().min(1, "Select at least one service"),
});

// Step 2: Accept any string field with optional min(1)
export const SpaCheckoutSchema = knownFields
  .catchall(z.string().min(1).optional())
  .refine(
    (data) => {
      return Object.keys(data).every((key) => {
        // Allow known fields or keys ending in -date / -time
        return (
          knownFields.shape.hasOwnProperty(key) ||
          key.endsWith("-date") ||
          key.endsWith("-time")
        );
      });
    },
    {
      message:
        "Only keys ending in '-date' or '-time' are allowed in addition to known fields.",
    }
  );

export type SpaCheckoutFormValues = z.infer<typeof SpaCheckoutSchema> &
  Record<`${string}-date` | `${string}-time`, string>;
