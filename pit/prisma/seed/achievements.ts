// The list of achievements that exist in the game.
// This list is the source of truth: running the seed updates descriptions in the database.
 
import type { PrismaClient } from "../../generated/prisma";
 
const achievements = [
  { name: "Rookie", description: "Play your first match" },
  { name: "Champagne!", description: "Win your first match" },
  { name: "Podium Crew", description: "Finish in the top 3" },
  { name: "Perfect Stop", description: "Make your first perfect pit stop" },
  { name: "Wheel Gun Wizard", description: "Make 50 perfect pit stops" },
  { name: "Sub-2 Club", description: "Complete a pit stop in under 2 seconds" },
  { name: "Veteran", description: "Play 25 matches" },
  { name: "Full Grid", description: "Play a match with 12 players" },
  { name: "Crash Test Dummy", description: "Crash 10 times" },
];
 
export async function seedAchievements(prisma: PrismaClient) {
  for (const a of achievements) {
    // Requires `name String @unique` on the Achievement model.
    await prisma.achievement.upsert({
      where: { name: a.name },
      update: { description: a.description },
      create: a,
    });
  }
}