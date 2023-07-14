import { z } from "zod";

export const orderSchema = z.object({
  name: z
    .string({
      required_error: "Name is required.",
    })
    .min(1, "Required"),
  country: z
    .string({
      required_error: "Country is required.",
    })
    .min(1, "Required"),
  state: z
    .string({
      required_error: "State is required.",
    })
    .min(1, "Required"),
  city: z.string().min(1, "Please include your city."),
  zip: z.string().min(1, "Please include your zip."),
  address1: z
    .string({
      required_error: "Address is required.",
    })
    .min(1, "Required"),
  contact: z.string().min(10, "The number must be 10"),
  // status: z.enum(['paid', 'unpaid']),
});
