import { z } from "zod";

export const categorySchema = z.object({
    title: z
    .string({
        required_error: "Title is required"
    })
    .min(3, "Title should be alteast three character long"),
    parent: z.string().nullable(),
    image: z.string().nullable(),
})

