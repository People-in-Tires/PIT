"use server";

import { auth, signOut } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function deleteProfile() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await prisma.user.delete({
    where: { id: session.user.id },
  });

  await signOut({ redirectTo: "/" });
}