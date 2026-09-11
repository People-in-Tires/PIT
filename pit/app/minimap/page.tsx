"use client";
import Minimap from "@/components/MiniMap";
import Simulation from "@/context/simulation";

export default function MapEditorPage() {
  return (
    <Simulation>
      <Minimap />
    </Simulation>
  );
}
