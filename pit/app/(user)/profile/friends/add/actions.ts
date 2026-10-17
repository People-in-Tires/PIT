"use server";

import * as z from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import { AddFriendSchema, type AddFriendState } from "./definitions";

export async function addFriend(
  _state: AddFriendState,
  formData: FormData,
): Promise<AddFriendState> {
  const session = await auth();
  const me = session?.user?.id;
  if (!me) return { message: "You need to be logged in.", timestamp: Date.now() };

  const raw = { identifier: formData.get("identifier") };
  const validated = AddFriendSchema.safeParse(raw);
  if (!validated.success) {
    return {
      errors: z.flattenError(validated.error).fieldErrors,
      values: { identifier: String(raw.identifier ?? "") },
      timestamp: Date.now(),
    };
  }
  const { identifier } = validated.data;

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
      errors: { identifier: ["No user found with that username or email."] },
      values: { identifier },
      timestamp: Date.now(),
    };
  }

  if (target.id === me) {
    return {
      errors: { identifier: ["You can't add yourself."] },
      values: { identifier },
      timestamp: Date.now(),
    };
  }

  const friends = await prisma.friend.findUnique({
    where: { userId_friendId: { userId: me, friendId: target.id } },
  });
  if (friends) {
    return {
      message: `You're already friends with ${target.username}.`,
      values: { identifier },
      timestamp: Date.now(),
    };
  }

  const sent = await prisma.friendRequest.findUnique({
    where: { requesterId_receiverId: { requesterId: me, receiverId: target.id } },
  });
  if (sent) {
    return {
      message: `You already sent ${target.username} a request.`,
      values: { identifier },
      timestamp: Date.now(),
    };
  }

  const received = await prisma.friendRequest.findUnique({
    where: { requesterId_receiverId: { requesterId: target.id, receiverId: me } },
  });
  if (received) {
    await prisma.$transaction([
      prisma.friendRequest.delete({
        where: { requesterId_receiverId: { requesterId: target.id, receiverId: me } },
      }),
      prisma.friend.createMany({
        data: [
          { userId: me, friendId: target.id },
          { userId: target.id, friendId: me },
        ],
      }),
    ]);
    revalidatePath("/profile");
    return {
      success: `You and ${target.username} are now friends!`,
      timestamp: Date.now(),
    };
  }

  await prisma.friendRequest.create({
    data: { requesterId: me, receiverId: target.id },
  });
  revalidatePath("/profile");
  return {
    success: `Friend request sent to ${target.username}.`,
    timestamp: Date.now(),
  };
}