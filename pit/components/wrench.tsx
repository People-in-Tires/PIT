import Draggable, { DraggableData } from "react-draggable";
import { ItemProps } from "./item";
import { createRef, useEffect, useRef, useState } from "react";
import { ControlPosition } from "react-draggable";
import addTo from "@/lib/libft/addTo";
import styles from "@/css/Game.module.css";
import DraggableItem from "./DraggableItem";
import overlap from "@/lib/libft/overlap";

function getAngle(
  origin_x: number,
  origin_y: number,
  destination_x: number,
  destination_y: number,
) {
  const newx = origin_x - destination_x;
  const newy = destination_y - origin_y;
  let theta = Math.atan2(-newy, newx);
  if (theta < -Math.PI / 2) {
    theta += 2 * Math.PI;
  }
  theta *= 180 / Math.PI;
  return theta;
}

export default function Wrench({}: ItemProps) {
  const refhead = createRef<HTMLDivElement>();
  const noderef = createRef<HTMLDivElement>();
  const boltRef = useRef<Element | undefined>(undefined);
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState<ControlPosition>({ x: 0, y: 0 });
  const [attached, setAttached] = useState<boolean>(false);

  function unattach(event: MouseEvent, data: DraggableData) {
      boltRef.current = undefined
      setAttached(false)
  }
  function drop(event: MouseEvent, data: DraggableData) {
    if (!refhead.current) return;
    boltRef.current = overlap(data.node, `${styles.bolt}`);
    if (boltRef.current != undefined)
    {
      setAttached(true);
      const boltRect = boltRef.current?.getBoundingClientRect();
      setPosition({x: boltRect.x, y: boltRect.y})
    }
  }

  function rotate(event: MouseEvent, data: DraggableData) {
    let delta_rotation: number;
    if (boltRef.current == undefined)
        return ;
    if (noderef.current == null) delta_rotation = 0;
    else {
      const parentReq = boltRef.current.getBoundingClientRect();
      if (!parentReq) return;
      const tmp_rotate = getAngle(
        event.x,
        event.y,
        parentReq.x + parentReq.width / 2,
        parentReq.y + parentReq.height / 2,
      );
      delta_rotation = ((tmp_rotate - rotation - 270) % 360) + 180;
    }
    setRotation((prevRotation) => prevRotation + delta_rotation);
    boltRef.current.dispatchEvent(
      new CustomEvent("rotate", {
        detail: { rotation: rotation, delta_rotation: delta_rotation },
      }),
    );
  }
  return (
    <DraggableItem
      axis={attached ? "none" : "both"}
      nodeRef={noderef}
      handle={`#handle`}
      defaultPosition={position}
      lockedPosition={attached ? position : undefined}
      onDrag={attached ? rotate : undefined}
      onStop={attached ? unattach : drop}
    >
      <div ref={noderef} className={`${styles.wrench} ${styles.item}`}>
        <div
          className={`${styles.hitbox}`}
          style={{
            backgroundImage: `url("/wrench.svg")`,
            backgroundSize: `contain`,
            backgroundRepeat: `no-repeat`,
            height: "100%",
            transformOrigin: `50% 10%`,
            rotate: `${rotation}deg`,
          }}
        >
          <div
            style={{ height: "20%" }}
            className={`${styles.hitbox}`}
            ref={refhead}
          ></div>
          <div
            className={`${styles.hitbox}`}
            id={"handle"}
            style={{ height: "40%", top: "55%" }}
          ></div>
        </div>
      </div>
    </DraggableItem>
  );
}
