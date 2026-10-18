import "server-only";
import { prisma } from "@/app/lib/prisma";

export async function getProfile(userId: string) {
  return prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      country: true,
      birthday: true,
      image: true,
      theme: true,
      themeMode: true,
      createdAt: true,
      lastSeenAt: true,
      achievements: true,
      matchPlayers: true,
      accounts: { select: { provider: true } },
    },
  });
}
