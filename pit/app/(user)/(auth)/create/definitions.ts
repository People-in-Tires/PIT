import * as z from "zod";
import { passwordField } from "@/app/lib/password";
import { birthdayField, countryField, nameField, usernameField } from "@/app/lib/user-fields";

export const CreateFormSchema = z
  .object({
    username: usernameField,
    name: nameField,
    birthday: birthdayField,
    country: countryField,
    email: z
      .email({ error: "Please enter a valid email. " })
      .trim()
      .toLowerCase(),
    password: passwordField,
    password2: z.string(),
  })
  .refine((data) => data.password == data.password2, {
    error: "Passwords do not match! ",
    path: ["password2"],
  });

type CreateFormFields = z.infer<typeof CreateFormSchema>;

export type CreateFormValues = {
  username: string;
  name: string;
  day: string;
  month: string;
  year: string;
  country: string;
  email: string;
};

export type CreateFormState =
  | {
      errors?: Partial<Record<keyof CreateFormFields, string[]>>;
      values?: CreateFormValues;
      message?: string;
      success?: string;
      timestamp?: number;
    }
  | undefined;
