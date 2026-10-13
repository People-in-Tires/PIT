import * as z from "zod"; //Zod is een schema validation library — je definieert ermee hoe data eruit hoort te zien (welke velden, welk type, welke regels), en Zod checkt of binnenkomende data daaraan voldoet.
import { countryCodes } from "@/app/lib/countries";
import { passwordField } from "@/app/lib/password";

const MIN_AGE = 13;

function getAge(birthday: string, today: Date = new Date()): number {
  const born = new Date(birthday);
  const years = today.getUTCFullYear() - born.getUTCFullYear();
  const hadBirthday =
    today.getUTCMonth() > born.getUTCMonth() ||
    (today.getUTCMonth() === born.getUTCMonth() &&
      today.getUTCDate() >= born.getUTCDate());

  return hadBirthday ? years : years - 1;
}

const usernameField = z
  .string()
  .trim()
  .min(6, { error: "Username must be at least 6 characters long. " })
  .max(30, { error: "Username can be at most 30 characters long. " });

const nameField = z
  .string()
  .trim()
  .min(1, { error: "Full name is required. " })
  .max(30, { error: "Full name is too long. " })
  .regex(/^[\p{L}][\p{L}\s'-]*$/u, {
    error:
      "Full name can only contain letters, spaces, hyphens, and apostrophes. ",
  });

  const birthdayField = z.iso
  .date({ error: "Please enter a valid date. ", abort: true })
  .refine((val) => getAge(val) >= MIN_AGE, {
    error: "You must be at least 13 years old. ",
  });

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