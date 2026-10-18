// Friends and open friend requests between the test users. Needs the user ids from seedUsers.

import type { PrismaClient } from "../../generated/prisma";
import { idOf, type UserIds } from "./users";

// Pairs of usernames that are friends. Order within a pair doesn't matter.
const friendships: [string, string][] = [
  // The main test account has a full friends list.
  ["PitQueen_99", "Lugnut_Larry"],
  ["PitQueen_99", "Turbo_Tina42"],
  ["PitQueen_99", "TyreWhisperer"],
  ["PitQueen_99", "Box_Box_Box"],
  ["PitQueen_99", "Undercut_Uma"],
  ["PitQueen_99", "Hairpin_Hana"],
  ["PitQueen_99", "ChequeredFlo"],
  ["PitQueen_99", "DRS_Dennis"],
  // A network between the other users.
  ["Lugnut_Larry", "WheelGun.Wendy"],
  ["Lugnut_Larry", "Slick_Rick"],
  ["WheelGun.Wendy", "Crash-Bandit"],
  ["Turbo_Tina42", "TyreWhisperer"],
  ["Turbo_Tina42", "Fuel4Speed"],
  ["Crash-Bandit", "GridGhost_3"],
  ["Jackman_07", "Torque_Tom88"],
  ["TyreWhisperer", "Undercut_Uma"],
  ["Slick_Rick", "SafetyCar_Sam"],
  ["DRS_Dennis", "Kerb-Crawler"],
  ["Box_Box_Box", "Apex_Ava"],
  ["Pitlane.Pete", "SafetyCar_Sam"],
  ["Hairpin_Hana", "Apex_Ava"],
  ["ChequeredFlo", "Torque_Tom88"],
];

// Open requests: [from, to].
const requests: [string, string][] = [
  // Incoming for the main account: fills the notification bell.
  ["WheelGun.Wendy", "PitQueen_99"],
  ["Jackman_07", "PitQueen_99"],
  ["Kerb-Crawler", "PitQueen_99"],
  ["Apex_Ava", "PitQueen_99"],
  // Sent by the main account, still waiting for an answer.
  ["PitQueen_99", "Fuel4Speed"],
  ["PitQueen_99", "SafetyCar_Sam"],
  // Between other users.
  ["Crash-Bandit", "Lugnut_Larry"],
  ["GridGhost_3", "Pitlane.Pete"],
  ["Slick_Rick", "Hairpin_Hana"],
];

export async function seedFriendships(prisma: PrismaClient, ids: UserIds) {
  checkConsistency();

  for (const [a, b] of friendships) {
    await makeFriends(prisma, idOf(ids, a), idOf(ids, b));
  }

  for (const [from, to] of requests) {
    const requesterId = idOf(ids, from);
    const receiverId = idOf(ids, to);
    await prisma.friendRequest.upsert({
      where: { requesterId_receiverId: { requesterId, receiverId } },
      update: {},
      create: { requesterId, receiverId },
    });
  }
}

// A friendship is stored as two rows (a -> b and b -> a),
// so "my friends" is simply: friend.findMany({ where: { userId: me } }).
// If your accept-action stores only ONE row, remove the second direction here.
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

// Catches data the app itself would never produce:
// a request between people who are already friends, or requests in both directions
// (your app auto-accepts that case).
function checkConsistency() {
  const pairKey = (a: string, b: string) => [a, b].sort().join("|");
  const friendKeys = new Set(friendships.map(([a, b]) => pairKey(a, b)));
  const requestKeys = new Set<string>();

  for (const [from, to] of requests) {
    const key = pairKey(from, to);
    if (friendKeys.has(key)) {
      throw new Error(
        `Seed: ${from} -> ${to} is a request, but they're already friends`,
      );
    }
    if (requestKeys.has(key)) {
      throw new Error(
        `Seed: ${from} and ${to} have requests in both directions`,
      );
    }
    requestKeys.add(key);
  }
}
