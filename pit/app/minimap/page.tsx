"use client";

// import MiniMap from "@/components/MiniMap";
import RaceProvider from "@/components/race/raceProvider";
import Simulation from "@/context/simulation";

export default function page() {
  return (
    <Simulation>
      <RaceProvider />;
    </Simulation>
  );
}
