import { passwordField } from "@/app/lib/password";
import * as z from "zod";

export const NewPasswordSchema = z
  .object({
    password: passwordField,
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    error: "Passwords do not match.",
    path: ["confirm"],
  });

export type ForgotPasswordStep = "login" | "code" | "password" | "done";

export type ForgotPasswordFormState =
  | {
      step: ForgotPasswordStep;
      message?: string;
      errors?: string[];
      login?: string;
      code?: string;
    }
  | undefined;
