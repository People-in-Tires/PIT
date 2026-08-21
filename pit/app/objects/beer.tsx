"use client";
import { createRef } from "react";
import Draggable from "react-draggable";
import styles from "../Index.module.css";
import { useContext } from "react";
import { GameWindowContext } from "../page";
import Image from "next/image";
import { useState } from "react";
import { ControlPosition, DraggableData } from "react-draggable";
import { overlap } from "./functions";
import { ItemProps } from "./item";
import { addInv } from "./inventory";

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
  const [position, setPosition] = useState<ControlPosition>({ x: x, y: y });
  const nodeRef = createRef<HTMLDivElement>();

  //port to draggable core???
  function onDragStart(event: MouseEvent, data: DraggableData) {
    setPosition({ x: event.x - width / 2, y: event.y - height / 2 }); //add as basic item functions call at end of items
    document.body.appendChild(data.node);
  }
  function onDrag(event: MouseEvent) {
    setPosition({ x: event.x - width / 2, y: event.y - height / 2 });
  }
  function onDragStop(event: MouseEvent, data: DraggableData) {
    setPosition({ x: event.x - width / 2, y: event.y - height / 2 });
    addInv(data.node);
  }

  return (
    <Draggable
      position={position}
      nodeRef={nodeRef}
      onDrag={onDrag}
      onStart={onDragStart}
      onStop={onDragStop}
    >
      <div
        className={`${styles.beer} ${styles.item}`}
        ref={nodeRef}
        style={{ width: width, height: height }}
      >
        <Image draggable="false" src="/beer.png" fill={true} alt="Beer" />
      </div>
    </Draggable>
  );
}

export function BeerCrate() {
  const tmp = useContext(GameWindowContext);
  if (!tmp) return;
  const { state, setState } = tmp;

  return (
    <button
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
