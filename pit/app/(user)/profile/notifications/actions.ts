"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function acceptFriendRequest(id: number) {
  const session = await auth();
  if (!session?.user?.id) return;

  await prisma.friendship.updateMany({
    where: { id, receiverId: session.user.id, status: "PENDING" },
    data: { status: "ACCEPTED", acceptedAt: new Date() },
  });

  revalidatePath("/profile");
}

export async function declineFriendRequest(id: number) {
  const session = await auth();
  if (!session?.user?.id) return;

  await prisma.friendship.deleteMany({
    where: { id, receiverId: session.user.id, status: "PENDING" },
  });

  revalidatePath("/profile");
}