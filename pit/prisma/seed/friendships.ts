// Friends and open friend requests between the test users. Needs the user ids from seedUsers.

import type { PrismaClient } from "../../generated/prisma";
import type { UserIds } from "./users";

export async function seedFriendships(prisma: PrismaClient, ids: UserIds) {
  // alice <-> bob: already friends
  await makeFriends(prisma, ids.alice, ids.bob);

  // charlie -> alice: open request, so alice sees it in her notification bell
  await prisma.friendRequest.upsert({
    where: {
      requesterId_receiverId: {
        requesterId: ids.charlie,
        receiverId: ids.alice,
      },
    },
    update: {},
    create: { requesterId: ids.charlie, receiverId: ids.alice },
  });
}

// A friendship is stored as two rows (a -> b and b -> a),
// so "my friends" is simply: friend.findMany({ where: { userId: me } }).
// If your accept-action stores only ONE row, remove the second upsert here.
async function makeFriends(prisma: PrismaClient, a: string, b: string) {
  for (const [userId, friendId] of [
    [a, b],
    [b, a],
  ]) {
    await prisma.friend.upsert({
      where: { userId_friendId: { userId, friendId } },
      update: {},
      create: { userId, friendId },
    });
  }
}
