"use client";
import styles from "@/css/Game.module.css";
import { Item } from "../engine/itemStore";

export default function Grilllitter({ sprite, width, height, angle }: Item) {
  return (
    <div
      className={`${styles.litter}`}
      style={{
        width: `${width}vh`,
        height: `${height}vh`,
        rotate: `${angle}deg`,
      }}
    >
      <img draggable="false" src={sprite} alt="litter" />
    </div>
  );
}
