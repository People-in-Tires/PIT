"use client";
import Beer from "./objects/beer";
import GameButton from "./objects/GameButton";
import React, {
  createContext,
  createElement,
  ReactElement,
  useState,
} from "react";
import Image from "next/image";
import Inventory from "@/app/objects/inventory";
//usecontext for inventory and interactions
//InventoryContext at top layer
export interface InvContext {
  inventory?: (React.JSX.Element | null)[];
  setInventory?: any;
}
export const InventoryContext = createContext<InvContext | undefined>(
  undefined,
);

export default function Home() {
  const [windows, setWindows] = useState<React.JSX.Element[]>([]);
  const [inventory, setInventory] = useState<(React.JSX.Element | null)[]>([]);
  if (inventory.length == 0)
    {
    let tmp: (React.JSX.Element | null)[] = [];
    for (let i = 0; i < 10; i++)
      //have slots be a macro
    tmp.push(null);
    setInventory(tmp);
  }
  return (
    <div>
      <InventoryContext value={{ inventory, setInventory }}>
        <Inventory />
        <GameButton src="/minigames/grill" img="/grill.png" windows={windows} setWindows={setWindows}/>
        <button
          onClick={() => {
            setWindows([...windows, <Beer />]);
          }}
          id="BeerButton"
        >
          <Image
            draggable="false"
            src={"/beer.png"}
            width={150}
            height={150}
            alt="beercrate"
          />
        </button>
        {windows}
      </InventoryContext>
    </div>
  );
}
