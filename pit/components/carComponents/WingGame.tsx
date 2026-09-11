"use client";

import { createRef, useContext, useEffect, useState } from "react";
import Bolt from "./Bolt";
import { DraggableData } from "react-draggable";
import styles from "@/css/Game.module.css";
import { DraggableCore } from "react-draggable";
import getAngle from "@/lib/libft/getangle";
import useCarStore, { IWing } from "../engine/carStore";
import { CarContext } from "../car";

const min_rotation = -20;
const max_rotation = 0;

function Wing({
  angle,
  startBolted,
  setOutput,
}: {
  angle: number;
  startBolted: boolean;
  setOutput: (value: IWing) => void;
}) {
  const [bolted, setBolted] = useState<boolean>(startBolted);
  const [rotation, setRotation] = useState<number>(angle);
  const nodeRef = createRef<HTMLDivElement>();

  function rotate(event: MouseEvent) {
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
    setOutput({ angle: rotation, boltPercentage: bolted ? 1.0 : 0.0 });
  }, [rotation, bolted]);

  function setBolt(setTo: boolean) {
    setBolted(setTo);
  }
  return (
    <DraggableCore nodeRef={nodeRef} disabled={bolted} onDrag={rotate}>
      <div
        ref={nodeRef}
        className={`${styles.wing} ${styles.item} attached  ${bolted ? "bolted" : "unbolted"}`}
        style={{
          rotate: `${rotation}deg`,
          transformOrigin: `40% 90%`,
          left: `30%`,
          top: `30%`,
        }}
      >
        <img src={"/backflap.svg"} draggable={false} />
        <Bolt x={40} y={80} setBolt={setBolt} tightened={startBolted} />
      </div>
    </DraggableCore>
  );
}

export default function WingGame() {
  const setOutput = useCarStore().setBackflap;
  const car = useContext(CarContext);
  if (!car) return null;

  return (
    <div>
      <Wing
        angle={car.backflap.angle}
        startBolted={car.backflap.boltPercentage != 0}
        setOutput={(wing: IWing) =>
          setOutput(car.id, {
            angle: wing.angle,
            boltPercentage: wing.boltPercentage,
          })
        }
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
