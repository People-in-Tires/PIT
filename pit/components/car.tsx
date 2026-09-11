"use client";

import { createContext } from "react";
import GameButton from "./UI/GameButton";
import styles from "@/css/Game.module.css";
import useCarStore, { ICar } from "./engine/carStore";

export const CarContext = createContext<ICar | null>(null);

export default function Car({ id }: { id: number }) {
  const car = useCarStore().cars[id];

  return (
    <div
      className={`${styles.car}`}
      style={{ top: "20vh", left: "20vw", width: "60vw", height: "60vh" }}
    >
      <CarContext value={car}>
        <GameButton x={35} y={50} name="grill" />
        <GameButton x={60} y={45} name="wing" />
        <GameButton x={80} y={50} name="wheel" />
      </CarContext>
      <img draggable={false} src={"/car2.png"} alt={"carbase"} />
    </div>
  );
}
