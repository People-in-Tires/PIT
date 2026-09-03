"use client";

import Image from "next/image";
import { Item } from "@/components/new/itemStore";
import styles from "@/css/Game.module.css";

export default function Beer({ width, height }: Item) {
  return (
    <div className={styles.beer} style={{ width, height }}>
      <Image draggable="false" src="/beer.png" fill alt="Beer" />
    </div>
  );
}
