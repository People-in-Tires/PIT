import { auth, signOut } from "@/app/lib/auth";

export async function signout() {
  const session = await auth();
  if (session?.user?.id) {
	await signOut({ redirectTo: "/login" });
  }
}