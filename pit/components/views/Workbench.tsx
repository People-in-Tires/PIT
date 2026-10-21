"use client";

import styles from "@/css/Game.module.css";

import useItemStore, { useItems } from "@/components/engine/itemStore";
import RenderItem from "@/components/engine/RenderItem";
import { BeerButton } from "../items/BeerButton";
import Image from "next/image";
import { WheelButton } from "../items/WheelButton";
import { ViewTag } from "../engine/ViewManager";
import Tap from "../carComponents/Tap";
import ItemRack from "../ItemRack";
import Weather from "../Weather";
import Bin from "../UI/Bin";
import { LaptopButton } from "../laptop";

export default function Workbench() {
  const tag: ViewTag = "workbench";
  const items = useItems(tag);

  return (
    <div
      data-container={tag}
      className={`${styles.gameview}`}
      style={{
        backgroundImage: "url(/backgrounds/desk.svg",
        backgroundSize: "100%",
      }}
    >
      <Weather />
      <ItemRack
        type="wrench"
        capacity={1}
        sprite="/elements/items/bolt.png"
        style={{
          position: "absolute",
          height: "5cqw",
          width: "10cqw",
          right: "10cqw",
          top: "10cqw",
        }}
      />
      <Tap
        style={{
          height: "20cqw",
          aspectRatio: "1/1",
          left: "5cqw",
          top: "12cqw",
        }}
      />
      <LaptopButton style={{ right: "15cqw", bottom: "30cqh" }} />
      {items.map((item) => (
        <RenderItem key={item.id} item={item} />
      ))}
    </div>
  );
}
