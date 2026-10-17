export async function register() {
  // Only on the Node.js server, not in the Edge runtime.
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { prisma } = await import("./app/lib/prisma");
  const { syncAchievements } = await import("./app/lib/achievements-sync");

  await syncAchievements(prisma);
  console.log("Achievements synced");
}