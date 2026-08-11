"use client";
import { createRef, useContext } from "react";
import Draggable from "react-draggable";
import styles from "../css/Index.module.css";
import Image from "next/image";
import { useState } from "react";
import { ControlPosition, DraggableData } from "react-draggable";
import { addInv } from "./functions";
import { overlap } from "./functions";
import { ItemProps } from "./item";
import { InventoryContext } from "../page";
import { InventoryFunctions } from "./inventory";
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
  const inventory = useContext(InventoryContext);
  var index = 0;

  function onDragStart(event: MouseEvent, data: DraggableData) {
    setPosition({ x: event.x - width / 2, y: event.y - height / 2 });
    document.body.appendChild(data.node);
  }
  function onDrag(event: MouseEvent, data: DraggableData) {
    setPosition({ x: event.x - width / 2, y: event.y - height / 2 });
    index++;
    console.log(index);
  }
  function onDragStop(event: MouseEvent, data: DraggableData) {
    setPosition({ x: event.x - width / 2, y: event.y - height / 2 });
    const tmp = document.getElementById("inventory"); //replace with
    if (!tmp) return;
    const children = tmp.children;
    for (let i = 0; i < children.length; i++) {
      if (
        overlap(
          data.node.getBoundingClientRect(),
          children[i].getBoundingClientRect(),
        ) &&
        children[i].getElementsByClassName(`${styles.item}`).length == 0
      ) {
        children[i].appendChild(data.node);
        break;
      }
    }
  }

  return (
    <Draggable
      position={position}
      nodeRef={nodeRef}
      onDrag={onDrag}
      onStart={onDragStart}
      onStop={onDragStop}
    >
      <div className={`${styles.beer} ${styles.item}`} ref={nodeRef}>
        <Image
          draggable="false"
          src="/beer.png"
          width={width}
          height={height}
          alt="Beer"
        />
      </div>
    </Draggable>
  );
}
