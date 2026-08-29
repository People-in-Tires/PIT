"use client";

import React, { useState, createRef } from "react";
import Image from "next/image";
import GameButton, { GameWindow } from "./GameButton";
import GrillGame from "../minigames/grill/page";
import WheelGame from "../minigames/wheels/page";
import styles from "../Index.module.css";
import Wrench from "./wrench";
import WheelSmooth from "../minigames/wheels/WheelSmooth";
import { PITMetaData } from "./GameButton";
//class we get from rust
export class CarClass {
  litter: number;
  wheels: (React.JSX.Element | null)[];

  constructor() {
    this.litter = 20;
    this.wheels = [
      <WheelSmooth key={"wheel1"} />,
      <WheelSmooth key={"wheel2"} />,
      <WheelSmooth key={"wheel3"} />,
      <WheelSmooth key={"wheel4"} />,
    ];
  }
}

export default function Car({ id }: { id: number }) {
  //load car from
  const [carInfo, setCarInfo] = useState<CarClass>(new CarClass());
  const [gameWindows, setGameWindows] = useState<boolean[]>([false, false]);
  const handleUpdate = (index: number | number[], value: boolean) => {
    const newTodos = [...gameWindows];
    if (typeof index === "number") newTodos[index] = value;
    else {
      for (const i of index as number[]) {
        newTodos[i] = value;
      }
    }
    setGameWindows(newTodos);
  };

  return (
    <div
      className={`${styles.car}`}
      style={{ top: "20vh", left: "20vw", width: "60vw", height: "60vh" }}
    >
      <GameButton
        x={350}
        y={500}
        img="/grill.png"
        openWindow={handleUpdate}
        open={gameWindows[0]}
        index={0}
      />
      {gameWindows[0] && (
        <GameWindow closeWindow={handleUpdate} index={0}>
          <GrillGame
            metadata={{ litter: carInfo.litter }}
            setOutput={(input: PITMetaData) => {
              const tmp = new CarClass();
              tmp.litter = input as number;
              setCarInfo(tmp);
            }}
          />
        </GameWindow>
      )}

      <GameButton
        x={600}
        y={450}
        img="/window.svg"
        openWindow={handleUpdate}
        open={[gameWindows[1], gameWindows[2]]}
        index={[1, 2]}
      />
      {gameWindows[1] && (
        <GameWindow closeWindow={handleUpdate} index={1}>
          <WheelGame
            metadata={{ wheel: carInfo.wheels[0] }}
            setOutput={(input: PITMetaData) => {
              const tmp = new CarClass();
              tmp.wheels[0] = input as React.JSX.Element;
              setCarInfo(tmp);
            }}
          />
        </GameWindow>
      )}
      {gameWindows[2] && (
        <GameWindow closeWindow={handleUpdate} index={2}>
          <WheelGame
            metadata={{ wheel: carInfo.wheels[1] }}
            setOutput={(input: PITMetaData) => {
              const tmp = new CarClass();
              tmp.wheels[1] = input as React.JSX.Element;
              setCarInfo(tmp);
            }}
          />
        </GameWindow>
      )}
      <img src={"/car2.png"} alt={"carbase"} />
    </div>
  );
}
