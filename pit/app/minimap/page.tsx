"use client";
import Simulation from "@/context/simulation";
import MiniMap from "@/components/MiniMap";
import RaceStateFetcher from "@/components/RaceStateFetcher";

export default function page() {
  return (
    <Simulation>
      <RaceStateFetcher />
    </Simulation>
  );
}
