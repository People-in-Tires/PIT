"use client";
import { createRef, useContext } from "react";
import Draggable from "react-draggable";
import styles from "@/css/Game.module.css";
import { DraggableData } from "react-draggable";
import { overlap } from "@/lib/libft/overlap";
import { ItemProps } from "@/components/item";
import { GrillContext } from "./GrillGame";

export default function Grilllitter({
  x = 0,
  y = 0,
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
      positionOffset={{ x: `${x}px`, y: `${y}px` }}
      nodeRef={nodeRef}
      onStop={onDragStop}
    >
      <div className={`${styles.litter}`} ref={nodeRef}>
        <img draggable="false" src={sprite} alt="litter" />
      </div>
    </Draggable>
  );
}
