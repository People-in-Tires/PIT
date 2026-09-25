import * as z from "zod";

export const passwordField = z
  .string()
  .min(8, { error: "Be at least 8 characters long" })
  .regex(/[a-zA-Z]/, { error: "Contain at least one letter. " })
  .regex(/[0-9]/, { error: "Contain at least one number. " })
  .regex(/[^a-zA-Z0-9]/, {
    error: "Contain at least one special character. ",
  });