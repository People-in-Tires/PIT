"use client";

import styles from "@/css/Game.module.css";

import { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import Laptop from "@/components/laptop";
import { registerView } from "@/components/engine/viewRegistry";
import Image from "next/image";

registerView("desk", Desk);

export default function Desk() {
  const tag = "desk";
  const items = useItems(tag);

  return (
    <div data-container={tag} className={styles.gameview}>
      <Image
        src={"/background-brick-1.jpg"}
        width={1920}
        height={1080}
        alt="background"
        className={styles.background}
      />
      <Laptop />
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
