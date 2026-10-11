"use server";

import { auth, signIn } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

async function disconnectProvider(provider: string) {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await prisma.account.deleteMany({
    where: { userId: session.user.id, provider },
  });
}

export async function connectGitHub() {
  await signIn("github", { redirectTo: "/profile" });
}

export async function connect42() {
  await signIn("42-school", { redirectTo: "/profile" });
}

export async function disconnectGitHub() {
  await disconnectProvider("github");
}

export async function disconnect42() {
  await disconnectProvider("42-school");
}
