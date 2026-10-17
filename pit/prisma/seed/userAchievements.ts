// Gives test users the achievements they've actually earned,
// based on their match history in the database.
// Some achievements stay locked for everyone, so you can test that too.

import type { PrismaClient } from "../../generated/prisma";
import type { AchievementKey } from "../../app/lib/achievements";
import type { UserIds } from "./users";

// Everything the rules need to know about one player, summed over all their matches.
type PlayerTotals = {
  matchesPlayed: number;
  wins: number;
  podiums: number;
  dnfs: number;
  pitStops: number;
  perfectPitStops: number;
  fastestPitStop: number | null; // milliseconds, null = never made a pit stop
  crashes: number;
};

// One rule per achievement. AchievementKey makes TypeScript check every key.
const rules: { key: AchievementKey; earned: (p: PlayerTotals) => boolean }[] = [
  { key: "first-race", earned: (p) => p.matchesPlayed >= 1 },
  { key: "first-podium", earned: (p) => p.podiums >= 1 },
  { key: "first-win", earned: (p) => p.wins >= 1 },
  { key: "gold-star", earned: (p) => p.matchesPlayed >= 10 },
  { key: "champion", earned: (p) => p.podiums >= 10 },
  { key: "races-25", earned: (p) => p.matchesPlayed >= 25 },
  { key: "wins-10", earned: (p) => p.wins >= 10 },
  { key: "wins-100", earned: (p) => p.matchesPlayed >= 100 },
  { key: "perfect-tire", earned: (p) => p.perfectPitStops >= 1 },
  {
    key: "sub-2-second-stop",
    earned: (p) => p.fastestPitStop !== null && p.fastestPitStop < 2000,
  },
  { key: "mechanic", earned: (p) => p.perfectPitStops >= 50 },
  { key: "garage", earned: (p) => p.pitStops >= 100 },
  { key: "dnf-survivor", earned: (p) => p.dnfs >= 1 },
  { key: "crash", earned: (p) => p.crashes >= 10 },
];

async function getPlayerTotals(prisma: PrismaClient, userId: string): Promise<PlayerTotals> {
  const [totals, wins, podiums, dnfs] = await Promise.all([
    prisma.matchPlayer.aggregate({
      where: { userId },
      _count: true,
      _sum: { pitStops: true, perfectPitStops: true, crashes: true },
      _min: { fastestPitStop: true }, // min ignores nulls
    }),
    prisma.matchPlayer.count({ where: { userId, placement: 1 } }),
    // `lte` never matches null, so a DNF doesn't count as a podium.
    prisma.matchPlayer.count({ where: { userId, placement: { lte: 3 } } }),
    prisma.matchPlayer.count({ where: { userId, placement: null } }),
  ]);

  return {
    matchesPlayed: totals._count,
    wins,
    podiums,
    dnfs,
    // _sum is null when there are no rows to add up
    pitStops: totals._sum.pitStops ?? 0,
    perfectPitStops: totals._sum.perfectPitStops ?? 0,
    crashes: totals._sum.crashes ?? 0,
    fastestPitStop: totals._min.fastestPitStop,
  };
}

export async function seedUserAchievements(prisma: PrismaClient, ids: UserIds) {
  for (const userId of Object.values(ids)) {
    const totals = await getPlayerTotals(prisma, userId);

    for (const rule of rules) {
      if (!rule.earned(totals)) continue;

      const achievement = await prisma.achievement.findUniqueOrThrow({
        where: { key: rule.key },
        select: { id: true },
      });

      await prisma.userAchievement.upsert({
        where: { achievementId_userId: { achievementId: achievement.id, userId } },
        update: {},
        create: { achievementId: achievement.id, userId },
      });
    }
  }
}