import "./lobby.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import LobbyClient from "./LobbyClient";

export default async function LobbyPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="lobby-page">
      <h1>Lobby</h1>
      <p>
        <Link href="/">← Back to garage</Link>
      </p>
      <LobbyClient />
    </div>
  );
}
