"use client";

import styles from "@/css/Game.module.css";

import React, { useState } from "react";
import { useCar } from "@/components/engine/carStore";
import GameButton, { GameWindow } from "@/components/UI/GameButton";
import GrillGame from "@/components/new/GrillGame";

export default function Car({ id }: { id: number }) {
  const car = useCar(id);

  const [gameWindows, setGameWindows] = useState<boolean[]>([
    false, // grill
    false, // wheel 1
    false, // wheel 2
    false, // backflap/wing
  ]);

  const handleUpdate = (index: number | number[], value: boolean) => {
    const newWindows = [...gameWindows];
    if (typeof index === "number") newWindows[index] = value;
    else {
      for (const i of index as number[]) newWindows[i] = value;
    }
    setGameWindows(newWindows);
  };

  if (!car) return null;

  return (
    <div
      className={`${styles.car}`}
      style={{ top: "20vh", left: "20vw", width: "60vw", height: "60vh" }}
    >
      <GameButton
        x={35}
        y={50}
        img="/grill.png"
        openWindow={handleUpdate}
        open={gameWindows[0]}
        index={0}
      />
      {gameWindows[0] && (
        <GameWindow closeWindow={handleUpdate} index={0}>
          <GrillGame carId={id} />
        </GameWindow>
      )}

      {/* Wheels placeholder */}
      <GameButton
        x={60}
        y={45}
        img="/window.svg"
        openWindow={handleUpdate}
        open={[gameWindows[1], gameWindows[2]]}
        index={[1, 2]}
      />
      {gameWindows[1] && (
        <GameWindow closeWindow={handleUpdate} index={1}>
          <div>Wheel game (pending migration)</div>
        </GameWindow>
      )}
      {gameWindows[2] && (
        <GameWindow closeWindow={handleUpdate} index={2}>
          <div>Wheel game (pending migration)</div>
        </GameWindow>
      )}

      {/* Backflap Placeholder */}
      <GameButton
        x={80}
        y={50}
        img="/backflap.svg"
        openWindow={handleUpdate}
        open={gameWindows[3]}
        index={3}
      />
      {gameWindows[3] && (
        <GameWindow closeWindow={handleUpdate} index={3}>
          <div>Wing game (pending migration)</div>
        </GameWindow>
      )}

      <img draggable={false} src={"/car2.png"} alt={"carbase"} />
    </div>
  );
}
