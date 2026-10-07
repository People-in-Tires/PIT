"use server";

import * as z from "zod";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { AddFriendSchema, type AddFriendState } from "./definitions";

export async function addFriend(
  prevState: AddFriendState,
  formData: FormData,
): Promise<AddFriendState> {
  // 1. Wie ben ik?
  const session = await auth();
  const me = session?.user?.id;
  if (!me) return { message: "You need to be logged in. " };

  // 2. Valideer de input
  const raw = { identifier: formData.get("identifier") };
  const validated = AddFriendSchema.safeParse(raw);
  if (!validated.success) {
    return {
      errors: z.flattenError(validated.error).fieldErrors,
      values: { identifier: String(raw.identifier ?? "") },
    };
  }
  const { identifier } = validated.data;

  // 3. Zoek de andere gebruiker
  const target = await prisma.user.findFirst({
    where: {
      OR: [
        { username: { equals: identifier, mode: "insensitive" } },
        { email: { equals: identifier, mode: "insensitive" } },
      ],
    },
    select: { id: true, username: true },
  });
  if (!target) {
    return {
      errors: { identifier: ["No user found with that username or email. "] },
      values: { identifier },
    };
  }

  // 4. Niet jezelf
  if (target.id === me) {
    return {
      errors: { identifier: ["You can't add yourself. "] },
      values: { identifier },
    };
  }

  // 5. Bestaat er al iets tussen ons, in welke richting dan ook?
  const existing = await prisma.friendship.findFirst({
    where: {
      OR: [
        { requesterId: me, receiverId: target.id },
        { requesterId: target.id, receiverId: me },
      ],
    },
  });

  if (existing) {
    if (existing.status === "ACCEPTED") {
      return { message: `You're already friends with ${target.username}. ` };
    }
    if (existing.requesterId === me) {
      return { message: `You already sent ${target.username} a request. ` };
    }
    // De ander had mij al een verzoek gestuurd → automatisch accepteren
    await prisma.friendship.update({
      where: { id: existing.id },
      data: { status: "ACCEPTED", acceptedAt: new Date() },
    });
    return {
      success: `You and ${target.username} are now friends!`,
      timestamp: Date.now(),
    };
  }

  // 6. Nieuw verzoek
  await prisma.friendship.create({
    data: { requesterId: me, receiverId: target.id },
  });
  return {
    success: `Friend request sent to ${target.username}.`,
    timestamp: Date.now(),
  };
}
