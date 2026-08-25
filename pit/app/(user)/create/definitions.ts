import * as z from "zod"; //Zod is een schema validation library — je definieert ermee hoe data eruit hoort te zien (welke velden, welk type, welke regels), en Zod checkt of binnenkomende data daaraan voldoet.
import { countryCodes } from "@/app/lib/countries";

export const CreateFormSchema = z
  .object({
    username: z
      .string()
      .min(6, { error: "Username must be at least 6 characters long. " })
      .trim(),
    firstname: z
      .string()
      .min(1, { error: "First name is required. " })
      .max(30, { error: "First name is too long. " })
      .regex(/^[\p{L}][\p{L}\s'-]*$/u, {
        error:
          "First name can only contain letters, spaces, hyphens, and apostrophes. ",
      })
      .trim(),
    lastname: z
      .string()
      .min(1, { error: "Last name is required. " })
      .max(30, { error: "Last name is too long. " })
      .regex(/^[\p{L}][\p{L}\s'-]*$/u, {
        error:
          "Last name can only contain letters, spaces, hyphens, and apostrophes. ",
      })
      .trim(),
    birthday: z.iso
      .date({ error: "Please enter a valid date. " }) // valideert 'YYYY-MM-DD'
      .refine((val) => new Date(val) <= new Date(), {
        error: "Birthday cannot be in the future. ",
      })
      .refine(
        (val) => {
          const age = new Date().getFullYear() - new Date(val).getFullYear();
          return age >= 13;
        },
        { error: "You must be at least 13 years old. " },
      ),
    country: z.enum(countryCodes, {
      error: "Please select a valid country. ",
    }),
    email: z.email({ error: "Please enter a valid email. " }).trim(),
    password: z
      .string()
      .min(8, { error: "Be at least 8 characters long" })
      .regex(/[a-zA-Z]/, { error: "Contain at least one letter. " })
      .regex(/[0-9]/, { error: "Contain at least one number. " })
      .regex(/[^a-zA-Z0-9]/, {
        error: "Contain at least one special character. ",
      })
      .trim(),
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
        firstname?: string[];
        lastname?: string[];
        birthday?: string[];
        country?: string[];
        email?: string[];
        password?: string[];
        password2?: string[];
      };
      values?: {
        username?: string;
        firstname?: string;
        lastname?: string;
        birthday?: string;
        country?: string;
        email?: string;
      };
      message?: string;
    }
  | undefined;
