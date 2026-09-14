"use client";
import ServerRaceManager from "@/components/serverRaceManager";
import Minimap from "@/components/MiniMap";
import Simulation from "@/context/simulation";

export default function page() {
  return (
    <Simulation>
      <Minimap />
      <ServerRaceManager />
    </Simulation>
  );
}
