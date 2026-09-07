"use client";

import styles from "@/css/Game.module.css";

import { useItems } from "@/components/itemStore";
import RenderItem from "@/components/RenderItem";
import Car from "@/components/car";
import { BeerButton } from "../BeerButton";
import { registerView } from "@/shared/viewRegistry";
import Image from "next/image";

registerView("garage", Garage);

export default function Garage() {
  const items = useItems("garage");

  return (
    <div data-container="garage" className={styles.gameview}>
      <Image
        src={"/background-brick-1.jpg"}
        width={1920}
        height={1080}
        alt="background"
        className={styles.background}
      />
      <BeerButton container="garage" />
      <Car id={0}/>
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
