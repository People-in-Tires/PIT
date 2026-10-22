import * as z from "zod";

export const AddFriendSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(1, { error: "Please enter a username or email. " })
    .max(254, { error: "That's too long to be a username or email. " }),
});

export type AddFriendState =
  | {
      errors?: { identifier?: string[] };
      values?: { identifier?: string };
      message?: string;
      success?: string;
      timestamp?: number;
    }
  | undefined;
