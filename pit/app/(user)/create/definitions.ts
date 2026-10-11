import * as z from "zod"; //Zod is een schema validation library — je definieert ermee hoe data eruit hoort te zien (welke velden, welk type, welke regels), en Zod checkt of binnenkomende data daaraan voldoet.
import { countryCodes } from "@/app/lib/countries";
import { passwordField } from "@/app/lib/password";

const usernameField = z
  .string()
  .min(6, { error: "Username must be at least 6 characters long. " })
  .trim();
const nameField = z
  .string()
  .min(1, { error: "Full name is required. " })
  .max(30, { error: "Full name is too long. " })
  .regex(/^[\p{L}][\p{L}\s'-]*$/u, {
    error:
      "Full name can only contain letters, spaces, hyphens, and apostrophes. ",
  })
  .trim();
const birthdayField = z.iso
  .date({ error: "Please enter a valid date. ", abort: true })
  .refine(
    (val) => new Date().getFullYear() - new Date(val).getFullYear() >= 13,
    { error: "You must be at least 13 years old. " },
  );
const countryField = z.enum(countryCodes, {
  error: "Please select a valid country.",
});

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

export type CreateFormState =
  | {
      errors?: {
        username?: string[];
        name?: string[];
        birthday?: string[];
        country?: string[];
        email?: string[];
        password?: string[];
        password2?: string[];
      };
      values?: {
        username?: string;
        name?: string;
        day?: string;
        month?: string;
        year?: string;
        country?: string;
        email?: string;
      };
      message?: string;
      success?: string;
      timestamp?: number;
    }
  | undefined;
