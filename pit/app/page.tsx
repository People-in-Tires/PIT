"use client";
// import React, { useState, createContext } from "react";
// import Inventory from "@/components/inventory";
// import Image from "next/image";
// import {
//   ViewContext,
//   VIEW,
//   ViewButtons,
//   Garage,
//   WorkShop,
// } from "@/components/view";
// import Laptop from "@/components/laptop";
// import MapEditor from "@/components/MapEditor";
// import Simulation from "@/context/simulation";
// import ItemStacks from "@/examples/itemStacksExample";

import { ViewManager } from "@/components/engine/ViewManager";
import Inventory from "@/components/UI/Inventory";
import Bin from "@/components/UI/Bin";
import Simulation from "@/context/simulation";
import Lobby from "@/context/lobby";

export default function Home() {
  return (
    <Simulation>
      <Lobby>
        <ViewManager initialView="garage">
          <Inventory />
          <Bin />
        </ViewManager>
      </Lobby>
    </Simulation>
  );
}
