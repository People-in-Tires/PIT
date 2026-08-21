"use client";
import { BeerCrate } from "./objects/beer";
import React, { useState, createContext } from "react";
import Image from "next/image";
import Inventory from "@/app/objects/inventory";
import Car from "./objects/car";
import { ItemProps } from "./objects/item";

export interface StateContext {
  state: React.JSX.Element[];
  setState: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>;
}

export const GameWindowContext = createContext<
  | {
      state: React.JSX.Element[];
      setState: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>;
    }
  | undefined
>(undefined);

export default function Home() {
  const [windows, setWindows] = useState<React.JSX.Element[]>([]);
  const driver1id = 0;
  const driver2id = 1;
  const car1here = true; //have to be states
  const car2here = false;

  return (
    <GameWindowContext value={{ state: windows, setState: setWindows }}>
      {car1here && <Car id={driver1id} />}
      {car2here && <Car id={driver2id} />}
      <Inventory />
      {windows}
      <BeerCrate />
    </GameWindowContext>
  );
}
