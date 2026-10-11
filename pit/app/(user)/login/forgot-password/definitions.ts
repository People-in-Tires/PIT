import * as z from "zod";

export const ForgotPasswordFormSchema = z.object({
  login: z.string().trim(),
});

export type ForgotPasswordFormState =
  | {
      step: "login" | "code" | "password" | "done";
      message?: string;
      login?: string;
      code?: string;
    }
  | undefined;
