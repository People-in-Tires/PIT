"use server";

import * as z from "zod";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { ALLOWED_AVATARS } from "@/app/lib/avatars";

export async function updateAvatar(file: string): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  const parsed = z.enum(ALLOWED_AVATARS).safeParse(file);
  if (!parsed.success) return { error: "Invalid avatar." };

  await prisma.user.update({
    where: { id: session.user.id },
    data: { image: parsed.data },
  });
  return {};
}
