"use client";
import Beer from "./objects/beer";
import React, { useState, createContext } from "react";
import Image from "next/image";
import Inventory from "@/app/objects/inventory";
import Car from "./objects/car";

export interface StateContext {
  state: React.JSX.Element[];
  setState: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>;
}

export const GameWindowContext = createContext<StateContext | undefined>(
  undefined
);

export default function Home() {
  const [windows, setWindows] = useState<React.JSX.Element[]>([]);
  const driver1id = 0;
  const driver2id = 1;
  let car1here = true; //have to be states
  let car2here = false;
  return (
    <GameWindowContext value={{ state: windows, setState: setWindows }}>
      {(car1here) && <Car id={driver1id}/>}
      {(car2here) && <Car id={driver2id}/>}
      <Inventory />
      {windows}
      <button
        onClick={() => {
          setWindows([...windows, <Beer key={`beer${windows.length}`} />]);
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
    </GameWindowContext>
  );
}
