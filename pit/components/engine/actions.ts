"use server";

import { auth } from "@/app/lib/auth";
import { Item } from "./itemStore";
import { prisma } from "@/app/lib/prisma";

export async function setDatabaseItems(
  items: Item[],
  containers: string[] = [],
) {
  const session = await auth();
  if (!session?.user?.id) return;

  items = items.filter((item) => containers.includes(item.container));

  const itemString = JSON.stringify(items);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { items: itemString },
  });
}

export async function getDatabaseItems(): Promise<Item[] | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { items: true },
  });
  if (!user) return null;

  return JSON.parse(user.item);
}
