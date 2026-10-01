"use client";

import MiniMap from "@/components/MiniMap";
import Simulation from "@/context/simulation";

export default function page() {
  return (
    <Simulation>
      <MiniMap />
    </Simulation>
  );
}
