"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function updateProfile(prevState: unknown, formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Not authenticated");
  }

  const username = formData.get("username") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  await prisma.user.update({
    where: { id: session.user.id },
    data: { username, name, email },
  });

  return { success: true, timestamp: Date.now() };
}
