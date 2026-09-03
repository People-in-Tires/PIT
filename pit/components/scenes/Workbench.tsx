"use client";

import styles from "@/css/Game.module.css";

import { useItems } from "@/components/new/itemStore";
import RenderItem from "@/components/new/RenderItem";
import { BeerButton } from "../new/BeerButton";
import { registerView } from "@/shared/viewRegistry";
import Image from "next/image";

registerView("workbench", Workbench);

export default function Workbench() {
  const items = useItems("workbench");

  return (
    <div data-container="workbench" className={styles.gameview}>
      <Image
        src={"/background-brick-2.jpg"}
        width={1920}
        height={1080}
        alt="background"
        className={styles.background}
      />
      <BeerButton container="workbench" />
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
