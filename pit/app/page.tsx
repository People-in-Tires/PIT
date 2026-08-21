"use client";
import Beer from "./objects/beer";
import GameButton from "./objects/GameButton";
import React, { useState, createContext } from "react";
import { BeerCrate } from "./objects/beer";
import Image from "next/image";
import View from "./objects/view";
import Inventory from "@/app/objects/inventory";
import Car from "./objects/car";
import { ItemProps } from "./objects/item";

import Simulation from "@/context/simulation";
import MapEditor from "@/app/mapEditor/page";

export default function Home() {
  const [windows, setWindows] = useState<React.JSX.Element[]>([]);

  return (
    <div>
    {/* <GameWindowContext value={{ state: windows, setState: setWindows }}> */}
      <Simulation>
        <MapEditor />
      </Simulation>
      <Inventory />
      {windows}
    {/* </GameWindowContext> */}
    </div>
  );
}
