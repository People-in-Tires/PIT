import * as z from "zod"; //Zod is een schema validation library — je definieert ermee hoe data eruit hoort te zien (welke velden, welk type, welke regels), en Zod checkt of binnenkomende data daaraan voldoet.

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

export const CreateFormSchema = z.object({
  username: usernameField,
  name: nameField,
  email: z.email({ error: "Please enter a valid email. " }).trim(),
});

export const CompleteProfileSchema = z.object({
  username: usernameField,
  name: nameField,
});

export type CreateFormState =
  | {
      errors?: {
        username?: string[];
        name?: string[];
        email?: string[];
      };
      values?: {
        username?: string;
        name?: string;
        email?: string;
      };
      message?: string;
      success?: string;
    }
  | undefined;
