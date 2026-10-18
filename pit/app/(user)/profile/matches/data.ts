import "server-only";
import { prisma } from "@/app/lib/prisma";

export async function getRecentMatches(userId: string) {
  return prisma.matchPlayer.findMany({
    where: { userId, match: { finishedAt: { not: null } } },
    orderBy: { match: { finishedAt: "desc" } },
    take: 5,
    select: {
      matchId: true,
      placement: true,
      pitStops: true,
      perfectPitStops: true,
      fastestPitStop: true,
      match: {
        select: {
          finishedAt: true,
          _count: { select: { players: true } },
        },
      },
    },
  });
}
