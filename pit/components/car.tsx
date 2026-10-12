"use client";

import { createContext } from "react";
import GameButton from "./UI/GameButton";
import styles from "@/css/Game.module.css";
import useCarStore, { ICar } from "./engine/carStore";

export const CarContext = createContext<ICar | null>(null);

export default function Car() {
  const car = useCarStore().in_stop;

  if (car == undefined) return <></>;

  return (
    <div
      className={`${styles.car}`}
      style={{ top: "20%", left: "20%", width: "60%", height: "60%" }}
    >
      <GameButton x={35} y={50} name="grill" />
      <GameButton x={60} y={45} name="wing" />
      <GameButton x={80} y={50} name="wheel" />
      <GameButton x={50} y={20} name="fuel" />
      <img
        draggable={false}
        src={"/elements/car2.png"}
        style={{ height: "100%", width: "100%" }}
        alt={"carbase"}
      />
    </div>
  );
}
