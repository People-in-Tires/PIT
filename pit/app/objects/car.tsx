"use client";

import React, { useState, createRef } from "react";
import Image from "next/image";
import GameButton, { GameWindow } from "./GameButton";
import GrillGame from "../minigames/grill/page";
import WheelGame from "../minigames/wheels/page";
import styles from "../Index.module.css";
import Wrench from "./wrench";
//class we get from rust
export class CarClass {
  litter: number;

  constructor() {
    this.litter = 20;
  }
}

export default function Car({ id }: { id: number }) {
  //load car from
  const [carInfo, setCarInfo] = useState<CarClass>(new CarClass());
  const [gameWindows, setGameWindows] = useState<boolean[]>([false, false]);
  const handleUpdate = (index: number) => {
    const newTodos = [...gameWindows];
    newTodos[index] = !newTodos[index];
    setGameWindows(newTodos);
  };

  return (
    <div>
      <GameButton
        className={`${styles.game_button_grill}`}
        img="/grill.png"
        setBool={handleUpdate}
        open={gameWindows[0]}
        index={0}
      />
      {gameWindows[0] && (
        <GameWindow setOutput={handleUpdate} index={0}>
          <GrillGame
            metadata={{ litter: carInfo.litter }}
            setOutput={(input: number) => {
              const tmp = new CarClass();
              tmp.litter = input;
              setCarInfo(tmp);
            }}
          />
        </GameWindow>
      )}

      <GameButton
        className={`${styles.game_button_wheel}`}
        img="/window.svg"
        setBool={handleUpdate}
        open={gameWindows[1]}
        index={1}
      />
      {gameWindows[1] && (
        <GameWindow setOutput={handleUpdate} index={1}>
          <WheelGame
            metadata={{ wheel: "flintstone" }}
            setOutput={(input: number) => {
              const tmp = new CarClass();
              tmp.litter = input;
              setCarInfo(tmp); //this is stupid and we need a copy or someshit idk im tired
            }}
          />
        </GameWindow>
      )}

      <Image
        className={`${styles.carframe}`}
        src={"/car2.png"}
        width={400}
        height={400}
        alt={"carbase"}
      />
    </div>
  );
}
