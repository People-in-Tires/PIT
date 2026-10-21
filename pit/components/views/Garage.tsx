"use client";

import styles from "@/css/Game.module.css";

import { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import Car from "@/components/car";
import Image from "next/image";
import { ViewTag } from "../engine/ViewManager";
import MiniMapWindow from "../UI/MiniMapWindow";

export default function Garage() {
  const tag: ViewTag = "garage";
  const items = useItems(tag);

  return (
    <div
      data-container={tag}
      className={`${styles.gameview}`}
      style={{
        backgroundImage: "url(/backgrounds/garage.svg)",
        backgroundSize: "100%",
      }}
    >
      <Car />
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
