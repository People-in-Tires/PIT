import "server-only";
import { prisma } from "@/app/lib/prisma";

const RECENT_LIMIT = 8;

export async function getRecentAchievements(userId: string) {
  const [recent, unlockedCount, total] = await Promise.all([
    prisma.userAchievement.findMany({
      where: { userId },
      orderBy: { unlockedAt: "desc" },
      take: RECENT_LIMIT,
      select: {
        unlockedAt: true,
        achievement: { select: { key: true, name: true, description: true } },
      },
    }),
    prisma.userAchievement.count({ where: { userId } }),
    prisma.achievement.count(),
  ]);

  return { recent, unlockedCount, total };
}
