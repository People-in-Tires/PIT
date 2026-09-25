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
  .date({ error: "Please enter a valid date. " }) // valideert 'YYYY-MM-DD'
  .refine((val) => new Date(val) <= new Date(), {
    error: "Birthday cannot be in the future. ",
  })
  .refine(
    (val) => new Date().getFullYear() - new Date(val).getFullYear() >= 13,
    { error: "You must be at least 13 years old. " },
  );
const countryField = z.enum(countryCodes, {
  error: "Please select a valid country.",
});
const question1Field = z
  .string()
  .min(5, { error: "Question must be at least 5 characters." })
  .max(100, { error: "Question is too long, must be under 100 characters." })
  .trim()
  .transform((val) => {
    const lower = val.toLowerCase();
    const capitalized = lower.charAt(0).toUpperCase() + lower.slice(1);
    return capitalized.endsWith("?") ? capitalized : `${capitalized}?`;
  });
const question2Field = z
  .string()
  .min(5, { error: "Question must be at least 5 characters." })
  .max(100, { error: "Question is too long, must be under 100 characters." })
  .trim()
  .transform((val) => {
    const lower = val.toLowerCase();
    const capitalized = lower.charAt(0).toUpperCase() + lower.slice(1);
    return capitalized.endsWith("?") ? capitalized : `${capitalized}?`;
  });
const answer1Field = z
  .string()
  .min(2, { error: "Answer must be at least 2 characters." })
  .max(50, { error: "Answer is too long, must be under 50 characters." })
  .trim()
  .toLowerCase();
const answer2Field = z
  .string()
  .min(2, { error: "Answer must be at least 2 characters." })
  .max(50, { error: "Answer is too long, must be under 50 characters." })
  .trim()
  .toLowerCase();

export const CreateFormSchema = z
  .object({
    username: usernameField,
    name: nameField,
    birthday: birthdayField,
    country: countryField,
    question1: question1Field,
    question2: question2Field,
    answer1: answer1Field,
    answer2: answer2Field,
    email: z.email({ error: "Please enter a valid email. " }).trim(),
    password: passwordField,
    password2: z.string(),
  })
  .refine((data) => data.password == data.password2, {
    error: "Passwords do not match! ",
    path: ["password2"],
  })
  .refine((data) => data.question1 !== data.question2, {
    error: "Please choose two different questions. ",
    path: ["question2"],
  })
  .refine((data) => data.answer1 !== data.answer2, {
    error: "Please choose two different answers. ",
    path: ["answer2"],
  });

export const CompleteProfileSchema = z.object({
  username: usernameField,
  name: nameField,
  birthday: birthdayField,
  country: countryField,
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
        question1?: string[];
        question2?: string[];
        answer1?: string[];
        answer2?: string[];
      };
      values?: {
        username?: string;
        name?: string;
        birthday?: string;
        country?: string;
        email?: string;
        question1?: string;
        question2?: string;
        answer1?: string;
        answer2?: string;
      };
      message?: string;
      success?: string;
    }
  | undefined;
