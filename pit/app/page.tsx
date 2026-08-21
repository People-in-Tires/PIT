"use client";
import Beer from "./objects/beer";
import React, { useState, createContext } from "react";
import Image from "next/image";
import View from "./objects/view";
import Inventory from "@/app/objects/inventory";
import { useRef } from "react";
import Car from "./objects/car";
import Wrench from "./objects/wrench";

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
  const car = useRef(new Car()); //replace with get info from sim when the car rolls in

  return (
    <GameWindowContext value={{ state: windows, setState: setWindows }}>
      <ViewContext value={{ view, setView }}>
        <View />
      </ViewContext>
      <Inventory />
      <Wrench />
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
          console.log(car.current);
        }}
      >
        {" "}
        car vroom vroom
      </button>
    </GameWindowContext>
  );
}
