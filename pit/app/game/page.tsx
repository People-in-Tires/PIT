"use server";

import { ViewManager } from "@/components/engine/ViewManager";
import Inventory from "@/components/UI/Inventory";
import Bin from "@/components/UI/Bin";
import Lobby from "@/context/lobby";
import Simulation from "@/context/simulation";
import { auth } from "../lib/auth";
import useCarStore from "@/components/engine/carStore";

export default async function Home() {
  // const session = await auth();
  // if (!session?.user?.id) return ("Not authenticated");

  return (
    <Lobby>
      <Simulation>
        <ViewManager initialView="garage"></ViewManager>
      </Simulation>
    </Lobby>
  );
}
