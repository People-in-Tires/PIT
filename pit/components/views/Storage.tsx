"use client";

import styles from "@/css/Game.module.css";

import { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import { BeerButton } from "../items/BeerButton";
import Image from "next/image";
import { WheelButton } from "../items/WheelButton";
import { ViewTag } from "../engine/ViewManager";
import Tap from "../carComponents/Tap";
import ItemRack from "../ItemRack";

export default function Storage() {
  const tag: ViewTag = "storage";
  const items = useItems(tag);

  return (
    <div data-container={tag} className={styles.gameview}>
      <ItemRack
        type="normalwheel"
        capacity={6}
        sprite="/wheelrackbottom.png"
        style={{
          position: "absolute",
          height: "10vw",
          width: "10vw",
          left: "10vw",
          bottom: "10vw",
        }}
      />
      <ItemRack
        type="hardwheel"
        capacity={6}
        sprite="/wheelracktop.png"
        style={{
          position: "absolute",
          height: "10vw",
          width: "10vw",
          left: "20vw",
          bottom: "10vw",
        }}
      />
      <ItemRack
        type="wetwheel"
        capacity={6}
        sprite="/wheelrackbottom.png"
        style={{
          position: "absolute",
          height: "10vw",
          width: "20vw",
          left: "10vw",
          bottom: "20vw",
        }}
      />
      <ItemRack
        type="softwheel"
        capacity={6}
        sprite="/wheelrackgnome.png"
        style={{
          position: "absolute",
          height: "10vw",
          width: "10vw",
          left: "40vw",
          bottom: "10vw",
        }}
      />
      <ItemRack
        type="jerrycan"
        capacity={2}
        sprite="/jerryrack.png"
        style={{
          position: "absolute",
          height: "10vw",
          width: "10vw",
          left: "50vw",
          bottom: "10vw",
        }}
      />
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
