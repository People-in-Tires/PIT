"use server";

import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function removeFriend(friendId: string) {
  const session = await auth();
  const me = session?.user?.id;
  if(!me) return;

  await prisma.friend.deleteMany({
    where: {
      OR: [
        { userId: me, friendId: friendId },
        { userId: friendId, friendId: me },
      ],
    },
  });

  revalidatePath("/profile");
}