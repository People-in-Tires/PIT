"use client";
import { Simulation } from "@/context/simulation";
import { WASMExample } from "@/components/wasmExample";

export default function SimExample() {
  return (
    <Simulation>
      <WASMExample />
    </Simulation>
  );
}
