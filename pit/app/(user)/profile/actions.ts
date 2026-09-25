"use server";

import { auth, signIn, signOut } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export async function signout() {
  await signOut({ redirectTo: "/login" });
}

export async function connectGitHub() {
  await signIn("github", { redirectTo: "/profile" });
}

export async function connect42() {
  await signIn("42-school", { redirectTo: "/profile" });
}

export async function disconnectGitHub() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await prisma.account.deleteMany({
    where: { userId: session.user.id, provider: "github" },
  });
}

export async function disconnect42() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await prisma.account.deleteMany({
    where: { userId: session.user.id, provider: "42-school" },
  });
}

export async function deleteProfile() {
  const session = await auth();
  if (!session?.user?.id) throw new Error("Not authenticated");

  await prisma.user.delete({
    where: { id: session.user.id },
  });

  await signOut({ redirectTo: "/" });
}
