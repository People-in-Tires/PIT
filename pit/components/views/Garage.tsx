"use client";

import styles from "@/css/Game.module.css";

import { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import Car from "@/components/car";
import { BeerButton } from "../items/BeerButton";
import { registerView } from "@/components/engine/viewRegistry";
import Image from "next/image";

registerView("garage", Garage);

export default function Garage() {
  const tag = "garage";
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
      <BeerButton container={tag} />
      <Car id={0} />
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
