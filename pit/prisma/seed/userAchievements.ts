// Gives test users the achievements they've actually earned,
// based on their statistics and match history in the database.
// Some achievements stay locked for everyone, so you can test the "locked" look too.

import type { PrismaClient, Statistics } from "../../generated/prisma";
import type { UserIds } from "./users";

type PlayerData = {
  stats: Statistics;
  placements: number[]; // one per match played
  matchSizes: number[]; // number of players in each match played
};

// One rule per achievement name. Names must match achievements.ts exactly.
const rules: { name: string; earned: (p: PlayerData) => boolean }[] = [
  { name: "Rookie", earned: (p) => p.stats.matchesPlayed >= 1 },
  { name: "Champagne!", earned: (p) => p.stats.wins >= 1 },
  {
    name: "Podium Crew",
    earned: (p) => p.placements.some((place) => place <= 3),
  },
  { name: "Perfect Stop", earned: (p) => p.stats.perfectPitStops >= 1 },
  { name: "Wheel Gun Wizard", earned: (p) => p.stats.perfectPitStops >= 50 },
  {
    name: "Sub-2 Club",
    earned: (p) =>
      p.stats.fastestPitStopTime > 0 && p.stats.fastestPitStopTime < 2000,
  },
  { name: "Veteran", earned: (p) => p.stats.matchesPlayed >= 25 },
  { name: "Full Grid", earned: (p) => p.matchSizes.some((size) => size >= 12) },
  { name: "Crash Test Dummy", earned: (p) => p.stats.totalCrashes >= 10 },
];

export async function seedUserAchievements(prisma: PrismaClient, ids: UserIds) {
  // Look up achievement ids by name once.
  const achievements = await prisma.achievement.findMany();
  const achievementId = new Map(achievements.map((a) => [a.name, a.id]));

  for (const userId of Object.values(ids)) {
    const stats = await prisma.statistics.findUnique({ where: { userId } });
    if (!stats) continue; // no statistics = nothing to base achievements on

    const played = await prisma.matchPlayer.findMany({
      where: { userId },
      select: {
        placement: true,
        match: { select: { _count: { select: { players: true } } } },
      },
    });

    const player: PlayerData = {
      stats,
      placements: played.map((p) => p.placement),
      matchSizes: played.map((p) => p.match._count.players),
    };

    for (const rule of rules) {
      if (!rule.earned(player)) continue;

      const id = achievementId.get(rule.name);
      if (id === undefined) {
        throw new Error(
          `Seed: achievement "${rule.name}" not found. Check achievements.ts`,
        );
      }

      await prisma.userAchievement.upsert({
        where: { achievementId_userId: { achievementId: id, userId } },
        update: {},
        create: { achievementId: id, userId },
      });
    }
  }

  console.log("Seeded user achievements");
}
