import * as z from 'zod'
 
const usernameRegex = /^[a-zA-Z0-9_.]+$/ // alleen letters, cijfers, underscore, punt

export const LoginFormSchema = z.object({
  login: z
    .string()
    .min(2, { error: 'Login must be at least 2 characters long.' })
    .trim(),
	.refine(
      (value) => z.email().safeParse(value).success || usernameRegex.test(value),
      { error: 'Please enter a valid username or email.' }
    ),
  password: z
    .string()
    .min(8, { error: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { error: 'Contain at least one letter.' })
    .regex(/[0-9]/, { error: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, { error: 'Contain at least one special character.' })
    .trim(),
})
 
export type FormState =
  | {
      errors?: {
        login?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined