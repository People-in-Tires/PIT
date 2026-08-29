import { createRef, useEffect } from "react";
import Draggable from "react-draggable";
import styles from "../../Index.module.css";
import { useContext } from "react";
import { GameWindowContext } from "../../page";
import Image from "next/image";
import { useState } from "react";
import { ControlPosition, DraggableData } from "react-draggable";
import { overlap } from "../../objects/functions";
import { ItemProps } from "../../objects/item";
import { addInv } from "../../objects/inventory";
import { Bolt } from "@/app/objects/bolt";

export default function WheelSmooth({
  x = 0,
  y = 0,
  width = 200,
  height = 200,
}: {} & ItemProps) {
  const [position, setPosition] = useState<ControlPosition>({ x: x, y: y });
  const nodeRef = createRef<HTMLDivElement>();

  //port to draggable core???
  function onDragStart(event: MouseEvent, data: DraggableData) {
    setPosition({ x: event.x - width / 2, y: event.y - height / 2 }); //add as basic item functions call at end of items
    document.body.moveBefore(data.node, null);
  }
  function onDrag(event: MouseEvent) {
    setPosition({ x: event.x - width / 2, y: event.y - height / 2 });
  }
  function onDragStop(event: MouseEvent, data: DraggableData) {
    setPosition({ x: event.x - width / 2, y: event.y - height / 2 });
    addInv(data.node);
  }
  function useEventListen(e: Event) {
    const customE = e as CustomEvent;
    console.log(customE.detail.message);
  }
  useEffect(() => {
    nodeRef.current?.addEventListener("hello", useEventListen);
    return () => {
      nodeRef.current?.removeEventListener("hello", useEventListen);
    };
  }, []);

  return (
    <Draggable
      position={position}
      nodeRef={nodeRef}
      onDrag={onDrag}
      onStart={onDragStart}
      onStop={onDragStop}
    >
      <div
        className={`${styles.beer} ${styles.item} ${styles.wheel}`}
        ref={nodeRef}
        style={{
          width: width,
          height: height,
          backgroundImage: `url("https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Wheel_Iran.jpg/960px-Wheel_Iran.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail")`,
          backgroundSize: `contain`,
          backgroundRepeat: `no-repeat`,
        }}
      >
        <Bolt x={25} y={25} />
        <Bolt x={75} y={25} />
        <Bolt x={25} y={75} />
        <Bolt x={75} y={75} />
      </div>
    </Draggable>
  );
}
