"use server";

import { signOut } from "@/app/lib/auth";

export async function signout() {
  await signOut({ redirectTo: "/" });
}
