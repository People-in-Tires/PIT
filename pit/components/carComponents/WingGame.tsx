"use client";

import { createRef, useEffect, useState } from "react";
import { MiniGameProps } from "../UI/GameButton";
import Bolt from "./Bolt";
import DraggableItem from "../engine/DraggableItem";
import { DraggableData } from "react-draggable";
import styles from "@/css/Game.module.css";
import { DraggableCore } from "react-draggable";
import getAngle from "@/lib/libft/getangle";
import { ItemProps } from "../engine/item";
import { PITMetaData } from "../UI/GameButton";

const min_rotation = -20;
const max_rotation = 0;

function Wing({
  x,
  y,
  angle,
  startBolted,
  setOutput,
}: {
  angle: number;
  startBolted: boolean;
  setOutput: (input: PITMetaData) => void;
} & ItemProps) {
  const [bolted, setBolted] = useState<boolean>(startBolted);
  const [rotation, setRotation] = useState<number>(angle);
  const nodeRef = createRef<HTMLDivElement>();
  const hitboxRef = createRef<HTMLDivElement>();

  function rotate(event: MouseEvent, data: DraggableData) {
    let delta_rotation: number;
    if (nodeRef.current == null) delta_rotation = 0;
    else {
      const parentReq = nodeRef.current.getBoundingClientRect();
      if (!parentReq) return;
      const tmp_rotate = getAngle(
        event.x,
        event.y,
        parentReq.x + (parentReq.width * 1) / 2.5,
        parentReq.y + (parentReq.height * 3) / 6,
      );
      delta_rotation = ((tmp_rotate - rotation - 180) % 360) + 180;
    }
    setRotation((prevRotation) => {
      if (prevRotation + delta_rotation < min_rotation) return min_rotation;
      else if (prevRotation + delta_rotation > max_rotation)
        return max_rotation;
      return prevRotation + delta_rotation;
    });
  }

  useEffect(() => {
    setOutput(rotation);
  }, [rotation]);

  function setBolt(setTo: boolean) {
    setBolted(setTo);
  }
  return (
    <DraggableCore nodeRef={nodeRef} disabled={bolted} onDrag={rotate}>
      <div
        ref={nodeRef}
        className={`${styles.wing} ${styles.item} attached`}
        style={{
          rotate: `${rotation}deg`,
          transformOrigin: `40% 90%`,
          left: `${x}%`,
          top: `${y}%`,
        }}
      >
        <img src={"/backflap.svg"} draggable={false} />
        <Bolt x={40} y={80} setBolt={setBolt} tightened={startBolted} />
        <div
          ref={hitboxRef}
          className={`${styles.hitbox}`}
          style={{
            width: "10%",
            height: "40%",
            left: "30%",
            top: "70%",
          }}
        ></div>
      </div>
    </DraggableCore>
  );
}

export default function WingGame({ metadata, setOutput }: {} & MiniGameProps) {
  const idealangle: number = metadata["idealangle"] as number; //could be dynamic could always be 12%

  return (
    <div className={`${styles.background}`}>
      <Wing
        setOutput={setOutput}
        angle={metadata["angle"] as number}
        startBolted={metadata["bolted"] as boolean}
        x={30}
        y={30}
      />
      <div
        style={{
          aspectRatio: "2/1",
          position: "absolute",
          left: "10%",
          width: "40%",
          top: "46%",
          backgroundColor: "yellow",
          clipPath: "polygon(100% 0%, 0% 0%, 0% 80%)",
        }}
      >
        <div
          style={{
            backgroundColor: "green",
            aspectRatio: "2/1",
            clipPath: "polygon(100% 0%, 0% 36%, 0% 60%)",
          }}
        ></div>
      </div>
    </div>
  );
}
