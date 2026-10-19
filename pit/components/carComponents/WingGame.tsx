"use client";

import { createRef, useContext, useEffect, useState } from "react";
import Bolt from "../Bolt";
import styles from "@/css/Game.module.css";
import { DraggableCore } from "react-draggable";
import getAngle from "@/lib/libft/getangle";
import useCarStore, { IWing } from "../engine/carStore";
import MaskedImage from "../MaskedImage";
import { LobbyContext } from "@/context/lobby";
import React from "react";
import RotatePoint from "../RotatePoint";

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

  useEffect(() => {
    setOutput({ angle: rotation, tightenedPer: bolted ? 1.0 : 0.0 });
  }, [rotation, bolted]);

  return (
    <div
      className={"attached"}
      style={{
        position: "absolute",
        height: "20cqw",
        aspectRatio: "1/5",
        left: `15%`,
        top: `35%`,
      }}
    >
      <RotatePoint
        disabled={bolted}
        className={`${styles.wing}`}
        angle={rotation}
        angleOffset={-90}
        setAngle={setRotation}
        transformOriginX={50}
        transformOriginY={10}
        range={{ min: 0, max: -20 }}
      >
        <img
          src={"/elements/backwing/backwing.png"}
          draggable={false}
          alt="backwing"
          style={{ height: "100%", width: "100%" }}
        />
      </RotatePoint>
      <Bolt x={10} y={10} setBolt={setBolted} tightened={startBolted} />
    </div>
  );
}

export default function WingGame() {
  const setOutput = useCarStore().setBackflap;
  const car = useCarStore().in_stop;
  const { team } = useContext(LobbyContext);

  return (
    <React.Fragment>
      <MaskedImage
        src={"/backgrounds/minigames/winggame/wing_line.svg"}
        maskSrc={"/backgrounds/minigames/winggame/wing_mask.svg"}
        color={team.color}
      />
      <img
        src={"/elements/backwing/backwing_attach.png"}
        alt="backwing_attach"
        style={{
          position: "absolute",
          top: "45%",
          left: "15%",
          height: "25%",
          aspectRatio: "1/1",
        }}
      />
      <div
        style={{
          aspectRatio: "2/1",
          position: "absolute",
          bottom: "50%",
          left: "20%",
          width: "80%",
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
        />
      </div>
      <Wing
        angle={car ? car.backflap.angle : 0}
        startBolted={car ? car.backflap.tightenedPer != 0 : true}
        setOutput={(wing: IWing) =>
          setOutput({
            angle: wing.angle,
            tightenedPer: wing.tightenedPer,
          })
        }
      />
    </React.Fragment>
  );
}
