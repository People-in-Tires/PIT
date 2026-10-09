// A small match history between the test users.
// Results are listed in finishing order: the first finisher gets placement 1 (winner).
// A result with `dnf: true` (did not finish) gets placement null.

import type { PrismaClient } from "../../generated/prisma";
import type { UserIds } from "./users";

const DAY = 24 * 60 * 60 * 1000;
const MINUTE = 60 * 1000;

type SeedResult = {
  user: string;
  dnf?: boolean;
  pitStops: number;
  perfectPitStops: number;
  fastestPitStop: number | null; // milliseconds, null = no pit stop made
  crashes: number;
};

type SeedMatch = {
  daysAgo: number;
  durationMinutes: number;
  results: SeedResult[];
};

const matches: SeedMatch[] = [
  {
    daysAgo: 10,
    durationMinutes: 6,
    results: [
      { user: "alice", pitStops: 3, perfectPitStops: 2, fastestPitStop: 1870, crashes: 0 },
      { user: "bob", pitStops: 3, perfectPitStops: 1, fastestPitStop: 2240, crashes: 1 },
      { user: "charlie", pitStops: 2, perfectPitStops: 1, fastestPitStop: 2300, crashes: 0 },
    ],
  },
  {
    daysAgo: 9,
    durationMinutes: 4,
    results: [
      { user: "bob", pitStops: 2, perfectPitStops: 1, fastestPitStop: 2150, crashes: 0 },
      { user: "alice", pitStops: 2, perfectPitStops: 1, fastestPitStop: 1990, crashes: 1 },
    ],
  },
  {
    daysAgo: 7,
    durationMinutes: 9,
    results: [
      { user: "charlie", pitStops: 3, perfectPitStops: 2, fastestPitStop: 2050, crashes: 0 },
      { user: "dana", pitStops: 3, perfectPitStops: 2, fastestPitStop: 1950, crashes: 0 },
      { user: "alice", pitStops: 2, perfectPitStops: 1, fastestPitStop: 2100, crashes: 1 },
      { user: "eve", pitStops: 2, perfectPitStops: 0, fastestPitStop: 2600, crashes: 3 },
      { user: "bob", pitStops: 2, perfectPitStops: 0, fastestPitStop: 2500, crashes: 2 },
    ],
  },
  {
    daysAgo: 5,
    durationMinutes: 7,
    results: [
      { user: "alice", pitStops: 3, perfectPitStops: 3, fastestPitStop: 1920, crashes: 0 },
      { user: "eve", pitStops: 2, perfectPitStops: 1, fastestPitStop: 2410, crashes: 2 },
      { user: "dana", pitStops: 2, perfectPitStops: 1, fastestPitStop: 2200, crashes: 1 },
    ],
  },
  {
    daysAgo: 3,
    durationMinutes: 8,
    results: [
      { user: "dana", pitStops: 3, perfectPitStops: 2, fastestPitStop: 1980, crashes: 0 },
      { user: "alice", pitStops: 3, perfectPitStops: 1, fastestPitStop: 2050, crashes: 0 },
      { user: "charlie", pitStops: 2, perfectPitStops: 1, fastestPitStop: 2150, crashes: 1 },
      { user: "bob", pitStops: 2, perfectPitStops: 1, fastestPitStop: 2300, crashes: 1 },
    ],
  },
  {
    daysAgo: 2,
    durationMinutes: 5,
    results: [
      { user: "eve", pitStops: 2, perfectPitStops: 1, fastestPitStop: 2450, crashes: 1 },
      { user: "bob", pitStops: 2, perfectPitStops: 0, fastestPitStop: 2700, crashes: 2 },
    ],
  },
  {
    daysAgo: 1,
    durationMinutes: 10,
    results: [
      { user: "alice", pitStops: 3, perfectPitStops: 2, fastestPitStop: 1880, crashes: 0 },
      { user: "charlie", pitStops: 3, perfectPitStops: 1, fastestPitStop: 2100, crashes: 0 },
      { user: "dana", pitStops: 2, perfectPitStops: 1, fastestPitStop: 2250, crashes: 1 },
      { user: "bob", pitStops: 2, perfectPitStops: 1, fastestPitStop: 2350, crashes: 0 },
      // eve crashed out before her first pit stop
      { user: "eve", dnf: true, pitStops: 0, perfectPitStops: 0, fastestPitStop: null, crashes: 4 },
    ],
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
    const finishedAt = new Date(startedAt.getTime() + m.durationMinutes * MINUTE);

    // Placements count finishers only: a DNF doesn't take up a place.
    let nextPlacement = 1;

    await prisma.match.create({
      data: {
        startedAt,
        finishedAt,
        players: {
          create: m.results.map(({ user, dnf, ...stats }) => ({
            userId: idOf(ids, user),
            placement: dnf ? null : nextPlacement++,
            ...stats,
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
