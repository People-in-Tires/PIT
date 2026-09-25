"use client";
import Simulation from "@/context/simulation";
import MiniMap from "@/components/MiniMap";

export default function page() {
  return (
    <Simulation>
      <MiniMap />
    </Simulation>
  );
}
