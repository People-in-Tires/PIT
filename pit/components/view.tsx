import Image from "next/image";
import styles from "@/css/Index.module.css";
import React, { useContext, createContext } from "react";
import Car from "./car";
import { BeerCrate } from "./beer";
import Wrench from "./wrench";
import GameWindowWrapper from "@/context/gamewindow";

// must have VIEW.end amount of values

export enum VIEW {
  garage = 0,
  bench,
  laptop,
  mapEditor,
  end,
}

export interface viewContext {
  view: VIEW;
  setView: React.Dispatch<React.SetStateAction<VIEW>>;
}
export const ViewContext = createContext<viewContext | undefined>(undefined);

export function Garage() {
  const driver1id = 0;
  const driver2id = 1;
  const car1here = true; //have to be states
  const car2here = false;
  return (
    <GameWindowWrapper>
      <Wrench />
      {car1here && <Car id={driver1id} />}
      {car2here && <Car id={driver2id} />}
    </GameWindowWrapper>
  );
}

export function WorkShop() {
  return (
    <GameWindowWrapper>
      <BeerCrate />
      <Wrench />
    </GameWindowWrapper>
  );
}

export function ViewButtons() {
  const context = useContext(ViewContext);
  if (context === undefined) return;
  const { view, setView } = context;

  const left = (
    <button id={`${styles.LeftButton}`} onClick={() => setView(view - 1)}>
      <Image src={"/angle-left.svg"} fill={true} alt="arrowLeft" />
    </button>
  );

  const right = (
    <button id={`${styles.RightButton}`} onClick={() => setView(view + 1)}>
      <Image src={"/angle-right.svg"} fill={true} alt="arrowRight" />
    </button>
  );

  return (
    <div>
      {view > 0 && left}
      {view < VIEW.end - 1 && right}
    </div>
  );
}
