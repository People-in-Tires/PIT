import { useState, createRef, useContext, useEffect, useRef } from "react";
import { ItemProps } from "./item";
import Draggable, { ControlPosition, DraggableData } from "react-draggable";
import { addInv } from "./inventory";
import styles from "../Index.module.css";
import { GameWindowContext } from "../page";
import Image from "next/image";
import { overlap } from "./functions";
import { DraggableCore } from "react-draggable";
export function Bolt({
  x = 0,
  y = 0,
  width = 50,
  height = 50,
}: {} & ItemProps) {
  const [position, setPosition] = useState<ControlPosition>({ x: x, y: y });
  const ref = createRef<HTMLImageElement>();

  function onDragStart(event: MouseEvent, data: DraggableData) {
    document.body.moveBefore(data.node, null);
  }
  function onDrag(event: MouseEvent, data: DraggableData) {
    // console.log(data.deltaX, data.deltaY)
    if (data.deltaY > 20) setPosition({ x: event.x, y: event.y });
    else setPosition({ x: data.x, y: data.y });
    // console.log(position)
  }
  function onDragStop(event: MouseEvent, data: DraggableData) {
    addInv(data.node);
    addBolt(data.node);
  }
  return (
    <Draggable
      position={position}
      nodeRef={ref}
      onDrag={onDrag}
      onStart={onDragStart}
      onStop={onDragStop}
    >
      <img
        draggable={false}
        ref={ref}
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Usain_Bolt_Olympics_Celebration.jpg/960px-Usain_Bolt_Olympics_Celebration.jpg"
        }
        height={50}
        width={50}
        className={`${styles.beer} ${styles.item} bolt`}
      ></img>
    </Draggable>
  );
}

export function BoltBox() {
  const tmp = useContext(GameWindowContext);
  if (!tmp) return;
  const { state, setState } = tmp;

  return (
    <button
      onClick={() => {
        setState([...state, <Bolt key={state.length} />]);
      }}
      id="BoltButton"
    >
      <Image
        draggable="false"
        src={"/beer.png"}
        width={150}
        height={150}
        alt="boldbox"
      />
    </button>
  );
}

export function addBolt(item: HTMLElement) {
  const tmp = document.getElementsByClassName(`${styles.bolthole}`);
  if (tmp.length == 0) return;

  for (let i = 0; i < tmp.length; i++) {
    if (
      overlap(item.getBoundingClientRect(), tmp[i].getBoundingClientRect()) &&
      tmp[i].getElementsByClassName(`${styles.item}`).length == 0
    ) {
      // tmp[i].appendChild(item);
      tmp[i].moveBefore(item, null);
      break;
    }
  }
}

export function BoltHole({
  top,
  left,
  index,
  bolted,
  setBolted,
}: {
  top: number;
  left: number;
  index: number;
  bolted: boolean;
  setBolted: (index: number, setTo: boolean) => void;
}) {
  const nodeRef = createRef<HTMLDivElement>();

  useEffect(() => {
    const len = nodeRef.current?.getElementsByClassName("bolt").length;
    console.log(nodeRef.current, len);

    if (len != 0 && bolted != true) setBolted(index, true);
    else if (len == 0 && bolted != false) setBolted(index, false);
    else console.log("hello");
  });

  return (
    <div
      ref={nodeRef}
      className={styles.bolthole}
      style={{ top: `${top}%`, left: `${left}%` }}
    >
      <img
        src={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Black_hole_-_Messier_87.jpg/960px-Black_hole_-_Messier_87.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail"
        }
        className={styles.bolthole}
      ></img>
      {bolted && <Bolt />}
    </div>
  );
}
