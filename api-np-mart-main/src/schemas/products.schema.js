import { z } from "zod"

export const ProductSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "The name field is required.",
    }),
    description: z.string({
      required_error: "The description field is required.",
    }),
    price: z.number({
      required_error: "The price field is required.",
    }),
    crossedPrice: z.number({
      required_error: "The crossedPrice field is required.",
    }),
    costPrice: z.number({
      required_error: "The costPrice field is required.",
    }),
    // slug: z.string({
    //   required_error: "The slug field is required.",
    // }),
    status: z.string({
      required_error: "The productStatus field is required.",
    }),
    media: z.array(
      z.string({
        required_error: "The media field is required.",
      })
    ),
    tags: z.array(
        z.string({
            required_error: "The tags field is required.",
          }),
    ),
    category: z.string({
      required_error: "The category field is required.",
    }),
  }),
})
