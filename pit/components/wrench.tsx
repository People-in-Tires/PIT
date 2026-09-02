import Draggable, { DraggableData } from "react-draggable";
import { ItemProps } from "./item";
import { Children, createRef, useEffect, useRef, useState } from "react";
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

  const setBoltRef = (node: Element | undefined) => {
    boltRef.current = node;
  };

  function rotate(event: MouseEvent, data: DraggableData) {
    let delta_rotation: number;
    if (boltRef.current == undefined) return;
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
      nodeRef={noderef}
      handle={`#handle`}
      attachTarget={`${styles.bolt}`}
      attachParentTarget={"attached"}
      attachHitbox={refhead}
      onAttachDrag={rotate}
      dettachOnStart={false}
      setAttachRef={setBoltRef}
    >
      <div ref={noderef} className={`${styles.wrench} ${styles.tool}`}>
        <div
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
