import "server-only";
import { prisma } from "@/app/lib/prisma";

export async function getPendingFriendRequests(userId: string) {
  return prisma.friendRequest.findMany({
    where: { receiverId: userId },
    select: {
      requesterId: true,
      receiverId: true,
      createdAt: true,
      requester: { select: { username: true, image: true } },
    },
    orderBy: { createdAt: "desc" },
  });
}
