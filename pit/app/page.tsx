"use client";
import React, { useState, createContext } from "react";
import Inventory from "@/components/inventory";
import Image from "next/image";
import {
  ViewContext,
  VIEW,
  ViewButtons,
  Garage,
  WorkShop,
} from "@/components/view";
import Laptop from "@/components/laptop";
import MapEditor from "@/components/MapEditor";
import Simulation from "@/context/simulation";
import GameWindowWrapper from "@/context/gamewindow";

export interface StateContext {
  state: React.JSX.Element[];
  setState: React.Dispatch<React.SetStateAction<React.JSX.Element[]>>;
}
export const GameWindowContext = createContext<StateContext | undefined>(
  undefined,
);

const backgrounds: string[] = [
  "/background-brick-1.jpg",
  "/background-brick-2.jpg",
  "/background-brick-2.jpg",
  "/background-brick-2.jpg",
];

export default function Home() {
  const [view, setView] = useState<VIEW>(VIEW.laptop);

  if (view < 0 || view >= VIEW.end) setView(VIEW.garage);

  return (
    <Simulation>
      <ViewContext value={{ view, setView }}>
        <GameWindowWrapper>
          <div>
            <Image
              src={backgrounds[view]}
              width={2560}
              height={1440}
              alt="background"
              style={{
                zIndex: -1,
                position: "absolute",
                opacity: 1,
                width: "100%",
                height: "100%",
                aspectRatio: "2",
                objectFit: "cover",
              }}
            />
            {view === VIEW.garage && <Garage />}
            {view === VIEW.laptop && <Laptop />}
            {view === VIEW.bench && <WorkShop />}
            {view === VIEW.mapEditor && <MapEditor />}
            <ViewButtons />
          </div>
          <Inventory />
        </GameWindowWrapper>
      </ViewContext>
    </Simulation>
  );
}
