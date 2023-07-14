import { z } from "zod"

export const ProductSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(1, "Name is required"),
  description: z
    .string({
      required_error: "Description is required",
    })
    .min(1, "Description is required"),
  price: z
    .number({
      required_error: "Price is required",
    })
    .min(1, "Price is required"),
  crossedPrice: z.number().nullable(),
  costPrice: z
    .number({
      required_error: "Cost price is required",
    })
    .min(1, "Cost price is required"),
  tags: z.string({
    required_error: "Tags are required",
  }),
  category: z.string({
    required_error: "Category is required",
  }),
  status: z.enum(["active", "draft"]),
  media: z.array(z.string()),
})
