import { z } from "zod";

export const sellerFormSchema = z.object({
  brand: z.string().min(2, "Brand name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  returnPolicy: z.string().min(1, "Return policy is required"),
  minimumOrderQuantity: z
    .number()
    .min(1, "Minimum order quantity must be at least 1"),
});

export type SellerFormType = z.infer<typeof sellerFormSchema>;
