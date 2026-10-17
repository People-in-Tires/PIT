import type { PrismaClient } from "../../generated/prisma";
import { ACHIEVEMENTS } from "./achievements";

// Makes the achievements table match the list in achievements.ts:
// adds new ones, updates names and descriptions, removes deleted ones.
// Safe to run as often as you like.
export async function syncAchievements(prisma: PrismaClient) {
  for (const a of ACHIEVEMENTS) {
    await prisma.achievement.upsert({
      where: { key: a.key },
      update: { name: a.name, description: a.description },
      create: { key: a.key, name: a.name, description: a.description },
    });
  }

  await prisma.achievement.deleteMany({
    where: { key: { notIn: ACHIEVEMENTS.map((a) => a.key) } },
  });
}