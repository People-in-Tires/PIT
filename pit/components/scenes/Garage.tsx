"use client";

import styles from "@/css/Game.module.css";

import { useItems } from "@/components/new/itemStore";
import RenderItem from "@/components/new/RenderItem";
import { BeerButton } from "../new/BeerButton";
import { registerView } from "@/shared/viewRegistry";
import Image from "next/image";

registerView("garage", Garage);

export default function Garage() {
  const items = useItems("garage");

  return (
    <div
      data-container="garage"
      className={styles.gameview}
    >
      <Image
            src={"/background-brick-1.jpg"}
            width={1920}
            height={1080}
            alt="background"
            className={styles.background}
          />
      <BeerButton container="garage" />
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
