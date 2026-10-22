import "server-only";
import { prisma } from "@/app/lib/prisma";

export async function getLinkedAccounts(userId: string) {
  const accounts = await prisma.account.findMany({
    where: { userId },
    select: { provider: true },
  });
  const providers = accounts.map((account) => account.provider);

  return {
    github: providers.includes("github"),
    fortyTwo: providers.includes("42-school"),
  };
}
