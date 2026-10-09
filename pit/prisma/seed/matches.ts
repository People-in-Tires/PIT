// A small match history between the test users.
// Each match lists the usernames in finishing order: first = placement 1 (winner).

import type { PrismaClient } from "../../generated/prisma";
import type { UserIds } from "./users";

const DAY = 24 * 60 * 60 * 1000;
const MINUTE = 60 * 1000;

type SeedMatch = {
  daysAgo: number;
  durationMinutes: number;
  finishingOrder: string[];
};

const matches: SeedMatch[] = [
  {
    daysAgo: 10,
    durationMinutes: 6,
    finishingOrder: ["alice", "bob", "charlie"],
  },
  { daysAgo: 9, durationMinutes: 4, finishingOrder: ["bob", "alice"] },
  {
    daysAgo: 7,
    durationMinutes: 9,
    finishingOrder: ["charlie", "dana", "alice", "eve", "bob"],
  },
  { daysAgo: 5, durationMinutes: 7, finishingOrder: ["alice", "eve", "dana"] },
  {
    daysAgo: 3,
    durationMinutes: 8,
    finishingOrder: ["dana", "alice", "charlie", "bob"],
  },
  { daysAgo: 2, durationMinutes: 5, finishingOrder: ["eve", "bob"] },
  {
    daysAgo: 1,
    durationMinutes: 10,
    finishingOrder: ["alice", "charlie", "dana", "eve", "bob"],
  },
];

export async function seedMatches(prisma: PrismaClient, ids: UserIds) {
  // Match has no unique field besides its autoincrement id, so upsert isn't possible.
  // Instead: only seed when there are no matches yet, so running the seed twice
  // doesn't double the match history.
  const existing = await prisma.match.count();
  if (existing > 0) {
    console.log(`Skipped matches (${existing} already in database)`);
    return;
  }

  for (const m of matches) {
    const startedAt = new Date(Date.now() - m.daysAgo * DAY);
    const finishedAt = new Date(
      startedAt.getTime() + m.durationMinutes * MINUTE,
    );

    await prisma.match.create({
      data: {
        gameMode: "standard",
        startedAt,
        finishedAt,
        players: {
          create: m.finishingOrder.map((username, index) => ({
            userId: idOf(ids, username),
            placement: index + 1,
          })),
        },
      },
    });
  }

  console.log(`Seeded ${matches.length} matches`);
}

// Fails loudly on a typo in a username instead of inserting `undefined`.
function idOf(ids: UserIds, username: string): string {
  const id = ids[username];
  if (!id) throw new Error(`Seed: unknown username "${username}"`);
  return id;
}
