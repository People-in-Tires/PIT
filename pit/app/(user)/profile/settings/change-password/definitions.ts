import * as z from "zod";
import { passwordField } from "@/app/lib/password";

export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, { error: "Please enter your current password. " }),
    password: passwordField,
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    error: "Passwords do not match! ",
    path: ["password2"],
  })
  .refine((data) => data.password !== data.currentPassword, {
    error: "New password must be different from your current password. ",
    path: ["password"],
  });

export type ChangePasswordState =
  | {
      errors?: {
        currentPassword?: string[];
        password?: string[];
        password2?: string[];
      };
      message?: string;
      success?: boolean;
      timestamp?: number;
    }
  | undefined;
