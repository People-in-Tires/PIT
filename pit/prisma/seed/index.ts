// Entry point for seeding. Creates the client, runs every seed in order, disconnects.
// Run with: npx prisma db seed
 
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma";
import { seedAchievements } from "./achievements";
import { seedUsers, TEST_PASSWORD } from "./users";
import { seedFriendships } from "./friendships";
import { seedMatches } from "./matches";
import { seedStatistics } from "./statistics";
import { seedUserAchievements } from "./userAchievements";
 
// The seed runs as a standalone script, outside Next.js,
// so it creates its own client instead of importing the app's one.
// One client for all seed files = one database connection.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });
 
async function main() {
  // Reference data: needed in every environment.
  await seedAchievements(prisma);
  console.log("Seeded achievements");
 
  // Test data: only for development.
  if (process.env.NODE_ENV !== "production") {
    const ids = await seedUsers(prisma);
    console.log(`Seeded test users (password: ${TEST_PASSWORD})`);
 
    // Order matters: statistics are calculated from matches,
    // and achievements are based on statistics and matches.
    await seedFriendships(prisma, ids);
    console.log(`Seeded friendships for: ${ids})`);
    await seedMatches(prisma, ids);
    console.log(`Seeded matches for: ${ids})`);
    await seedStatistics(prisma, ids);
    console.log(`Seeded statistics for: ${ids})`);
    await seedUserAchievements(prisma, ids);
    console.log(`Seeded userAchievements for: ${ids})`);
  }
}
 
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });