"use client";

import Image from "next/image";
import { Item } from "@/components/engine/itemStore";
import styles from "@/css/Game.module.css";

export default function Beer({}: Item) {
  return (
    <div className={styles.beer}>
      <Image draggable="false" src="/elements/items/beer.png" fill alt="Beer" />
    </div>
  );
}
