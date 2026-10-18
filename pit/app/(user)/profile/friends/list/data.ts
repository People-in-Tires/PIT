import "server-only";
import { prisma } from "@/app/lib/prisma";
import { isOnline } from "@/app/lib/online/online";

export async function getFriends(userId: string) {
  const list = await prisma.friend.findMany({
    where: { userId },
    select: {
      friend: {
        select: { id: true, username: true, image: true, lastSeenAt: true },
      },
    },
    orderBy: { since: "desc" },
  });

  return list
    .map((row) => ({ ...row.friend, online: isOnline(row.friend.lastSeenAt) }))
    .sort((a, b) => Number(b.online) - Number(a.online));
}
