import { z } from "zod";

export const messageSchema = z.object({
  content: z.string().trim().min(1, "Message can't be empty").max(500),
});

export type ChatFormState = { message: string; timestamp?: number } | undefined;

export type ChatMessage = {
  id: string;
  content: string;
  createdAt: Date;
  user: { username: string | null; image: string | null };
};
