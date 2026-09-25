"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { messageSchema, ChatFormState } from "./definitions";

export async function getMessages() {
  return prisma.message.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { user: { select: { username: true, image: true } } },
  });
}

export async function postMessage(
  _prevState: ChatFormState,
  formData: FormData
): Promise<ChatFormState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { message: "You must be logged in to chat." };
  }

  const parsed = messageSchema.safeParse({
    content: formData.get("content"),
  });
  if (!parsed.success) {
    return { message: parsed.error.issues[0].message };
  }

  await prisma.message.create({
    data: { content: parsed.data.content, userId: session.user.id },
  });

  return { message: "", timestamp: Date.now() };
}