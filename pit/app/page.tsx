"use client";
import Beer from "./objects/beer";
import GameButton from "./objects/GameButton";
import React, { useState, createContext } from "react";
import Image from "next/image";
import Inventory from "@/app/objects/inventory";
import Car from "./objects/car";

export interface StateContext {
  state: React.JSX.Element[];
  setState: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>;
}

export const GameWindowContext = createContext<StateContext | undefined>(
  undefined,
);

export default function Home() {
  const [windows, setWindows] = useState<React.JSX.Element[]>([]);
  const car = new Car();

  return (
    <GameWindowContext value={{ state: windows, setState: setWindows }}>
      <Inventory />
      <GameButton
        src="/minigames/grill"
        img="/grill.png"
        metadata={`litter=${car.litter}`}
        setOutput={car.setLitter}
      />
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
      {windows}
      <button
        onClick={() => {
          console.log(car);
        }}
      >
        {" "}
        car vroom vroom
      </button>
    </GameWindowContext>
  );
}
