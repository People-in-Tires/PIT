"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function acceptFriendRequest(
  requesterId: string,
  receiverId: string,
) {
  const session = await auth();
  if (!session?.user?.id || session.user.id !== receiverId ) return;

  await prisma.$transaction([
    prisma.friendRequest.delete({
      where: { requesterId_receiverId: { requesterId, receiverId } },
    }),
    prisma.friend.create({
      data: { userId: receiverId, friendId: requesterId },
    }),
    prisma.friend.create({
      data: { userId: requesterId, friendId: receiverId },
    }),
  ]);

  revalidatePath("/profile");
}

export async function declineFriendRequest(
  requesterId: string,
  receiverId: string,
) {
  const session = await auth();
  if (!session?.user?.id || session.user.id !== receiverId ) return;

  await prisma.friendRequest.delete({
    where: { requesterId_receiverId: { requesterId, receiverId } },
  });

  revalidatePath("/profile");
}
