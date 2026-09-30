"use client";
import styles from "@/css/Game.module.css";
import { Item } from "../engine/itemStore";
import { use, useEffect, useState } from "react";
import useItemStore from "../engine/itemStore";

export default function Grilllitter({
  sprites,
  width,
  height,
  angle,
  pickedup,
}: Item) {
  return (
    <div
      className={`${styles.litter}`}
      style={{
        width: `${width}vh`,
        height: `${height}vh`,
        rotate: `${angle}deg`,
      }}
    >
      <img
        draggable="false"
        src={pickedup ? sprites![1] : sprites![0]}
        alt="litter"
      />
    </div>
  );
}
