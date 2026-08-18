"use client";
import { createRef, useContext } from "react";
import Draggable from "react-draggable";
import styles from "../../Index.module.css";
import Image from "next/image";
import { DraggableData } from "react-draggable";
import { overlap } from "@/app/objects/functions";
import { ItemProps } from "@/app/objects/item";
import { GrillContext } from "./page";

export default function Grilllitter({
  x = 0, //as percent
  y = 0, //as percent
  sprite,
  index,
}: ItemProps & { sprite: string; index: string }) {
  const nodeRef = createRef<HTMLDivElement>();
  const grill = useContext(GrillContext);

  function onDragStop(event: MouseEvent, data: DraggableData) {
    const grillHtml = document.getElementById("Grill");
    if (!grillHtml) return;
    if (
      !overlap(
        data.node.getBoundingClientRect(),
        grillHtml.getBoundingClientRect(),
      )
    ) {
      if (grill == null) return;
      grill.setState(grill.state.filter((item) => item.key !== index));
    }
  }
  return (
    <Draggable
      // bounds={bound} doesnot like positionOffset takes bounds from starting position
      // defaultPosition={{x : 0,y:0}} //doesnt take percentage either calculate myself the vw and vh or cry
      positionOffset={{ x: `${x}vw`, y: `${y}vh` }}
      nodeRef={nodeRef}
      onStop={onDragStop}
    >
      <div className={`${styles.litter}`} ref={nodeRef}>
        <Image draggable="false" src={sprite} fill={true} alt="litter" />
      </div>
    </Draggable>
  );
}
