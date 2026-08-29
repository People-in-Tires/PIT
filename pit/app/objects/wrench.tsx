import Draggable, { DraggableCore, DraggableData } from "react-draggable";
import { ItemProps } from "./item";
import { createRef, useState } from "react";
import { ControlPosition } from "react-draggable";
import Image from "next/image";
import { getAngle } from "./functions";
import { addInv } from "./inventory";
import { overlap } from "./functions";
import styles from "../Index.module.css";
export default function Wrench({}: ItemProps) {
  const refhead = createRef<HTMLButtonElement>();
  const noderef = createRef<HTMLDivElement>();
  const [rotation, setRotation] = useState<number>(0);
  const [position, setPosition] = useState<ControlPosition>({ x: 0, y: 0 });
  const [attached, setAttached] = useState<boolean>(false);

  function addBolt(node: HTMLElement, hitbox: HTMLElement = node) {
    const tmp = document.getElementsByClassName(`${styles.bolt}`);
    if (!tmp) return;
    for (const value of tmp) {
      if (
        overlap(hitbox.getBoundingClientRect(), value.getBoundingClientRect())
      ) {
        value.moveBefore(node, null);
        setAttached(true);
        break;
      }
    }
  }
  function onDragStart(event: MouseEvent, data: DraggableData) {
    document.body.appendChild(data.node);
    const hitbox = data.node.getBoundingClientRect();
    setPosition({
      x: event.x - hitbox.width / 2,
      y: event.y - (hitbox.height * 4) / 5,
    });
  }
  function onRotateStart(event: MouseEvent, data: DraggableData) {}
  function move(event: MouseEvent, data: DraggableData) {
    const hitbox = data.node.getBoundingClientRect();
    setPosition({
      x: event.x - hitbox.width / 2,
      y: event.y - (hitbox.height * 4) / 5,
    });
  }
  function RotateStop(event: MouseEvent, data: DraggableData) {
    if (data.node.parentElement?.className?.includes("fastened"))
      setAttached(false);
  }
  function drop(event: MouseEvent, data: DraggableData) {
    if (refhead.current) addBolt(data.node, refhead.current);
    addInv(data.node);
  }
  function rotate(event: MouseEvent, data: DraggableData) {
    let delta_rotation: number;
    if (noderef.current == null) delta_rotation = 0;
    else {
      const tmp_rotate = getAngle(
        event.x,
        event.y,
        position.x + noderef.current.getBoundingClientRect().width / 2,
        position.y + noderef.current.getBoundingClientRect().height / 2,
      );
      delta_rotation = ((tmp_rotate - rotation - 270) % 360) + 180;
      console.log(delta_rotation, tmp_rotate);
    }
    setRotation((prevRotation) => prevRotation + delta_rotation);
    noderef.current?.parentNode?.dispatchEvent(
      new CustomEvent("rotate", {
        detail: { rotation: rotation, delta_rotation: delta_rotation },
      }),
    );
  }
  return (
    <Draggable
      axis={attached ? "none" : "both"}
      nodeRef={noderef}
      handle={`#handle`}
      position={position}
      onStart={attached ? onRotateStart : onDragStart}
      onDrag={attached ? rotate : move}
      onStop={attached ? RotateStop : drop}
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
          <button
            style={{ height: "20%" }}
            className={`${styles.hitbox}`}
            onClick={() => {
              setAttached((prevAttached) => !prevAttached);
            }}
            ref={refhead}
          ></button>
          <div
            className={`${styles.hitbox}`}
            id={"handle"}
            style={{ height: "40%", top: "55%" }}
          ></div>
        </div>
      </div>
    </Draggable>
  );
}
