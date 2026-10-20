"use client";

import RaceCreator from "@/components/RaceCreator";
import Simulation from "@/context/simulation";

export default function page() {
  return (
    <Simulation>
      <RaceCreator />
    </Simulation>
  );
}
