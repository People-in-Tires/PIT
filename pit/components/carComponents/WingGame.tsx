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

  return (
    <DraggableCore nodeRef={nodeRef} disabled={bolted} onDrag={rotate}>
      <div
        ref={nodeRef}
        className={`${styles.wing} ${styles.item} attached  ${bolted ? "bolted" : "unbolted"}`}
        style={{
          rotate: `${rotation}deg`,
          transformOrigin: `15% 50%`,
          left: `24%`,
          top: `42%`,
        }}
      >
        <img src={"/backwing.png"} draggable={false} />
        <Bolt x={15} y={28} setBolt={setBolted} tightened={startBolted} />
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
      <img
        src={"backwing_attach.png"}
        style={{
          position: "absolute",
          top: "50%",
          left: "25%",
          height: "25%",
          aspectRatio: "1/1",
        }}
      />
      <div
        style={{
          aspectRatio: "2/1",
          position: "absolute",
          left: "32%",
          width: "50%",
          bottom: "40%",
          backgroundColor: "yellow",
          clipPath: "polygon(0% 100%, 100% 100%, 100% 20%)",
        }}
      >
        <div
          style={{
            backgroundColor: "green",
            aspectRatio: "2/1",
            clipPath: "polygon(0% 100%, 100% 64%, 100% 40%)",
          }}
        ></div>
      </div>
    </div>
  );
}
