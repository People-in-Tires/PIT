import * as z from "zod";

export const ForgotPasswordFormSchema = z.object({
  login: z.string().trim(),
});

export type ForgotPasswordFormState =
  | {
      errors?: {
        login?: string[];
      };
      message?: string;
    }
  | undefined;
