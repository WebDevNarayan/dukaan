import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string({
      required_error: "The name field is required",
    }),
    email: z
      .string({
        required_error: "The email field is required",
      })
      .email("The email field must be valid email address"),
    password: z
      .string({
        required_error: "The password field is required",
      })
      .min(6, "The password field must be at least 6 charcacter"),
    confirmPassword: z.string({
      required_error: "The password confirmation field is required",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "The password confirmation does not match",
    path: ["confirmPassword"],
  });

export const verifySchema = z.object({
  token: z
    .string({
      required_error: "The token field is required",
    })
    .length(6, "The token field must be 6 character"),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "The email field is required",
    })
    .email("The email field must be valid email address"),
  password: z
    .string({
      required_error: "The password field is required",
    })
    .min(1, "The password field is required"),
});


