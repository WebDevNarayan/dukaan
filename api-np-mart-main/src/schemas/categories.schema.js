import { z } from "zod"

export const createCategorySchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: "The title field is required.",
      })
      .min(3)
      .max(50),
    parent: z.string().nullable(),
    image: z.string().nullable(),
  }),
})

export const updateCategorySchema = z.object({
  body: z.object({
    title: z.string().nullable(),
    parent: z.string().nullable(),
    image: z.string().nullable(),
  }),
})

