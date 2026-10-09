// Friendships between the test users. Needs the user ids from seedUsers.

import { FriendshipStatus, type PrismaClient } from "../../generated/prisma";
import type { UserIds } from "./users";

export async function seedFriendships(prisma: PrismaClient, ids: UserIds) {
  // alice <-> bob: already friends
  await prisma.friendship.upsert({
    where: {
      requesterId_receiverId: { requesterId: ids.alice, receiverId: ids.bob },
    },
    update: {},
    create: {
      requesterId: ids.alice,
      receiverId: ids.bob,
      status: FriendshipStatus.ACCEPTED,
      acceptedAt: new Date(),
    },
  });

  // charlie -> alice: pending, so alice sees a request in her notification bell
  await prisma.friendship.upsert({
    where: {
      requesterId_receiverId: {
        requesterId: ids.charlie,
        receiverId: ids.alice,
      },
    },
    update: {},
    create: {
      requesterId: ids.charlie,
      receiverId: ids.alice,
      status: FriendshipStatus.PENDING,
    },
  });
}
