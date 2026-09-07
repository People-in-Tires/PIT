"use client";

import styles from "@/css/Game.module.css";

import { useItems } from "@/components/itemStore";
import RenderItem from "@/components/RenderItem";
import Laptop from "@/components/laptop";
import { registerView } from "@/shared/viewRegistry";
import Image from "next/image";

registerView("desk", Desk);

export default function Desk() {
  const items = useItems("desk");

  return (
    <div data-container="desk" className={styles.gameview}>
      <Image
        src={"/background-brick-1.jpg"}
        width={1920}
        height={1080}
        alt="background"
        className={styles.background}
      />
      <Laptop/>
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
