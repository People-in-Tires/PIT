// Statistics per test user.
// Match numbers are calculated from the match history in the database,
// so they always agree with what the match history screen shows.
// Pit stop numbers aren't stored per match, so those are fixed values.

import type { PrismaClient } from "../../generated/prisma";
import type { UserIds } from "./users";

type PitStopStats = {
  totalPitStops: number;
  perfectPitStops: number;
  fastestPitStopTime: number; // milliseconds
  totalCrashes: number;
};

const pitStops: Record<string, PitStopStats> = {
  alice: {
    totalPitStops: 48,
    perfectPitStops: 21,
    fastestPitStopTime: 1870,
    totalCrashes: 3,
  },
  bob: {
    totalPitStops: 44,
    perfectPitStops: 12,
    fastestPitStopTime: 2240,
    totalCrashes: 7,
  },
  charlie: {
    totalPitStops: 30,
    perfectPitStops: 9,
    fastestPitStopTime: 2050,
    totalCrashes: 4,
  },
  dana: {
    totalPitStops: 28,
    perfectPitStops: 14,
    fastestPitStopTime: 1950,
    totalCrashes: 2,
  },
  eve: {
    totalPitStops: 31,
    perfectPitStops: 8,
    fastestPitStopTime: 2410,
    totalCrashes: 11,
  },
};

export async function seedStatistics(prisma: PrismaClient, ids: UserIds) {
  for (const [username, userId] of Object.entries(ids)) {
    const results = await prisma.matchPlayer.findMany({
      where: { userId },
      select: { placement: true },
    });

    const matchesPlayed = results.length;
    const wins = results.filter((r) => r.placement === 1).length;
    const losses = matchesPlayed - wins;

    const data = {
      matchesPlayed,
      wins,
      losses,
      ...(pitStops[username] ?? {}),
    };

    // Statistics are derived data, so `update` overwrites them:
    // the database always matches the current match history.
    await prisma.statistics.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data },
    });
  }

  console.log("Seeded statistics");
}
