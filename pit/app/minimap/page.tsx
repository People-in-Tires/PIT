"use client";
import ServerRaceManager from "@/components/serverRaceManager";
import Minimap from "@/components/MiniMap";
import Simulation from "@/context/simulation";
import { ServerWasmComponent } from "@/components/serverWasm";
import MiniMap from "@/components/MiniMap";

export default function page() {
  return (
    <Simulation>
      <MiniMap />
    </Simulation>
  );
}
