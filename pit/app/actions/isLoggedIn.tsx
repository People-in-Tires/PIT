"use server";

import { auth } from "@/app/lib/auth";

export async function isLoggedIn(): Promise<boolean> {
  const session = await auth();
  return session?.user?.id ? true : false;
}
