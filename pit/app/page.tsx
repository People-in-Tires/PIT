"use client";
import Beer from "./objects/beer";
import View from "./objects/view";
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

export enum VIEW {
  garage = 0,
  window,
  bench,
  laptop,
  end,
}

interface viewcontext {
  view: VIEW;
  setView?: any;
}

export const ViewContext = createContext<viewcontext | undefined>(undefined);

export default function Home() {
  const [view, setView] = useState<VIEW>(VIEW.garage);
  const [windows, setWindows] = useState<React.JSX.Element[]>([]);
  const [inventory, setInventory] = useState<(React.JSX.Element | null)[]>([]);
  if (inventory.length == 0) {
    let tmp: (React.JSX.Element | null)[] = [];
    for (let i = 0; i < 10; i++)
      //have slots be a macro
      tmp.push(null);
    setInventory(tmp);
  }
  return (
    <div>
      <ViewContext value={{ view, setView }}>
        <View />
        <InventoryContext value={{ inventory, setInventory }}>
          <Inventory />
          <GameButton
            src="/minigames/grill"
            img="/grill.png"
            windows={windows}
            setWindows={setWindows}
          />
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
      </ViewContext>
    </div>
  );
}
