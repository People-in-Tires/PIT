import * as z from "zod"; //Zod is een schema validation library — je definieert ermee hoe data eruit hoort te zien (welke velden, welk type, welke regels), en Zod checkt of binnenkomende data daaraan voldoet.

export const LoginFormSchema = z.object({
  login: z.string().trim().min(1),
  password: z.string().trim().min(1),
});

export type LoginFormState =
  | {
      message?: string;
      values?: { login: string };
      timestamp?: number;
    }
  | undefined;
