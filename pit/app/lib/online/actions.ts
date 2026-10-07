"use server";

import { auth } from "../auth";
import { prisma } from "../prisma";

export async function heartbeat() {
  const session = await auth();
  const me = session?.user?.id;
  if (!me) return;

  await prisma.user.updateMany({
    where: { id: me },
    data: { lastSeenAt: new Date() },
  });
}
