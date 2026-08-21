"use client";

import { useState, createRef } from "react";
import Image from "next/image";
import GameButton, { GameWindow } from "./GameButton";
import GrillGame from "../minigames/grill/page";
import WheelGame from "../minigames/wheels/page";

//class we get from rust
export class CarClass {
  litter: number;

  constructor() {
    this.litter = 20;
  }
}

export default function Car({ id }: { id: number }) {
  //load car from
  const [carInfo, setCarInfo] = useState<CarClass>(new CarClass);
  const [gameWindows, setGameWindows] = useState<boolean[]>([false, false]);
  const handleUpdate = (index: number) => {
    const newTodos = [...gameWindows];
    newTodos[index] = !newTodos[index];
    setGameWindows(newTodos);
  };

  return (
    <div>
      <GameButton
        img="/grill.png"
        setBool={handleUpdate}
        open={gameWindows[0]}
        id={0}
      />
      {gameWindows[0] && (
        <GameWindow
          child={
            <GrillGame
              metadata={{ litter: carInfo.litter }}
              setOutput={(input: number) => {
                const tmp = new CarClass;
                tmp.litter = input;
                setCarInfo(tmp);
              }}
            />
          }
          setBool={handleUpdate}
          id={0}
        />
      )}

      <GameButton
        img="/window.svg"
        setBool={handleUpdate}
        open={gameWindows[1]}
        id={1}
      />
      {gameWindows[1] && (
        <GameWindow
          child={
            <WheelGame
              metadata={{ wheel: "flintstone" }}
              setOutput={(input: number) => {
                const tmp = new CarClass;
                tmp.litter = input;
                setCarInfo(tmp); //this is stupid and we need a copy or someshit idk im tired
              }}
            />
          }
          setBool={handleUpdate}
          id={1}
        />
      )}

      <Image src={"/car2.png"} width={400} height={400} alt={"carbase"} />
    </div>
  );
}
