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
import Lobby from "@/context/lobby";
import Simulation from "@/context/simulation";

export default function Home() {
  return (
    <Lobby>
      <Simulation>
      <ViewManager initialView="garage">
      </ViewManager>
      </Simulation>
    </Lobby>
  );
}
