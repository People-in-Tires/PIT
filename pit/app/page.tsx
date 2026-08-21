"use client";

import Simulation from "@/context/simulation";
import MapEditor from "@/app/mapEditor/page";

export default function Home() {
  return (
    <Simulation>
      <MapEditor />
    </Simulation>
  );
}
