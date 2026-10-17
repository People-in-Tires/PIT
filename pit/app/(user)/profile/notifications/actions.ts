"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function acceptFriendRequest(requesterId: string) {
  const session = await auth();
  const me = session?.user?.id;
  if (!me) return;

  await prisma.$transaction([
    prisma.friendRequest.delete({
      where: { requesterId_receiverId: { requesterId, receiverId: me } },
    }),
    prisma.friend.create({ data: { userId: me, friendId: requesterId } }),
    prisma.friend.create({ data: { userId: requesterId, friendId: me } }),
  ]);

  revalidatePath("/profile");
}

export async function declineFriendRequest(requesterId: string) {
  const session = await auth();
  const me = session?.user?.id;
  if (!me) return;

  await prisma.friendRequest.delete({
    where: { requesterId_receiverId: { requesterId, receiverId: me } },
  });

  revalidatePath("/profile");
}
