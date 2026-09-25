"use client";
import styles from "@/css/Game.module.css";
import { Item } from "../engine/itemStore";

export default function Grilllitter({ sprite, width, height }: Item) {
  return (
    <div
      className={`${styles.litter}`}
      style={{ width: `${width}vh`, height: `${height}vh` }}
    >
      <img draggable="false" src={sprite} alt="litter" />
    </div>
  );
}
