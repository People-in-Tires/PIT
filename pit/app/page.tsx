import "./homepage.css";
import { auth, signOut } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

async function logout() {
  "use server";
  await signOut({ redirectTo: "/login" });
}

export default async function Homepage() {
  const session = await auth();
  if (!session?.user?.id) redirect("./login");

  return (
    <main className="homepage">
      <div className="scene">
        <Image src="/garage.webp" alt="" fill priority sizes="100vw" />

        <div className="screen">
          <Link className="screen-button primary" href="/lobby">
            Go to game
          </Link>
          <Link className="screen-button secondary" href="/profile">
            Go to profile
          </Link>
          <form action={logout}>
            <button className="screen-button danger" type="submit">
              Logout
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
