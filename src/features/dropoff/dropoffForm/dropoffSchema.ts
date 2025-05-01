import { z } from "zod";

export const dropOffSchema = z.object({
  phone: z.string().regex(/^0\d{10}$/, {
    message: "Phone number must start with 0 and be exactly 11 digits",
  }),
  guardian: z.string().min(2, "Guardian name is required"),
  children: z
    .array(
      z.object({
        name: z.string().min(1, "Child name is required"),
        className: z.string().min(1, "Class is required"),
        hasBag: z.boolean(),
        note: z.string().optional(),
      })
    )
    .min(1, "At least one child is required"),
});

export type DropOffFormValues = z.infer<typeof dropOffSchema>;
