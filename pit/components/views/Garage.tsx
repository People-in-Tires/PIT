"use client";

import styles from "@/css/Game.module.css";

import useItemStore, { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import Car from "@/components/car";
import { BeerButton } from "../items/BeerButton";
import Image from "next/image";
import { useEffect } from "react";
import { ViewTag } from "../engine/ViewManager";
import MiniMap from "../MiniMap";
import RaceButtons from "../UI/RaceButtons";

export default function Garage() {
  const tag: ViewTag = "garage";
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
      <RaceButtons />
      <Car />
      <div style={{ scale: 0.25, top: 0, right: 0, position: "absolute" }}>
        <MiniMap />
      </div>
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
