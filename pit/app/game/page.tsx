"use server";

import { ViewManager } from "@/components/engine/ViewManager";
import Lobby from "@/context/lobby";
import Simulation from "@/context/simulation";
import { isLoggedIn } from "../actions/isLoggedIn";

export default async function Home() {
  const loggedin = await isLoggedIn();

  return (
    <Lobby>
      <Simulation>
        <ViewManager
          initialView="workbench"
          isLoggedIn={loggedin}
        ></ViewManager>
      </Simulation>
    </Lobby>
  );
}
