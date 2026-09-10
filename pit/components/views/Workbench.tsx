"use client";

import styles from "@/css/Game.module.css";

import { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import { BeerButton } from "../items/BeerButton";
import { registerView } from "@/components/engine/viewRegistry";
import Image from "next/image";
import { WheelButton } from "../items/WheelButton";

registerView("workbench", Workbench);

export default function Workbench() {
  const tag = "workbench";
  const items = useItems(tag);

  return (
    <div data-container={tag} className={styles.gameview}>
      <Image
        src={"/background-brick-2.jpg"}
        width={1920}
        height={1080}
        alt="background"
        className={styles.background}
      />
      <WheelButton container={tag} type="normalwheel" />
      <BeerButton container={tag} />
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
