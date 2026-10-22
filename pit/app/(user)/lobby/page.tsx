import "./lobby.css";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";
import LobbyClient from "./LobbyClient";
import Simulation from "@/context/simulation";
import Lobby from "@/context/lobby";

export default async function LobbyPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return (
    <Lobby>
      <Simulation>
        <LobbyClient />
      </Simulation>
    </Lobby>
  );
}
