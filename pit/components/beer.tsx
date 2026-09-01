"use client";
import { createRef } from "react";
import styles from "@/css/Game.module.css";
import { useContext } from "react";
import { GameWindowContext } from "@/context/gamewindow";
import Image from "next/image";
import { ItemProps } from "./item";
import DraggableItem from "./DraggableItem";
import overlap from "@/lib/libft/overlap";

//figure out how to have react elements interact either via having a parent<scene>
//use hooks
// export const BeerContext = createContext("1"); is globals

//for changing values in other elements have states in main or have it be parent child

//create item props with x, y, dragging state(for spawning whilst dragging) etc
export default function Beer({
  x = 0,
  y = 0,
  width = 100,
  height = 100,
}: ItemProps) {
  const nodeRef = createRef<HTMLDivElement>();

  return (
    <DraggableItem defaultPosition={{ x: x, y: y }} nodeRef={nodeRef}>
      <div
        className={`${styles.beer} ${styles.item}`}
        ref={nodeRef}
        style={{ width: width, height: height }}
      >
        <Image draggable="false" src="/beer.png" fill={true} alt="Beer" />
      </div>
    </DraggableItem>
  );
}

export function BeerCrate() {
  const tmp = useContext(GameWindowContext);
  if (!tmp) return;
  const { state, setState } = tmp;

  return (
    <button
      style={{ position: "absolute" }}
      onClick={() => {
        setState([...state, <Beer key={state.length} />]);
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
  );
}
