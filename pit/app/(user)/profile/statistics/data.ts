import "server-only";
import { prisma } from "@/app/lib/prisma";

export async function getUserStatistics(userId: string) {
  const [total, first, podium] = await Promise.all([
    prisma.matchPlayer.aggregate({
      where: { userId, placement: { not: null } },
      _count: true,
      _sum: { pitStops: true, perfectPitStops: true, crashes: true },
      _min: { fastestPitStop: true },
    }),
    prisma.matchPlayer.count({ where: { userId, placement: 1 } }),
    prisma.matchPlayer.count({ where: { userId, placement: { lte: 3 } } }),
  ]);

  const matchesPlayed = total._count;

  return {
    matchesPlayed,
    first,
    podium,
    pitStops: total._sum.pitStops ?? 0,
    perfectPitStops: total._sum.perfectPitStops ?? 0,
    crashes: total._sum.crashes ?? 0,
    fastestPitStop: total._min.fastestPitStop, // null als er nog geen is
  };
}
