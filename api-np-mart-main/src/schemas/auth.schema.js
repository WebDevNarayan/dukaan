import { z } from "zod"

export const registerSchema = z.object({
  body: z
    .object({
      name: z
        .string({
          required_error: "The name field is required.",
        })
        .min(3)
        .max(50),
      email: z
        .string({
          required_error: "The email field is required.",
        })
        .email(),
      password: z
        .string({
          required_error: "The password field is required.",
        })
        // .regex(
        //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        // )
        .min(6)
        .max(50),
      confirmPassword: z
        .string({
          required_error: "The confirm password field is required.",
        })
        .min(6)
        .max(50),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "The password and confirm password fields must match.",
      path: ["confirmPassword"],
    }),
})

export const loginSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "The email field is required.",
      })
      .email(),
    password: z.string({
      required_error: "The password field is required.",
    }),
  }),
})

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: "The email field is required.",
      })
      .email(),
  }),
})

export const resetPasswordSchema = z.object({
  body: z
    .object({
      resetToken: z.string({
        required_error: "The reset token field is required.",
      }),
      email: z.string({
        required_error: "The email field is required.",
      }),
      newPassword: z
        .string({
          required_error: "The new password field is required.",
        })
        .min(6)
        .max(50),
      confirmNewPassword: z.string({
        required_error: "The confirm new password field is required.",
      }),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: "The new password and confirm new password fields must match.",
      path: ["confirmNewPassword"],
    }),
})
