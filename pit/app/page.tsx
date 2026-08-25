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

export interface StateContext {
  state: React.JSX.Element[];
  setState: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>;
}
export const GameWindowContext = createContext<StateContext | undefined>(
  undefined,
);

export enum VIEW {
  garage = 0,
  bench,
  laptop,
  end,
}
export interface viewContext {
  view: VIEW;
  setView: React.Dispatch<React.SetStateAction<VIEW>>;
}
export const ViewContext = createContext<viewContext | undefined>(undefined);

export default function Home() {
  const [view, setView] = useState<VIEW>(VIEW.laptop);
  const [windows, setWindows] = useState<React.JSX.Element[]>([]);

  return (
    <GameWindowContext value={{ state: windows, setState: setWindows }}>
      <ViewContext value={{ view, setView }}>
        <View />
      </ViewContext>
      <Inventory />
      {windows}
    </GameWindowContext>
  );
}
