"use client";
import { createRef } from "react";
import Draggable from "react-draggable";
import styles from "../../Index.module.css";
import Image from "next/image";
import { DraggableData } from "react-draggable";
import { overlap } from "@/app/objects/functions";
import { ItemProps } from "@/app/objects/item";

export default function GrillLitter({
  x = 0,
  y = 0,
  sprite = "/leaf.png",
}: ItemProps & { sprite: string }) {
  const nodeRef = createRef<HTMLDivElement>();

  function onDragStart() {}
  function onDrag() {}
  function onDragStop(event: MouseEvent, data: DraggableData) {
    // setPosition({ x: event.x - width / 2, y: event.y - height / 2 });
    const tmp = document.getElementById("Grill");
    if (!tmp) return;
    if (
      !overlap(data.node.getBoundingClientRect(), tmp.getBoundingClientRect())
    ) {
      data.node.parentNode?.removeChild(data.node);
      //decrement litter count in scene can also be gotten by children with class litter (not very react)
    }
  }
  return (
    <Draggable
      // bounds={bound} doesnot like positionOffset takes bounds from starting position
      // defaultPosition={{x : 0,y:0}} //doesnt take percentage either calculate myself the vw and vh or cry
      positionOffset={{ x: `${x}vw`, y: `${y}vh` }}
      nodeRef={nodeRef}
      onDrag={onDrag}
      onStart={onDragStart}
      onStop={onDragStop}
    >
      <div className={`${styles.litter}`} ref={nodeRef}>
        <Image draggable="false" src={sprite} fill={true} alt="litter" />
      </div>
    </Draggable>
  );
}
