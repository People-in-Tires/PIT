// Gives test users the achievements they've actually earned,
// based on their match history in the database.
// Some achievements stay locked for everyone, so you can test the "locked" look too.

import type { PrismaClient } from "../../generated/prisma";
import type { UserIds } from "./users";

// Everything the rules need to know about one player, summed over all their matches.
type PlayerTotals = {
  matchesPlayed: number;
  wins: number;
  podiums: number;
  perfectPitStops: number;
  fastestPitStop: number | null; // milliseconds, null = never made a pit stop
  crashes: number;
  largestMatch: number; // most players in any match they played
};

// One rule per achievement name. Names must match achievements.ts exactly.
const rules: { name: string; earned: (p: PlayerTotals) => boolean }[] = [
  { name: "Rookie", earned: (p) => p.matchesPlayed >= 1 },
  { name: "Champagne!", earned: (p) => p.wins >= 1 },
  { name: "Podium Crew", earned: (p) => p.podiums >= 1 },
  { name: "Perfect Stop", earned: (p) => p.perfectPitStops >= 1 },
  { name: "Wheel Gun Wizard", earned: (p) => p.perfectPitStops >= 50 },
  { name: "Sub-2 Club", earned: (p) => p.fastestPitStop !== null && p.fastestPitStop < 2000 },
  { name: "Veteran", earned: (p) => p.matchesPlayed >= 25 },
  { name: "Full Grid", earned: (p) => p.largestMatch >= 12 },
  { name: "Crash Test Dummy", earned: (p) => p.crashes >= 10 },
];

async function getPlayerTotals(prisma: PrismaClient, userId: string): Promise<PlayerTotals> {
  // aggregate lets the database do the counting and summing in one query.
  const totals = await prisma.matchPlayer.aggregate({
    where: { userId },
    _count: true,
    _sum: { perfectPitStops: true, crashes: true },
    _min: { fastestPitStop: true }, // min ignores nulls
  });

  const wins = await prisma.matchPlayer.count({ where: { userId, placement: 1 } });
  // `lte` never matches null, so a DNF doesn't count as a podium.
  const podiums = await prisma.matchPlayer.count({ where: { userId, placement: { lte: 3 } } });

  const played = await prisma.matchPlayer.findMany({
    where: { userId },
    select: { match: { select: { _count: { select: { players: true } } } } },
  });

  return {
    matchesPlayed: totals._count,
    wins,
    podiums,
    // _sum is null when there are no rows to add up
    perfectPitStops: totals._sum.perfectPitStops ?? 0,
    crashes: totals._sum.crashes ?? 0,
    fastestPitStop: totals._min.fastestPitStop,
    largestMatch: Math.max(0, ...played.map((p) => p.match._count.players)),
  };
}

export async function seedUserAchievements(prisma: PrismaClient, ids: UserIds) {
  // Look up achievement ids by name once.
  const achievements = await prisma.achievement.findMany();
  const achievementId = new Map(achievements.map((a) => [a.name, a.id]));

  for (const userId of Object.values(ids)) {
    const totals = await getPlayerTotals(prisma, userId);

    for (const rule of rules) {
      if (!rule.earned(totals)) continue;

      const id = achievementId.get(rule.name);
      if (id === undefined) {
        throw new Error(`Seed: achievement "${rule.name}" not found. Check achievements.ts`);
      }

      await prisma.userAchievement.upsert({
        where: { achievementId_userId: { achievementId: id, userId } },
        update: {},
        create: { achievementId: id, userId },
      });
    }
  }
}
